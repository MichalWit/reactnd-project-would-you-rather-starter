import React from 'react'

export default function AuthorAsks(props) {

    const {author, asked} = props
    
    return (
        <div className="question">
            <div>{author.name} {asked ? "asked" : "asks"}:</div>
            <img
                src={author.avatarURL}
                alt={`Avatar of name ${author.name}`}
                className='avatar mediumAvatar'
            />
        </div>
    )
}
