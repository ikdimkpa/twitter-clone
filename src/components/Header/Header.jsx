import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownwardOutlined } from '@mui/icons-material';
import './Header.css';
import ProfileAvatar from '../Profile/ProfileAvatar';
import { UserContext } from '../../context/UserContext';
import { Button } from '@mui/material';

const Header = ({ showBackIcon, headerText, profile, showButton, onClick }) => {
    const { user } = React.useContext(UserContext);

    return (
        <div className="wrapper_header">
            {
                profile && <Link to={`/${user.username}`}><ProfileAvatar src={user.avatar} alt={user.displayName} className="header_profile_avatar" /></Link>
            }

            {
                showBackIcon && <Link to={- 1} className="wrapper_header_back" >
                    <ArrowDownwardOutlined />
                </Link>
            }
            <h2>{headerText}</h2>

            {
                showButton && <Button variant='outlined' className="header_btn" onClick={onClick}>Save</Button>
            }
        </div>
    )
}

export default Header