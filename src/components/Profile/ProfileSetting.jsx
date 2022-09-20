import React from 'react';
import { useNavigate } from 'react-router-dom';
import AvatarEditor from 'react-avatar-editor';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserContext } from '../../context/UserContext';
import Header from '../Header/Header';
import ProfileAvatar from './ProfileAvatar';
import './ProfileSetting.css';
import { CameraAltOutlined } from '@mui/icons-material';
import useStorage from '../../hooks/useStorage';

const ProfileSetting = () => {
    const navigate = useNavigate();

    const { user } = React.useContext(UserContext);

    const [inputs, setInputs] = React.useState({
        name: user.displayName,
        bio: user.bio,
        location: user.location,
        website: user.website,
        birthDate: user.birthDate,
        uploadPhoto: ""
    });

    const { url, setUrl, progress, error } = useStorage("user_images", inputs.uploadPhoto);

    const inputeElements = [
        {
            label: {
                htmlFor: "uploadCoverPhoto",
                text: ""
            },
            input: {
                type: "file",
                id: "uploadCoverPhoto",
            }
        },
        {
            label: {
                htmlFor: "uploadAvatar",
                text: ""
            },
            input: {
                type: "file",
                id: "uploadAvatar",
            }
        },
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
        await updateDoc(doc(db, "users", user.uid), {
            displayName: inputs.name,
            bio: inputs.bio,
            location: inputs.location,
            website: inputs.website,
            birthDate: inputs.birthDate,
        })

        alert(`Successfully saved ${inputs.name}'s profile`);
        navigate(-1)
    };

    const handleChangeInput = (event) => {
        const id = event.target.id;

        setInputs((prev) => ({
            ...prev,
            [id]: event.target.value
        }))
    };

    const handleChangeFile = async (event, inputId) => {
        let selected = event.target.files[0];
        let types = ['image/png', 'image/jpeg'];

        if (inputId === "uploadCoverPhoto") {
            if (selected && types.includes(selected.type)) {
                setInputs((states) => ({
                    ...states,
                    uploadPhoto: selected
                }))

                await updateDoc(doc(db, "users", user.uid), {
                    coverPhoto: url
                })

                setUrl("");
                setInputs((states) => ({
                    ...states,
                    uploadPhoto: ""
                }));

            }
            else {
                setInputs((states) => ({
                    ...states,
                    uploadPhoto: ""
                }))

                alert('Please select an image file (png or jpg)');
            }
        }
        else {
            if (selected && types.includes(selected.type)) {
                setInputs((states) => ({
                    ...states,
                    uploadPhoto: selected
                }))

                await updateDoc(doc(db, "users", user.uid), {
                    avatar: url
                })

                setUrl("");
                setInputs((states) => ({
                    ...states,
                    uploadPhoto: ""
                }));

            }
            else {
                setInputs((states) => ({
                    ...states,
                    uploadPhoto: ""
                }))

                alert('Please select an image file (png or jpg)');
            }
        }
    };

    const handleEditMedia = () => {

    };

    return (
        <div className="profile_setting">
            <div className="profile_setting_wrapper" onClick={() => navigate(-1)}></div>
            {
                url ? <div className="profile_setting_modal edit_media">
                    <Header showBackIcon headerText="Edit media" buttonText="Apply" onClick={handleEditMedia} />

                    {/* <div className="edit_media_wrapper">
                        <figure className='edit_media_figure'>
                            <img src={url} alt="" />
                            <div className="crop_wrapper"></div>
                        </figure>
                    </div> */}

                    <AvatarEditor
                        image={url}
                        className="avatar_editor"
                    />

                </div> : <div className="profile_setting_modal">
                    <Header showBackIcon headerText="Edit profile" buttonText="Save" onClick={handleEditProfile} />

                    <div className="profile_hero">
                        <figure className="cover_photo edit_cover" style={{ backgroundImage: `url(${user.coverPhoto})` }}>
                            <div className='avatar_overlay'>
                                <label htmlFor='uploadCoverPhoto'>
                                    <CameraAltOutlined />
                                </label>
                            </div>
                        </figure>
                        <ProfileAvatar src={user.avatar} alt={user.displayName} showBorder size="profile_avatar_lg" className="profile_image" editAvatar />
                    </div>

                    <form action="POST">
                        {
                            inputeElements.map(({ label, input }) => (
                                <div className={`form_group ${input.type === "file" && "file_wrapper"}`} key={input.id}>
                                    <label htmlFor={label.htmlFor} className="form_label">{label.text}</label>
                                    {
                                        !(input.className === "textarea") ? <input
                                            type={input.type}
                                            id={input.id}
                                            className="form_control"
                                            value={inputs[input.id]}
                                            onChange={input.type === "file" ? (event) => (handleChangeFile(event, input.id)) : handleChangeInput}
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
            }
        </div>
    )
}

export default ProfileSetting