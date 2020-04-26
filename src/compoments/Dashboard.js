import React, { Component } from 'react'
import { connect } from 'react-redux'

class Answered extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.answeredQuestions.map((answeredQuestion) => (
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
        )
    }
}

class Unanswered extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.unansweredQuestions.map((unansweredQuestion) => (
                        <li key={unansweredQuestion.id}>
                            <p>Would you rather:</p>
                            <p>{unansweredQuestion.optionOne.text}</p>
                            <p>or</p>
                            <p>{unansweredQuestion.optionTwo.text}</p>
                        </li>
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
        this.setState((currentState) => ({
            answeredDisplayed: !currentState.answeredDisplayed
        }))
    }

    _showAnswered = (e) => {
        this.setState({
            answeredDisplayed: true
        })
    }

    _showUnanswered = (e) => {
        this.setState({
            answeredDisplayed: false
        })
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
            <div>
                <div>
                    <h2 className='answerTab' onClick={this._showAnswered}>Answered</h2>
                    <h2 className='answerTab' onClick={this._showUnanswered}>Unanswered</h2>
                </div>
                {
                    this.state.answeredDisplayed
                        ? <React.Fragment>
                            
                            <Answered
                                authedUserId={authedUserId}
                                answeredQuestions={answeredQuestions}
                                users={users}
                            />
                        </React.Fragment>
                        : <React.Fragment>
                            <Unanswered
                                authedUserId={authedUserId}
                                unansweredQuestions={unansweredQuestions}
                                users={users}
                            />
                        </React.Fragment>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authedUserId, questions, users } = state
    return { authedUserId, questions, users }
}

export default connect(mapStateToProps)(Dashboard)
