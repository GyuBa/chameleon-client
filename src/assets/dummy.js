import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BiLogOut, BiLogIn, BiColorFill } from 'react-icons/bi';
import { GiArtificialHive } from 'react-icons/gi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, } from 'react-icons/ri';

export const links = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'main',
        icon: <FiShoppingBag />,
      },
    ],
  },
  {
    title: 'Models',
    links: [
      {
        name: 'model1',
        icon: <AiOutlineShoppingCart />,
      },
      {
        name: 'model2',
        icon: <IoMdContacts />,
      },
      {
        name: 'model3',
        icon: <RiContactsLine />,
      },
    ],
  },
  {
    title: 'historys',
    links: [
      {
        name: 'history',
        icon: <BiColorFill />,
      },
    ],
  },
  {
    title: 'Authentication',
    links: [
      {
        name: 'login',
        icon: <BiLogIn />,
      },
      {
        name: 'signup',
        icon: <BiLogOut />,
      },
    ],
  },
];

export const themeColors = [
  {
    name: 'blue-theme',
    color: '#1A97F5',
  },
  {
    name: 'green-theme',
    color: '#03C9D7',
  },
  {
    name: 'purple-theme',
    color: '#7352FF',
  },
  {
    name: 'red-theme',
    color: '#FF5C8E',
  },
  {
    name: 'indigo-theme',
    color: '#1E4DB7',
  },
  {
    color: '#FB9678',
    name: 'orange-theme',
  },
];

export const userProfileData = [
  {
    icon: <BsFillPersonLinesFill />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <GiArtificialHive />,
    title: 'My Models',
    desc: 'My Model Lists',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
];