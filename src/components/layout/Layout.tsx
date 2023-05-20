import React from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useGlobalContext from "../../contexts/hook/useGlobalContext";
export default function Layout() {
    const {activeMenu} = useGlobalContext();

    return (
        <div className="flex relative">
            {activeMenu ? (
                <div className="w-72 fixed sidebar bg-white z-50 ease-in-out duration-300">
                    <Sidebar/>
                </div>
            ) : (
                <div className="w-0 ease-in-out duration-300">
                    <Sidebar/>
                </div>
            )}
            <div
                className={`w-full min-h-screen ${activeMenu ? 'md:ml-72' : ''}`}
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