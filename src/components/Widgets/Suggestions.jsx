import { Avatar, Button } from '@mui/material'
import React from 'react'
import './Suggestions.css'

const Suggestions = () => {
    return (
        <div className="suggestions">
            <figure className='suggested_profile'>
                <Avatar src="" alt="" />
                <div className="suggestions_info">
                    <h3>Display Name</h3>
                    <small>@username</small>
                </div>
            </figure>
            <Button variant className="follow_button">
                Follow
            </Button>
        </div>
    )
}

export default Suggestions