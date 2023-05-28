import {JsonSchema} from "@jsonforms/core";
import {ParameterDetail} from "../types/chameleon-client";
import {ParameterType} from "../types/chameleon-client.enum";
import {ModelParameters} from "../types/chameleon-platform.common";

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

export class JsonFormUtils {
    public static readonly builderUISchema = {
        type: "VerticalLayout",
        elements: [
            {
                type: "Control",
                scope: "#/properties/parameterDetails",
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

    public static readonly builderSchema = {
        type: 'object',
        properties: {
            parameterDetails: {
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

    static generateParameters(parameterDetails: ParameterDetail[]): ModelParameters {
        return {
            uischema: this.generateUISchema(parameterDetails),
            schema: this.generateSchema(parameterDetails),
            data: this.generateData(parameterDetails)
        };
    }

    private static getDefaultValue(parameterDetail: ParameterDetail) {
        return [parameterDetail.defaultInteger,
            parameterDetail.defaultNumber,
            parameterDetail.defaultString,
            parameterDetail.defaultBoolean,
            parameterDetail.defaultDate,
            parameterDetail.defaultTime,
            parameterDetail.defaultDatetime].find(d => d !== undefined);
    }

    static generateData(parameterDetails: ParameterDetail[]) {
        parameterDetails = parameterDetails?.filter(d => d.name !== undefined && d.type !== undefined && this.getDefaultValue(d) !== undefined);
        return parameterDetails.reduce((object, detail) => ({
            ...object,
            [detail.name]: this.getDefaultValue(detail)
        }), {});
    }

    static generateUISchema(parameterDetails: ParameterDetail[]) {
        parameterDetails = parameterDetails?.filter(d => d.name !== undefined && d.type !== undefined);
        return {
            type: 'VerticalLayout',
            elements: parameterDetails.map(parameterDetail => ({
                type: 'Control',
                scope: `#/properties/${parameterDetail.name === undefined ? "no" : parameterDetail.name}`
            }))
        }
    }

    static generateSchema(parameterDetails: ParameterDetail[]): JsonSchema {
        parameterDetails = parameterDetails?.filter(d => d.name !== undefined && d.type !== undefined);

        const properties: any = {};
        for (const parameterDetail of parameterDetails) {
            const {name, type, pattern, description} = parameterDetail;
            switch (type) {
                case ParameterType.STRING:
                    properties[name] = {
                        type,
                        pattern,
                        description,
                        default: parameterDetail.defaultString,
                    };
                    if (parameterDetail.stringEnum && parameterDetail.stringEnum?.length) {
                        for (let i = 0; i < parameterDetail.stringEnum?.length; i++) {
                            if (typeof parameterDetail.stringEnum[i] === 'undefined') {
                                parameterDetail.stringEnum[i] = 'name';
                            }
                        }
                        for (let i = 0; i < parameterDetail.stringEnum?.length; i++) {
                            for(let j = 0; j < i; j++) {
                                if(parameterDetail.stringEnum[i] === parameterDetail.stringEnum[j])
                                    parameterDetail.stringEnum[i] = parameterDetail.stringEnum[i] + 1
                            }
                        }

                        properties[name].enum = parameterDetail.stringEnum;
                    }
                    break;
                case ParameterType.NUMBER:
                    properties[name] = {
                        type,
                        description,
                        minimum: parameterDetail.minNumber,
                        maximum: parameterDetail.maxNumber,
                        default: parameterDetail.defaultNumber,
                    };
                    if (parameterDetail.numberEnum && parameterDetail.numberEnum?.length) {
                        for (let i = 0; i < parameterDetail.numberEnum.length; i++) {
                            if (typeof parameterDetail.numberEnum[i] === 'undefined') {
                                parameterDetail.numberEnum[i] = 0;
                            }
                        }

                        for (let i = 0; i < parameterDetail.numberEnum?.length; i++) {
                            for(let j = 0; j < i; j++) {
                                if(parameterDetail.numberEnum[i] === parameterDetail.numberEnum[j])
                                    parameterDetail.numberEnum[i] += 1
                            }
                        }
                        properties[name].enum= parameterDetail.numberEnum;
                    }
                    break;
                case ParameterType.INTEGER:
                    properties[name] = {
                        type,
                        description,
                        minimum: parameterDetail.minInteger,
                        maximum: parameterDetail.maxInteger,
                        default: parameterDetail.defaultInteger,
                    };
                    if (parameterDetail.integerEnum && parameterDetail.integerEnum?.length) {
                        for (let i = 0; i < parameterDetail.integerEnum?.length; i++) {
                            if (typeof parameterDetail.integerEnum[i] === 'undefined') {
                                parameterDetail.integerEnum[i] = 0;
                            }
                        }

                        for (let i = 0; i < parameterDetail.integerEnum?.length; i++) {
                            for(let j = 0; j < i; j++) {
                                if(parameterDetail.integerEnum[i] === parameterDetail.integerEnum[j])
                                    parameterDetail.integerEnum[i] += 1
                            }
                        }

                        properties[name].enum = parameterDetail.integerEnum;
                    }
                    break;
                case ParameterType.BOOLEAN:
                    properties[name] = {
                        type,
                        default: parameterDetail.defaultBoolean,
                        description
                    };
                    break;
                case ParameterType.DATE:
                case ParameterType.TIME:
                case ParameterType.DATETIME:
                    properties[name] = {
                        type: "string",
                        format: type,
                        default: parameterDetail.defaultTime,
                        description,
                    };
                    break;
            }
        }

        return {
            type: 'object',
            properties
        };
    }
}