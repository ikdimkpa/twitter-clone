import React from 'react'
import './Styles/Home.css'
import TweetBox from '../components/Feed/TweetBox'
import Header from '../components/Header/Header'
import Tweets from '../components/Feed/Tweets'

const Feed = () => {
  React.useEffect(() => {
    document.title = "Home / Twitter";
  }, []);

  return (
    <div className="wrapper feed">
      <Header headerText="Home" profile />

      <TweetBox
        text="Tweet"
        placeholder="What's happpening?" />

      <div className="more_tweets">
        <span>Show 405 Tweets</span>
      </div>

      <Tweets />

    </div>
  )
}

export default Feed;