import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";

import { auth, db } from "../config/firebase";
import TwitterLoading from "../components/Loader/TwitterLoading";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (authUser) => {
            onSnapshot(query(collection(db, "users"), where("username", "==", localStorage.getItem('username'))), snapshot => {
                snapshot.docs.map(doc => (setUser((prev) => ({
                    ...prev,
                    ...doc.data(), uid: doc.id
                }))))

            });
        });

        return unsub;
    }, []);

    return (
        <>
            {
                <UserContext.Provider value={{ user, auth }}>
                    {children}
                </UserContext.Provider>
            }
        </>
    );
};

export default UserProvider;