import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Twitter } from '@mui/icons-material';
import './App.css'
import Loader from './components/Loader/Loader';
import UserProvider from './context/UserContext';
import { Detail, Tweets } from './components'
import PrivateRoute from './Routes/PrivateRoute';

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Message = lazy(() => import('./pages/Message'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {

    return (
        <UserProvider>
            <div className="app">
                <Suspense fallback={<TwitterLoading />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path='*' element={<NotFound />} />

                        <Route path='/' element={<PrivateRoute />}>
                            <Route path='/' element={<Home />} />
                            <Route path='home' element={<Home />} />
                            <Route path='explore' element={<Explore />} />
                            <Route path='messages' element={<Message largeSize />} />
                            <Route path=":username" element={<Profile />}>
                                <Route path="/:username" element={<Tweets condition />} />
                                <Route path="tweets" element={<Tweets />} />
                                <Route path="with_replies" element={<h1>Tweets &amp; Replies</h1>} />
                                <Route path="media" element={<h1>Media</h1>} />
                                <Route path="likes" element={<h1>Likes</h1>} />
                            </Route>
                            <Route path={`:username/:id`} element={<Detail />} />
                        </Route>
                    </Routes>
                </Suspense>
            </div>
        </UserProvider>
    )
}

const TwitterLoading = () => {
    const styles = {
        patentElement: {
            width: "100%",
            height: "100vh",
            background: "var(--twitter-white)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        twitterIconStyles: {
            color: "var(--twitter-color)",
            fontSize: "3rem"
        }
    }

    return (
        <div style={styles.patentElement}>
            <Twitter style={styles.twitterIconStyles} />
        </div>
    );
}

export default App