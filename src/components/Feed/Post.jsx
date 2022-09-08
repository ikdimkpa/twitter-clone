import React, { forwardRef } from 'react'
import './Post.css'
import TweetBox from './TweetBox';
import FlipMove from 'react-flip-move';
import { Avatar } from '@mui/material'
import { ChatBubbleOutline, DeleteForever, FavoriteBorder, MoreHoriz, Publish, Repeat, VerifiedUser } from '@mui/icons-material';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Post = forwardRef(({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  id,
  currentUser }, ref) => {
  const [isDelete, setIsDelete] = React.useState(false);
  const [showReply, setShowReply] = React.useState(false);

  const deletePost = (postId) => {
    if (window.confirm("Are you sure?\nYou want to DELETE this post")) {
      deleteDoc(doc(db, "posts", postId))
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
          <div className="post_header-description">
            <p>{text}</p>
          </div>
        </div>
        <img src={image} alt="" />

        {
          showReply && <FlipMove>
            <TweetBox user={currentUser} text="Reply" />
          </FlipMove>
        }

        <div className="post_footer">
          <ChatBubbleOutline className='ChatBubble' title="Reply" fontSize='small' onClick={() => setShowReply(!showReply)} />
          <Repeat className='repeat' title="Retweet" fontSize="small" />
          <FavoriteBorder className='favorit' title="Like" fontSize="small" />
          <Publish className='publish' title="Share" fontSize="small" />
        </div>
      </div>
    </div>
  );
});

export default Post