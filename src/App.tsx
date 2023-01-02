import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main, Login, SignUp, Layout, Model, Payment, Account} from './components';
import WebSocket from './service/WebSocket';
import './App.css';
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(<Layout/>)}>
            <Route path="/main" element={(<Main/>)}/>
            <Route path="/model" element={<Model/>}/>
            <Route path="/account" element={<Account/>}/>
            <Route path="/payment" element={<Payment/>}/>
          </Route>
          <Route path="/login" element={(<Login/>)}/>
          <Route path="/signup" element={(<SignUp/>)}/>
          <Route path="/websocket" element={<WebSocket/>}/>
        </Routes>
      </BrowserRouter>
  );
};