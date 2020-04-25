import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSignedInUser } from '../actions/authedUser'

class SignIn extends Component {

    state = {
        authedUserId: this.props.firstUser
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
        console.log(userKeys)
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
                    <button type='submit' onSubmit={this._handleSubmit}>Sign in with selected user</button>
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
    var firstUser = (users !== undefined && users.length > 0) ? users[Object.keys(users)[0]] : null
    return {
        firstUser,
        users
    }
}

export default connect(mapStateToProps)(SignIn)
