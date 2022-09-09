import React from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Sidebar, Feed, Widgets, Explore, Detail } from './components'

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
                <Route path={`/${tweetUsername}/:id`} element={<Detail tweetUsername={tweetUsername} user={user} />} />
            </Routes>
            <Widgets />
        </div>
    )
}

export default App