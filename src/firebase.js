// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASMekIE-eJr1bGgr3WcFp7zY4wRz6r_R8",
    authDomain: "twitter-clone-1bd86.firebaseapp.com",
    projectId: "twitter-clone-1bd86",
    storageBucket: "twitter-clone-1bd86.appspot.com",
    messagingSenderId: "1089163948003",
    appId: "1:1089163948003:web:e766c7c326f6b25bebbad6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };