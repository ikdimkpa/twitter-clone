import React from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Sidebar, Feed, Widgets, Explore, Detail, Message } from './components'

const App = () => {
    const [tweetUsername, setTweetUsername] = React.useState('');
    const [user, setUser] = React.useState({});

    const navigate = useNavigate();

    React.useEffect(() => {
        if (sessionStorage.getItem('authToken')) {
            navigate("/");
        }
        else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="app">
            <Sidebar />
            <Routes>
                <Route path='/' element={<Feed setTweetUsername={setTweetUsername} setCurrentUser={setUser} />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/messages' element={<Message user={user} largeSize="true" />} />
                <Route path={`/${tweetUsername}/:id`} element={<Detail tweetUsername={tweetUsername} user={user} />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Message user={user} />
            <Widgets />
        </div>
    )
}

const NotFound = () => {
    const styles = {
        flex: ".5",
        textAlign: "center",
        paddingTop: "4rem",
        color: "var(--twitter-color)",
        fontSize: "36px",
        lineHeight: "44px",
        textShadow: "0 1px 1px rgba(0 0 0 / 12%)",
        borderRight: "1px solid var(--twitter-background)",
        borderLeft: "1px solid var(--twitter-background)",
    }
    return (
        <div style={styles}>
            <h1>Not Found</h1>
        </div>
    );
}

export default App