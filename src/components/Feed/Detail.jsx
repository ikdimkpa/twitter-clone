import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { collection, query, onSnapshot, where, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ArrowBack, ChatBubbleOutline, DeleteForever, FavoriteBorder, Publish, Repeat, VerifiedUser } from '@mui/icons-material';
import './Detail.css'
import TweetBox from './TweetBox';
import Comments from './Comments';
import Loader from '../Loader/Loader';
import { UserContext } from '../../context/UserContext';
import ProfileAvatar from '../Profile/ProfileAvatar';
import { AppContext } from '../../context/AppContext';

const Detail = () => {
    const { user } = useContext(UserContext);
    const { state: { isDelete, post, comments }, dispatch } = useContext(AppContext);

    const { id } = useParams();

    const collectionRef = query(collection(db, "comments"), where("postId", "==", id));

    React.useEffect(() => {
        const fetchPost = async () => {
            const docSnap = await getDoc(doc(db, "posts", id));
            dispatch({
                type: 'SET_POST',
                payload: docSnap.data()
            })

        }

        onSnapshot(collectionRef, snapshot => {
            dispatch({
                type: 'SET_COMMENTS',
                payload: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
            })
        })

        fetchPost();
    }, []);

    const deletePost = (postId) => {
        if (window.confirm("Are you sure?\nYou want to DELETE this post")) {
            deleteDoc(doc(db, "posts", postId))
        }
    }

    if (post) {
        document.title = `${post.displayName.split(" ")[0]} on Twitter: "${post.text.slice(0, 10)}"`;
    }

    return (
        <div className="wrapper detail">
            <Link to={-1} className="detail_header">
                <ArrowBack />
                <h2>Tweet</h2>
            </Link>

            {
                post ? <div className="post">
                    <ProfileAvatar src={post.avatar} alt={post.displayName} />

                    <div className="post_body">
                        <div className="post_header">
                            <div className="post_header-text">
                                <h3>
                                    {post.displayName}
                                    <span className="post_header-special">
                                        {post.verified && <VerifiedUser className="post_badge" />} @
                                        {post.username}
                                    </span>
                                </h3>

                                {
                                    isDelete && <DeleteForever onClick={() => deletePost(id)} title="Delete Forever" className="post_more-options" />
                                }

                            </div>
                        </div>

                        <div className="post_header-description">
                            <p>{post.text}</p>
                        </div>
                        <img src={post.image} alt="" />

                        <div className="post_footer">
                            <div className='post_footer_icon_wrapper'>
                                <ChatBubbleOutline className='ChatBubble' title="Reply" fontSize='small' />
                                {
                                    comments && comments.length > 0 && <span>{comments.length}</span>
                                }
                            </div>
                            <Repeat className='repeat' title="Retweet" fontSize="small" />
                            <FavoriteBorder className='favorit' title="Like" fontSize="small" />
                            <Publish className='publish' title="Share" fontSize="small" />
                        </div>
                    </div>
                </div> : <Loader top />
            }

            {
                post && <TweetBox
                    user={user}
                    postId={id}
                    text="Reply"
                    placeholder="Tweet your reply" />
            }

            {
                post && comments && comments.map(({ text, avatar, displayName, username, verified, id }) => (
                    <Comments
                        key={id}
                        avatar={avatar}
                        displayName={displayName}
                        text={text}
                        username={username}
                        verified={verified}
                        id={id}
                        currentUser={user}
                    />
                ))
            }

        </div >
    )
}

export default Detail