import React, {useEffect, useMemo, useState} from 'react';
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {userSchema, userUIschema} from "../../../../assets/Dummy";
import {JsonSchema} from '@jsonforms/core';
import ErrorBoundary from "../../module/ParamErrorboundary";
import {Parameter} from "../../../../types/Types";

interface CreateSimpleParamProps {
    onSchemaChange: (newSchema: JsonSchema) => void;
    onTransUISchemaChange: (newTransUISchema: any) => void;
}

const initialData = {};

const initialParameters: Parameter[] = [
    {name: 'name', type: 'string', min: 1, max: 12, default: 3}
];

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    parameters.forEach((param, index) => {
        const paramName = param.name;
        const paramType = param.type;
        if (param.enum?.length) {
            const num = param.enum.map(e => parseInt(e))
            properties[paramName] = {
                type: (paramType === "date" || paramType === "time" || paramType === "date-time" || paramType === "email") ? "string" : paramType,
                format: paramType,
                minLength: param.min,
                maxLength: param.max,
                minimum: param.min,
                maximum: param.max,
                enum: (paramType === "number" || paramType === "integer") ? num : param.enum,
                description: param.description,
            };
        } else {
            properties[paramName] = {
                type: (paramType === "date" || paramType === "time" || paramType === "date-time" || paramType === "email") ? "string" : paramType,
                format: paramType,
                minLength: param.min,
                maxLength: param.max,
                minimum: param.min,
                maximum: param.max,
                description: param.description,
            };
        }
    });

    return {
        type: 'object',
        properties: properties,
    };
}

export const CreateSimpleParam: React.FC<CreateSimpleParamProps> = ({onSchemaChange, onTransUISchemaChange}) => {
    const [formData, setFormData] = useState(initialParameters);
    const [transformData, setTransFormData] = useState(initialData);

    const schema = useMemo(() => generateJsonFormsSchema(formData), [formData]);

    const transuischema = useMemo(() => {
        return{
            type: 'VerticalLayout',
            elements: formData.map((param, index) => ({
                type: 'Control',
                scope: `#/properties/${param.name}`
            }))
        };
    }, [formData]);

    useEffect(() => {
        onSchemaChange(schema);
        onTransUISchemaChange(transuischema);
    }, [schema, transuischema]);

    return (
        <div className="gap-3 grid md:pt-10 md:px-5 md:my-2 grid-cols-2" style={{gridTemplateColumns: '2fr 1fr'}}>
            <div>
                <JsonForms
                    data={{parameters: formData}}
                    schema={userSchema}
                    uischema={userUIschema}
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
                        onChange={({data}) => setTransFormData(data)}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
};
