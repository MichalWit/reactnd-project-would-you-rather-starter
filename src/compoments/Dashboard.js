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

class Question extends Component {

    render() {
        const {
            id,
            optionOneText,
            authorAvatarURL,
            authorName
        } = this.props.detailedQuestion

        
        return (
            <li style={{width: "96%", background: "#b3ccff", margin: "2%", padding: 0}}>
                <div style={{display: "inline-block", width: "50%"}}>
                    <p>{authorName} asks:</p>
                    <img
                        src={authorAvatarURL}
                        alt={`Avatar of name ${authorName}`}
                        className='avatar'
                        style={{width:100}}
                    />
                </div>
                <div style={{display: "inline-block", width: "50%"}}> 
                    <p>Would you rather:</p>
                    <p>... {optionOneText} ...</p>
                    <button>View poll</button>
                </div>
            </li>
        )
    }
}

class Questions extends Component {

    render() {
        return (
            <ul>
                {
                    this.props.questions.map((detailedQuestion) => (
                        <Question
                            key={detailedQuestion.id}
                            detailedQuestion={detailedQuestion}
                        />
                    ))
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

    render() {
        const { authedUserId, questions, users } = this.props

        const authedUser = users[authedUserId]
        const answers = authedUser.answers

        const answeredQuestionIds = Object.keys(answers)
        const answeredQuestions = answeredQuestionIds
            .map((id) => questions[id])
            .map((question) => ({
                id: question.id,
                optionOneText: question.optionOne.text,
                authorAvatarURL: users[question.author].avatarURL,
                authorName: users[question.author].name
            }))

        const unansweredQuestions = Object.keys(questions)
            .filter((qId) => answers[qId] === undefined)
            .map((unansweredQuestionId) => questions[unansweredQuestionId])
            .map((question) => ({
                id: question.id,
                optionOneText: question.optionOne.text,
                authorAvatarURL: users[question.author].avatarURL,
                authorName: users[question.author].name
            }))

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
