import React from 'react'
import AuthorAsks from './AuthorAsks'

export default function ImageWithContent(props) {

    const {name, avatarURL, label, children} = props

    return <div className="questionContainer">
        <AuthorAsks
            author={{name, avatarURL}} label={label}
        />
        <div className="question"> 
            <div className="containerWithTextOnTheLeft">{children}</div>
        </div>
    </div>
}
