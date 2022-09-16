import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Loader from './components/Loader/Loader';
import UserProvider from './context/UserContext';
import { Feed, Explore, Detail, Message, PrivateRoute } from './components'

const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {

    return (
        <UserProvider>
            <div className="app">
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path='*' element={<NotFound />} />

                        <Route path='/' element={<PrivateRoute />}>
                            <Route path='/' element={<Feed />} />
                            <Route path='home' element={<Feed />} />
                            <Route path='explore' element={<Explore />} />
                            <Route path='messages' element={<Message largeSize />} />
                            <Route path={`tweets/:id`} element={<Detail />} />
                        </Route>
                    </Routes>
                </Suspense>
            </div>
        </UserProvider>
    )
}

export default App