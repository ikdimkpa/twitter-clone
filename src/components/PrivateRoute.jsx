import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar, Widgets, Message } from './';

const PrivateRoute = () => {
    useEffect(() => {
        document.title = "Twitter";
    }, []);
    
    return (localStorage.getItem('authToken')) ? <>
        <Sidebar />
        <Outlet />
        <Message />
        <Widgets />
    </> : <Navigate replace to="/login" />

}

export default PrivateRoute;