import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import './styles/dropzone.css';
import "./styles/hide-form-name.css"
import './styles/split.css';
import './styles/main.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();