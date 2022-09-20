import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Google, Twitter } from '@mui/icons-material';
import { Button } from '@mui/material';
import { auth, db } from '../config/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import './Styles/Login.css'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { doesUsernameExist } from '../services/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();

    // const { user } = useContext(UserContext);

    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider)
            .then(result => {
                const stateChanged = async (authUser) => {
                    localStorage.setItem('authToken', authUser.accessToken);
                    localStorage.setItem('username', authUser.email.split('@')[0]);

                    let usernameExist = await doesUsernameExist(authUser.email.split('@')[0]);

                    if (!usernameExist) {
                        try {
                            addDoc(collection(db, "users"), {
                                bio: "",
                                birthDate: "",
                                category: "",
                                coverPhoto: "",
                                followers: [],
                                following: [],
                                location: "",
                                website: "",
                                displayName: authUser.displayName,
                                username: authUser.email.split('@')[0],
                                email: authUser.email,
                                avatar: authUser.photoURL,
                                createdAt: serverTimestamp()
                            })
                        } catch (error) {
                            console.log(error.message)
                        }
                    }
                }

                stateChanged(result.user);
            })
            .catch(err => {
                console.log(err.message)
            })

        navigate(-1)
    }

    React.useEffect(() => {
        if (localStorage.getItem('authToken')) {
            navigate("/");
        }

        document.title = "Login / Twitter"
    }, []);

    return (
        <div className="login">
            <div className="login_wrapper">
                <Twitter className="login_twitter_icon" />
                <Button className="login_button" onClick={signInWithGoogle}><Google /> Sign in with <strong>Google</strong></Button>
            </div>
        </div>
    );
}

export default Login