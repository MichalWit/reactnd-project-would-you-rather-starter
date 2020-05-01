import React from 'react'
import AuthorAsks from './AuthorAsks'

export default function ImageWithContent(props) {

    const {name, avatarURL, children} = props

    return <div className="questionContainer">
        <AuthorAsks
            author={{name, avatarURL}}
        />
        <div className="question"> 
            {children}
        </div>
    </div>
}
