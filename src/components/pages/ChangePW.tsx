import React from 'react';
import {Button, Header} from '../index';
import {useStateContext} from "../../contexts/ContextProvider";
import {Link} from "react-router-dom";

export default function Payment() {
  const {currentColor} = useStateContext();

  return (
    <div className="contents">
      <div className="w-3/5 m-2 md:m-10 mt-24 w-96 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="" title="비밀번호 변경"/>
        <p className="m-2 text-gray-500">* 비밀번호 변경 규칙 *</p>
        <p className="m-2 text-sm text-gray-500 whitespace-nowrap">숫자+영문자+특수문자 조합으로 8자리 이상</p>
        <div className="m-4">
          <input
            onChange={undefined}
            type="text"
            className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
            id="pw-1"
            placeholder="현재 비밀번호"/>
        </div>
        <div className="m-4">
          <input
            onChange={undefined}
            type="text"
            className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
            id="pw-2"
            placeholder="새 비밀번호"/>
        </div>
        <div className="m-4">
          <input
            onChange={undefined}
            type="text"
            className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
            id="pw-3"
            placeholder="새 비밀번호 확인"/>
        </div>
        <div className="flex gap-3 float-right">
          <Link to="/account">
            <Button
              color="black"
              bgColor="white"
              text="취소"
              borderRadius="10px"
              width="16"
              padding="2"
              icon={undefined}
              bgHoverColor={undefined}
              size={undefined}
            />
          </Link>
          <Link to="/account">
            <Button
              color="white"
              bgColor={currentColor}
              text="확인"
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
  );
};