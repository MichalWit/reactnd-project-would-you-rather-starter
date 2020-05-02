import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ImageWithContent from './shared/ImageWithContent'

class QuestionLabel extends Component {

    render() {
        const { answeredDisplayed, toggleTab } = this.props
        return (
            <div className="answersTabs">
                <div
                    className={`answerTab ${!answeredDisplayed ? "activeAnswerTab" : ""}`}
                    onClick={answeredDisplayed ? toggleTab : null}
                >Unanswered</div>
                <div
                    className={`answerTab ${answeredDisplayed ? "activeAnswerTab" : ""}`}
                    onClick={!answeredDisplayed ? toggleTab : null}
                >Answered</div>
            </div>
        )
    }
}

class Questions extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.questions
                        .sort((q1, q2) => (q2.timestamp - q1.timestamp))
                        .map((detailedQuestion) => {

                            const {
                                id,
                                optionOneText,
                                authorName,
                                authorAvatarURL,
                                timestamp
                            } = detailedQuestion

                            return <li key={id}>
                                <ImageWithContent
                                    name={authorName}
                                    avatarURL={authorAvatarURL}
                                    label="asks"
                                >
                                    <div className="dashboardQuestion">
                                        <div>
                                            <div>Would you rather:</div>
                                            <hr/>
                                            <div>... {optionOneText} ...</div>
                                            <Link to={`/questions/${id}`}><button className='btn'>View poll</button></Link>
                                        </div>
                                        <div className="questionDate">Asked on: {new Date(timestamp).toISOString().slice(0, 10)}</div>
                                    </div>
                                </ImageWithContent>
                            </li>
                        })
                }
            </ul>
        )
    }
}

class Dashboard extends Component {

    state = {
        answeredDisplayed: false
    }

    _toggleTab = (e) => {
        this.setState((state) => ({
            answeredDisplayed: !state.answeredDisplayed
        }))
    }

    _addAvatarAndName(question, users) {
        return {
            id: question.id,
            timestamp: question.timestamp,
            optionOneText: question.optionOne.text,
            authorAvatarURL: users[question.author].avatarURL,
            authorName: users[question.author].name
        }
    }

    _extractAnswered(answers, questions, users) {
        return Object.keys(answers)
            .map((id) => this._addAvatarAndName(questions[id], users))
    }

    _extractUnanswered(answers, questions, users) {
        return Object.keys(questions)
            .filter((qId) => answers[qId] === undefined)
            .map((id) => this._addAvatarAndName(questions[id], users))
    }

    render() {
        const { authedUserId, questions, users } = this.props
        const authedUser = users[authedUserId]
        const answers = authedUser.answers

        const answeredQuestions = this._extractAnswered(answers, questions, users)
        const unansweredQuestions = this._extractUnanswered(answers, questions, users)


        return (
            <div className="questionsContainer">
                <div className="questions">
                    <QuestionLabel
                        answeredDisplayed={this.state.answeredDisplayed}
                        toggleTab={this._toggleTab}
                    />
                    {
                        this.state.answeredDisplayed
                            ? <Questions
                                questions={answeredQuestions}
                            />
                            : <Questions
                                questions={unansweredQuestions}
                            />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authedUserId, questions, users } = state
    return { authedUserId, questions, users }
}

export default connect(mapStateToProps)(Dashboard)
