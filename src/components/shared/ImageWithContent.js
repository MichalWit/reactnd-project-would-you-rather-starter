import React from 'react'

function LabeledImage(props) {

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

export default function ImageWithContent(props) {

    const {name, avatarURL, label, children} = props

    return <div className="outer">
        <div class="middle">
            <LabeledImage
                author={{name, avatarURL}} label={label}
            />
            <div className="pollInnerRight"> 
                {children}
            </div>
        </div>
    </div>
}
