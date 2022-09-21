import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Loader from './components/Loader/Loader';
import TwitterLoading from './components/Loader/TwitterLoading';
import UserProvider from './context/UserContext';
import AppProvider from './context/AppContext';
import { Detail, Tweets, ProfileSetting, Compose } from './components'
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
            <AppProvider>
                <div className="app">
                    <Suspense fallback={<TwitterLoading />}>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path='*' element={<NotFound />} />

                            <Route path='/' element={<PrivateRoute />}>
                                <Route index element={<Home />} />
                                <Route path='home' element={<Home />} />
                                <Route path='explore' element={<Explore />} />
                                <Route path='messages' element={<Message largeSize />} />
                                <Route path=":username" element={<Profile />}>
                                    <Route index element={<Tweets condition />} />
                                    <Route path="tweets" element={<Tweets condition />} />
                                    <Route path="with_replies" element={<h1>Tweets &amp; Replies</h1>} />
                                    <Route path="media" element={<h1>Media</h1>} />
                                    <Route path="likes" element={<h1>Likes</h1>} />
                                    <Route path="settings" element={<ProfileSetting />} />
                                </Route>
                                <Route path=":username/:id" element={<Detail />} />
                                <Route path="compose" element={<Compose />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </div>
            </AppProvider>
        </UserProvider>
    )
}

export default App