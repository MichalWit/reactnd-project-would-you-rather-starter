import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSignedInUser } from '../actions/authedUser'

class Nav extends Component {

    _handlSignOut = (e) => {
        this.props.dispatch(setSignedInUser(null))
    }

    render() {
        return (
            <div>
                <ul>
                    <Link to='/'>Dashboard</Link>
                    <span>  </span>
                    <Link to='/newquestion'>new question</Link>
                    <span>  </span>
                    <Link to='/leaderboard'>leader board</Link>
                    <span>  </span>
                    <span>Hi {this.props.authedUserId}  </span>
                    <button onClick={this._handlSignOut}>Log out</button>
                </ul>
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
