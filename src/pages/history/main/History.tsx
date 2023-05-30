import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import OutputDescriptionModule from "../../model/module/description/OutputDescriptionModule";
import {InputModelInfo, ModuleData, ParametersData} from "../../../types/chameleon-client";
import {PageType} from "../../../types/chameleon-client.enum";
import {HistoryEntityData, SitePaths} from "../../../types/chameleon-platform.common";
import ParametersModule from "../../model/module/core/ParametersModule";
import InputModule from "../../model/module/core/InputModule";
import OutputModule from "../../model/module/core/OutputModule";
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {Oval} from "react-loader-spinner";
import TerminalSplitContainer from '../../../components/terminal/container/TerminalSplitContainer';

export default function History() {
    const {historyId} = useParams();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [historyData, setHistoryData] = useState<HistoryEntityData>();

    useEffect(() => {
        (async function () {
            try {
                const history = await PlatformAPI.getHistory(Number(historyId));
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
        parameters: historyData.parameters
    };

    const parametersData: ParametersData = {
        history: historyData!,
        parameters: historyData!.parameters,
        activeTabIndex: activeTabIndex,
        setActiveTabIndex: setActiveTabIndex
    }

    return (
        <div className="contents">
            <TerminalSplitContainer moduleData={moduleData}>
                <div className="m-2 md:m-10 mt-24">
                    <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
                        <div className="flex justify-between items-end">
                            <p className='head-text'>{historyData.model ? (
                                historyData.model.name
                            ) : (
                                'Deleted Model'
                            )}</p>
                            <h1 className="mx-2 text-gray-500">History</h1>
                        </div>
                        <Link to={SitePaths.HISTORIES}>
                            <button className="blue-btn text-sm w-full p-1.5">back</button>
                        </Link>
                    </div>
                    <div className="h-[630px] grid grid-rows-4 grid-cols-2 grid-flow-col gap-2 mt-10">
                        {ParametersModule(parametersData)}
                        {InputModule(moduleData)}
                        {OutputModule(historyData!)}
                        {OutputDescriptionModule(historyData!)}
                    </div>
                </div>
            </TerminalSplitContainer>
        </div>
    );
}