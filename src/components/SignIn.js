import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setSignedInUser } from '../actions/authedUser'
import ImageWithContent from './shared/ImageWithContent'

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

    _resolveUserData = (selectedUser) => {
        if (selectedUser !== undefined) {
            return {
                name: selectedUser.name,
                avatarURL: selectedUser.avatarURL,
                label: ""
            }
        } else {
            return {
                name: "",
                avatarURL: "http://localhost:3000/avatars/unknown.svg",
                label: "User is not selected"
            }
        }
    }

    render() {
        const { users } = this.props
        const selectedUser = users[this.state.selectedUserId]
        const userData = this._resolveUserData(selectedUser)
        return (
            <div>
                <div>
                    <ImageWithContent
                        name={userData.name}
                        avatarURL={userData.avatarURL}
                        imageLabel={userData.label}
                        rightPanelLabel="Please choose a user"
                    >
                        <div className='genericCenterContainer'>
                            <form onSubmit={this._handleSubmit}>
                                <div>
                                    <select onClick={this._handleChange}>
                                        {
                                            Object.values(users).map((user) => (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <button
                                    type='submit'
                                    onSubmit={this._handleSubmit}
                                    disabled={this.state.selectedUserId===null}
                                    className='btn'
                                >Sign in</button>
                            </form>
                        </div>
                    </ImageWithContent>
                </div>
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
