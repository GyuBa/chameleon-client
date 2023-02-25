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

export const tabsData = [
    {
        label: "TarFile",
        content:
            "Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.",
        img: tar
    },
    {
        label: "Dockerfile",
        content:
            "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
        img: dockerfile
    },
    {
        label: "Etc",
        content:
            "Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.",
    },
];

/* export const schema = {
  definitions: {
    string: {
      type: "object",
      title: "String",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            minLength: {
              type: 'number',
            },
            maxLength: {
              type: 'number',
            },
            Enum: {
              type: 'string',
              minLength: 1
            },
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
        UISchema : {
          type : 'object',
          properties : {
            MultiOption: {
              type: 'boolean',
              Label: 'Turn on Multiline'
            },
            TrimOption: {
              type: 'boolean'
            },
            RestrictOption: {
              type: 'boolean'
            },
            ShowUnfocusedDescription: {
              type: 'boolean'
            },
            hideRequiredAsterisk : {
              type: 'boolean'
            }
          }
        }
      },
    },
    number: {
      type: "object",
      title: "Number",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            maximum: {
              type: 'number',
            },
            minimum: {
              type: 'number',
            },
            default: {
              type: 'number',
            },
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
        UISchema : {
          type : 'object',
          properties : {
            SliderOption: {
              type: 'boolean'
            },
          }
        }
      },
    },
    integer: {
      type: "object",
      title: "Integer",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            maximum: {
              type: 'number',
            },
            minimum: {
              type: 'number',
            },
            default: {
              type: 'number',
            },
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
        UISchema : {
          type : 'object',
          properties : {
            SliderOption: {
              type: 'boolean'
            },
          }
        }
      },
    },
    boolean: {
      type: "object",
      title: "Boolean",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
        UISchema : {
          type : 'object',
          properties : {
            ToggleOption: {
              type: 'boolean'
            },
          }
        }
      },
    },
    items: {
      type: "array",
      title: "Items",
      items : {
        type: 'object',
        properties: {
          Name: {
            type: 'string',
            minLength: 1
          },
          Type: {
            type: 'string',
            enum: ['string', 'integer', 'number', 'boolean', 'date', 'time', 'date-time', 'email']
          },
          Enum: {
            type: 'string',
            minLength: 1
          },
          Description: {
            type: 'string',
            minLength: 1
          },
          Required: {
            type: 'boolean'
          }
        }
      }
    },

    date: {
      type: "object",
      title: "Date",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
      },
    },

    time: {
      type: "object",
      title: "Date",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
      },
    },

    datetime: {
      type: "object",
      title: "Date",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
      },
    },

    email: {
      type: "object",
      title: "Email",
      properties: {
        Schema: {
          type : 'object',
          properties : {
            Description: {
              type: 'string',
              minLength: 1
            },
            Required: {
              type: 'boolean'
            }
          }
        },
      },
    }
  },
  type: "object",
  properties: {
    parameter : {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          Name: {
            type: 'string',
            minLength: 1
          },
          Type: {
            oneOf: [
              {
                title : 'string',
                $ref: "#/definitions/string"
              },
              {
                title : 'number',
                $ref: "#/definitions/number"
              },
              {
                title : 'integer',
                $ref: "#/definitions/integer"
              },
              {
                title : 'boolean',
                $ref: "#/definitions/boolean"
              },
              {
                title : 'array',
                $ref: "#/definitions/items"
              },
              {
                title : 'date',
                $ref: "#/definitions/date"
              },
              {
                title : 'time',
                $ref: "#/definitions/time"
              },
              {
                title : 'datetime',
                $ref: "#/definitions/datetime"
              },
              {
                title : 'email',
                $ref: "#/definitions/email"
              }
            ]
          }
        }
      }
    }
  }
};
export const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      label: "Parameter",
      scope: "#/properties/parameter"
    },
  ]
}; */

export const dSchema = {
    properties: {
        name: {
            type: "string"
        }
    }
}

export const dUIschema = {
    type: "Control",
    scope: "#/properties/name"
}

export const paramTab = [
    {
        label: "Parameters",
    },
    {
        label: "Parameters(JSON)"
    },
];