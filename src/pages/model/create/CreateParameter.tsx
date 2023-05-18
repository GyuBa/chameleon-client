import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Parameter} from "../../../types/chameleon-client";
import {createParam, createSchema, userSchema, userUISchema} from "../../../assets/Dummy";
import {JsonSchema} from "@jsonforms/core";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ErrorBoundary from "../module/ErrorBoundary";
import MonaCoEditor from "@monaco-editor/react";
import "../../../styles/hide-form-name.css"
import {PlatformAPI} from "../../../platform/PlatformAPI";
import Header from "../../../components/layout/Header";
import {RiErrorWarningFill} from "react-icons/ri";
import LoadingCircle from "../../static/LoadingCircle";

const initialData = {};

const initialParameters: Parameter[] = [
    {name: 'name', type: 'string'}
];

function generateJsonFormsSchema(parameters: Parameter[]): JsonSchema {
    const properties: any = {};

    parameters.forEach((param) => {
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
let transUISchema = {
    type: 'VerticalLayout',
    elements: [{
        type: 'Control',
        scope: `#/properties/name`
    }]
};

export default function CreateParameters() {
    const [activeInTabIndex, setActiveInTabIndex] = useState(0);
    const [activeOutTabIndex, setActiveOutTabIndex] = useState(0);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialParameters);
    const [transformData, setTransFormData] = useState(initialData);
    const [schema, setSchema] = useState<string>("");
    const [uiSchema, setUISchema] = useState<string>("");
    const [status, setStatus] = useState(0);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(true);
    const [showError, setShowError] = useState(false);

    if (status === 0) {
        transSchema = generateJsonFormsSchema(formData);
        transUISchema = {
            type: 'VerticalLayout',
            elements: formData.map((param) => ({
                type: 'Control',
                scope: `#/properties/${param.name === undefined ? "no" : param.name}`
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
            const stringUISchema = JSON.stringify(transUISchema, null, 2)
            setSchema(stringSchema);
            setUISchema(stringUISchema);
        }
    };

    const handleTransFormChange = ({data}: any) => {
        setTransFormData(data);
    };

    const files = location.state?.files;
    const modelName = location.state?.modelName;
    const inputType = location.state?.inputType;
    const outputType = location.state?.outputType;
    const regionName = location.state?.regionName;
    const description = location.state?.description;
    const activeTabIndex = location.state?.activeTabIndex;

    const parameters = JSON.stringify({schema: transSchema, uiSchema: transUISchema});

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const uploadResult = (activeTabIndex === 0) ?
                await PlatformAPI.uploadModelWithImage({
                    modelName,
                    inputType,
                    outputType,
                    regionName,
                    description,
                    parameters,
                    file: files[0]
                }) : await PlatformAPI.uploadModelWithDockerfile({
                    modelName,
                    inputType,
                    outputType,
                    regionName,
                    description,
                    parameters,
                    files: files
                });
            console.log(uploadResult);
            setIsLoading(false);
            navigate('/models/my');
        } catch (error: any) {
            setIsLoading(false);
            setIsCompleted(false);
            if (error.response && error.response.status === 501) {
                console.error(error.response.data);
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (!isCompleted) {
            setShowError(true);
            const timeout = setTimeout(() => {
                setShowError(false);
                setIsCompleted(true);
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isCompleted]);

    return (
        <div className="contents">
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12">
                <div>
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
                                    onClick={() => setActiveOutTabIndex(idx)}>
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <Header title="Model Parameter"/>
                            <h1 className="mx-2 text-gray-500">JSONForms</h1>
                        </div>
                        <div className="flex gap-3 float-right">
                            {!isLoading && !isCompleted && (
                                <div
                                    className={`flex px-3 py-2 text-red-800 justify-center items-center rounded-lg bg-red-50 ${
                                        showError ? 'opacity-100 ease-in duration-150' : 'opacity-0 ease-out duration-150'}`}>
                                    <RiErrorWarningFill size={20}/>
                                    <div className="ml-2 text-sm font-medium">Warning: Upload Error! Check if there are
                                        any blanks.
                                    </div>
                                </div>
                            )}
                            <Link to="/models/create/description">
                                <button className="white-btn w-16 p-2">back</button>
                            </Link>
                            <button className="blue-btn w-16" onClick={handleSubmit}>create</button>
                        </div>
                    </div>
                    <div className="tab-content tab-space">
                        <div className={activeOutTabIndex === 0 ? "block" : "hidden"} id="link1">
                            <div>
                                <div
                                    className="gap-3 grid md:grid-cols-1 md:pt-3 md:px-5 md:my-2 xl:grid-cols-1 xl:gap-3 2xl:grid-cols-2">
                                    <div className="array-JSONForm">
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
                                                uischema={transUISchema}
                                                renderers={materialRenderers}
                                                cells={materialCells}
                                                onChange={handleTransFormChange}
                                            />
                                        </ErrorBoundary>
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
                                                        onClick={() => setActiveInTabIndex(idx)}>
                                                        {tab.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        <div className="tab-content tab-space">
                                            <div className={activeInTabIndex === 0 ? "block" : "hidden"} id="link3">
                                                <h1 className="md:py-3 text-xl font-bold">Schema</h1>
                                                <div className="border border-gray-200 block bg-white">
                                                    <MonaCoEditor
                                                        className="monaco-editor"
                                                        language="json"
                                                        height={230}
                                                        theme="vs-light"
                                                        value={schema}
                                                        onChange={(value) => {
                                                            try {
                                                                setStatus(1);
                                                                setSchema(value || '');
                                                                transSchema = JSON.parse(value || '');
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
                                                            fontSize: 17,
                                                            scrollBeyondLastLine: false,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className={activeInTabIndex === 1 ? "block" : "hidden"} id="link4">
                                                <h1 className="md:py-3 text-xl font-bold">UISchema</h1>
                                                <div className="border border-gray-200 block bg-white">
                                                    <MonaCoEditor
                                                        className="monaco-editor"
                                                        language="json"
                                                        height={230}
                                                        theme="vs-light"
                                                        value={uiSchema}
                                                        onChange={(value) => {
                                                            try {
                                                                setStatus(1);
                                                                setUISchema(value || '');
                                                                transUISchema = JSON.parse(value || '');
                                                            } catch (error) {
                                                                console.error(error);
                                                            }
                                                        }}
                                                        options={{
                                                            minimap: {
                                                                enabled: false,
                                                            },
                                                            automaticLayout: true,
                                                            fontSize: 17,
                                                            scrollBeyondLastLine: false,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <h1 className="md:py-3 text-xl font-bold">Result</h1>
                                        <ErrorBoundary>
                                            <div className="result">
                                                <JsonForms
                                                    schema={transSchema}
                                                    uischema={transUISchema}
                                                    data={transformData}
                                                    renderers={materialRenderers}
                                                    cells={materialCells}
                                                    onChange={handleTransFormChange}
                                                />
                                            </div>
                                        </ErrorBoundary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <LoadingCircle/>}
        </div>
    );
};