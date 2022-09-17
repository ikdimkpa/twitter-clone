import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Badge, CalendarMonth, Link, LocationOnOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Header from '../components/Header/Header';
import ProfileAvatar from '../components/Profile/ProfileAvatar';
import { UserContext } from '../context/UserContext';
import './Styles/Profile.css';

const Profile = () => {
    const { username } = useParams();
    const { user } = React.useContext(UserContext);

    const profile_lists = [
        {
            pathname: "tweets",
            text: "Tweets"
        },
        {
            pathname: "with_replies",
            text: "Tweets & Replies"
        },
        {
            pathname: "media",
            text: "Media"
        },
        {
            pathname: "likes",
            text: "Likes"
        }
    ];

    React.useEffect(() => {
        

        document.title = `${user.displayName.split(" ")[0]} (@${username}) / Twitter`;
    }, []);

    return (
        <div className='wrapper profile'>
            <Header showBackIcon headerText={`${user.displayName}`} />

            <div className="profile_wrapper">
                <div className="profile_hero">
                    <figure className="cover_photo" style={{ backgroundImage: "url('/images/event.jfif')" }}>
                    </figure>
                    <ProfileAvatar showBorder size="profile_avatar_lg" className="profile_image" />
                </div>

                <div className="profile_info">
                    <Button variant='outlined' className="profile_edit">Edit Profile</Button>

                    <div className="profile_user">
                        <h2>{user.displayName}</h2>
                        <span>{user.username}</span>
                    </div>

                    <p className="profile_bio">Do you love coding? Learn computing with #TechSheet. We'll tweet in the tech field to help educate, inform our diverse audience in the journey of programming.
                    </p>

                    <div className='profile_list'>
                        <span><Badge /> Information Technology Company</span>
                        <span><LocationOnOutlined /> United States</span>
                        <span><Link /> <a href="https://tech-sheet.blogspot.com" target="_blank">tech-sheet.blogspot.com</a></span>
                        <span><CalendarMonth /> Joined September 2021</span>
                    </div>

                    <div className="profile_follow">
                        <p>269 <span>Following</span></p>
                        <p>69 <span>Followers</span></p>
                    </div>
                </div>

                <div className="profile_nav">
                    <ul>
                        {
                            profile_lists.map(({ pathname, text }) => (
                                <li key={text}>
                                    <NavLink
                                        to={pathname}
                                        className={({ isActive }) => (`${isActive && "profile_nav_active"}`)}>
                                        <span>{text}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <Outlet />
            </div>
        </div>
    )
}

export default Profile