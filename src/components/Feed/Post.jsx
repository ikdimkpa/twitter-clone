import React, { forwardRef } from 'react'
import './Post.css'
import TweetBox from './TweetBox';
import { Avatar } from '@mui/material'
import { ChatBubbleOutline, DeleteForever, FavoriteBorder, MoreHoriz, Publish, Repeat, VerifiedUser } from '@mui/icons-material';
import { collection, deleteDoc, doc, query, orderBy, onSnapshot, where, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const Post = forwardRef(({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  likes,
  id,
  currentUser,
  setTweetUsername }, ref) => {
  const [isDelete, setIsDelete] = React.useState(false);
  const [showReply, setShowReply] = React.useState(false);
  const [comments, setComments] = React.useState(null);
  const [liked, setLiked] = React.useState(false);

  const collectionRef = query(collection(db, "comments"), where("postId", "==", id));

  React.useEffect(() => {
    onSnapshot(collectionRef, snapshot => {
      setComments(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    })
  }, []);

  const deletePost = (postId) => {
    if (window.confirm("Are you sure?\nYou want to DELETE this post")) {
      deleteDoc(doc(db, "posts", postId))
      if (comments) {
        comments.map(comment => {
          deleteDoc(doc(db, "comments", comment.id))
        });
      }
    }
  }

  React.useEffect(() => {
    if (username === currentUser.username) {
      setIsDelete(true);
    }
    else {
      setIsDelete(false);
    }
  }, []);

  const handleRetweet = () => {
    if (window.confirm("Retweet this tweet?")) {
      alert("Oops! Copy this tweet and retweet, legend 😎");
    }
  }

  const handleLikes = (postId) => {
    setLiked(!liked);

    if (!liked) {
      updateDoc(doc(db, "posts", postId), {
        likes: likes + 1
      });

      updateDoc(doc(db, "posts", postId), {
        liked
      })
    }
    else {
      updateDoc(doc(db, "posts", postId), {
        likes: likes - 1
      });

      updateDoc(doc(db, "posts", postId), {
        liked
      })
    }
  }

  return (
    <div className="post" ref={ref}>
      <div className="post_avatar">
        <Avatar src={avatar} />
      </div>

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
              isDelete && <DeleteForever onClick={() => deletePost(id)} title="Delete Forever" className="post_more-options" />
            }

          </div>
        </div>

        <Link to={`${username}/${id}`} className="post_detail_link" onClick={() => setTweetUsername(username)}>
          <div className="post_header-description">
            <p>{text}</p>
          </div>
          {!image.includes("undefined") && <img src={image} alt="" />}
        </Link>

        {
          showReply && <TweetBox
            user={currentUser}
            postId={id}
            text="Reply"
            placeholder="Tweet your reply" />
        }

        <div className="post_footer">
          <div className='post_footer_icon_wrapper' onClick={() => setShowReply(!showReply)}>
            <ChatBubbleOutline className={`ChatBubble`} title="Reply" fontSize='small' />
            {
              comments && comments.length > 0 && <span>{comments.length}</span>
            }
          </div>
          <Repeat className='repeat' title="Retweet" onClick={handleRetweet} fontSize="small" />

          <div className="post_footer_icon_wrapper">
            <FavoriteBorder className={`favorit ${liked && "active_favorit"}`} title="Like" onClick={() => handleLikes(id)} fontSize="small" />
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

export default Post