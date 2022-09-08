import { MoreHoriz } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import './Trends.css'

const Trends = ({ category, text, tweetNumber }) => {
  return (
    <div className="trends">
      <div className="trends_info">
        <small>{category && `${category} ·`} Trending</small>
        <h3>{text}</h3>
        <small>{tweetNumber}K Tweets</small>
      </div>
      <MoreHoriz className='trends_more_icon' />
    </div>
  )
}

export default Trends