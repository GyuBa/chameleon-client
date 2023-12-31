import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import OutputDescriptionModule from "../module/description/OutputDescriptionModule"
import {FiInfo} from "react-icons/fi";
import {Oval} from "react-loader-spinner";

import {
    HistoryEntityData,
    HistoryStatus,
    ModelEntityData,
    ModelExecutionParameters,
    SitePaths,
    WSMessage,
    WSMessageType,
    WSUpdateHistoryMessage
} from "../../../types/chameleon-platform.common";
import {PlatformAPI} from "../../../platform/PlatformAPI"
import useWebSocket from "react-use-websocket";
import {PageType} from "../../../types/chameleon-client.enum";
import {ModuleData, ParametersData} from "../../../types/chameleon-client"
import ParametersModule from "../module/core/ParametersModule"
import InputModule from "../module/core/InputModule"
import OutputModule from "../module/core/OutputModule";
import ExecuteDescriptionPanel from "../board/panel/ExecuteDescriptionPanel";
import TerminalSplitContainer from "../../../components/terminal/container/TerminalSplitContainer";
import useGlobalContext from "../../../contexts/hook/useGlobalContext";

export default function Model() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [jsonTabChoose, setJsonTabChoose] = useState(false);
    const [modelData, setModelData] = useState<ModelEntityData>();
    const [executeData, setExecuteData] = useState<HistoryEntityData>();
    const [parameters, setParameters] = useState<ModelExecutionParameters>(null);
    const [reset, setReset] = useState<boolean>(false)
    const {username, uniqueName} = useParams();
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const {setUser} = useGlobalContext();

    const handleDescriptionButtonClick = () => {
        setIsPanelVisible(!isPanelVisible);
    };
    useEffect(() => {
        if (modelData && modelData.parameters) {
            setParameters(modelData.parameters.data);
        }
    }, [modelData]);


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
        lastJsonMessage
    } = useWebSocket<WSMessage>((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://') + window.location.host + '/websocket', {
        shouldReconnect: (closeEvent) => true,
        share: true
    });

    useEffect(() => {
        let message = lastJsonMessage as unknown as WSUpdateHistoryMessage;
        if (message?.msg === WSMessageType.UPDATE_HISTORY) {
            setExecuteData(message.history);
            setTimeout(async () => {
                setUser(await PlatformAPI.getLoginUser());
            });
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

    const modelDescription = modelData?.description

    const moduleData: ModuleData = {
        history: executeData!,
        model: modelData!,
        type: PageType.EXECUTE,
        parameters,
        reset,
        setReset
    };

    const parameterData: ParametersData = {
        history: executeData!,
        modelData,
        parameters,
        setParameters,
        activeTabIndex,
        setActiveTabIndex,
        jsonTabChoose,
        setJsonTabChoose
    };

    const handleReset = () => {
        setExecuteData(undefined)
        setParameters(modelData.parameters.data);
        setActiveTabIndex(0)
        setJsonTabChoose(false)
        setReset(true)
    };

    return (
        <div className="contents">
            <TerminalSplitContainer moduleData={moduleData}>
                <>
                    <div className="flex justify-center h-full">
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
                                <div className="gap-3 flex">
                                    {executeData?.status === HistoryStatus.FINISHED && (
                                        <button className="rounded-lg text-sm bg-red-600 text-white p-1.5" onClick={handleReset}>reset</button>
                                        )}
                                    <Link to={SitePaths.ALL_MODELS}>
                                        <button className="blue-btn text-sm p-1.5">back</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex justify-end items-center">
                                <button onClick={handleDescriptionButtonClick}>
                                    <FiInfo size="32" color="#484848" className="my-1"/>
                                </button>
                            </div>
                            <div className="h-[630px] grid grid-rows-4 grid-cols-2 grid-flow-col gap-2">
                                {ParametersModule(parameterData)}
                                {InputModule(moduleData!)}
                                {OutputModule(executeData!)}
                                {OutputDescriptionModule(executeData!)}
                            </div>
                        </div>
                        {isPanelVisible && (
                            <ExecuteDescriptionPanel modelDescription={modelDescription}/>
                        )}
                    </div>
                </>
            </TerminalSplitContainer>
        </div>
    );
};