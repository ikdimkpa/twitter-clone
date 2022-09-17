import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';

// const App = React.lazy(import('./App'));

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            {/* <React.Suspense fallback={<TwitterLoading />}>
                <App />
            </React.Suspense> */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);