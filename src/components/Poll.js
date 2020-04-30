import React, { Component } from 'react'
import { connect } from 'react-redux'
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
            <div>
                <AuthorAsks author={author}/>
                <p>Would you rather</p>
                <form>
                    <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value={OPTIONS.o1}
                            checked={this.state.selectedOption === OPTIONS.o1}
                            onChange={this._handleChange}
                        />
                        {question.optionOne.text}
                    </label>
                    </div>
                    <p>or</p>
                    <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value={OPTIONS.o2}
                            checked={this.state.selectedOption === OPTIONS.o2}
                            onChange={this._handleChange}
                        />
                        {question.optionTwo.text}
                    </label>
                    </div>
                </form>
                <button onClick={this._handleSubmit}>Submit</button>
            </div>
        )
    }
}

class AnsweredPoll extends Component {

    render() {
        const { question, author, user } = this.props
        const optionOneAnswers = question.optionOne.votes.length
        const optionTwoAnswers = question.optionTwo.votes.length
        const allAnswers = optionOneAnswers + optionTwoAnswers

        const optionOnePercentage = (optionOneAnswers / allAnswers * 100) + "%"
        const optionTwoPercentage = (optionTwoAnswers / allAnswers * 100) + "%"

        const answer = user.answers[question.id]
        // FIXME = answer is wrongly resolved here! - check after switching to 'users'
        const isOptionOneChosen = answer === OPTIONS.o1
        return (
            <div>
                <AuthorAsks author={author} asked/>
                <p>Would you rather</p>
                    <div className={isOptionOneChosen ? "answeredOption" : ""}>
                        <span>{question.optionOne.text}</span>
                        {isOptionOneChosen && <span style={{marginLeft: "4px"}}><b>(Your answer)</b></span>}
                        <p>{optionOneAnswers} out of {allAnswers} answers. ({optionOnePercentage})</p>
                    </div>
                    <p>or</p>
                    <div className={!isOptionOneChosen ? "answeredOption" : ""}>
                        {question.optionTwo.text}
                        {!isOptionOneChosen && <span style={{marginLeft: "4px"}}><b>(Your answer)</b></span>}
                        <p>{optionTwoAnswers} out of {allAnswers} answers. ({optionTwoPercentage})</p>
                    </div>
            </div>
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
