import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import OutputDescriptionModule from "../../model/module/description/OutputDescriptionModule";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonViewer} from "@textea/json-viewer";
import {InputModelInfo, ModuleData} from "../../../types/chameleon-client";
import {PageType} from "../../../types/chameleon-client.enum";
import {HistoryEntityData, SitePaths} from "../../../types/chameleon-platform.common";
import InputModule from "../../model/module/core/InputModule";
import OutputModule from "../../model/module/core/OutputModule";
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {Oval} from "react-loader-spinner";

export default function History() {
    const {historyId} = useParams();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [historyData, setHistoryData] = useState<HistoryEntityData>();

    useEffect(() => {
        (async function () {
            try {
                const history = await PlatformAPI.getHistory(Number(historyId) - 1);
                setHistoryData(history);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    if (historyData === undefined) {
        return (
            <div className="contents">
                <div className="flex justify-center items-center h-screen">
                    <div className="text-center">
                        <Oval color="#00BFFF" height={80} width={80}/>
                    </div>
                </div>
            </div>
        );
    }
    const inputModelData: InputModelInfo = {id: -1, inputType: historyData.inputType};

    const moduleData: ModuleData = {
        history: historyData!,
        model: inputModelData!,
        type: PageType.EXECUTE,
        parameters : historyData.parameters
    };
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
                                {/*// TODO: History Model 페이지 중복 코드 제거*/}
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
                                    data={historyData.parameters}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    readonly
                                />
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"}>
                                <JsonViewer value={historyData?.parameters ? historyData.parameters : {}}/>
                            </div>
                        </div>
                    </div>
                    {InputModule(moduleData)}
                    {OutputModule(historyData!)}
                    {OutputDescriptionModule(historyData!)}
                </div>
            </div>
        </div>
    );
}