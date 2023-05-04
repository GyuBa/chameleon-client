import React, {useState} from 'react';
import {Button, Header} from "../../../components";
import {createParam, createSchema, userSchema, userUISchema} from "../../../assets/Dummy"
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Parameter} from "../../../types/Types";
import {JsonSchema} from "@jsonforms/core";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ErrorBoundary from "../module/ParamErrorboundary";
import MonaCoEditor from "@monaco-editor/react";
import "../../../styles/HideFormName.css"

const initialData = {};

const initialParameters: Parameter[] = [
    {name: 'name', type: 'string'}
];

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    parameters.forEach((param, index) => {
        const paramName = param.name;
        const paramType = param.type;
        if (paramType === "string") {
            if (param.stringEnum?.length) {
                properties[paramName] = {
                    type: paramType,
                    pattern: param.regex,
                    enum: param.stringEnum,
                    default: param.defaultString,
                    description: param.description,
                };

            } else {
                properties[paramName] = {
                    type: paramType,
                    default: param.defaultString,
                    pattern: param.regex,
                    description: param.description,
                };
            }
        } else if (paramType === "number") {
            if (param.numberEnum?.length) {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.minNumber,
                    maximum: param.maxNumber,
                    enum: param.numberEnum,
                    default: param.defaultNumber,
                    description: param.description,
                };

            } else {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.minNumber,
                    maximum: param.maxNumber,
                    default: param.defaultNumber,
                    description: param.description,
                };
            }
        } else if (paramType === "integer") {
            if (param.integerEnum?.length) {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.minInteger,
                    maximum: param.maxInteger,
                    enum: param.integerEnum,
                    default: param.defaultInteger,
                    description: param.description,
                };

            } else {
                properties[paramName] = {
                    type: paramType,
                    minimum: param.minInteger,
                    maximum: param.maxInteger,
                    default: param.defaultInteger,
                    description: param.description,
                };
            }
        } else if (paramType === "boolean") {
            properties[paramName] = {
                type: paramType,
                default: param.defaultBoolean,
                description: param.description,
            };
        } else if (paramType === "date") {
            properties[paramName] = {
                type: "string",
                format: paramType,
                default: param.defaultDate,
                description: param.description,
            };
        } else if (paramType === "time") {
            properties[paramName] = {
                type: "string",
                format: paramType,
                default: param.defaultTime,
                description: param.description,
            };
        } else if (paramType === "datetime") {
            properties[paramName] = {
                type: "string",
                format: "date-time",
                default: param.defaultTime,
                description: param.description,
            };
        }

    });

    return {
        type: 'object',
        properties: properties,
    };

}

let transSchema = generateJsonFormsSchema(initialParameters);
let transuischema = {
    type: 'VerticalLayout',
    elements: [{
        type: 'Control',
        scope: `#/properties/name`
    }]
};

export default function CreateParameter() {
    const [activeInTabIndex, setActiveInTabIndex] = useState(0);
    const [activeOutTabIndex, setActiveOutTabIndex] = useState(0);
    const {currentColor} = useStateContext();
    const [formData, setFormData] = useState(initialParameters);
    const [transformData, setTransFormData] = useState(initialData);
    const [schema, setSchema] = useState<string>("");
    const [uischema, setUISchema] = useState<string>("");
    const [status, setStatus] = useState(0);

    if (status === 0) {
        transSchema = generateJsonFormsSchema(formData);
        transuischema = {
            type: 'VerticalLayout',
            elements: formData.map((param, index) => ({
                type: 'Control',
                scope: `#/properties/${param.name}`
            }))
        };
    }

    const handleFormChange = ({data}: any) => {
        if (data.parameters !== formData) {
            setStatus(0)
        }
        setFormData(data.parameters);
        if (status === 0) {
            const stringSchema = JSON.stringify(transSchema, null, 2);
            const stringUISchema = JSON.stringify(transuischema, null, 2)
            setSchema(stringSchema);
            setUISchema(stringUISchema);
        }
    };

    const handleTransFormChange = ({data}: any) => {
        setTransFormData(data);
    };

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
                            {createParam.map((tab, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        className={`py-2 border-b-4 transition-colors duration-300 ${
                                            idx === activeOutTabIndex
                                                ? "border-teal-500"
                                                : "border-transparent hover:border-gray-200"
                                        }`}
                                        // Change the active tab on click.
                                        onClick={() => setActiveOutTabIndex(idx)}>
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="tab-content tab-space">
                            <div className={activeOutTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <div>
                                    <div className="gap-3 grid xl:grid-cols-1 md:pt-3 md:px-5 md:my-2 2xl:grid-cols-2">
                                        <div>
                                            <JsonForms
                                                data={{parameters: formData}}
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
                                                    uischema={transuischema}
                                                    renderers={materialRenderers}
                                                    cells={materialCells}
                                                    onChange={handleTransFormChange}
                                                />
                                            </ErrorBoundary>
                                            <Link to="/model/execute"
                                                  state={{schema: transSchema, uischema: transuischema}}>
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
                            <div className={activeOutTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <div>
                                    <div className="gap-3 grid xl:grid-cols-1 md:pt-3 md:px-5 md:my-2 2xl:grid-cols-2">
                                        <div>
                                            <div className="flex space-x-3 border-b">
                                                {createSchema.map((tab, idx) => {
                                                    return (
                                                        <button
                                                            key={idx}
                                                            className={`py-2 border-b-4 transition-colors duration-300 ${
                                                                idx === activeInTabIndex
                                                                    ? "border-teal-500"
                                                                    : "border-transparent hover:border-gray-200"
                                                            }`}
                                                            // Change the active tab on click.
                                                            onClick={() => setActiveInTabIndex(idx)}>
                                                            {tab.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                            <div className="tab-content tab-space">
                                                <div className={activeInTabIndex === 0 ? "block" : "hidden"} id="link3">
                                                    <h1 className="md:py-3 text-xl font-bold">Schema</h1>
                                                    <div
                                                        className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                                                        <MonaCoEditor
                                                            language="json"
                                                            height={480}
                                                            width={500}
                                                            theme="vs-light"
                                                            value={schema}
                                                            onChange={(value) => {

                                                                    try {
                                                                        setStatus(1);
                                                                        setSchema(value || '');
                                                                        const parsedSchema = JSON.parse(value || '');
                                                                        transSchema = parsedSchema;
                                                                    } catch (error) {
                                                                        console.error(error);
                                                                    }
                                                                }
                                                            }
                                                            options={{
                                                                minimap: {
                                                                    enabled: false,
                                                                },
                                                                automaticLayout: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={activeInTabIndex === 1 ? "block" : "hidden"} id="link4">
                                                    <h1 className="md:py-3 text-xl font-bold">UISchema</h1>
                                                    <div
                                                        className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                                                        <MonaCoEditor
                                                            language="json"
                                                            height={480}
                                                            width={500}
                                                            theme="vs-light"
                                                            value={uischema}
                                                            onChange={(value) => {

                                                                try {
                                                                    setStatus(1)
                                                                    setUISchema(value || '');
                                                                    const parsedUISchema = JSON.parse(value || '');
                                                                    transuischema = parsedUISchema;
                                                                } catch (error) {
                                                                    console.error(error);
                                                                }
                                                            }}
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
                                        </div>
                                        <div className="mb-2 result-container">
                                            <h1 className="md:py-3 text-xl font-bold">Result</h1>
                                            <ErrorBoundary>
                                                <div>
                                                    <JsonForms
                                                        schema={transSchema}
                                                        uischema={transuischema}
                                                        data={transformData}
                                                        renderers={materialRenderers}
                                                        cells={materialCells}
                                                        onChange={handleTransFormChange}
                                                    />
                                                    <div>
                                                        <Link to="/model/execute" state={{
                                                            schema: transSchema,
                                                            uischema: transuischema
                                                        }}>
                                                            <Button
                                                                style={{
                                                                    backgroundColor: currentColor,
                                                                    color: "white",
                                                                    borderRadius: "10px"
                                                                }}
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