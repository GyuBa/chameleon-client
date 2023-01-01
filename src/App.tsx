import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main, Login, SignUp, Layout} from './components';
import {Model} from './models';
import History from './historys/History';
import './App.css';
import {useStateContext} from './contexts/ContextProvider';

export default function App() {
  const currentMode = useStateContext();
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
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
    </div>
  );
};