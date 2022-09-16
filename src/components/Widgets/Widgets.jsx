import React from 'react'
import { Search } from '@mui/icons-material'
import Trends from './Trends'
import Suggestions from './Suggestions'
import './Widgets.css'

const Widgets = () => {

  return (
    <div className='widgets'>
      <div className="widgets_container">

        <div className='widgets_header'>
          <div className="widgets_input">
            <Search className='widgets_searchIcon' />
            <input type="text" placeholder='Search Twitter' />
          </div>
        </div>

        <div className="widgets_wrapper">
          <div className="widgets_trends">
            <h2>Trends for you</h2>
            <Trends category="" text="Tailwind" tweetNumber="1,167" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Technology" text="Mark ZuckerBurg" tweetNumber="180" />
            <Trends category="Trending in Bangladesh" text="#blockchain" tweetNumber="68" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <Trends category="Frontend" text="ReactJS" tweetNumber="29.1" />
            <div className="trends_show-more">
              Show more
            </div>
          </div>

          <div className="widgets_trends">
            <h2>Who to follow</h2>
            <Suggestions />
            <Suggestions />
            <div className="trends_show-more">
              Show more
            </div>
          </div>

          <div className='widgets_footer'>
            <small>
              <a>Terms of Service</a>
              <a>Privacy Policy</a>
              <a>Cookie Policy</a>
              <a>Accessibility</a>
              <a>Ads info</a>
              <a>More...</a>
            </small>
            <small>&copy; Twitter, Inc.</small>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Widgets