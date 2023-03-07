import React, {useState} from 'react';
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {ischema, iuischema} from "../../../../assets/Dummy"
import {SubmitButton} from "../../../../components";
import {useStateContext} from "../../../../contexts/ContextProvider";
import {JsonSchema} from '@jsonforms/core';

interface Parameter {
    name: string;
    type: string;
    min: number;
    max: number;
    required: boolean;
    description: string;
}

interface UISchemaElement {
    type: string;
    elements?: UISchemaElement[];
    label?: string;
    options?: any;
}

const initialData = {};

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    // Iterate through the parameters and generate a JSONForms schema for each one
    parameters.forEach((param, index) => {
        const paramName = param.name.trim();

        properties[paramName] = {
            type: param.type,
            minimum: param.min,
            maximum: param.max,
            required: param.required,
            description: param.description,
            label: `Parameter ${index + 1}: ${paramName}`,
        };
    });

    return {
        type: 'object',
        properties: properties,
    };
}

function generateUISchema(parameters: Parameter[]): UISchemaElement {
    const properties: any = {};

    parameters.forEach((param, index) => {
        const paramName = param.name.trim();

        properties[paramName] = {
            type: 'Control',
            scope: '#/properties/${className}'
        };
    });

    return {
        type: "VerticalLayout",
        elements: [
            properties
        ]
    };
}

export const CreateSimpleParam = () => {
    const {currentColor} = useStateContext();
    const [formData, setFormData] = React.useState(initialData);
    const [transformData, setTransformData] = React.useState(initialData);
    const [transschema, setTransschema] = React.useState(initialData);
    const [transuischema, setTransuischema] = React.useState<UISchemaElement | undefined>(iuischema)

    const handleDataChange = (data: any) => {
        setFormData(data);
    };

    const handletransDataChange = (data: any) => {
        setTransformData(data);
    };

    const handleSubmit = () => {
        alert(`Submitted Data: ${JSON.stringify(formData)}`);
        console.log(JSON.stringify(formData))

        setTransschema(generateJsonFormsSchema(formData as Parameter[]))
        setTransuischema(generateUISchema(formData as Parameter[]))
    };

    return (
        <div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
            <div>
                <JsonForms
                    data={formData}
                    schema={ischema}
                    uischema={iuischema}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({data}) => handleDataChange(data)}
                />
                <div className="flex float-right text-center md:py-5">
                    <SubmitButton
                        style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                        className="w-18 p-2" text="Submit" onClick={() => handleSubmit()}/>
                </div>
            </div>
            <div>
                <JsonForms
                    data={transformData}
                    schema={transschema}
                    uischema={transuischema}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({data}) => handletransDataChange(data)}
                />
            </div>
        </div>
    );
};
