import React from 'react';
import {BsPersonCircle} from "react-icons/bs";
import {HiOutlineLockClosed} from "react-icons/hi";
import {Link} from "react-router-dom";
import useGetUserInfo from "../../service/authentication/UserInfoService";
import Button from "../../components/button/Button";
import Header from "../../components/layout/Header";

export default function Account() {
  const {user} = useGetUserInfo();

  return (
    <div className="contents">
      <div className="w-2/3 m-2 md:m-10 mt-24 md:p-10">
        <Header title="Account"/>
        <div className="my-4 border-gray-400 rounded-3xl border-1 p-6">
          <p className="text-xs text-gray-600 mb-1 pb-2">User Info</p>
          <div className="flex items-center">
            <BsPersonCircle className="w-20 h-20"/>
            <div className="w-full p-3">
              <p className="font-extrabold text-xl">{user.username}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="border-gray-400 rounded-3xl border-1 p-6">
          <p className="text-xs text-gray-600 mb-1 pb-2">Security Setting</p>
          <div className="flex items-center">
            <HiOutlineLockClosed className="mx-4 w-10 h-10"/>
            <p className="w-full p-2">Password</p>
            <Link to="/change-password">
              <Button className="color-btn text-sm p-2" text="change"/>
            </Link>
          </div>
        </div>
        <div className="pt-2">
          <button type="button"
                  className="float-right p-2 text-sm text-gray-500 hover:drop-shadow-xl whitespace-nowrap"
          >Delete Your Account
          </button>
        </div>
      </div>
    </div>
  );
};