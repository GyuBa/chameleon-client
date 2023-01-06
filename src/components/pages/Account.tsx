import React from 'react';
import {Button, Header, ChangeName} from '../index';
import {BsPersonCircle, BsFillPersonLinesFill} from "react-icons/bs";
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
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="Account" title="Account"/>
        <div className="flex m-10 border-color border-b-1 pb-6">
          <BsPersonCircle className="w-20 h-20"/>
          <div className="w-full p-3">
            <p className="font-extrabold text-xl">최수연</p>
            <p>tndus502@koreatech.ac.kr</p>
          </div>
        </div>
        <div>
          <div className="flex mx-20 my-10">
            <BsFillPersonLinesFill className="w-10 h-10"/>
            <p className="w-full mx-10 p-2">최수연</p>
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
          <div className="flex mx-20 my-4">
            <HiOutlineLockClosed className="w-10 h-10"/>
            <p className="w-full mx-10 p-2">비밀번호</p>
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
        </div>
      </div>
    </div>
  );
};