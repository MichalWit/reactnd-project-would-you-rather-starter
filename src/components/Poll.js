import React, { Component } from 'react'
import { connect } from 'react-redux'
import AuthorAsks from './shared/AuthorAsks'
import { questionAnswered } from '../actions/questions'

export const OPTIONS = {
    o1: "optionOne",
    o2: "optionTwo"
}

class Poll extends Component {

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
            this.props.dispatch(questionAnswered({authedUserId, questionId, answer}))
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

function mapStateToProps(state, props) {
    const { id } = props.match.params
    const { authedUserId, questions, users } = state
    const question = questions[id]
    const author = users[question.author]
    return {
        authedUserId,
        question,
        author
    }
}

export default connect(mapStateToProps)(Poll)
