import React from 'react'
import TwitterIcon from '@mui/icons-material/Twitter'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import MessageIcon from '@mui/icons-material/Message'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

import { Button } from '@mui/material'
import SidebarOption from './SidebarOption'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_wrapper">
        <div className="sidebar_twitterIcon">
          <TwitterIcon />
        </div>

        <SidebarOption path="/" Icon={HomeIcon} text="Home" />
        <SidebarOption path="/explore" Icon={SearchIcon} text="Explore" />
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
        <SidebarOption Icon={MessageIcon} text="Messages" />
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        <SidebarOption Icon={ListAltIcon} text="Lists" />
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        <SidebarOption Icon={MoreHorizIcon} text="More" />

        <Button className='sidebar_tweet' fullWidth>
          Tweet
        </Button>
      </div>
    </div>
  )
}

export default Sidebar