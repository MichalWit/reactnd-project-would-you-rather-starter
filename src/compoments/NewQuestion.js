import React, { Component } from 'react'

class NewQuestion extends Component {

    state = {
        optionA: '',
        optionB: ''
    }

    _handleOptionAChange = (e) => {
        e.preventDefault()
        this.setState({ optionA: e.target.value })
    }

    _handleOptionBChange = (e) => {
        e.preventDefault()
        this.setState({ optionB: e.target.value })
    }

    _handleSubmit = (e) => {
        e.preventDefault()
        const optionA = this.state.optionA
        const optionB = this.state.optionB
        console.log("Dispatching 'add new question' ", JSON.stringify({optionA, optionB}))
        this.setState({
            optionA: '',
            optionB: ''
        })
        // TODO: dispatch handleAddQuestion({optionA, optionB})
    }

    render() {
        return (
            <div>
                <h2>Create new question</h2>
                <p>Would you rather:</p>
                <form onSubmit={this._handleSubmit}>
                    <textarea
                        value={this.state.optionA}
                        onChange={this._handleOptionAChange}
                    />
                    <p>Or</p>
                    <textarea
                        value={this.state.optionB}
                        onChange={this._handleOptionBChange}
                    />
                    <button
                        onSubmit={this._handleSubmit}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default NewQuestion
