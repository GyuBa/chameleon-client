import React, {useEffect} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {FiShoppingCart} from 'react-icons/fi';
import {BsFillPersonFill} from 'react-icons/bs';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {Cart, UserProfile} from '../index';
import {useStateContext} from '../../contexts/ContextProvider';
import {NavButtonData} from '../../types/Types';

const NavButton = ({customFunc, icon, color, dotColor}: NavButtonData) => (
  <button
    type="button"
    onClick={() => customFunc()}
    style={{color}}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray"
  >
      <span
        style={{background: dotColor}}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
    {icon}
  </button>
);

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
  }, []);

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
        <NavButton customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart/>}
                   dotColor={undefined}/>
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
        {isClicked.cart && (<Cart/>)}
        {isClicked.userProfile && (<UserProfile/>)}
      </div>
    </div>
  );
};