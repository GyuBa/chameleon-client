import React, {useState} from 'react';
import {Header, Button, SubmitButton} from "../../../components";
import {Link, useLocation} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {crparamTab} from "../../../assets/Dummy"
import {CreateSimpleParam} from "./tab/CreateSimpleParam";
import CreateComplexParam from "./tab/CreateComplexParam"
import instance from "../../../ConstantValue";
import {JsonSchema} from "@jsonforms/core";

export default function CreateParameter() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {currentColor} = useStateContext();
    const location = useLocation();
    const [schema, setSchema] = useState<JsonSchema>();
    const [transUISchema, setTransUISchema] = useState<any>();

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

        const formData = new FormData();
        formData.append('modelName', modelName);
        formData.append('inputType', inputType);
        formData.append('outputType', outputType);
        formData.append('regionName', regionName);
        formData.append('file', files[0]);
        formData.append('description', description);
        formData.append('parameter', parameter);

        console.log("스키마와 UI 스키마");
        console.log(schema);
        console.log(transUISchema);

        console.log("보낼 값들: files, modelName, inputType, outputType, regionName, description, parameter");
        console.log(files);
        console.log(modelName);
        console.log(inputType);
        console.log(outputType);
        console.log(regionName);
        console.log(description);
        console.log(parameter);

        console.log("formData 출력");
        console.log(formData);

        try {
            const res = await instance.post(`/model/upload`, formData, {
                timeout: 10000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res.data);
            return res.data;
        } catch (error: any) {
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
                            <div className="flex gap-3 float-right">
                                <Link to="/model/create/description">
                                    <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                                            className="w-16 p-2" text="back"/>
                                </Link>
                                <Link to="/model">
                                    <SubmitButton style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                            className="w-16" text="create" onClick={handleSubmit}/>
                                </Link>
                            </div>
                        </div>
                        <div className="flex space-x-3 border-b">
                            {/* Loop through tab data and render button for each. */}
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
        </div>
    );
};