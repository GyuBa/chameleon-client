import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Layout} from './components';
import {
  Main,
  Login,
  SignUp,
  Payment,
  Account,
  ChangePassword,
  Model,
  ExecuteModel,
  CreateModel,
  Tarfile,
  Dockerfile,
  WebSocket,
  Description,
  SetParameter
} from './pages';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<Layout/>)}>
          <Route path="/main" element={(<Main/>)}/>
          <Route path="/account" element={<Account/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/payment" element={<Payment/>}/>
          <Route path="/ws-test" element={<WebSocket/>}/>
          {/*경로 수정 필요*/}
          <Route path="/model" element={<Model/>}/>
          <Route path="/description" element={<Description/>}/>
          <Route path="/execute-model" element={<ExecuteModel/>}/>
          <Route path="/create-model" element={<CreateModel/>}/>
          <Route path="/set-parameter" element={<SetParameter/>}/>
          <Route path="/create-model/tar-file" element={<Tarfile/>}/>
          <Route path="/create-model/dockerfile" element={<Dockerfile/>}/>
        </Route>
        <Route path="/login" element={(<Login/>)}/>
        <Route path="/signup" element={(<SignUp/>)}/>
      </Routes>
    </BrowserRouter>
  );
};