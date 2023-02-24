import React from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {UserProfile} from '../index';
import {useStateContext} from '../../contexts/ContextProvider';

export default function Navbar() {
  const {currentColor, handleClick, isClicked, handleActiveMenu} = useStateContext();

  return (
    <div className="flex w-full justify-between p-2 relative">
      <button type="button" onClick={handleActiveMenu} style={{color: `${currentColor}`}}
              className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      ><AiOutlineMenu/></button>
      <div className="flex">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick('userProfile')}
        ><BsFillPersonFill className="w-5 h-5"/>
          <p>
            <span className="text-gray-700 text-14">Welcome,</span>{' '}
            <span className="text-gray-700 font-bold ml-1 text-14">
              최수연
            </span>
          </p>
          <MdKeyboardArrowDown className="text-gray-400 text-14"/>
        </div>
        {isClicked.userProfile && (<UserProfile/>)}
      </div>
    </div>
  );
};