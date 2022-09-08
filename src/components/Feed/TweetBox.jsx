import React from 'react'
import { Avatar } from '@mui/material'
import { PhotoOutlined, GifBoxOutlined, PollOutlined, EmojiEmotionsOutlined, CalendarTodayOutlined, LocationOnOutlined, WhatsApp } from '@mui/icons-material'
import { Button } from '@mui/material'
import './TweetBox.css'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import useStorage from '../../hooks/useStorage'
import { db } from '../../firebase'

const TweetBox = ({ user, text }) => {
  const [tweetText, setTweetText] = React.useState('')
  const [tweetImage, setTweetImage] = React.useState('')

  const { progress, url, setUrl } = useStorage(tweetImage)

  const sendTweet = (e) => {
    e.preventDefault();

    const collectionRef = collection(db, "posts");

    addDoc(collectionRef, {
      displayName: user.displayName,
      username: user.username,
      verified: true,
      text: tweetText,
      image: url,
      avatar: user.photoURL,
      createdAt: Timestamp.now()
    });

    setTweetText('');
    setUrl('');
    setTweetImage('');

  }

  const uploadImage = (e) => {
    let selected = e.target.files[0];
    let types = ['image/png', 'image/jpeg']

    if (selected && types.includes(selected.type)) {
      setTweetImage(selected);
    }
    else {
      setTweetImage('');
      alert('Please select an image file (png or jpg)');
    }
  }

  const uploadGif = (e) => {
    let selected = e.target.files[0];
    let types = ['image/gif']

    if (selected && types.includes(selected.type)) {
      setTweetImage(selected);
    }
    else {
      setTweetImage('');
      alert('Please select gif format');
    }
  }

  return (
    <div className="tweet_box">
      <div className="post_avatar">
        <Avatar src={user && user.photoURL} alt={user && user.displayName} />
      </div>

      <form className="tweet_box-wrapper" onSubmit={sendTweet}>
        <input
          type="text"
          value={tweetText}
          onChange={(e) => setTweetText(e.target.value)}
          placeholder="What's happpening?"
          required />

        {
          tweetImage && <figure className='temp_image'>
            <img src={url} alt={tweetImage.name} />
          </figure>
        }

        <div className="tweet_box-footer">
          <div className="tweet_box-icons">
            <label htmlFor="tweet-image" title='Media'>
              <PhotoOutlined />
              <input type="file" id="tweet-image" onChange={uploadImage} />
            </label>

            <label htmlFor="tweet-gif" title='GIF'>
              <GifBoxOutlined />
              <input type="file" id="tweet-gif" onChange={uploadGif} />
            </label>

            <PollOutlined style={{ pointerEvents: "none", opacity: ".45" }} />
            <EmojiEmotionsOutlined style={{ pointerEvents: "none", opacity: ".45" }} />
            <CalendarTodayOutlined style={{ pointerEvents: "none", opacity: ".45" }} />
            <LocationOnOutlined style={{ pointerEvents: "none", opacity: ".45" }} />
          </div>
          <Button
            className='tweet_box-button'
            type="submit"
          >
            {text}
          </Button>
        </div>
      </form>

    </div>
  )
}

export default TweetBox