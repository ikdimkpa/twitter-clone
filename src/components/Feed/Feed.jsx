import React, { useEffect, useContext } from 'react'
import './Feed.css'
import FlipMove from 'react-flip-move'
import TweetBox from './TweetBox'
import Loader from '../Loader/Loader'
import Post from './Post'
import { db } from '../../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { UserContext } from '../../context/UserContext'

const Feed = () => {
  const { user, state: { posts }, dispatch } = useContext(UserContext);

  const collectionRef = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(collectionRef, snapshot => {
      dispatch({
        type: 'POSTS',
        payload: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      })
    })

    document.title = "Home / Twitter";

  }, []);

  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Home</h2>
      </div>

      <TweetBox
        user={user}
        text="Tweet"
        placeholder="What's happpening?" />

      <div className="more_tweets">
        <span>Show 405 Tweets</span>
      </div>

      <FlipMove>
        {
          posts ? posts.map(post => (
            <Post
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

    </div>
  )
}

export default Feed;