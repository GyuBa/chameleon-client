import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Layout} from './components';
import {
  Main,
  SignIn,
  SignUp,
  Payment,
  Account,
  ChangePassword,
  Model,
  ExecuteModel,
  CreateModel,
  TarFile,
  Dockerfile,
  WebSocket,
  CreateDescription,
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
          <Route path="/execute-model" element={<ExecuteModel/>}/>
          <Route path="/create/model" element={<CreateModel/>}/>
          <Route path="/create/description" element={<CreateDescription/>}/>
          <Route path="/create/parameter" element={<SetParameter/>}/>
          <Route path="/menu/tar-file" element={<TarFile/>}/>
          <Route path="/menu/dockerfile" element={<Dockerfile/>}/>
        </Route>
        <Route path="/sign-in" element={(<SignIn/>)}/>
        <Route path="/sign-up" element={(<SignUp/>)}/>
      </Routes>
    </BrowserRouter>
  );
};