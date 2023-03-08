import React from 'react';
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {BiCreditCard, BiFolder, BiCartAlt, BiTransfer} from 'react-icons/bi';
import {RiHistoryFill} from 'react-icons/ri';
import {GiArtificialHive} from 'react-icons/gi';
import {MdOutlineAccountCircle} from 'react-icons/md';
import tar from "./images/tar.png";
import dockerfile from "./images/dockerfile.png";

export const links = [
    {
        title: 'Marketplace',
        links: [
            {
                name: 'marketplace',
                icon: <BiCartAlt/>,
            },
        ],
    },
    {
        title: 'Models',
        links: [
            {
                name: 'model',
                icon: <BiFolder/>,
            },
            {
                name: 'history',
                icon: <RiHistoryFill/>,
            },
            {
                name: 'ws-test',
                icon: <BiTransfer/>,
            },
        ],
    },
    {
        title: 'My Profile',
        links: [
            {
                name: 'account',
                icon: <MdOutlineAccountCircle/>,
            },
            {
                name: 'payment',
                icon: <BiCreditCard/>,
            },
        ],
    },
];

export const userProfileData = [
    {
        icon: <BsFillPersonLinesFill/>,
        title: 'My Profile',
        name: 'account',
        desc: 'Account Settings',
        iconColor: '#03C9D7',
        iconBg: '#E5FAFB',
    },
    {
        icon: <GiArtificialHive/>,
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
        }, {
            name: 'keras-io',
            link: 'keras-io',
            input: 'text',
            output: 'binary',
            developer: '최수연',
            date: '2023.01.20.',
            size: '20KB',
        }, {
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

export const dSchema = {
    properties: {
        name: {
            type: "string"
        }
    }
}

export const dUIschema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            scope: "#/properties/name",
            options: {
                "trim": true
            }
        }
    ]
}

export const ischema = {
    type: 'object',
    properties: {
        parameters: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {type: 'string', label : 'name'},
                    type: {
                        type: 'string',
                        enum: ['string', 'number', 'integer', 'date', 'time', 'date-time', 'email']
                    },
                    enums: {
                        type: 'array',
                        items: {type: 'string'},
                        uniqueItems: true
                    },
                    min: {type: 'number'},
                    max: {type: 'number'},
                    description: {type: 'string'},
                    required: {type: 'boolean'}
                }
            }
        }
    }
};

export const iuischema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            scope: "#/properties/parameters",
            options: {
                "trim": true,
                "showLabel": false
            }
        }
    ]
};

export const uschema = {
    type: 'object',
    properties: {
        parameters: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    type: {type: 'string', enum : ["string", "number", "integer"]},
                    min: {type: 'number'},
                    max: {type: 'number'},
                    description: {type: 'string'}
                }
            }
        }
    }
}

export const exparamTab = [
    {
        label: "Parameters",
    },
    {
        label: "Parameters(JSON)"
    },
];

export const crparamTab = [
    {
        label: "Simple"
    },
    {
        label: "Complex"
    }
];

export const tabsData = [
    {
        label: "TarFile",
        img: tar
    },
    {
        label: "Dockerfile",
        img: dockerfile
    },
    {
        label: "Etc",
    },
];