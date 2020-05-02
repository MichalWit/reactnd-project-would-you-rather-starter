import React, { Component } from 'react'
import { handleAddNewQuestion } from '../actions/questions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: ''
    }

    _handleOptionAChange = (e) => {
        e.preventDefault()
        this.setState({ optionOne: e.target.value })
    }

    _handleOptionBChange = (e) => {
        e.preventDefault()
        this.setState({ optionTwo: e.target.value })
    }

    _handleSubmit = (e) => {
        e.preventDefault()
        const optionOne = this.state.optionOne
        const optionTwo = this.state.optionTwo
        this.props.dispatch(handleAddNewQuestion(
            optionOne,
            optionTwo,
            this.props.authedUserId,
            this.props.history
        ))
    }

    render() {
        return (
            <div className="questionContainer newQuestion">
                <h2>Create new question</h2>
                <div>Would you rather:</div>
                <form onSubmit={this._handleSubmit}>
                    <textarea
                        value={this.state.optionOne}
                        onChange={this._handleOptionAChange}
                    />
                    <div>OR</div>
                    <textarea
                        value={this.state.optionTwo}
                        onChange={this._handleOptionBChange}
                    />
                    <div>
                        <button
                            onSubmit={this._handleSubmit}
                            type="submit"
                            className='btn'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect((state) => ({authedUserId: state.authedUserId}))(NewQuestion))
