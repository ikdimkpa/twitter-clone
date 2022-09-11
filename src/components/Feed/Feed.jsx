import React, { useEffect, useState } from 'react'
import './Feed.css'
import FlipMove from 'react-flip-move'
import TweetBox from './TweetBox'
import Loader from '../Loader/Loader'
import Post from './Post'
import { db } from '../../firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

const Feed = ({ setTweetUsername, setCurrentUser }) => {
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState({});

  const collectionRef = query(collection(db, "posts"), orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(collectionRef, snapshot => {
      setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    })
  }, []);

  // useEffect(() => {
  //   onSnapshot(query(collection(db, "users"), where("email", "===", sessionStorage.getItem('email'))), snapshot => {
  //     setUser(snapshot.docs.map(doc => ({ ...doc.data() })));
  //   })
  // }, []);

  useEffect(() => {
    setUser({
      username: sessionStorage.getItem('username'),
      displayName: sessionStorage.getItem('displayName'),
      photoURL: sessionStorage.getItem('photoURL')
    })

  }, []);

  if (user) setCurrentUser(user)

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
              currentUser={user}
              setTweetUsername={setTweetUsername}
            />
          )) : <><Loader /></>
        }
      </FlipMove>

    </div>
  )
}

export default Feed