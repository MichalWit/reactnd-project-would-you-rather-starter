import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageWithContent from './shared/ImageWithContent'
import AuthorAsks from './shared/AuthorAsks'
import { questionAnswered } from '../actions/questions'

export const OPTIONS = {
    o1: "optionOne",
    o2: "optionTwo"
}

class UnansweredPoll extends Component {

    state = {
        selectedOption: OPTIONS.o1
    }

    _handleSubmit = (e) => {
        e.preventDefault()

        const answer = this.state.selectedOption
        const questionId = this.props.question.id
        const authedUserId = this.props.authedUserId

        if (answer !== OPTIONS.o1 && answer !== OPTIONS.o2) {
            alert("Please choose an answer!")
        } else {
            this.props.dispatch(questionAnswered({questionId, answer, authedUserId}))
        }
    }

    _handleChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    render() {
        const { question, author } = this.props
        // TODO - move the 'question' to common place?
        return (
            <ImageWithContent
                name={author.name}
                avatarURL={author.avatarURL}
            >
                <div>Would you rather</div>
                <form>
                    <div className="radio">
                        <input
                            type="radio"
                            value={OPTIONS.o1}
                            checked={this.state.selectedOption === OPTIONS.o1}
                            onChange={this._handleChange}
                        />
                        {question.optionOne.text}
                    </div>
                    <div>or</div>
                    <div className="radio">
                        <input
                            type="radio"
                            value={OPTIONS.o2}
                            checked={this.state.selectedOption === OPTIONS.o2}
                            onChange={this._handleChange}
                        />
                        {question.optionTwo.text}
                    </div>
                </form>
                <button onClick={this._handleSubmit}>Submit</button>
            </ImageWithContent>
        )
    }
}

function AnsweredOption(props) {

    const { isChosen, questionText, optionStats, allAnswers } = props

    return (
        <div className={isChosen ? "answeredOption" : ""}>
            <span>{questionText}</span>
            {isChosen && <span style={{marginLeft: "4px"}}><b>(Your answer)</b></span>}
            <div>{optionStats.number} out of {allAnswers} answers. ({optionStats.percentage})</div>
        </div>
    )
}

class AnsweredPoll extends Component {

    _allAnswersNumber(question) {
        const optionOneAnswers = question.optionOne.votes.length
        const optionTwoAnswers = question.optionTwo.votes.length
        const allAnswers = optionOneAnswers + optionTwoAnswers
        return {
            allAnswers,
            optionOneAnswers,
            optionTwoAnswers
        }
    }

    _computePercentage(optionAnswerNumber, allAnswers) {
        return (optionAnswerNumber / allAnswers * 100) + "%"
    }

    _compute(question) {
        const {
            allAnswers,
            optionOneAnswers,
            optionTwoAnswers
        } = this._allAnswersNumber(question)
        const optionOnePercentage = this._computePercentage(optionOneAnswers, allAnswers)
        const optionTwoPercentage = this._computePercentage(optionTwoAnswers, allAnswers)
        return {
            allAnswers,
            one: {
                number: optionOneAnswers,
                percentage: optionOnePercentage
            },
            two: {
                number: optionTwoAnswers,
                percentage: optionTwoPercentage
            }
        }
    }

    render() {
        const { question, author, user } = this.props
        const statistics = this._compute(question)
        const { allAnswers, one, two } = statistics

        const answer = user.answers[question.id]
        const isOptionOneChosen = answer === OPTIONS.o1
        return (
            <ImageWithContent
                name={author.name}
                avatarURL={author.avatarURL}
                asked
            >
                <div>
                    <div>Would you rather</div>
                    <AnsweredOption
                        isChosen={isOptionOneChosen}
                        questionText={question.optionOne.text}
                        optionStats={one}
                        allAnswers={allAnswers}
                    />
                    <div>or</div>
                    <AnsweredOption
                        isChosen={!isOptionOneChosen}
                        questionText={question.optionTwo.text}
                        optionStats={two}
                        allAnswers={allAnswers}
                    />
                </div>
            </ImageWithContent>
        )
    }
}

class Poll extends Component {

    render() {
        const { question, author, user } = this.props
        // TODO - move the 'question' to common place?
        const userAnswer = (user.answers)[question.id]
        return (
            userAnswer
                ? <AnsweredPoll
                    authedUserId={user.id}
                    question={question}
                    author={author}
                    user={user}
                />
                : <UnansweredPoll
                    authedUserId={user.id}
                    question={question}
                    author={author}
                    dispatch={this.props.dispatch}
                />
        )
    }
}

function mapStateToProps(state, props) {
    const { id } = props.match.params
    const { authedUserId, questions, users } = state
    const question = questions[id]
    const author = users[question.author]
    const user = users[authedUserId]
    return {
        question,
        author,
        user
    }
}

export default connect(mapStateToProps)(Poll)
