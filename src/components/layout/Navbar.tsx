import React from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {useStateContext} from '../../contexts/ContextProvider';
import useGetUserInfo from "../../service/authentication/UserInfoService";
import UserProfile from "./UserProfile";
import {GrMoney} from "react-icons/gr";
import {Link} from "react-router-dom";

export default function Navbar() {
    const {handleClick, isClicked, handleActiveMenu} = useStateContext();
    const {user} = useGetUserInfo();

    return (
        <div className="flex w-full justify-between p-1 relative z-50 bg-white">
            <button type="button" onClick={handleActiveMenu}
                    className="main-color relative text-xl rounded-full p-3 hover:bg-light-gray"
            ><AiOutlineMenu/></button>
            <div className="flex">
                <Link to='/payment' className="flex items-center gap-2 cursor-pointer px-2 mx-2 hover:bg-light-gray rounded-lg">
                    <GrMoney className="w-5 h-5"/>
                    <p>
                        <span className="text-gray-700 text-14">My point </span>
                        <span className="text-gray-700 font-bold ml-1 text-14">{user.point}</span>
                    </p>
                </Link>
                <div onClick={() => handleClick('userProfile')}
                     className="flex items-center gap-2 cursor-pointer px-2 hover:bg-light-gray rounded-lg">
                    <BsFillPersonFill className="w-5 h-5"/>
                    <span className="text-gray-700 font-bold ml-1 text-14">{user.username}</span>
                    <MdKeyboardArrowDown className="text-gray-400 text-14"/>
                </div>
                {isClicked.userProfile && (<UserProfile/>)}
            </div>
        </div>
    );
};