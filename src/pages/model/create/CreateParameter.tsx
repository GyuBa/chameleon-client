import React, {useState} from 'react';
import {Button, Header, SubmitButton} from "../../../components";
import {createParam, createSchema, userSchema, userUISchema} from "../../../assets/Dummy";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Parameter} from "../../../types/chameleon-client";
import {JsonSchema} from "@jsonforms/core";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ErrorBoundary from "../module/ParamErrorboundary";
import MonaCoEditor from "@monaco-editor/react";
import "../../../styles/HideFormName.css"
import {PlatformAPI} from "../../../platform/PlatformAPI";

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
let transUISchema = {
    type: 'VerticalLayout',
    elements: [{
        type: 'Control',
        scope: `#/properties/name`
    }]
};

export default function CreateParameter() {
    const [activeInTabIndex, setActiveInTabIndex] = useState(0);
    const [activeOutTabIndex, setActiveOutTabIndex] = useState(0);
    const navigate = useNavigate();
    const {currentColor} = useStateContext();
    const [formData, setFormData] = useState(initialParameters);
    const [transformData, setTransFormData] = useState(initialData);
    const [schema, setSchema] = useState<string>("");
    const [uiSchema, setUISchema] = useState<string>("");
    const [status, setStatus] = useState(0);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    if (status === 0) {
        transSchema = generateJsonFormsSchema(formData);
        transUISchema = {
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

    const parameters = JSON.stringify({...transSchema, ...transUISchema});

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const uploadResult = PlatformAPI.uploadModel({
                modelName,
                inputType,
                outputType,
                regionName,
                description,
                parameters: JSON.stringify(parameters),
                file: files[0]
            });
            console.log(uploadResult);
            setIsLoading(false);
            navigate('/model');
        } catch (error: any) {
            setIsLoading(false);
            if (error.response && error.response.status === 501) {
                console.error(error.response.data);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div>
                    <div className="py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Header category="" title="Model Parameter"/>
                                <h1 className="mx-2 text-gray-500">JSONForms</h1>
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
                                            <div className="flex gap-3 float-right">
                                                <Link to="/model/create/description">
                                                    <Button style={{
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        borderRadius: "10px"
                                                    }}
                                                            className="w-16 p-2" text="back"/>
                                                </Link>
                                                <SubmitButton
                                                    style={{
                                                        backgroundColor: currentColor,
                                                        color: "white",
                                                        borderRadius: "10px"
                                                    }}
                                                    className="w-16" text="create" onClick={handleSubmit}/>
                                            </div>
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
                                                            value={uiSchema}
                                                            onChange={(value) => {
                                                                try {
                                                                    setStatus(1)
                                                                    setUISchema(value || '');
                                                                    const parsedUISchema = JSON.parse(value || '');
                                                                    transUISchema = parsedUISchema;
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
                                                <JsonForms
                                                    schema={transSchema}
                                                    uischema={transUISchema}
                                                    data={transformData}
                                                    renderers={materialRenderers}
                                                    cells={materialCells}
                                                    onChange={handleTransFormChange}
                                                />
                                            </ErrorBoundary>
                                            <div className="flex gap-3 float-right">
                                                <Link to="/model/create/description">
                                                    <Button style={{
                                                        backgroundColor: "white",
                                                        color: "black",
                                                        borderRadius: "10px"
                                                    }}
                                                            className="w-16 p-2" text="back"/>
                                                </Link>
                                                <SubmitButton
                                                    style={{
                                                        backgroundColor: currentColor,
                                                        color: "white",
                                                        borderRadius: "10px"
                                                    }}
                                                    className="w-16" text="create" onClick={handleSubmit}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isLoading && (
                    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center">
                        <div role="status">
                            <svg aria-hidden="true"
                                 className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                        </div>
                    </div>
                    // Another Design Draft
                    //<div className="fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center">
                    //  <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">loading...</div>
                    //</div>
                )
            }
        </div>
    );
};