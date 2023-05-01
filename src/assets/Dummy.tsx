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

export const userSchema = {
    definitions: {
        string: {
            type: "object",
            title: "string",
            label: "string",
            properties: {
                name: {
                    type: 'string'
                },
                type: {
                    type : 'string',
                    enum: ['string']
                },
                format: {
                    type: 'string',
                    enum: ['date', 'time', 'date-time', 'email']
                },
                minLength: {
                    type: 'integer',
                },
                maxLength: {
                    type: 'integer',
                },
                enum: {
                    type: 'array',
                    items: {type: 'string'},
                },
                description: {type: 'string'},
            },
        },
        number: {
            type: "object",
            title: "Number",
            properties: {
                name: {
                    type: 'string'
                },
                type: {
                    type : 'string',
                    enum: ['number']
                },
                minimum: {
                    type: 'number',
                },
                maximum: {
                    type: 'number',
                },
                default: {
                    type: 'number',
                },
                enum: {
                    type: 'array',
                    items: {type: 'number'},
                },
                Description: {
                    type: 'number',
                },
            },
        },
        integer: {
            type: "object",
            title: "Integer",
            properties: {
                name: {
                    type: 'string'
                },
                type: {
                    type : 'string',
                    enum: ['integer']
                },
                minimum: {
                    type: 'integer',
                },
                maximum: {
                    type: 'integer',
                },
                default: {
                    type: 'integer',
                },
                enum: {
                    type: 'array',
                    items: {type: 'integer'},
                },
                Description: {
                    type: 'string',
                }
            },
        },
        boolean: {
            type: "object",
            title: "Boolean",
            properties: {
                name: {
                    type: 'string'
                },
                type: {
                    type : 'string',
                    enum: ['boolean']
                },
                description: {
                    type: 'string'
                },
            },
        }
    },
    type: "object",
    properties: {
        parameter: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    typeChoose: {
                        oneOf: [
                            {
                                title: 'string',
                                $ref: "#/definitions/string"
                            },
                            {
                                title: 'number',
                                $ref: "#/definitions/number"
                            },
                            {
                                title: 'integer',
                                $ref: "#/definitions/integer"
                            },
                            {
                                title: 'boolean',
                                $ref: "#/definitions/boolean"
                            }
                        ]
                    }
                }
            }
        }
    }
};

export const userUISchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            label: "parameter",
            scope: "#/properties/parameter"
        },
    ]
};

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
        label: "Simple builder"
    },
    {
        label: "Complex builder"
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