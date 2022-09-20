import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar, Widgets } from '../components';
import Message from "../pages/Message";

const PrivateRoute = () => {

    useEffect(() => {
        document.title = "Twitter";
    }, []);

    return (
        localStorage.getItem('authToken') ? <>
            <Sidebar />
            <Outlet />
            <Message />
            <Widgets />
        </> : <Navigate to="/login" />
    );

}

export default PrivateRoute;