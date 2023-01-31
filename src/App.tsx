import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Layout} from './components';
import {Main, Login, SignUp, Payment, Account, ChangePW, Model, ExecuteModel, CreateModel, Tarfile, Dockerfile, WebSocket} from './pages';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<Layout/>)}>
          <Route path="/main" element={(<Main/>)}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/changepw" element={<ChangePW/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/websocket" element={<WebSocket/>}/>

          <Route path="/model" element={<Model/>}/>
          <Route path="/executemodel" element={<ExecuteModel/>}/>
          {/*경로 수정 필요*/}
          <Route path="/createmodel" element={<CreateModel/>}/>
          <Route path="/createmodel/tarfile" element={<Tarfile/>}/>
          <Route path="/createmodel/dockerfile" element={<Dockerfile/>}/>
        </Route>
        <Route path="/login" element={(<Login/>)}/>
        <Route path="/signup" element={(<SignUp/>)}/>
      </Routes>
    </BrowserRouter>
  );
};