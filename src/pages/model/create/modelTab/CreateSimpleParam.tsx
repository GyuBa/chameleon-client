import React, {useState} from 'react';
import {JsonForms} from "@jsonforms/react";
import { UISchemaElement } from '@jsonforms/core';
import { JsonSchema } from '@jsonforms/core';
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";

const schema = {
    type: 'object',
    properties: {
        items: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    type: {type: 'string'},
                    enums: {
                        type: 'array',
                        items: {type: 'string'},
                        uniqueItems: true
                    },
                    minLength: {type: 'number'},
                    maxLength: {type: 'number'}
                }
            }
        }
    }
};

const uischema = {
    type: 'Control',
    scope: '#/properties/items'
};

interface Field {
    name: string;
    type: string;
    minLength?: number;
    maxLength?: number;
    enums?: string[];
}

interface Schema {
    type: string;
    properties: {
        [key: string]: {
            type: string;
            minLength?: number;
            maxLength?: number;
            enum?: string[];
        };
    };
}

function convertToSchema(fields: Field[]): Schema {
    const properties: Schema['properties'] = {};

    fields.forEach(({ name, type, minLength, maxLength, enums }) => {
        const fieldSchema: Schema['properties'][string] = {
            type,
        };

        if (minLength) {
            fieldSchema.minLength = minLength;
        }

        if (maxLength) {
            fieldSchema.maxLength = maxLength;
        }

        if (enums?.length) {
            fieldSchema.enum = enums;
        }

        properties[name] = fieldSchema;
    });

    return {
        type: 'object',
        properties,
    };
}

export const CreateSimpleParam = () => {
    const [formData, setFormData] = useState<Field[]>([]);
    const convertSchema = convertToSchema(formData)
    const [converformData, setconverformData] = useState( {items: []});

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        console.log(convertSchema);
    };

    return (
        <div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
            <div>
                <form onSubmit={handleSubmit}>
                    <JsonForms
                        schema={schema}
                        uischema={uischema}
                        data={formData}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({data}) => setFormData(data)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <JsonForms
                schema={convertSchema}
                uischema={uischema}
                data={converformData}
                renderers={materialRenderers}
                cells={materialCells}
                onChange={({data}) => setconverformData(data)}
            />
        </div>
    );
};
