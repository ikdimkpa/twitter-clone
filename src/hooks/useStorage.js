import { useState, useEffect } from "react"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        const storageRef = ref(storage, `/post_images/${file.name}`)
        const collectionRef = collection(db, "temp_post_images")

        uploadBytesResumable(storageRef, file)
            .on("state_changed", (snapshot) => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgress(progress);
            }, (err) => {
                setError(err);
            }, async () => {
                const url = await getDownloadURL(storageRef);
                setUrl(url)
                await addDoc(collectionRef, { url });
            }
            )
    }, [file]);

    return { progress, url, setUrl, error }
}

export default useStorage;