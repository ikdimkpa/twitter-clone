import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'
import { Button } from '@mui/material'
import { Twitter, Home, Search, NotificationsNone, Message, BookmarkBorder, ListAlt, PermIdentity, MoreHoriz, Logout, Edit } from '@mui/icons-material/';

import './Sidebar.css'
import SidebarOption from './SidebarOption'
import { UserContext } from '../../context/UserContext'

const Sidebar = () => {
  const navigate = useNavigate()

  const { user, auth } = React.useContext(UserContext);

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
        <Link to="/home" className="sidebar_twitterIcon">
          <Twitter />
        </Link>

        <SidebarOption path="/home" Icon={Home} text="Home" />
        <SidebarOption path="/explore" Icon={Search} text="Explore" />
        <SidebarOption Icon={NotificationsNone} text="Notifications" />
        <SidebarOption path="/messages" Icon={Message} text="Messages" />
        <SidebarOption Icon={BookmarkBorder} text="Bookmarks" />
        <SidebarOption Icon={ListAlt} text="Lists" />
        <SidebarOption path={`/${user.username}`} Icon={PermIdentity} text="Profile" />
        <SidebarOption Icon={MoreHoriz} text="More" />
        <SidebarOption Icon={Edit} className="sidebar_tweet_mobile" onClick={() => document.querySelector('.input').focus()} />

        <Button className='sidebar_tweet' fullWidth onClick={() => document.querySelector('.input').focus()}>
          Tweet
        </Button>

        <SidebarOption className="logoutBtn" Icon={Logout} text="Log Out" onClick={handleLogOut} />
      </div>
    </div>
  )
}

export default Sidebar