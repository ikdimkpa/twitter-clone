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
import { Logout, Edit } from '@mui/icons-material/'

import { Button } from '@mui/material'
import SidebarOption from './SidebarOption'
import './Sidebar.css'

import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  const handleLogOut = () => {
    if (window.confirm("Are you sure?\nYou want Log Out")) {
      signOut(auth);
      navigate("/login");
      localStorage.clear();
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebar_wrapper">
        <div className="sidebar_twitterIcon">
          <TwitterIcon />
        </div>

        <SidebarOption path="/home" Icon={HomeIcon} text="Home" />
        <SidebarOption path="/explore" Icon={SearchIcon} text="Explore" />
        <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
        <SidebarOption path="/messages" Icon={MessageIcon} text="Messages" />
        <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
        <SidebarOption Icon={ListAltIcon} text="Lists" />
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />
        <SidebarOption Icon={MoreHorizIcon} text="More" />
        <SidebarOption Icon={Edit} className="sidebar_tweet_mobile" onClick={() => document.querySelector('.input').focus()} />

        <Button className='sidebar_tweet' fullWidth onClick={() => document.querySelector('.input').focus()}>
          Tweet
        </Button>

        <SidebarOption className="logoutBtn" Icon={Logout} onClick={handleLogOut} />
      </div>
    </div>
  )
}

export default Sidebar