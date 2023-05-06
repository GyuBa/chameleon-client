import React from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {useStateContext} from '../../contexts/ContextProvider';
import useGetUserInfo from "../../service/authentication/UserInfoService";
import UserProfile from '../layout/UserProfile';

export default function Navbar() {
    const {handleClick, isClicked, handleActiveMenu} = useStateContext();
    const {username} = useGetUserInfo();

    return (
        <div className="flex w-full justify-between p-2 relative z-40 bg-white">
            <button type="button" onClick={handleActiveMenu}
                    className="main-color relative text-xl rounded-full p-3 hover:bg-light-gray"
            ><AiOutlineMenu/></button>
            <div className="flex">
                <div onClick={() => handleClick('userProfile')}
                     className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                    <BsFillPersonFill className="w-5 h-5"/>
                    <p>
                        <span className="text-gray-700 text-14">Welcome,</span>{' '}
                        <span className="text-gray-700 font-bold ml-1 text-14">{username}</span>
                    </p>
                    <MdKeyboardArrowDown className="text-gray-400 text-14"/>
                </div>
                {isClicked.userProfile && (<UserProfile/>)}
            </div>
        </div>
    );
};