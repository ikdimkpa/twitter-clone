import React from 'react'
import { PhotoOutlined, GifBoxOutlined, PollOutlined, EmojiEmotionsOutlined, CalendarTodayOutlined, LocationOnOutlined } from '@mui/icons-material'
import { Button } from '@mui/material'
import './TweetBox.css'

import { addDoc, collection, Timestamp } from 'firebase/firestore'
import useStorage from '../../hooks/useStorage'
import { db } from '../../config/firebase'
import ProfileAvatar from '../Profile/ProfileAvatar'
import { UserContext } from '../../context/UserContext'

const TweetBox = ({
  text,
  postId,
  placeholder }) => {
  const { user } = React.useContext(UserContext);

  const [tweetText, setTweetText] = React.useState('')
  const [tweetImage, setTweetImage] = React.useState('')

  const { url, setUrl } = useStorage(tweetImage)

  const handleTweetText = (e) => {
    if (e.target.value.length <= 280) {
      setTweetText(e.target.value);

      let numberOfLineBreaks = (tweetText.match(/\n/g) || []).length;
      let newHeight = 25 + numberOfLineBreaks * 25 + 2;
      e.target.style.height = `${newHeight}px`;
    }
  }

  const sendTweet = (e, text) => {
    e.preventDefault();

    if (text === "Tweet") {
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
    }

    if (text === "Reply") {
      const collectionRef = collection(db, "comments");

      addDoc(collectionRef, {
        postId,
        displayName: user.displayName,
        username: user.username,
        verified: true,
        text: tweetText,
        avatar: user.photoURL,
        createdAt: Timestamp.now()
      });
    }

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
    <>
      <div className="tweet_box">
        {
          text == "Tweet" && <>
            <ProfileAvatar src={user.avatar} alt={user.displayName} />

            <form className="tweet_box-wrapper" onSubmit={(e) => sendTweet(e, text)}>
              <textarea
                className='input'
                value={tweetText}
                onChange={handleTweetText}
                placeholder={placeholder}
                required >
              </textarea>

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

                  <PollOutlined className="tweet_disabled_icon" />
                  <EmojiEmotionsOutlined className="tweet_disabled_icon" />
                  <CalendarTodayOutlined className="tweet_disabled_icon" />
                  <LocationOnOutlined className="tweet_disabled_icon" />
                </div>

                <div>
                  {
                    tweetText && <div style={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "100px" }}>
                      <div style={{ width: "50px", background: "var(--twitter-background)", height: "5px", borderRadius: "5px" }}>
                        <div style={{ width: `${(tweetText.length / 280) * 100}%`, background: `${tweetText.length >= 260 ? "orange" : "var(--twitter-color)"}`, height: "5px", borderRadius: "5px" }}></div>
                      </div>
                      {
                        tweetText.length >= 260 && <div>{280 - tweetText.length}</div>
                      }
                    </div>
                  }
                </div>

                <Button
                  className='tweet_box-button'
                  type="submit"
                >
                  {text}
                </Button>
              </div>
            </form>
          </>
        }

        {
          text == "Reply" && <>
            <ProfileAvatar src={user.avatar} alt={user.displayName} />

            <form className="tweet_box-wrapper comment_input" onSubmit={(e) => sendTweet(e, text)}>
              <input
                type="text"
                className='input'
                id='input'
                value={tweetText}
                onChange={(e) => setTweetText(e.target.value)}
                placeholder={placeholder}
                required />

              <Button
                className='tweet_box-button'
                type="submit"
              >
                {text}
              </Button>
            </form>
          </>
        }
      </div>

    </>
  )
}

export default TweetBox