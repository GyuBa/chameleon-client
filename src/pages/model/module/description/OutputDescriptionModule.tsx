import React from "react";
import {HistoryEntityData, HistoryStatus} from "../../../../types/chameleon-platform.common";

export default function OutputDescriptionModule(executeData: HistoryEntityData) {
    const status = executeData?.status;
    const description = executeData?.description

    return (
        <div className="row-span-1 col-span-2 rounded-lg border-1 border-gray-300">
            <div className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300"
                 style={{backgroundColor: '#F6F6F6'}}>
                <p className="text-xl font-semibold">Output Description</p>
            </div>
            <div className="overflow-y-auto max-h-[80px]">
                <br/>
                {(status === HistoryStatus.FINISHED && executeData) && (
                    <p>
                        <span className="pl-5 pt-2 font-semibold">{description}</span>
                    </p>
                )}
            </div>
        </div>
    );
}