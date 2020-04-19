import React, { Component } from 'react'

class Dashboard extends Component {

    render() {
        return (
            <div>
                <h2>Answered</h2>
                <ul>
                    <li>Question 1</li>
                    <li>Question 2</li>
                </ul>
                <h2>Unanswered</h2>
                <ul>
                    <li>Question 3</li>
                    <li>Question 4</li>
                </ul>
            </div>
        )
    }
}

export default Dashboard
