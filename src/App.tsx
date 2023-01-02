import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main, Login, SignUp, Layout, Model, History} from './components';
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
        </Routes>
      </BrowserRouter>
  );
};