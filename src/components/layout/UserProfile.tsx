import React from 'react';
import {MdOutlineCancel} from 'react-icons/md';
import {BsPersonCircle} from 'react-icons/bs';
import {Button} from '../index';
import {userProfileData} from '../../assets/dummy';
import {useStateContext} from '../../contexts/ContextProvider';
import {Link} from 'react-router-dom';

export default function UserProfile () {
  const {currentColor} = useStateContext();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel/>}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
          padding="3"
          bgColor={undefined}
          text={undefined}
          width={undefined}/>
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <BsPersonCircle className="w-24 h-24"/>
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> 최수연 </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> 컴퓨터공학부 20학번 </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> tndus502@koreatech.ac.kr </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index}
               className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{color: item.iconColor, backgroundColor: item.iconBg}}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>
            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Link to="/login"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
          <Button
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
            padding="3"
            icon={undefined}
            bgHoverColor={undefined}
            size={undefined}
          />
        </Link>
      </div>
    </div>
  );
};
