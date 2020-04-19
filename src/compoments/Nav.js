import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {

    render() {
        return (
            <div>
                <ul>
                    <Link to='/'>Dashboard</Link>
                    <span>  </span>
                    <Link to='/signin'>Log out</Link>
                    <span>  </span>
                    <Link to='/newquestion'>new question</Link>
                    <span>  </span>
                    <Link to='/leaderboard'>leader board</Link>
                </ul>
            </div>
        )
    }
}

export default Nav
