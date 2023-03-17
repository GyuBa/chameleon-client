import React, {useState} from 'react';
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {ischema, iuischema} from "../../../../assets/Dummy"
import {Button} from "../../../../components";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {JsonSchema} from '@jsonforms/core';
import ErrorBoundary from "../../module/ParamErrorboundary"
import {Parameter} from "../../../../types/Types"
import {Link} from "react-router-dom";

const initialData = {};

const initialParameters: Parameter[] = [
    {name: 'name', type: 'string', min: 1, max: 12, default: 3}
];

var schema = generateJsonFormsSchema(initialParameters);

function convertToNumber(enums?: string[]): number[] | undefined {
    if (!enums) {
        return undefined;
    }

    const nums = enums.map((num) => parseInt(num));
    return nums;
}

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    parameters.forEach((param, index) => {
        console.log(param.enum?.length)
        const paramName = param.name;
        const paramType = param.type;
        if (paramType == 'string') {
            if (!!param.enum?.length) {
                properties[paramName] = {
                    type: param.type,
                    minLength: param.min,
                    maxLength: param.max,
                    enum: param.enum,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            } else {
                properties[paramName] = {
                    type: param.type,
                    minLength: param.min,
                    maxLength: param.max,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            }
        } else if (paramType == 'date') {
            if (!!param.enum?.length) {
                properties[paramName] = {
                    type: "string",
                    format: "date",
                    minLength: param.min,
                    maxLength: param.max,
                    enum: param.enum,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            } else {
                properties[paramName] = {
                    type: "string",
                    format: "date",
                    minLength: param.min,
                    maxLength: param.max,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            }
        } else if (paramType == 'time') {
            if (!!param.enum?.length) {
                properties[paramName] = {
                    type: "string",
                    format: "time",
                    minLength: param.min,
                    maxLength: param.max,
                    enum: param.enum,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            } else {
                properties[paramName] = {
                    type: "string",
                    format: "time",
                    minLength: param.min,
                    maxLength: param.max,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            }
        } else if (paramType == 'datetime') {
            if (!!param.enum?.length) {
                properties[paramName] = {
                    type: "string",
                    format: "date-time",
                    minLength: param.min,
                    maxLength: param.max,
                    enum: param.enum,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            } else {
                properties[paramName] = {
                    type: "string",
                    format: "date-time",
                    minLength: param.min,
                    maxLength: param.max,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            }
        } else if (paramType == 'email') {
            if (!!param.enum?.length) {
                properties[paramName] = {
                    type: "string",
                    format: "email",
                    minLength: param.min,
                    maxLength: param.max,
                    enum: param.enum,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            } else {
                properties[paramName] = {
                    type: "string",
                    format: "email",
                    minLength: param.min,
                    maxLength: param.max,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            }
        } else {
            if (!!param.enum?.length) {
                const num = convertToNumber(param.enum);
                properties[paramName] = {
                    type: param.type,
                    minimum: param.min,
                    maximum: param.max,
                    default: param.default,
                    enum: num,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            } else {
                properties[paramName] = {
                    type: param.type,
                    minimum: param.min,
                    maximum: param.max,
                    default: param.default,
                    description: param.description,
                    label: `Parameter ${index + 1}: ${paramName}`,
                };
            }
        }
    });

    return {
        type: 'object',
        properties: properties,
    };

}

export const CreateSimpleParam = () => {
    const {currentColor} = useStateContext();
    const [formData, setFormData] = useState(initialParameters);
    const [transformData, settransFormData] = useState(initialData);

    schema = generateJsonFormsSchema(formData);

    const transuischema = {
        type: 'VerticalLayout',
        elements: formData.map((param, index) => ({
            type: 'Control',
            scope: `#/properties/${param.name}`
        }))
    };

    return (
        <div className="gap-3 grid md:pt-10 md:px-5 md:my-2 grid-cols-2" style={{gridTemplateColumns: '4fr 3fr'}}>
            <div>
                <JsonForms
                    data={{parameters: formData}}
                    schema={ischema}
                    uischema={iuischema}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({data}) => setFormData(data.parameters)}
                />
            </div>
            <div>
                <h1 className="md:py-3 text-xl font-bold">Result</h1>
                <ErrorBoundary>
                    <JsonForms
                        data={transformData}
                        schema={schema}
                        uischema={transuischema}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({data}) => settransFormData(data)}
                    />
                </ErrorBoundary>
                <Link to="/model/execute" state={{schema: schema, uischema: transuischema}}>
                    <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                            className="w-32 p-2" text="Parameter Test"/>
                </Link>
            </div>
        </div>
    );
};
