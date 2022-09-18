import React from 'react'
import { Link } from 'react-router-dom';
import { ChatBubbleOutline, DeleteForever, FavoriteBorder, Publish, Repeat, VerifiedUser } from '@mui/icons-material';
import './Tweet.css'
import { collection, deleteDoc, doc, query, onSnapshot, where, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import TweetBox from './TweetBox';
import ProfileAvatar from '../Profile/ProfileAvatar';
import { UserContext } from '../../context/UserContext';
import { AppContext } from '../../context/AppContext';

const initialPostState = {
  isDelete: false,
  showReply: false,
  post: null,
  comments: null,
  liked: false
};

const Tweet = React.forwardRef(({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  likes,
  id }, ref) => {

  const { user } = React.useContext(UserContext);
  const { reducer } = React.useContext(AppContext);

  const [postState, postDispatch] = React.useReducer(reducer, initialPostState);

  React.useEffect(() => {
    onSnapshot(query(collection(db, "comments"), where("postId", "==", id)), snapshot => {
      postDispatch({
        type: 'SET_COMMENTS',
        payload: snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      })
    });

    if (username === user.username) {
      postDispatch({
        type: 'SET_IS_DELETE',
        payload: true
      })
    }
    else {
      postDispatch({
        type: 'SET_IS_DELETE',
        payload: false
      })
    }

  }, []);

  const deletePost = (postId) => {
    if (window.confirm("Are you sure?\nYou want to DELETE this post")) {
      deleteDoc(doc(db, "posts", postId))
      if (postState.comments) {
        postState.comments.map(comment => {
          return deleteDoc(doc(db, "comments", comment.id));
        });
      }
    }
  }

  const handleRetweet = () => {
    if (window.confirm("Retweet this tweet?")) {
      alert("Oops! Copy this tweet and retweet, legend 😎");
    }
  }

  const handleLikes = (postId) => {
    postDispatch({
      type: 'LIKED',
      payload: !postState.liked
    });

    if (!postState.liked) {
      updateDoc(doc(db, "posts", postId), {
        likes: likes + 1
      });

      updateDoc(doc(db, "posts", postId), {
        liked: postState.liked
      })
    }
    else {
      updateDoc(doc(db, "posts", postId), {
        likes: likes - 1
      });

      updateDoc(doc(db, "posts", postId), {
        liked: postState.liked
      })
    }
  }

  return (
    <div className="post" ref={ref}>
      <ProfileAvatar src={avatar} alt={displayName} />

      <div className="post_body">
        <div className="post_header">
          <div className="post_header-text">
            <h3>
              {displayName}
              <span className="post_header-special">
                {verified && <VerifiedUser className="post_badge" />} @
                {username}
              </span>
            </h3>

            {
              postState.isDelete && <DeleteForever onClick={() => deletePost(id)} title="Delete Forever" className="post_more-options" />
            }

          </div>
        </div>

        <Link to={`/${username}/${id}`} className="post_detail_link">
          <div className="post_header-description">
            <p>{text}</p>
          </div>
          {!image.includes("undefined") && <img src={image} alt="" />}
        </Link>

        {
          postState.showReply && <TweetBox
            user={user}
            postId={id}
            text="Reply"
            placeholder="Tweet your reply" />
        }

        <div className="post_footer">
          <div className='post_footer_icon_wrapper' onClick={() => postDispatch({
            type: 'SHOW_REPLY',
            payload: !postState.showReply
          })}>
            <ChatBubbleOutline className={`ChatBubble`} title="Reply" fontSize='small' />
            {
              postState.comments && postState.comments.length > 0 && <span>{postState.comments.length}</span>
            }
          </div>
          <Repeat className='repeat' title="Retweet" onClick={handleRetweet} fontSize="small" />

          <div className="post_footer_icon_wrapper">
            <FavoriteBorder className={`favorit ${postState.liked && "active_favorit"}`} title="Like" onClick={() => handleLikes(id)} fontSize="small" />
            {
              likes > 0 && <span>{likes}</span>
            }
          </div>

          <Publish className='publish' title="Share" fontSize="small" />
        </div>
      </div>
    </div>
  );
});

export default Tweet