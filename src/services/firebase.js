import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const doesUsernameExist = async (username) => {
    const result = await getDocs(query(collection(db, "users"), where("username", "==", username.toLowerCase())));

    return result.docs.length > 0;
};

export const getDocsByUsername = async (username) => {
    let userDocs = [];

    await getDocs(query(collection(db, "users"), where("username", "==", username.toLowerCase())))
        .then(docSnap => {
            docSnap.docs.map(doc => userDocs.push({ ...doc.data(), id: doc.id }));
        });

    return userDocs[0];
};