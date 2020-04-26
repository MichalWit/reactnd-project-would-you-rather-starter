import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSignedInUser } from '../actions/authedUser'

function NavTab(props) {
    return <div className='navTab'>{props.label}</div>
}

class NavUserSection extends React.Component {

    _handlSignOut = (e) => {
        this.props.dispatch(setSignedInUser(null))
    }

    render() {
        return <div className='navUserSection'>
            <span>Hi {this.props.authedUserId}  </span>
            <span className='logOutBtn' onClick={this._handlSignOut}>(Log out)</span>
        </div>
    }
}

class Nav extends Component {

    render() {
        return (
            <div className='nav'>
                <Link to='/'><NavTab label='Dashboard'/></Link>
                <Link to='/newquestion'><NavTab label='new question'/></Link>
                <Link to='/leaderboard'><NavTab label='leader board'/></Link>
                <NavUserSection 
                    authedUserId={this.props.authedUserId}
                    dispatch={this.props.dispatch}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authedUserId: state.authedUserId
    }
}

export default connect(mapStateToProps)(Nav)
