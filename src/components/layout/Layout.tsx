import {Footer, Navbar, Sidebar} from "../index";
import React from "react";
import {useStateContext} from "../../contexts/ContextProvider";
import {Outlet} from "react-router-dom";

export default function Layout() {
  const {activeMenu} = useStateContext();

  return (
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-72 fixed sidebar bg-white z-50 ease-in-out duration-300 translate-x-0">
            <Sidebar/>
          </div>
        ) : (
          <div className="w-0 ease-in-out duration-300 translate-x-1">
            <Sidebar/>
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'w-full min-h-screen md:ml-72'
              : 'w-full min-h-screen'
          }
        >
          <div className="fixed md:static navbar w-full">
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