import React, {useState} from 'react';
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {ischema ,iuischema} from "../../../../assets/Dummy"
import {Button} from "../../../../components";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {JsonSchema} from '@jsonforms/core';
import ErrorBoundary from "../../module/ParamErrorboundary"
import {Link} from "react-router-dom";

const initialData = {};

interface Parameter {
    name: string;
    type?: string;
    min?: number;
    max?: number;
    description?: string;
}

const initialParameters: Parameter[] = [
    {name: 'name', type: 'string', min: 1, max: 12}
];

var schema = generateJsonFormsSchema(initialParameters);

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    parameters.forEach((param, index) => {
        const paramName = param.name;
        const paramType = param.type;
        if(paramType == 'string') {
            properties[paramName] = {
                type: param.type,
                minLength: param.min,
                maxLength: param.max,
                description: param.description,
                label: `Parameter ${index + 1}: ${paramName}`,
            };
        }
        else if(paramType == 'date') {
            properties[paramName] = {
                type: "string",
                format: "date",
                minLength: param.min,
                maxLength: param.max,
                description: param.description,
                label: `Parameter ${index + 1}: ${paramName}`,
            };
        }
        else if(paramType == 'time') {
            properties[paramName] = {
                type: "string",
                format: "time",
                minLength: param.min,
                maxLength: param.max,
                description: param.description,
                label: `Parameter ${index + 1}: ${paramName}`,
            };
        }
        else if(paramType == 'datetime') {
            properties[paramName] = {
                type: "string",
                format: "date-time",
                minLength: param.min,
                maxLength: param.max,
                description: param.description,
                label: `Parameter ${index + 1}: ${paramName}`,
            };
        }
        else if(paramType == 'email') {
            properties[paramName] = {
                type: "string",
                format: "email",
                minLength: param.min,
                maxLength: param.max,
                description: param.description,
                label: `Parameter ${index + 1}: ${paramName}`,
            };
        }
        else {
            properties[paramName] = {
                type: param.type,
                minimum: param.min,
                maximum: param.max,
                description: param.description,
                label: `Parameter ${index + 1}: ${paramName}`,
            };
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
        <div className="gap-3 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
            <div className="mb-2">
                <JsonForms
                    data={{parameters: formData}} // formData 객체를 'parameters' 속성을 가진 객체로 감싸기
                    schema={ischema}
                    uischema={iuischema}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({data}) => setFormData(data.parameters)}
                />
            </div>
            <div className="mb-2">
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
