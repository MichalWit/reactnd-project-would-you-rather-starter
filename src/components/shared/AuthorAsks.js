import React from 'react'

export default function AuthorAsks(props) {

    const {author, label} = props
    
    return (
        <div className="pollInnerLeft">
            <div>{author.name} {label}:</div>
            <img
                src={author.avatarURL}
                alt={`Avatar of name ${author.name}`}
                className='avatar mediumAvatar'
            />
        </div>
    )
}
