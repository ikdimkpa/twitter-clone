import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";

import { auth, db } from "../config/firebase";
import { doesUsernameExist } from "../services/firebase";
import TwitterLoading from "../components/Loader/TwitterLoading";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const stateChanged = async (user) => {
                localStorage.setItem('authToken', user.accessToken);
                localStorage.setItem('username', user.email.split('@')[0]);

                let usernameExist = await doesUsernameExist(user.email.split('@')[0]);

                if (!usernameExist) {
                    try {
                        addDoc(collection(db, "users"), {
                            displayName: user.displayName,
                            username: user.email.split('@')[0],
                            email: user.email,
                            avatar: user.photoURL,
                            createdAt: serverTimestamp()
                        })
                    } catch (error) {
                        console.log(error.message)
                    }
                }
            }

            return stateChanged(user);
        });

        getDocs(query(collection(db, "users"), where("username", "==", localStorage.getItem('username'))))
            .then(result => {
                result.docs.map(doc => (setUser({ ...doc.data(), uid: doc.id })))
            });

    }, []);

    return (
        <>
            {
                user ? <UserContext.Provider value={{ user, auth }}>
                    {children}
                </UserContext.Provider> : <TwitterLoading />
            }
        </>
    );
};

export default UserProvider;