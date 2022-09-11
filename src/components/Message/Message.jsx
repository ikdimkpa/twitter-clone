import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownwardOutlined, MailOutline, MessageOutlined } from '@mui/icons-material'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import './Message.css'
import ChatBox from './ChatBox'
import Chat from './Chat'
import Loader from '../Loader/Loader'

const Message = ({ user, largeSize }) => {
    const [chats, setChats] = React.useState(null);
    const [chatOpen, setChatOpen] = React.useState(false);

    React.useEffect(() => {
        onSnapshot(query(collection(db, "chats"), orderBy("createdAt")), snapShot => (
            setChats(snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        ));
    }, []);

    return (
        <div className={`message ${!chatOpen && "messageOff"} ${largeSize && "message_large"}`}>
            {
                largeSize ? <Link to="/" className="message_header">
                    <h2>Messages</h2>
                    <div className="message_header_icon">
                        {/* <MailOutline /> */}
                        <ArrowDownwardOutlined className="ArrowDownwardOutlined" onClick={() => setChatOpen(!chatOpen)} />
                    </div>
                </Link> : <div className="message_header">
                    <h2>Messages</h2>
                    <div className="message_header_icon">
                        {/* <MailOutline /> */}
                        <ArrowDownwardOutlined className="ArrowDownwardOutlined" onClick={() => setChatOpen(!chatOpen)} />
                    </div>
                </div>
            }

            {/* <div className="message_request">
                <MessageOutlined />
                <div>
                    <strong>Message requests</strong>
                    <small>9 new requests</small>
                </div>
            </div>

            <MessageUser
                path={`/chat/${userId}`}
                displayName="Mohammad Rahi"
                username="mohammadrahi"
                lastMessage="Hey there, we're providing beautifull..." /> */}

            <div className='chat_area' id="chat_area">
                {
                    chats ? chats.map(({ text, avatar, image, createdAt, username }) => (
                        <Chat
                            text={text}
                            avatar={avatar}
                            image={image}
                            createdAt={createdAt}
                            username={username}
                            currentUser={user}
                        />
                    )) : <Loader />
                }
            </div>

            <ChatBox user={user} chatOpen={chatOpen} />

        </div>
    )
}

export default Message