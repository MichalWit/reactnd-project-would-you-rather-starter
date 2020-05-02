import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageWithContent from './shared/ImageWithContent'

class LeaderBoard extends Component {

    render() {
        const { users } = this.props
        const sortedUsersWithScores =
            Object.values(users)
                .map((user) => {
                    const questions = user.questions.length
                    const answers = Object.keys(user.answers).length
                    const sum = questions + answers
                    return {
                        score: {
                            sum,
                            questions,
                            answers,
                        },
                        user
                    }
                }
                )
                .sort((userA, userB) => (userB.score.sum - userA.score.sum))
        return (
            <ul>
                {
                    sortedUsersWithScores.map(({score, user}) => (
                        <li key={user.id}>
                            <ImageWithContent
                                name={user.name}
                                avatarURL={user.avatarURL}
                                label="asks"
                            >
                                <div>score: {score.sum}</div>
                                <div>questions: {score.questions}</div>
                                <div>answers: {score.answers}</div>
                            </ImageWithContent>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

export default connect((store) => ({users: store.users}))(LeaderBoard)
