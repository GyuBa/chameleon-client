import React from 'react';
import {MdOutlineCancel} from 'react-icons/md';
import {useStateContext} from '../contexts/ContextProvider';
import {Button} from './index';

export default function Cart () {
  const {currentColor} = useStateContext();

  return (
    <div className="bg-half-transparent w-full fixed nav-item top-0 right-0 ">
      <div
        className="float-right h-screen  duration-1000 ease-in-out dark:text-gray-200 transition-all dark:bg-[#484B52] bg-white md:w-400 p-8">
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Model Lists</p>
          <Button
            icon={<MdOutlineCancel/>}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%" bgColor={undefined} text={undefined} width={undefined}/>
        </div>

        <div className="mt-3 mb-3">
          <div className="flex justify-between items-center">
            <p className="text-gray-500 dark:text-gray-200">Sub Total</p>
            <p className="font-bold">$890</p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="text-gray-500 dark:text-gray-200">Total</p>
            <p className="font-bold">$890</p>
          </div>
        </div>
        <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="Purchase"
            borderRadius="10px"
            width="full" icon={undefined} bgHoverColor={undefined} size={undefined}/>
        </div>
      </div>
    </div>
  );
};
