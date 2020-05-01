import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSignedInUser } from '../actions/authedUser'

class SignIn extends Component {

    state = {
        selectedUserId: null,
        selectedUserAvatarURL: "",
        selectedUserName: ""
    }

    _handleChange = (e) => {
        e.preventDefault()

        const selectedUserId = e.target.value
        const selectedUser = this.props.users[selectedUserId]

        this.setState({
            selectedUserId: selectedUser.id,
            avatselectedUserAvatarURLarURL: selectedUser.avatarURL,
            selectedUserName: selectedUser.name
        })
    }

    _handleSubmit = (e) => {
        e.preventDefault()

        this.props.dispatch(setSignedInUser(this.state.selectedUserId))
    }

    render() {
        const { users } = this.props
        const selectedUser = users[this.state.selectedUserId]
        return (
            <div>
                <div>
                    {
                        selectedUser
                            ? <React.Fragment>
                                <div>{selectedUser.name}</div>
                                <img
                                    src={selectedUser.avatarURL}
                                    alt={`Avatar of name ${selectedUser.name}`}
                                    className='mediumAvatar'
                                />
                            </React.Fragment>
                            : <div>User is not selected</div>
                    }
                </div>
                <form onSubmit={this._handleSubmit}>
                    <select onChange={this._handleChange}>
                        {
                            Object.values(users).map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))
                        }
                    </select>
                    <button
                        type='submit'
                        onSubmit={this._handleSubmit}
                        disabled={this.state.selectedUserId===null}
                    >Sign in with selected user</button>
                </form>
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
