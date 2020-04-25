import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {

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
            <div>
                <h2>Answered</h2>
                <ul>
                    {
                        answeredQuestions.map((answeredQuestion) => (
                            <li key={answeredQuestion[0].id}>
                                <p>Would you rather:</p>
                                <p>{answeredQuestion[0].optionOne.text}</p>
                                <p>or</p>
                                <p>{answeredQuestion[0].optionTwo.text}</p>
                                <p>Answered:</p>
                                <p>{answeredQuestion[1]}</p>
                            </li>
                        ))
                    }
                </ul>
                <h2>Unanswered</h2>
                <ul>
                    {
                        unansweredQuestions.map((unansweredQuestion) => (
                            <li key={unansweredQuestion.id}>
                                <p>Would you rather:</p>
                                <p>{unansweredQuestion.optionOne.text}</p>
                                <p>or</p>
                                <p>{unansweredQuestion.optionTwo.text}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authedUserId, questions, users } = state
    return { authedUserId, questions, users }
}

export default connect(mapStateToProps)(Dashboard)
