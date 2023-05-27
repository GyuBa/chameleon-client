import React from "react";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";

export default function HTMLOutputModule(executeData: HistoryEntityData) {
    let outputPath = executeData?.outputPath
    let outputName = executeData?.outputInfo?.fileName

    return (
        <div className='h-full'>
            <div
                className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300 bg-main-gray">
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                    <button
                        className="submit-btn float-right text-sm py-1 border border-gray border-solid rounded-md hover:border-black"
                        onClick={async () => {
                            if (outputName) {
                                DownloadUtils.download('/' + outputPath, outputName);
                            }
                        }}>Download
                    </button>
                </div>
            </div>
            <div className="overflow-x-hidden h-full">
                <div className="w-full items-center html-output-content">
                    {outputPath ?
                        <iframe className='h-full w-full' src={'/' + outputPath}/> : <></>}
                </div>
            </div>
        </div>
    );
}