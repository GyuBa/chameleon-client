import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import OutputDescriptionModule from "../module/description/OutputDescriptionModule"
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonForms} from "@jsonforms/react";
import {JsonViewer} from "@textea/json-viewer";
import {FiInfo} from "react-icons/fi";
import {Oval} from "react-loader-spinner";
import {
    HistoryEntityData,
    HistoryStatus,
    ModelEntityData,
    ModelParameters,
    SitePaths,
    WSMessageType,
    WSUpdateHistoryMessage
} from "../../../types/chameleon-platform.common";
import {PlatformAPI} from "../../../platform/PlatformAPI"
import useWebSocket from "react-use-websocket";
import {PageType} from "../../../types/chameleon-client.enum";
import {ModuleData} from "../../../types/chameleon-client"
import InputModule from "../module/core/InputModule"
import OutputModule from "../module/core/OutputModule";
import ExecuteDescriptionPanel from "../board/panel/ExecuteDescriptionPanel";

const initialData: ModelParameters = {} as ModelParameters;

export default function Model() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [parameters, setParameters] = useState<ModelParameters>(initialData);
    const [modelData, setModelData] = useState<ModelEntityData>();
    const [executeData, setExecuteData] = useState<HistoryEntityData>();
    const {username, uniqueName} = useParams();

    let path = useLocation().pathname.slice(1);

    const [isPanelVisible, setIsPanelVisible] = useState(false);

    const handleButtonClick = () => {
        setIsPanelVisible(true);

        if(isPanelVisible == true)
            setIsPanelVisible(false)
    };


    useEffect(() => {
        (async function () {
            try {
                const model = await PlatformAPI.getModelByUsernameAndUniqueName(username!, uniqueName!)
                setModelData(model);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [username, uniqueName]);

    const {
        sendJsonMessage,
        lastJsonMessage
    } = useWebSocket((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://') + window.location.host + '/websocket ', {
        shouldReconnect: (closeEvent) => true,
        onMessage: (message) => {
            let data = JSON.parse(message.data);
            if (data?.msg === WSMessageType.UPDATE_HISTORY) {
                console.log(data);
            }
        }
    });

    useEffect(() => {
        sendJsonMessage({msg: WSMessageType.PATH, path});
    }, [sendJsonMessage, path]);

    useEffect(() => {
        let message = lastJsonMessage as unknown as WSUpdateHistoryMessage;
        if (message?.msg === WSMessageType.UPDATE_HISTORY) {
            setExecuteData(message?.history)
        }
    }, [lastJsonMessage]);

    if (modelData === undefined) {
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

    const schema = modelData?.parameters?.schema
    const uiSchema = modelData?.parameters?.uischema
    const modelDescription = modelData?.description

    const moduleData: ModuleData = {
        history: executeData!,
        model: modelData!,
        type: PageType.EXECUTE,
        parameters
    };

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24">
                <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
                    <div className="flex justify-between">
                        <p className='head-text'>{modelData?.name}</p>
                        <div className="flex items-center md:px-2">
                            <div>
                                {executeData?.status === HistoryStatus.RUNNING && (
                                    <h1 className="rounded-lg text-xs p-1.5 bg-yellow-500 text-white">Running...</h1>
                                )}
                                {executeData?.status === HistoryStatus.FINISHED && (
                                    <h1 className="rounded-lg text-xs p-1.5 bg-green-500 text-white">Finished</h1>
                                )}
                            </div>
                        </div>
                    </div>
                    <Link to={SitePaths.ALL_MODELS}>
                        <button className="blue-btn text-sm w-full p-1.5">back</button>
                    </Link>
                </div>
                <div className = "flex justify-end items-center">
                    <button onClick={handleButtonClick}>
                        <FiInfo size="32" color="#484848" className="my-1" />
                    </button>
                </div>
                <div style={{height: '550px'}} className="grid grid-rows-4 grid-cols-2 grid-flow-col gap-2">
                    <div className="row-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
                        <div className="border-b border-gray-300" style={{backgroundColor: '#F6F6F6'}}>
                            <div className="flex md:px-5 md:py-2 space-x-3 rounded-lg">
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
                        <div className="tab-content tab-space overflow-y-auto max-h-[212px] md:px-5">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <JsonForms
                                    schema={schema}
                                    uischema={uiSchema}
                                    data={parameters}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    onChange={({data}) => {
                                        setParameters(data);
                                    }}
                                />
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <br/>
                                <JsonViewer className="text-lg" value={parameters ? parameters : {}} />
                            </div>
                        </div>
                    </div>
                    {InputModule(moduleData!)}
                    {OutputModule(executeData!)}
                    {OutputDescriptionModule(executeData!)}
                </div>
            </div>
            {isPanelVisible && (
                <div className="w-[700px] ease-in-out duration-300 translate-x-0">
                    {ExecuteDescriptionPanel(modelData?.name, modelDescription)}
                </div>
            )}
        </div>
    );
};