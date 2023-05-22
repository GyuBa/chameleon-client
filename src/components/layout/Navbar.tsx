import React, {useRef, useEffect, useState} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import UserProfile from "./UserProfile";
import {GrMoney} from "react-icons/gr";
import {Link} from "react-router-dom";
import {SitePaths} from "../../types/chameleon-platform.common";
import useGlobalContext from "../../contexts/hook/useGlobalContext";

export default function Navbar() {
    const {activeMenu, setActiveMenu} = useGlobalContext();
    const {user} = useGlobalContext();
    const [isUserProfileOpen, setUserProfileOpen] = useState(false);
    const userProfileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event : MouseEvent) {
            const clickedElement = event.target as Element;
            if (userProfileRef.current && !userProfileRef.current.contains(clickedElement) && !clickedElement.closest('.user-profile')) {
                setUserProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex w-full justify-between p-1 relative z-40 bg-white">
            <button type="button" onClick={() => setActiveMenu(!activeMenu)}
                    className="main-color relative text-xl rounded-full p-3 hover:bg-light-gray"
            ><AiOutlineMenu/></button>
            <div className="flex">
                <Link to={SitePaths.PAYMENT} className="flex items-center gap-2 cursor-pointer px-2 mx-2 hover:bg-light-gray rounded-lg">
                    <GrMoney className="w-5 h-5"/>
                    <p>
                        <span className="text-gray-700 text-14">Point </span>
                        <span className="text-gray-700 font-bold ml-1 text-14">₩{user.point.toLocaleString('ko-KR')}</span>
                    </p>
                </Link>
                <div onClick={() => setUserProfileOpen((prevState) => !prevState)}
                     ref={userProfileRef}
                     className="flex items-center gap-2 cursor-pointer px-2 hover:bg-light-gray rounded-lg">
                    <BsFillPersonFill className="w-5 h-5"/>
                    <span className="text-gray-700 font-bold text-14">{user.username}</span>
                    <MdKeyboardArrowDown className="text-gray-400 text-14"/>
                </div>
                {isUserProfileOpen && (<UserProfile/>)}
            </div>
        </div>
    );
};