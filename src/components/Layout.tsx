import {FiSettings} from "react-icons/fi";
import {Footer, Navbar, Sidebar, ThemeSettings} from "./index";
import React, {useEffect} from "react";
import {useStateContext} from "../contexts/ContextProvider";
import {Outlet} from "react-router-dom";

export default function (){
  const {
    setCurrentColor,
    setCurrentMode,
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
  return(
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
          <div className="contents_area">
            <Outlet/>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}