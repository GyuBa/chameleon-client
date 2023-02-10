import {Footer, Navbar, Sidebar} from "../index";
import React from "react";
import {useStateContext} from "../../contexts/ContextProvider";
import {Outlet} from "react-router-dom";

export default function Layout() {
  const {activeMenu} = useStateContext();

  return (
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-white z-50">
            <Sidebar/>
          </div>
        ) : (
          <div className="w-0">
            <Sidebar/>
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'bg-main-bg w-full min-h-screen md:ml-72'
              : 'bg-main-bg w-full min-h-screen flex-2'
          }
        >
          <div className="fixed md:static bg-main-bg navbar w-full">
            <Navbar/>
          </div>
          <div>
            <div className="contents_area flex justify-center">
              <Outlet/>
            </div>
          </div>
          <Footer/>
        </div>
      </div>
  );
}