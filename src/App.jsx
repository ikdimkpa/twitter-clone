import React from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Sidebar, Feed, Widgets, Explore } from './components'

const App = () => {
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
                <Route path='/' element={<Feed />} />
                <Route path='/explore' element={<Explore />} />
            </Routes>
            <Widgets />
        </div>
    )
}

export default App