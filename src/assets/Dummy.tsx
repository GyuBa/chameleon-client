import React from 'react';
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {BiCreditCard, BiFolder} from 'react-icons/bi';
import {RiHistoryFill} from 'react-icons/ri';
import {GiArtificialHive} from 'react-icons/gi';
import {MdOutlineAccountCircle} from 'react-icons/md';
import tar from "./images/upload/tar.png";
import dockerfile from "./images/upload/dockerfile.png";

export const links = [
    {
        title: 'Models',
        links: [
            {
                name: 'All Models',
                link: 'models/all',
                icon: <BiFolder/>,
            },
            {
                name: 'My Models',
                link: 'models/my',
                icon: <BiFolder/>,
            },
            {
                name: 'Histories',
                link: 'histories',
                icon: <RiHistoryFill/>,
            },
        ],
    },
    {
        title: 'My Profile',
        links: [
            {
                name: 'Account',
                link: 'account',
                icon: <MdOutlineAccountCircle/>,
            },
            {
                name: 'Payment',
                link: 'payment',
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
        name: 'models/my',
        desc: 'My Model Lists',
        iconColor: 'rgb(0, 194, 146)',
        iconBg: 'rgb(235, 250, 242)',
    },
];

export const userSchema = {
    type: 'object',
    properties: {
        parameters: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    type: {
                        type: 'string',
                        enum: [
                            'string',
                            'number',
                            'integer',
                            'boolean',
                            'date',
                            'time',
                            'datetime',
                        ],
                    },
                    minInteger: {type: 'integer'},
                    maxInteger: {type: 'integer'},
                    maxNumber: {type: 'number'},
                    minNumber: {type: 'number'},
                    regex: {type: 'string'},
                    defaultInteger: {type: 'integer'},
                    defaultNumber: {type: 'number'},
                    defaultString: {type: 'string'},
                    defaultBoolean: {type: 'boolean'},
                    defaultDate: {type: 'string', format: 'date'},
                    defaultTime: {type: 'string', format: 'time'},
                    defaultDatetime: {type: 'string', format: 'date-time'},
                    integerEnum: {
                        type: 'array',
                        items: {type: 'integer'},
                    },
                    numberEnum: {
                        type: 'array',
                        items: {type: 'number'},
                    },
                    stringEnum: {
                        type: 'array',
                        items: {type: 'string'},
                    },
                    description: {type: 'string'},
                },
            },
        },
    },
};

const toUISchemaElement = (property: string, type: String, label?: string) => ({
    type: "Control",
    scope: `#/properties/${property}`,
    label,
    rule: {
        "effect": "SHOW",
        "condition": {
            "scope": "#/properties/type",
            "schema": {const: type}
        }
    }
});

const integerElements = [
    toUISchemaElement('minInteger', 'integer', 'Minimum'),
    toUISchemaElement('maxInteger', 'integer', 'Maximum'),
    toUISchemaElement('integerEnum', 'integer', 'Enum'),
    toUISchemaElement('defaultInteger', 'integer', 'Default')
];
const numberElements = [
    toUISchemaElement('minNumber', 'number', 'Minimum'),
    toUISchemaElement('maxNumber', 'number', 'Maximum'),
    toUISchemaElement('numberEnum', 'number', 'Enum'),
    toUISchemaElement('defaultNumber', 'number', 'Default')
];
const stringElements = [
    toUISchemaElement('regex', 'string', 'Regex'),
    toUISchemaElement('stringEnum', 'string', 'Enum'),
    toUISchemaElement('defaultString', 'string', 'Default')
];
// TODO: String은 Multiline도 고려해볼 것, uischema: { type: 'string', options: { multi: true } }

const booleanElements = [toUISchemaElement('defaultBoolean', 'boolean', 'Default')];
const dateElements = [
    toUISchemaElement('defaultDate', 'date', 'Default')
];
const timeElements = [
    toUISchemaElement('defaultTime', 'time', 'Default'),
];
const datetimeElements = [
    toUISchemaElement('defaultDatetime', 'datetime', 'Default'),
];
const uiSchemaElements = [integerElements, numberElements, stringElements, booleanElements, dateElements, timeElements, datetimeElements].flat();

export const userUISchema = {
    type: "VerticalLayout",
    elements: [
        {
            type: "Control",
            scope: "#/properties/parameters",
            options: {
                detail: {
                    type: 'VerticalLayout',
                    elements: [
                        {
                            type: "Control",
                            scope: "#/properties/type"
                        },
                        {
                            type: "Control",
                            scope: "#/properties/name"
                        },
                        ...uiSchemaElements,
                        {
                            type: "Control",
                            scope: "#/properties/description"
                        },
                    ]
                }
            }
        }
    ]
};

export const executeParam = [
    {
        label: "Parameters",
    },
    {
        label: "Parameters (JSON)"
    },
];

export const createParam = [
    {
        label: "Simple Builder"
    },
    {
        label: "Complex Builder"
    }
];

export const createSchema = [

    {
        label: "Schema"
    },
    {
        label: "UISchema"
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
    }
];
