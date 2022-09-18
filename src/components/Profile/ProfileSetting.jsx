import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { UserContext } from '../../context/UserContext';
import Header from '../Header/Header';
import ProfileAvatar from './ProfileAvatar';
import './ProfileSetting.css';

const ProfileSetting = () => {
    const navigate = useNavigate();

    const { user } = React.useContext(UserContext);

    const [inputs, setInputs] = React.useState({
        name: user.displayName,
        bio: user.bio,
        location: user.location,
        website: user.website,
        birthDate: user.birthDate
    });

    const inputeElements = [
        {
            label: {
                htmlFor: "name",
                text: "Name"
            },
            input: {
                type: "text",
                id: "name",
            }
        },
        {
            label: {
                htmlFor: "bio",
                text: "Bio"
            },
            input: {
                type: "text",
                id: "bio",
                className: "textarea"
            }
        },
        {
            label: {
                htmlFor: "location",
                text: "Location"
            },
            input: {
                type: "text",
                id: "location",
            }
        },
        {
            label: {
                htmlFor: "website",
                text: "Website"
            },
            input: {
                type: "text",
                id: "website",
            }
        },
        {
            label: {
                htmlFor: "birthDate",
                text: "Birth Date"
            },
            input: {
                type: "date",
                id: "birthDate",
            }
        },
    ]

    const handleEditProfile = async () => {
        await updateDoc(doc(db, "users", user.uid))
            .then(res => {
                alert(res);
                navigate(-1);
            })
            .catch(err => alert(err.message));
    };

    const handleChangeInput = (event) => {
        const id = event.target.id;

        setInputs((prev) => ({
            ...prev,
            [id]: event.target.value
        }))
    };

    return (
        <div className="profile_setting">
            <div className="profile_setting_wrapper" onClick={() => navigate(-1)}></div>
            <div className="profile_setting_modal">
                <Header showBackIcon headerText="Edit profile" showButton onClick={handleEditProfile} />

                <div className="profile_hero">
                    <figure className="cover_photo" style={{ backgroundImage: `url(${user.coverPhoto})` }}>
                    </figure>
                    <ProfileAvatar src={user.avatar} alt={user.displayName} showBorder size="profile_avatar_lg" className="profile_image" />
                </div>

                <form action="POST">
                    {
                        inputeElements.map(({ label, input }) => (
                            <div className="form_group" key={input.id}>
                                <label htmlFor={label.htmlFor} className="form_label">{label.text}</label>
                                {
                                    !(input.className === "textarea") ? <input
                                        type={input.type}
                                        id={input.id}
                                        className="form_control"
                                        value={inputs[input.id]}
                                        onChange={handleChangeInput}
                                    /> : <textarea
                                        id={input.id}
                                        className="form_control"
                                        value={inputs.bio}
                                        onChange={handleChangeInput}
                                    ></textarea>
                                }
                            </div>
                        ))
                    }
                </form>
            </div>
        </div>
    )
}

export default ProfileSetting