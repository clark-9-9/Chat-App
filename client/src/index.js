import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './css/App_1.css';
import './css/App_2.css';
import{ BrowserRouter } from "react-router-dom"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    // </React.StrictMode>
);

