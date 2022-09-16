import React from 'react'
import { Avatar } from '@mui/material'
import moment from 'moment'
import './Chat.css'
import { UserContext } from '../../context/UserContext'

const Chat = ({ text, avatar, image, createdAt, username }) => {
    const { user } = React.useContext(UserContext);

    const [isChatHandler, setIsChatHandler] = React.useState(false);

    React.useEffect(() => {
        if (user.username === username) {
            setIsChatHandler(true);
        }
    }, []);

    return (
        <div className={`chat ${isChatHandler && "is_chat_handler_class"}`}>
            <div className="chat_avatar_wrapper">
                <Avatar className="chat_avatar" src={avatar} />
            </div>

            <div className="chat_body">
                <div className="chat_text">
                    <p style={{ marginBottom: `${image && "5px"}` }}>{text}</p>
                    {
                        image && <>
                            {
                                image.includes("undefined") ? null : <img src={image} alt="" />
                            }
                        </>
                    }
                </div>

                <small className='moment'>{createdAt && moment(createdAt.toDate()).fromNow()}</small>
            </div>
        </div>
    )
}

export default Chat