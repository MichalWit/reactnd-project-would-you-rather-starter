import React from 'react'
import AuthorAsks from './AuthorAsks'

export default function ImageWithContent(props) {

    const {name, avatarURL, label, children} = props

    return <div className="outer">
        <div class="middle">
            <AuthorAsks
                author={{name, avatarURL}} label={label}
            />
            <div className="pollInnerRight"> 
                {children}
            </div>
        </div>
    </div>
}
