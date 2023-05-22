import React from 'react';
import {BsPersonCircle} from "react-icons/bs";
import {HiOutlineLockClosed, HiOutlineMail} from "react-icons/hi";
import {Link} from "react-router-dom";
import {GrMoney} from "react-icons/gr";
import {SitePaths} from "../../types/chameleon-platform.common";
import useGlobalContext from "../../contexts/hook/useGlobalContext";

export default function Account() {
    const {user} = useGlobalContext();

    return (
        <div className="contents">
            <div className="w-2/3 m-2 md:m-10 mt-24 md:p-10">
                <p className='head-text'>Account</p>
                <div className="my-4 border-gray-400 rounded-3xl border-1 p-6">
                    <p className="text-xs text-gray-600 mb-1 pb-2">User Info</p>
                    <div className="flex items-center border-b-1 border-gray-300 mx-4 pb-4 mb-4 gap-5">
                        <BsPersonCircle className="w-10 h-10"/>
                        <p className="text-2xl font-extrabold">{user.username}</p>
                    </div>
                    <div className="mx-4 text-16">
                        <div className="flex m-2 gap-4">
                            <div className="flex gap-2 items-center">
                                <HiOutlineMail/>
                                <p className="font-semibold w-16">Email</p>
                            </div>
                            <p className="text-gray-600 font-semibold">{user.email}</p>
                        </div>
                        <div className="flex m-2 gap-4">
                            <div className="flex gap-2 items-center">
                                <GrMoney/>
                                <p className="font-semibold w-16">Point</p>
                            </div>
                            <p className="text-gray-600 font-semibold">₩{user.point.toLocaleString('ko-KR')}</p>
                        </div>
                    </div>
                </div>
                <div className="border-gray-400 rounded-3xl border-1 p-6">
                    <p className="text-xs text-gray-600 mb-1 pb-2">Security Setting</p>
                    <div className="flex items-center">
                        <HiOutlineLockClosed className="mx-4 w-10 h-10"/>
                        <p className="w-full p-2 font-semibold">Password</p>
                        <Link to={SitePaths.CHANGE_PASSWORD}>
                            <button className="blue-btn text-sm p-2">change</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};