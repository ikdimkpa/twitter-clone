import React from 'react'
import './Compose.css'
import Header from '../Header/Header'
import TweetBox from './TweetBox'

const Compose = () => {
    return (
        <div className="wrapper">
            <div className="compose">
                <div className="compose_wrapper">
                    <div className="compose_modal">
                        <Header showCloseIcon />
                        <TweetBox
                            text="Tweet"
                            compose
                            placeholder="What's happpening?" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Compose