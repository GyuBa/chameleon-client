import React, {useEffect} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {UserProfile} from '../index';
import {useStateContext} from '../../contexts/ContextProvider';
import {NavButton} from '../../components/index';

export default function Navbar () {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  });

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex w-full justify-between p-2 relative">
      <NavButton customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu/>} dotColor={undefined}/>
      <div className="flex">
        <div
          className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          onClick={() => handleClick('userProfile')}
        >
          <BsFillPersonFill className="w-5 h-5"/>
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