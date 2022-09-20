import { ArrowForwardOutlined, GifBoxOutlined, PhotoOutlined, Send } from '@mui/icons-material';
import React from 'react'
import './ChatBox.css'
import useStorage from '../../hooks/useStorage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { UserContext } from '../../context/UserContext'

const ChatBox = () => {
    const { user } = React.useContext(UserContext);

    const [chatText, setChatText] = React.useState("");
    const [chatImage, setChatImage] = React.useState('');

    const { url, setUrl } = useStorage("post_images", chatImage);

    const uploadChatImage = (e) => {
        let selected = e.target.files[0];
        let types = ['image/png', 'image/jpeg']

        if (selected && types.includes(selected.type)) {
            setChatImage(selected);
        }
        else {
            setChatImage(null);
            alert('Please select an image file (png or jpg)');
        }
    }

    const uploadChatGif = (e) => {
        let selected = e.target.files[0];
        let types = ['image/gif']

        if (selected && types.includes(selected.type)) {
            setChatImage(selected);
        }
        else {
            setChatImage(null);
            alert('Please select gif format');
        }
    }

    const handleChatText = (e) => {
        setChatText(e.target.value);

        let numberOfLineBreaks = (chatText.match(/\n/g) || []).length;
        let newHeight = 20 + numberOfLineBreaks * 20 + 2;
        e.target.style.height = `${newHeight}px`;

    }

    const handleSendChat = React.useCallback(() => {
        if (chatText !== "" && chatText !== null) {
            if (chatText.trim()) {
                const collectionRef = collection(db, "chats");

                addDoc(collectionRef, {
                    username: user.username,
                    text: chatText,
                    image: url,
                    avatar: user.photoURL,
                    createdAt: serverTimestamp()
                });

                setChatText('');
                setUrl('');
                setChatImage('');
            }
        }
    }, [chatText]);

    React.useEffect(() => {
        const el = document.getElementById('chat_area');
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [handleSendChat]);

    return (
        <div className="chat_box">
            {
                chatImage && <figure className='temp_image'>
                    <img src={url} alt={chatImage.name} />
                </figure>
            }
            <div className="chat_box-wrapper">
                <ArrowForwardOutlined className="chat_arrrow_forward" />
                <div className="chat_box-icons">
                    <label htmlFor="chat-image" title='Media'>
                        <PhotoOutlined />
                        <input type="file" id="chat-image" onChange={uploadChatImage} />
                    </label>

                    <label htmlFor="chat-gif" title='GIF'>
                        <GifBoxOutlined />
                        <input type="file" id="chat-gif" onChange={uploadChatGif} />
                    </label>
                </div>

                <textarea
                    className='chat_input'
                    value={chatText}
                    onChange={handleChatText}
                    placeholder="Start a new message"
                    required >
                </textarea>

                <Send onClick={handleSendChat} />
            </div>
        </div>
    )
}

export default ChatBox