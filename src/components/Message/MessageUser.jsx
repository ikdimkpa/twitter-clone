import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './MessageUser.css'

const MessageUser = ({ path, avatar, displayName, username, lastMessage }) => {
  return (
    <Link to={path} className="message_user">
      <Avatar src={avatar} alt="" />
      <div className="message_user_info">
        <div>
          <strong>{displayName}</strong>
          <small>@{username}</small>
        </div>
        <small>{lastMessage}</small>
      </div>
    </Link>
  )
}

export default MessageUser