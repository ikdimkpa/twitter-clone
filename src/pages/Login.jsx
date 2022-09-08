import React from 'react'
import { Google, Twitter } from '@mui/icons-material';
import { Button } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, db } from '../firebase'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate()

    const signInWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const user = result.user;

                sessionStorage.setItem('authToken', credential?.accessToken)

                sessionStorage.setItem('username', user.email.split('@')[0]);
                sessionStorage.setItem('displayName', user.displayName);
                sessionStorage.setItem('photoURL', user.photoURL);

                // addDoc(collection(db, "users"), {
                //     displayName: user.displayName,
                //     email: user.email,
                //     photoURL: user.photoURL
                // })

                if (sessionStorage.getItem('authToken')) {
                    navigate("/");
                }
                else {
                    navigate("/login");
                }

            })
        // .catch(error => {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.email;
        //     // The AuthCredential type that was used.
        //     const credential = GoogleAuthProvider.credentialFromError(error);
        //     console.log({ errorCode, errorMessage, email, credential });
        // })
    }

    useEffect(() => {
        signInWithGoogle()
    }, []);

    if (sessionStorage.getItem('authToken')) {
        navigate("/");
    }
    else {
        navigate("/login");
    }

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