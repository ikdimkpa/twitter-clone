import React from 'react'
import { Search } from '@mui/icons-material'
import './Styles/Explore.css'
import Trends from '../components/Widgets/Trends'
import Tweets from '../components/Feed/Tweets'

const Explore = () => {
    React.useEffect(() => {
        document.title = "Explore / Twitter";
    }, []);

    return (
        <div className="wrapper explore">
            <div className="explore_header">
                <div className="explore_input">
                    <Search className='explore_searchIcon' />
                    <input type="text" placeholder='Search Twitter' />
                </div>
            </div>

            <div className='explore_wrapper'>
                <figure>
                    <img src="/images/event.jfif" alt="" />
                </figure>

                <div className="explore_trends">
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

                <div className='explore_trends'>
                    <h2>Random Tweets</h2>
                    <Tweets />
                </div>
            </div>
        </div>
    )
}

export default Explore