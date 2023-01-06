import React from 'react';
import {Button} from '../index';
import {useStateContext} from '../../contexts/ContextProvider';
import {Link} from 'react-router-dom';

export default function ChangeName() {
  const {currentColor} = useStateContext();

  return (
    <div className="absolute border bg-white dark:bg-[#42464D] p-8 rounded-lg">
      <div className="flex justify-between items-center border-color border-b-1 pb-6">
        <p className="font-bold text-xl dark:text-gray-200">이름 변경</p>
      </div>
      <div className="flex gap-5 items-center mt-6">
        <p className="text-lg font-bold dark:text-gray-200 whitespace-nowrap">현재 이름:</p>
        <p className="text-lg dark:text-gray-200 whitespace-nowrap">최수연</p>
      </div>
      <div className="flex gap-5 items-center mt-6">
        <p className="text-lg font-bold dark:text-gray-200 whitespace-nowrap">변경할 이름: </p>
        <input
          onChange={undefined}
          type="text"
          className="text-base form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
          id="pw-2"
          placeholder="변경할 이름"/>
      </div>
      <div className="flex gap-3 float-right mt-5">
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
  );
};
