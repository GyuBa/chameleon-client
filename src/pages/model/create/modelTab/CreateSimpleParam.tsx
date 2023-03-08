import React, {useState} from 'react';
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {uschema} from "../../../../assets/Dummy"
import {Button, SubmitButton} from "../../../../components";
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

interface UISchemaElement {
    type?: string;
    elements?: UISchemaElement[];
    label?: string;
    options?: any;
}

const initialParameters: Parameter[] = [
    {name: 'name', type: 'string', min: 1, max: 12}
];
var schema = generateJsonFormsSchema(initialParameters);
const duischema = {
    type: 'VerticalLayout',
    elements: [
        {
            type: 'Control',
            scope: '#/properties/parameters'
        }
    ]
}

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    parameters.forEach((param, index) => {
        const paramName = param.name;
        properties[paramName] = {
            type: param.type,
            minimum: param.min,
            maximum: param.max,
            description: param.description,
            label: `Parameter ${index + 1}: ${paramName}`,
        };
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

    const handleSubmit = () => {
        alert(`Submitted Data: ${JSON.stringify(formData)}`);
    };

    try {
        schema = generateJsonFormsSchema(formData);
    } catch {
    }

    const uischema = {
        type: 'VerticalLayout',
        elements: formData.map((param, index) => ({
            type: 'Control',
            scope: `#/properties/${param.name}`
        }))
    };

    return (
        <div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
            <div className="mb-2">
                <JsonForms
                    data={{parameters: formData}} // formData 객체를 'parameters' 속성을 가진 객체로 감싸기
                    schema={uschema}
                    uischema={duischema}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({data}) => setFormData(data.parameters)}
                />
                <div className="flex float-right text-center md:py-5">
                    <SubmitButton
                        style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                        className="w-18 p-2"
                        text="Submit"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
            <div className="mb-2">
                <h1 className="md:py-3 text-xl font-bold">Result</h1>
                <ErrorBoundary>
                    <JsonForms
                        data={transformData}
                        schema={schema}
                        uischema={uischema}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({data}) => settransFormData(data)}
                    />
                </ErrorBoundary>
                <Link to="/model/execute" state={{schema: schema, uischema: uischema}}>
                    <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                            className="w-32 p-2" text="Parameter Test"/>
                </Link>
            </div>
        </div>
    );
};
