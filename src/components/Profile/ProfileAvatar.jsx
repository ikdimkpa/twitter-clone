import React from 'react';
import { Avatar } from '@mui/material';
import './ProfileAvatar.css';

const ProfileAvatar = ({ src, alt, showBorder, size, className }) => {

    return (
        <div className={`profile_avatar ${showBorder && "profile_avatar_border"} ${size && size} ${className && className}`} >
            <Avatar src={src} alt={alt} />
        </div>
    )
}

export default ProfileAvatar