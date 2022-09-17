import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Google, Twitter } from '@mui/icons-material';
import { Button } from '@mui/material';
import { auth, db } from '../config/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore';
import './Styles/Login.css'

const Login = () => {
    const navigate = useNavigate()

    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

                localStorage.setItem('authToken', credential?.accessToken)

                localStorage.setItem('username', user.email.split('@')[0]);
                localStorage.setItem('displayName', user.displayName);
                localStorage.setItem('photoURL', user.photoURL);

                addDoc(collection(db, "users"), {
                    displayName: user.displayName,
                    username: user.email.split('@')[0],
                    email: user.email,
                    photoURL: user.photoURL
                })

                navigate(-1);

            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

                // The email of the user's account used.
                const email = error.email;

                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({ errorCode, errorMessage, email, credential });
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