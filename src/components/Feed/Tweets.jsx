import React from 'react';
import { useParams } from 'react-router-dom';
import FlipMove from 'react-flip-move';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Tweet from './Tweet';
import Loader from '../Loader/Loader';
import { AppContext } from '../../context/AppContext';

const Tweets = ({ condition }) => {
    const { state: { posts }, dispatch } = React.useContext(AppContext);

    const { username } = useParams();

    const collectionRef = condition ? query(
        collection(db, "posts"),
        where("username", "==", username),
        orderBy("createdAt", "desc")) : query(
            collection(db, "posts"),
            orderBy("createdAt", "desc"));

    React.useEffect(() => {
        onSnapshot(collectionRef, snapshot => {
            dispatch({
                type: 'POSTS',
                payload: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            })
        })

    }, []);

    return (
        <>
            <FlipMove>
                {
                    posts ? posts.map(post => (
                        <Tweet
                            key={post.text}
                            avatar={post.avatar}
                            displayName={post.displayName}
                            image={post.image}
                            text={post.text}
                            username={post.username}
                            likes={post.likes}
                            liked={post.liked}
                            verified={post.verified}
                            id={post.id}
                        />
                    )) : <><Loader /></>
                }
            </FlipMove>
        </>
    )
}

export default Tweets;