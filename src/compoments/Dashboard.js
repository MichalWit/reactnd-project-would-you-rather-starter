import React, { Component } from 'react'
import { connect } from 'react-redux'

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

class AnsweredQuestion extends Component {

    render() {
        const { answeredQuestion } = this.props
        const question = answeredQuestion[0]
        const answer = answeredQuestion[1]
        return (
            <li key={question.id}>
                <p>Would you rather:</p>
                <p>{question.optionOne.text}</p>
                <p>or</p>
                <p>{question.optionTwo.text}</p>
                <p>Answered:</p>
                <p>{answer}</p>
            </li>
        )
    }
}

class Answered extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.answeredQuestions.map((answeredQuestion) => (
                        <AnsweredQuestion
                            answeredQuestion={answeredQuestion}
                        />
                    ))
                }
            </ul>
        )
    }
}

class UnansweredQuestion extends Component {

    render() {
        const { unansweredQuestion } = this.props
        return (
            <li key={unansweredQuestion.id}>
                <p>Would you rather:</p>
                <p>{unansweredQuestion.optionOne.text}</p>
                <p>or</p>
                <p>{unansweredQuestion.optionTwo.text}</p>
            </li>
        )
    }
}

class Unanswered extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.unansweredQuestions.map((unansweredQuestion) => (
                        <UnansweredQuestion
                            unansweredQuestion={unansweredQuestion}
                        />
                    ))
                }
            </ul>
        )
    }
}

class Dashboard extends Component {

    state = {
        answeredDisplayed: true
    }

    _toggleTab = (e) => {
        this.setState((state) => ({
            answeredDisplayed: !state.answeredDisplayed
        }))
    }

    render() {
        const { authedUserId, questions, users } = this.props

        const authedUser = users[authedUserId]
        const answers = authedUser.answers

        const answeredQuestionIds = Object.keys(answers)
        const answeredQuestions = answeredQuestionIds
            .map((id) => questions[id])
            .map((question) => [question, answers[question.id]])

        const unansweredQuestions = Object.keys(questions)
            .filter((qId) => answers[qId] === undefined)
            .map((unansweredQuestionId) => questions[unansweredQuestionId])

        return (
            <div className="questionsContainer">
                <div className="questions">
                    <QuestionLabel
                        answeredDisplayed={this.state.answeredDisplayed}
                        toggleTab={this._toggleTab}
                    />
                    {
                        this.state.answeredDisplayed
                            ? <Answered
                                authedUserId={authedUserId}
                                answeredQuestions={answeredQuestions}
                                users={users}
                            />
                            : <Unanswered
                                authedUserId={authedUserId}
                                unansweredQuestions={unansweredQuestions}
                                users={users}
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
