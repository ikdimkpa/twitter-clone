import React from 'react'
import './Comments.css'
import { Avatar } from '@mui/material'
import { ChatBubbleOutline, DeleteForever, FavoriteBorder, MoreHoriz, Publish, Repeat, VerifiedUser } from '@mui/icons-material';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

const Comments = ({
    displayName,
    username,
    verified,
    text,
    avatar,
    id,
    currentUser }) => {
    const [isDelete, setIsDelete] = React.useState(false);

    const deleteComment = (commentId) => {
        if (window.confirm("Are you sure?\nYou want to DELETE this reply")) {
            deleteDoc(doc(db, "comments", commentId))
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
        <div className="comment">
            <div className="comment_avatar">
                <Avatar src={avatar} />
            </div>

            <div className="comment_body">
                <div className="comment_header">
                    <div className="comment_header-text">
                        <h3>
                            {displayName}
                            <span className="comment_header-special">
                                {verified && <VerifiedUser className="comment_badge" />} @
                                {username}
                            </span>
                        </h3>

                        {
                            isDelete && <DeleteForever onClick={() => deleteComment(id)} title="Delete Forever" className="comment_more-options" />
                        }

                    </div>
                    <div className="comment_header-description">
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments