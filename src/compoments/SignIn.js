import React, { Component } from 'react'

class SignIn extends Component {

    _handleSubmit = (e) => {
        e.preventDefault()

        // TODO: dispatch(handleSignUserIn(authedUser))
    }

    render() {
        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <select>
                        <option value='A'>User A</option>
                        <option value='B'>User B</option>
                        <option value='C'>User C</option>
                    </select>
                    <button onSubmit={this._handleSubmit}>Sign in with selected user</button>
                </form>
            </div>
        )
    }
}

export default SignIn
