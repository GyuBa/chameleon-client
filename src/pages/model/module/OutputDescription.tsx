import React from "react";
import {HistoryEntityData, HistoryStatus} from "../../../types/chameleon-platform.common";

export default function OutputDescriptionModule(executeData : HistoryEntityData) {

    const modelCreatedTime = new Date(executeData?.createdTime)
    const modelEndedTime = new Date(executeData?.endedTime)
    const status = executeData?.status

    const modelExecuteTime = ((modelEndedTime.getTime() - modelCreatedTime.getTime()) / 3600000).toFixed(6);


    return (
        <div className="row-span-1 col-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
            <div className="md:p-2 space-x-3 flex justify-between items-center border-b border-gray-300" style={{ backgroundColor: '#F6F6F6' }}>
                <p className="text-xl font-semibold">Output Description</p>
            </div>
            <div className="overflow-y-auto max-h-[80px]">
                <br/>
                {(status === HistoryStatus.FINISHED && executeData) && (
                    <p>
                        <span className="px-2 pt-2 font-semibold">Measured Execution Time :</span>
                        {modelExecuteTime}
                    </p>
                )}
            </div>
        </div>
    );
}