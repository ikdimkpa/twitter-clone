import React from 'react';
import { Avatar } from '@mui/material';
import { UserContext } from '../../context/UserContext';
import './ProfileAvatar.css';

const ProfileAvatar = ({ showBorder, size, className }) => {
    const { user } = React.useContext(UserContext);

    return (
        <div className={`profile_avatar ${showBorder && "profile_avatar_border"} ${size && size} ${className && className}`}>
            <Avatar src={user && user.photoURL} alt={user && user.displayName} />
        </div>
    )
}

export default ProfileAvatar