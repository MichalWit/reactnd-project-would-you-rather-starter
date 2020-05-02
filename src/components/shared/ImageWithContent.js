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

    const {name, avatarURL, imageLabel, rightPanelLabel, children} = props

    return <div className="outer">
        <div className="middle">
            <LabeledImage
                author={{name, avatarURL}} label={imageLabel}
            />
            <div className="pollInnerRight"> 
                <div className="dashboardQuestion">
                    <div>
                        <div>{rightPanelLabel ? rightPanelLabel : "Would you rather:"}</div>
                        <hr/>
                        <div>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
