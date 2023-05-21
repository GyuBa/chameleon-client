import React from 'react';
import {BsFillPersonLinesFill, BsPersonCircle} from 'react-icons/bs';
import {Link, NavLink} from 'react-router-dom';
import useGetUserInfo from "../../service/authentication/UserInfoService";
import {GiArtificialHive} from "react-icons/gi";
import {SitePaths} from "../../types/chameleon-platform.common";

export const userProfileData = [
    {
        icon: <BsFillPersonLinesFill/>,
        title: 'My Profile',
        name: 'account',
        desc: 'Account Settings',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
    },
    {
        icon: <GiArtificialHive/>,
        title: 'My Models',
        name: 'models/my',
        desc: 'My Model Lists',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
    },
];
export default function UserProfile() {
    const {handleSignOut, user} = useGetUserInfo();

    return (
        <div className="user-profile nav-item absolute right-1 top-12 bg-white p-8 rounded-3xl w-96 drop-shadow-xl">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg">User Profile</p>
            </div>
            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                <BsPersonCircle className="w-24 h-24"/>
                <div>
                    <p className="font-semibold text-xl">{user.username}</p>
                    <p className="text-gray-500 text-sm font-semibold">{user.email}</p>
                    <p className="text-sm font-semibold">₩{user.point.toLocaleString('ko-KR')}</p>
                </div>
            </div>
            <div>
                {userProfileData.map((item, index) => (
                    <NavLink
                        to={`/${item.name}`}
                        key={index}
                        className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer">
                        <button
                            type="button"
                            style={{color: item.iconColor, backgroundColor: item.iconBg}}
                            className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                        >{item.icon}
                        </button>
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-gray-500 text-sm"> {item.desc} </p>
                        </div>
                    </NavLink>
                ))}
            </div>
            <div className="mt-5">
                <Link to={SitePaths.SIGN_IN}
                      className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900">
                    <button className="submit-btn w-full p-3" onClick={handleSignOut}>Sign Out</button>
                </Link>
            </div>
        </div>
    );
};
