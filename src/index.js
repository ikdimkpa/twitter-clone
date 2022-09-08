import { createRoot } from 'react-dom/client';
import App from './App'
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"

const root = createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>);