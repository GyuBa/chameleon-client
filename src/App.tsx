import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main, Login, SignUp, Layout ,History, Model} from './components';
import WebSocket from './service/WebSocket';
import './App.css';
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(<Layout/>)}>
            <Route path="/main" element={(<Main/>)}/>
            <Route path="/model" element={<Model/>}/>
            <Route path="/history" element={<History/>}/>
          </Route>
          <Route path="/login" element={(<Login/>)}/>
          <Route path="/signup" element={(<SignUp/>)}/>
          <Route path="/websocket" element={<WebSocket/>}/>
        </Routes>
      </BrowserRouter>
  );
};