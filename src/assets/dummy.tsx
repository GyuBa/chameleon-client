import React from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BiColorFill, BiCool, BiCreditCard, BiFolder, BiCartAlt } from 'react-icons/bi';
import { GiArtificialHive } from 'react-icons/gi';

export const links = [
  {
    title: 'Marketplace',
    links: [
      {
        name: 'main',
        icon: <BiCartAlt />,
      },
    ],
  },
  {
    title: 'Models',
    links: [
      {
        name: 'model',
        icon: <BiFolder />,
      },
    ],
  },
  {
    title: 'My Profile',
    links: [
      {
        name: 'account',
        icon: <BiCool />,
      },
      {
        name: 'payment',
        icon: <BiCreditCard />,
      },
      {
        name: 'websocket',
        icon: <BiColorFill />,
      },
    ],
  },
];

export const userProfileData = [
  {
    icon: <BsFillPersonLinesFill />,
    title: 'My Profile',
    name: 'account',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <GiArtificialHive />,
    title: 'My Models',
    name: 'model',
    desc: 'My ExecuteModel Lists',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
];

export const createModel = [
  {
    name: 'tar file',
    link: 'tarfile'
  },
  {
    name: 'dockerfile',
    link: 'dockerfile'
  },
  {
    name: 'etc',
    link: 'etc'
  }
]

export const myModel = {
  header: ['Model Name', 'Input Type', 'Output Type', 'Constructor', 'Last Modified Date', 'Size', ''],
  data: [
    {
      name: 'Model01',
      link: 'model01',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model0223123',
      link: 'model02',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model03',
      link: 'model03',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model04',
      link: 'model04',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model05',
      link: 'model05',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model06',
      link: 'model06',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model07',
      link: 'model07',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model08',
      link: 'model08',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'Model09',
      link: 'model09',
      input: 'Text',
      output: 'Text',
      constructor: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
  ],
}