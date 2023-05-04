import React, {useState} from 'react';
import {Button, Header, SubmitButton} from "../../../components";
import {createParam, createSchema, userSchema, userUISchema} from "../../../assets/Dummy";
import {Header, Button, SubmitButton} from "../../../components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Parameter} from "../../../types/Types";
import {JsonSchema} from "@jsonforms/core";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ErrorBoundary from "../module/ParamErrorboundary";
import MonaCoEditor from "@monaco-editor/react";
import "../../../styles/HideFormName.css"
import instance from "../../../ConstantValue";

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
import {crparamTab} from "../../../assets/Dummy"
import {CreateSimpleParam} from "./tab/CreateSimpleParam";
import CreateComplexParam from "./tab/CreateComplexParam"
import instance from "../../../ConstantValue";
import {JsonSchema} from "@jsonforms/core";

export default function CreateParameter() {
    const [activeInTabIndex, setActiveInTabIndex] = useState(0);
    const [activeOutTabIndex, setActiveOutTabIndex] = useState(0);
    const navigate = useNavigate();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
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
    const location = useLocation();
    const [schema, setSchema] = useState<JsonSchema>();
    const [transUISchema, setTransUISchema] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);

    const files = location.state?.files;
    const modelName = location.state?.modelName;
    const inputType = location.state?.inputType;
    const outputType = location.state?.outputType;
    const regionName = location.state?.regionName;
    const description = location.state?.description;

    const handleSchemaChange = (newSchema: JsonSchema) => {
        setSchema(newSchema);
    };

    const handleTransUISchemaChange = (newTransUISchema: any) => {
        setTransUISchema(newTransUISchema);
    };

    const parameter = JSON.stringify({ ...schema, ...transUISchema });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('modelName', modelName);
        formData.append('inputType', inputType);
        formData.append('outputType', outputType);
        formData.append('regionName', regionName);
        formData.append('file', files[0]);
        formData.append('description', description);
        formData.append('parameter', parameter);

        console.log(schema);
        console.log(transUISchema);

        console.log(files);
        console.log(modelName);
        console.log(inputType);
        console.log(outputType);
        console.log(regionName);
        console.log(description);
        console.log(parameter);

        console.log(formData);

        try {
            const res = await instance.post(`/model/upload`, formData, {
                timeout: 0,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
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
                            <div className="flex gap-3 float-right">
                                <Link to="/model/create/description">
                                    <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                                            className="w-16 p-2" text="back"/>
                                </Link>
                                <SubmitButton style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                              className="w-16" text="create" onClick={handleSubmit}/>
                            </div>
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
                                        onClick={() => setActiveTabIndex(idx)}>
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="tab-content tab-space">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <CreateSimpleParam onSchemaChange={handleSchemaChange}
                                                   onTransUISchemaChange={handleTransUISchemaChange}/>
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <CreateComplexParam />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && (
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
            )}
        </div>
    );
};