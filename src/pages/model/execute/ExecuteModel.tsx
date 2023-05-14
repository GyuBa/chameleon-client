import React, {useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import InputModule from "../module/Input"
import OutputModule from "../module/Output"
import OutputDescriptionModule from "../module/OutputDescription"
import {executeParam} from "../../../assets/Dummy";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonForms} from "@jsonforms/react";
import {JsonViewer} from "@textea/json-viewer";
import Button from "../../../components/button/Button";
import Header from "../../../components/layout/Header";

const initialData = {};

export default function ExecuteModel() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [parameter, setParameter] = useState(initialData);
    const location = useLocation();
    const modelData = location.state.modelData;
    const schema = modelData?.parameters?.schema;
    const uiSchema = modelData?.parameters?.uischema

    const {uniqueName, userName} = useParams();

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24">
                <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
                    <Header title="Model"/>
                    <Link to="/models/all"><Button className="color-btn text-sm w-full p-1.5" text="back"/></Link>
                </div>
                <div style={{height: '550px'}} className="grid grid-rows-4 grid-cols-2 grid-flow-col gap-2 mt-10">
                    <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
                        <div className="flex space-x-3 border-b">
                            {executeParam.map((tab, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        className={`text-xl font-semibold pb-2 border-b-4 transition-colors duration-300 ${
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
                        <div className="tab-content tab-space overflow-y-auto max-h-[212px]">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <JsonForms
                                    schema={schema}
                                    uischema={uiSchema}
                                    data={parameter}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    onChange={({data}) => {
                                        setParameter(data);
                                    }}
                                />
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <JsonViewer value={parameter ? parameter : {}}/>
                            </div>
                        </div>
                    </div>
                    {InputModule(parameter, modelData)}
                    <OutputModule/>
                    <OutputDescriptionModule/>
                </div>
            </div>
        </div>
    );
};