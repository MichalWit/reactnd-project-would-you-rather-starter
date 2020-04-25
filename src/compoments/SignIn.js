import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSignedInUser } from '../actions/authedUser'

class SignIn extends Component {

    state = {
        authedUserId: null
    }

    _handleChange = (e) => {
        e.preventDefault()

        this.setState({
            authedUserId: e.target.value
        })
    }

    _handleSubmit = (e) => {
        e.preventDefault()

        this.props.dispatch(setSignedInUser(this.state.authedUserId))
    }

    render() {
        const { users } = this.props
        const userKeys = Object.keys(users)
        return (
            <div>
                <form onSubmit={this._handleSubmit}>
                    <select onChange={this._handleChange}>
                        {
                            userKeys.map((userId) => users[userId]).map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))
                        }
                    </select>
                    <button
                        type='submit'
                        onSubmit={this._handleSubmit}
                        disabled={this.state.authedUserId===null}
                    >Sign in with selected user</button>
                </form>
                <ul>
                {
                    userKeys.map((userId) => users[userId]).map((user) => (
                        <li key={user.id}>
                            <p>{user.name}</p>
                            <img
                                src={user.avatarURL}
                                alt={`Avatar of name ${user.name}`}
                                className='avatar'
                            />
                        </li>
                    ))
                }
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { users } = state
    return {
        users
    }
}

export default connect(mapStateToProps)(SignIn)
