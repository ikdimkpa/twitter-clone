import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Google, Twitter } from '@mui/icons-material';
import { Button } from '@mui/material';
import { auth } from '../config/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import './Styles/Login.css'

const Login = () => {
    const navigate = useNavigate()

    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        await signInWithPopup(auth, googleProvider)
            .then(result => {
                navigate(-1)
            })
            .catch(err => {
                console.log(err.message)
            })
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