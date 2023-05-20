import React, {useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import OutputDescriptionModule from "../../model/module/description/OutputDescriptionModule";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonViewer} from "@textea/json-viewer";
import {InputModelInfo} from "../../../types/chameleon-client";
import {PageType} from "../../../types/chameleon-client.enum";
import {SitePaths} from "../../../types/chameleon-platform.common";
import InputModule from "../../model/module/core/InputModule";
import OutputModule from "../../model/module/core/OutputModule";

export default function History() {
    const location = useLocation();
    const historyData = location.state;
    const parameter = historyData.parameters.parameter;

    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const inputModelData: InputModelInfo = {id: -1, inputType: historyData.inputType};

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24">
                <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
                    <div className="flex justify-between items-end">
                        <p className='head-text'>History</p>
                        <h1 className="mx-2 text-gray-500">{historyData.model ? (
                            historyData.model.name
                        ) : (
                            'Deleted'
                        )}
                        </h1>
                    </div>
                    <Link to={SitePaths.HISTORIES}>
                        <button className="blue-btn text-sm w-full p-1.5">back</button>
                    </Link>
                </div>
                <div className="h-[550px] grid grid-rows-4 grid-cols-2 grid-flow-col gap-2 mt-10">
                    <div className="row-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
                        <div className="border-b border-gray-300" style={{backgroundColor: '#F6F6F6'}}>
                            <div className="flex md:p-2 space-x-3 rounded-lg">
                                // TODO: History Model 페이지 중복 코드 제거
                                {['Parameters', 'Parameters (JSON)'].map((label, idx) => {
                                    return (
                                        <button
                                            key={idx}
                                            className={`text-xl font-semibold pb-2 border-b-4 transition-colors duration-300 ${
                                                idx === activeTabIndex
                                                    ? "border-teal-500"
                                                    : "border-transparent hover:border-gray-200"
                                            }`}
                                            onClick={() => setActiveTabIndex(idx)}>
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="tab-content tab-space overflow-y-auto max-h-[212px] md:p-2">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"}>
                                <JsonForms
                                    data={parameter}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    readonly
                                />
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"}>
                                <JsonViewer value={parameter ? parameter : {}}/>
                            </div>
                        </div>
                    </div>
                    {InputModule(PageType.HISTORY, parameter, inputModelData!, historyData!)}
                    {OutputModule(historyData!)}
                    {OutputDescriptionModule(historyData!)}
                </div>
            </div>
        </div>
    );
}