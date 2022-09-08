import React, { useState, useEffect } from 'react'
import { Search } from '@mui/icons-material'
import './Explore.css'
import Trends from '../Widgets/Trends'
import Post from '../Feed/Post'
import { db } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import exploreImage from '../../assets/images/event.jfif'

const Explore = () => {
    const [posts, setPosts] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        onSnapshot(collection(db, "posts"), snapshot => {
            setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        })
    }, []);

    useEffect(() => {
        setUser({
            username: sessionStorage.getItem('username'),
            displayName: sessionStorage.getItem('displayName'),
            photoURL: sessionStorage.getItem('photoURL')
        })
    }, []);

    return (
        <div className="explore">
            <div className="explore_header">
                <div className="explore_input">
                    <Search className='explore_searchIcon' />
                    <input type="text" placeholder='Search Twitter' />
                </div>
            </div>

            <div className='explore_wrapper'>
                {/* <div className="explore_trends"> */}
                <figure>
                    <img src={exploreImage} alt="" />
                </figure>
                {/* </div> */}

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
                    <h2>Random Posts</h2>
                    {
                        posts ? posts.map(post => (
                            <Post
                                key={post.text}
                                avatar={post.avatar}
                                displayName={post.displayName}
                                image={post.image}
                                text={post.text}
                                username={post.username}
                                verified={post.verified}
                                id={post.id}
                                currentUser={user}
                            />
                        )) : <div className='loading_wrapper'>
                            <div className="loading"></div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore