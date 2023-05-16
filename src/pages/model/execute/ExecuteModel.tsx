import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import InputModule from "../module/Input"
import OutputModule from "../module/Output"
import OutputDescription from "../module/OutputDescription"
import {executeParam} from "../../../assets/Dummy";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonForms} from "@jsonforms/react";
import {JsonViewer} from "@textea/json-viewer";
import Button from "../../../components/button/Button";
import Header from "../../../components/layout/Header";
import {Oval} from "react-loader-spinner";
import {HistoryEntityData, HistoryStatus, ModelEntityData, WSMessageType} from "../../../types/chameleon-platform.common";
import {PlatformAPI} from "../../../platform/PlatformAPI"
import useWebSocket from "react-use-websocket";

const initialData = {};
export default function ExecuteModel() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(0);
    const [parameter, setParameter] = useState(initialData);
    const [modelData, setModelData] = useState<ModelEntityData>();
    const [executeData, setExecuteData] = useState<HistoryEntityData>();
    const {username, uniqueName} = useParams();

    let path = useLocation().pathname.slice(1);
    useEffect(() => {
        let completed = false;
        (async function get() {
            try {
                const model = await PlatformAPI.getModelByUsernameAndUniqueName(username!, uniqueName!)
                setModelData(model);
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            completed = true;
        };
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
        sendJsonMessage({msg: WSMessageType.PATH, path: path});
    }, [sendJsonMessage, path]);

    useEffect(() => {
        let message = lastJsonMessage as any;
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

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24">
                <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
                    <div className="flex justify-between items-end">
                        <Header title="Model"/>
                        <h1 className="mx-2 text-gray-500">{modelData?.name}</h1>
                        <div>
                            <div>
                                {executeData?.status === undefined && (
                                    <h1 className="rounded-lg text-xs p-1.5 bg-blue-900 text-white">Stand By</h1>
                                )}
                                {executeData?.status === HistoryStatus.RUNNING && (
                                    <h1 className="rounded-lg text-xs p-1.5 bg-yellow-500 text-white">Running...</h1>
                                )}
                                {executeData?.status === HistoryStatus.FINISHED && (
                                    <h1 className="rounded-lg text-xs p-1.5 bg-green-500 text-white">Finished</h1>
                                )}
                            </div>
                        </div>
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
                    {InputModule(parameter, modelData!, executeData!)}
                    {OutputModule(executeData!)}
                    {OutputDescription(executeData!)}
                </div>
            </div>
        </div>
    );
};