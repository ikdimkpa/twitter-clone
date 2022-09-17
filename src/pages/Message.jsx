import React from 'react'
import { ArrowDownwardOutlined } from '@mui/icons-material'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../config/firebase'
import './Styles/Message.css'
import ChatBox from '../components/Message/ChatBox'
import Chat from '../components/Message/Chat'
import Loader from '../components/Loader/Loader'
import Header from '../components/Header/Header'

const Message = ({ largeSize }) => {

    const [chats, setChats] = React.useState(null);
    const [chatOpen, setChatOpen] = React.useState(false);

    React.useEffect(() => {
        onSnapshot(query(collection(db, "chats"), orderBy("createdAt")), snapShot => (
            setChats(snapShot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        ));

        document.title = "Messages / Twitter"
    }, []);

    return (
        <div className={`message ${!chatOpen && "messageOff"} ${largeSize && "message_large"}`}>
            {
                largeSize ? <Header showBackIcon headerText="Messages" /> : <div className="message_header">
                    <h2>Messages</h2>
                    <div className="message_header_icon">
                        {/* <MailOutline /> */}
                        <ArrowDownwardOutlined className="ArrowDownwardOutlined" onClick={() => setChatOpen(!chatOpen)} />
                    </div>
                </div>
            }

            <div className='chat_area' id="chat_area">
                {
                    chats ? chats.map(({ text, avatar, image, createdAt, username, id }) => (
                        <Chat
                            key={id}
                            text={text}
                            avatar={avatar}
                            image={image}
                            createdAt={createdAt}
                            username={username}
                        />
                    )) : <Loader />
                }
            </div>

            <ChatBox chatOpen={chatOpen} />

        </div>
    )
}

export default Message