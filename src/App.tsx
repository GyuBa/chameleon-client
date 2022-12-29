import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi'
import {Main, Navbar, Footer, Sidebar, ThemeSettings, Login, SignUp} from './components';
import {Model1, Model2, Model3} from './models';
import History from './historys/History';
import './App.css';
import {useStateContext} from './contexts/ContextProvider';

export default function App() {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor)
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{background: currentColor, borderRadius: '50%'}}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray">
              <FiSettings/>
            </button>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar bg-white dark:bg-main-dark-bg">
              <Sidebar/>
            </div>
          ) : (
            <div className="w-0 dark:bg-main-dark-bg">
              <Sidebar/>
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg bg-main-bg w-full min-h-screen md:ml-72'
                : 'dark:bg-main-dark-bg bg-main-bg w-full min-h-screen flex-2'
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar/>
            </div>
            <div>
              {themeSettings && (<ThemeSettings/>)}

              <Routes>
                {/* main, loginState ? <Main/> : <Login/> */}
                <Route path="/" element={(<Main/>)}/>
                <Route path="/main" element={(<Main/>)}/>

                {/* models  */}
                <Route path="/model1" element={<Model1/>}/>
                <Route path="/model2" element={<Model2/>}/>
                <Route path="/model3" element={<Model3/>}/>

                {/* historys  */}
                <Route path="/history" element={<History/>}/>

                {/* authentication  */}
                <Route path="/login" element={(<Login/>)}/>
                <Route path="/signup" element={(<SignUp/>)}/>

              </Routes>
            </div>
            <Footer/>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};