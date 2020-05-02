import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSignedInUser } from '../actions/authedUser'

function NavTab(props) {
    return <div className='navTab'>{props.label}{props.children}</div>
}

class NavUserSection extends React.Component {

    _handlSignOut = (e) => {
        this.props.dispatch(setSignedInUser(null))
    }

    render() {
        return <div className='navUserSection'>
                <div className="centerContainerElement">
                    <span>Hi {this.props.authedUser.name}  </span>
                </div>
                <div className="centerContainerElement">
                    <img
                        src={this.props.authedUser.avatarURL}
                        alt={`Avatar of name ${this.props.authedUser.name}`}
                        className="avatar miniAvatar verticalAlignMiddle"
                    />
                </div>
                <div className="centerContainerElement">
                    <span className='logOutBtn' onClick={this._handlSignOut}><button className='btn'>Log out</button></span>
                </div>
        </div>
    }
}

function mapStateToProps(state) {
    const authedUser = state.users[state.authedUserId]
    return {
        authedUser
    }
}

const ConnectedNavUserSection = connect(mapStateToProps)(NavUserSection)

class Nav extends Component {

    render() {
        return (
            <div className='nav'>
                <div className="centerContainerElement">
                    <Link to='/'><NavTab label='Dashboard'/></Link>
                </div>
                <div className="centerContainerElement">
                    <Link to='/add'><NavTab label='new question'/></Link>
                </div>
                <div className="centerContainerElement">
                    <Link to='/leaderboard'><NavTab label='leader board'/></Link>
                </div>
                <ConnectedNavUserSection/>
            </div>
        )
    }
}

export default Nav
