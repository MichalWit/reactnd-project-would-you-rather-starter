import React, { Component } from 'react'
import { connect } from 'react-redux'

class Poll extends Component {

    render() {
        return (
            <div>
                <p style={{background: "red"}}>Poll</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { authedUserId, questions, users } = state
    return { authedUserId, questions, users }
}

export default connect(mapStateToProps)(Poll)
