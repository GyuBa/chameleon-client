import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/main.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import ContextProvider from "./contexts/ContextProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ContextProvider>
                <App/>
            </ContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();