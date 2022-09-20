import React from 'react';
import { Avatar } from '@mui/material';
import './ProfileAvatar.css';
import { CameraAltOutlined } from '@mui/icons-material';

const ProfileAvatar = ({ src, alt, showBorder, size, className, editAvatar }) => {

    return (
        <div className={`profile_avatar ${showBorder && "profile_avatar_border"} ${size && size} ${className && className} ${editAvatar && "edit_avatar"}`}>
            <Avatar src={src} alt={alt} />
            {
                editAvatar && <div className='avatar_overlay'>
                    <label htmlFor='uploadAvatar'>
                        <CameraAltOutlined />
                    </label>
                </div>
            }
        </div>
    )
}

export default ProfileAvatar