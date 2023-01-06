import React from 'react';
import {Button, Header, ChangeName} from '../index';
import {BsPersonCircle} from "react-icons/bs";
import {HiOutlineLockClosed} from "react-icons/hi";
import {useStateContext} from "../../contexts/ContextProvider";
import {Link} from "react-router-dom";

export default function Account() {
  const {
    currentColor,
    handleClick,
    isClicked
  } = useStateContext();
  return (
    <div className="contents">
      <div className="w-3/4 m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="Account" title="Account"/>
        <div className="flex my-4 border-gray-400 rounded-3xl border-1 p-6 items-center">
          <BsPersonCircle className="w-20 h-20"/>
          <div className="w-full p-3">
            <p className="font-extrabold text-xl">최수연</p>
            <p>tndus502@koreatech.ac.kr</p>
          </div>
          <div onClick={() => handleClick('changeName')}>
            <Button
              color="white"
              bgColor={currentColor}
              text="수정"
              borderRadius="10px"
              width="16"
              padding="2"
              icon={undefined}
              bgHoverColor={undefined}
              size={undefined}
            />
          </div>
          {isClicked.changeName && (<ChangeName/>)}
        </div>
        <div className="flex border-gray-400 rounded-3xl border-1 p-6 items-center">
          <HiOutlineLockClosed className="mx-4 w-10 h-10"/>
          <p className="w-full p-2">비밀번호</p>
          <Link to="/changepw">
            <Button
              color="white"
              bgColor={currentColor}
              text="수정"
              borderRadius="10px"
              width="16"
              padding="2"
              icon={undefined}
              bgHoverColor={undefined}
              size={undefined}
            />
          </Link>
        </div>
        <div className="pt-2">
          <button
            type="button"
            className="float-right p-2 text-gray-500 hover:drop-shadow-xl whitespace-nowrap"
          >{'회원탈퇴>'}</button>
        </div>
      </div>
    </div>
  );
};