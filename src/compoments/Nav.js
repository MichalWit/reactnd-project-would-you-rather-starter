import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Nav extends Component {

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
                    <Link to='/signin'>Log out</Link>
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
