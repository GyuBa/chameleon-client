import React from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { BiCool, BiCreditCard, BiFolder, BiCartAlt, BiTransfer } from 'react-icons/bi';
import { GiArtificialHive } from 'react-icons/gi';
import tar from "./images/tar.png";
import dockerfile from "./images/dockerfile.png";

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
      {
        name: 'websocket',
        icon: <BiTransfer />,
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

export const myModel = {
  header: ['Model Name', 'Input Type', 'Output Type', 'Developer', 'Last Modified Date', 'Size', ''],
  data: [
    {
      name: 'SwinIR GAN CCTV',
      link: 'SwinIR GAN CCTV',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'SentenceGenerator',
      link: 'SentenceGenerator',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'BaseSR',
      link: 'BaseSR',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'HAT',
      link: 'HAT',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'SwinIR GAN Blackbox',
      link: 'SwinIR GAN Blackbox',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'roberta-base',
      link: 'roberta-base',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'gpt2',
      link: 'gpt2',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'bert-base-uncased',
      link: 'bert-base-uncased',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },
    {
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },{
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },{
      name: 'keras-io',
      link: 'keras-io',
      input: 'text',
      output: 'binary',
      developer: '최수연',
      date: '2023.01.20.',
      size: '20KB',
    },



  ],
}

export const tabsData = [
  {
    label: "TarFile",
    content:
        "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
    img : tar
  },
  {
    label: "DockerFile",
    content:
        "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
    img : dockerfile
  },
  {
    label: "Etc",
    content:
        "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
  },
];