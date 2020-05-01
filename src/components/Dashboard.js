import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ImageWithContent from './shared/ImageWithContent'

class QuestionLabel extends Component {

    render() {
        const { answeredDisplayed, toggleTab } = this.props
        return (
            <div>
                <h3
                    className={`answerTab ${answeredDisplayed ? "activeAnswerTab" : ""}`}
                    onClick={!answeredDisplayed ? toggleTab : null}
                >Answered</h3>
                <h3
                    className={`answerTab ${!answeredDisplayed ? "activeAnswerTab" : ""}`}
                    onClick={answeredDisplayed ? toggleTab : null}
                >Unanswered</h3>
            </div>
        )
    }
}

class Questions extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.questions.map((detailedQuestion) => {

                        const {
                            id,
                            optionOneText,
                            authorName,
                            authorAvatarURL
                        } = detailedQuestion

                        return <li key={id}>
                            <ImageWithContent
                                name={authorName}
                                avatarURL={authorAvatarURL}
                            >
                                <p>Would you rather:</p>
                                <p>... {optionOneText} ...</p>
                                <Link to={`/questions/${id}`}><button>View poll</button></Link>
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
