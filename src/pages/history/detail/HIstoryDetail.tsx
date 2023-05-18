import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Header from "../../../components/layout/Header";
import Button from "../../../components/button/Button";
import OutputModule from "../../model/module/Output";
import OutputDescriptionModule from "../../model/module/OutputDescription";
import InputModule from "../../model/module/Input";
import {executeParam} from "../../../assets/Dummy";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonViewer} from "@textea/json-viewer";

export function HistoryDetail() {
    const location = useLocation();
    const historyData = location.state;
    const parameter = historyData.parameters.parameter;

    console.log(historyData.parameters)
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    // 외부 공유시 useEffect 이용하여 모델 적용
    const [modelId, ] = useState(-1);

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24">
                <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
                    <div className="flex justify-between items-end">
                        <Header title="History"/>
                        <h1 className="mx-2 text-gray-500">{historyData.model ? (
                            historyData.model.name
                        ) : (
                            'Deleted'
                        )}
                        </h1>
                    </div>
                    <Link to="/models/all"><Button className="color-btn text-sm w-full p-1.5" text="back"/></Link>
                </div>
                <div style={{height: '550px'}} className="grid grid-rows-4 grid-cols-2 grid-flow-col gap-2 mt-10">
                    <div className="row-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
                        <div className="border-b border-gray-300" style={{backgroundColor: '#F6F6F6'}}>
                            <div className="flex md:p-2 space-x-3 rounded-lg">
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
                        </div>
                        <div className="tab-content tab-space overflow-y-auto max-h-[212px] md:p-2">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <JsonForms
                                    data={parameter}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    readonly
                                />
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <JsonViewer value={parameter ? parameter : {}}/>
                            </div>
                        </div>
                    </div>
                    {InputModule('history', parameter, historyData.model!, historyData!)}
                    {OutputModule(historyData!)}
                    {OutputDescriptionModule(historyData!)}
                </div>
            </div>
        </div>
    );
}