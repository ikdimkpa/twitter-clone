import React from 'react';
import { NavLink, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { Badge, CalendarMonth, LinkOutlined, LocationOnOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import Header from '../components/Header/Header';
import ProfileAvatar from '../components/Profile/ProfileAvatar';
// import { UserContext } from '../context/UserContext';
import './Styles/Profile.css';
import { doesUsernameExist, getDocsByUsername } from '../services/firebase';
import Loader from '../components/Loader/Loader';

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    // const { user } = React.useContext(UserContext);

    const [userDocs, setUserDocs] = React.useState(null);

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

    const months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"];

    React.useEffect(() => {
        const getUserDocs = async (username) => {
            let usernameExist = await doesUsernameExist(username);

            if (usernameExist) {
                let result = await getDocsByUsername(username);
                setUserDocs(result);
            }
            else {
                if (window.alert(`${username} does not exist\nGo back to home page`)) {
                    navigate("/");
                }
            }
        }

        getUserDocs(username);

        if (userDocs) {
            document.title = `${userDocs.displayName.split(" ")[0]} (@${userDocs.username}) / Twitter`;
            console.log(userDocs.displayName)
        }

    }, []);

    return (
        <div className='wrapper profile'>
            {
                userDocs ? <>
                    <Header showBackIcon headerText={`${userDocs.displayName}`} />

                    <div className="profile_wrapper">
                        <div className="profile_hero">
                            <figure className="cover_photo" style={{ backgroundImage: `url(${userDocs.coverPhoto})` }}>
                            </figure>
                            <ProfileAvatar src={userDocs.avatar} alt={userDocs.displayName} showBorder size="profile_avatar_lg" className="profile_image" />
                        </div>

                        <div className="profile_info">
                            <Link to="settings" className="profile_edit_link">
                                <Button variant='outlined' className="profile_edit">Edit Profile</Button>
                            </Link>

                            <div className="profile_doc">
                                <h2>{userDocs.displayName}</h2>
                                <span>@{userDocs.username}</span>
                            </div>

                            <p className="profile_bio">{userDocs.bio}</p>

                            <div className='profile_list'>
                                <span><Badge /> {userDocs.category}</span>
                                <span><LocationOnOutlined /> {userDocs.location}</span>
                                <span><LinkOutlined /> <a href={`${userDocs.website}`} target="_blank">{userDocs.website}</a></span>
                                <span><CalendarMonth /> Joined {`${months[new Date(userDocs.createdAt.toDate()).getMonth()]} ${new Date(userDocs.createdAt.toDate()).getFullYear()}`}</span>
                            </div>

                            <div className="profile_follow">
                                {
                                    userDocs.following.length >= 0 && <p>{userDocs.following.length} <span>Following</span></p>
                                }
                                {
                                    userDocs.followers.length >= 0 && <p>{userDocs.followers.length} <span>Followers</span></p>
                                }
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
                </> : <Loader />
            }
        </div>
    )
}

export default Profile