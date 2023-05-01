import React, {useEffect, useState} from 'react';
import {Button, Header} from "../../../components";
import {crparamTab, userSchema, userUISchema} from "../../../assets/Dummy"
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {TypeChoose} from "../../../types/Types";
import {JsonSchema} from "@jsonforms/core";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ErrorBoundary from "../module/ParamErrorboundary";
import MonaCoEditor from "@monaco-editor/react";

const initialData = {};

interface Parameter {
    typeChoose: TypeChoose;
}

const initialParameter: Parameter[] = [
    {
        typeChoose: {
            name: "name",
            type: "string",
            minLength: 1,
            maxLength: 10,
        }
    }
];

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    parameters.forEach((param, index) => {
        if (!param.typeChoose) {
            return;
        }

        const paramName = param.typeChoose.name;
        const paramType = param.typeChoose.type;
        if (paramType == "string") {
            if (param.typeChoose.enum?.length) {
                properties[paramName] = {
                    type: paramType,
                    format: param.typeChoose.format,
                    minLength: param.typeChoose.minLength,
                    maxLength: param.typeChoose.maxLength,
                    enum: param.typeChoose.enum,
                    description: param.typeChoose.description,
                };

            } else {
                properties[paramName] = {
                    type: paramType,
                    format: param.typeChoose.format,
                    minLength: param.typeChoose.minLength,
                    maxLength: param.typeChoose.maxLength,
                    description: param.typeChoose.description,
                };
            }
        } else if (paramType == "number") {
            if (param.typeChoose.enum?.length) {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.typeChoose.minimum,
                    maximum: param.typeChoose.maximum,
                    default: param.typeChoose.default,
                    enum: param.typeChoose.enum,
                    description: param.typeChoose.description,
                };
            } else {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.typeChoose.minimum,
                    maximum: param.typeChoose.maximum,
                    default: param.typeChoose.default,
                    description: param.typeChoose.description,
                };
            }
        } else if (paramType == "integer") {
            if (param.typeChoose.enum?.length) {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.typeChoose.minimum,
                    maximum: param.typeChoose.maximum,
                    default: param.typeChoose.default,
                    enum: param.typeChoose.enum,
                    description: param.typeChoose.description,
                };
            } else {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.typeChoose.minimum,
                    maximum: param.typeChoose.maximum,
                    default: param.typeChoose.default,
                    description: param.typeChoose.description,
                };
            }
        } else if (paramType == "boolean") {
            properties[paramName] = {
                type: paramType,
                description: param.typeChoose.description,
            };
        } else {
            properties[paramName] = {
                type: paramType
            };
        }

    });

    return {
        type: "object",
        properties: properties,
    };
}


export default function CreateParameter() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {currentColor} = useStateContext();
    const [formData, setFormData] = useState(initialParameter);
    const [transformData, setTransFormData] = useState(initialData);

    let transSchema = generateJsonFormsSchema(formData);

    let transUIschema = {
        type: 'VerticalLayout',
        elements: formData.map((param) => ({
            type: 'Control',
            scope: `#/properties/${param.typeChoose?.name || 'undefined'}`
        }))
    };

    const handleFormChange = ({data}: any) => {
        setFormData(data.parameter);
        console.log(data)
    };

    const handletransFormChange = ({data}: any) => {
        setTransFormData(data);
    };

    const stringSchema = JSON.stringify(transSchema, null, 2);
    const stringUISchema = JSON.stringify(transUIschema, null, 2)
    const [schema, setSchema] = useState<string>(stringSchema);
    const [uischema, setUISchema] = useState<string>(stringUISchema);
    const [complexTransSchema, setComplexTransSchema] = useState(transSchema);
    const [complexTransUISchema, setComplexTransUISchema] = useState(transUIschema);

    useEffect(() => {
        try {
            const parsedSchema = JSON.parse(schema);
            setComplexTransSchema(parsedSchema);
        } catch (error) {
            console.error(error);
        }
    }, [schema]);

    useEffect(() => {
        try {
            const parsedUISchema = JSON.parse(uischema);
            setComplexTransUISchema(parsedUISchema);
        } catch (error) {
            console.error(error);
        }
    }, [uischema]);

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div>
                    <div className="py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Header category="" title="Model Parameter"/>
                            </div>
                        </div>
                        <div className="flex space-x-3 border-b">
                            {crparamTab.map((tab, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        className={`py-2 border-b-4 transition-colors duration-300 ${
                                            idx === activeTabIndex
                                                ? "border-teal-500"
                                                : "border-transparent hover:border-gray-200"
                                        }`}
                                        // Change the active tab on click.
                                        onClick={() => setActiveTabIndex(idx)}>
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="tab-content tab-space">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <div>
                                    <div className="gap-3 grid md:grid-cols-1 md:pt-10 md:px-5 md:my-2 xl:grid-cols-2">
                                        <div>
                                            <JsonForms
                                                data={{parameter: formData}}
                                                schema={userSchema}
                                                uischema={userUISchema}
                                                renderers={materialRenderers}
                                                cells={materialCells}
                                                onChange={handleFormChange}
                                            />
                                        </div>
                                        <div>
                                            <h1 className="md:py-3 text-xl font-bold">Result</h1>
                                            <ErrorBoundary>
                                                <JsonForms
                                                    data={transformData}
                                                    schema={transSchema}
                                                    uischema={transUIschema}
                                                    renderers={materialRenderers}
                                                    cells={materialCells}
                                                    onChange={handletransFormChange}
                                                />
                                            </ErrorBoundary>
                                            <Link to="/model/execute"
                                                  state={{schema: transSchema, uischema: transUIschema}}>
                                                <Button style={{
                                                    backgroundColor: currentColor,
                                                    color: "white",
                                                    borderRadius: "10px"
                                                }} className="w-32 p-2" text="Parameter Test"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <div>
                                    <div className="gap-3 grid md:grid-cols-1 md:pt-10 md:px-5 md:my-2 xl:grid-cols-2">
                                        <div>
                                            <h1 className="md:py-3 text-xl font-bold">Schema</h1>
                                            <div
                                                className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                                                <MonaCoEditor
                                                    language="json"
                                                    height={300}
                                                    width={400}
                                                    theme="vs-light"
                                                    value={schema}
                                                    onChange={(value) => setSchema(value || '')}
                                                    options={{
                                                        minimap: {
                                                            enabled: false,
                                                        },
                                                        automaticLayout: true,
                                                    }}
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <h1 className="md:py-3 text-xl font-bold">UISchema</h1>
                                                <div
                                                    className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                                                    <MonaCoEditor
                                                        language="json"
                                                        height={300}
                                                        width={400}
                                                        theme="vs-light"
                                                        value={uischema}
                                                        onChange={(value) => setUISchema(value || '')}
                                                        options={{
                                                            minimap: {
                                                                enabled: false,
                                                            },
                                                            automaticLayout: true,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2 result-container">
                                            <h1 className="md:py-3 text-xl font-bold">Result</h1>
                                            <ErrorBoundary>
                                                <div>
                                                    <JsonForms
                                                        schema={complexTransSchema}
                                                        uischema={complexTransUISchema}
                                                        data={transformData}
                                                        renderers={materialRenderers}
                                                        cells={materialCells}
                                                        onChange={({data}) => setTransFormData(data)}
                                                    />
                                                    <div>
                                                        <Link to="/model/execute" state={{schema: complexTransSchema, uischema: complexTransUISchema}}>
                                                            <Button
                                                                style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                                                className="w-32 p-2" text="Parameter Test"/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </ErrorBoundary>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 float-right">
                    <Link to="/model/create/description">
                        <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                                className="w-16 p-2" text="back"/>
                    </Link>
                    <Link to="/model">
                        <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                className="w-16 p-2" text="create"/>
                    </Link>
                </div>
            </div>
        </div>
    );
};