import React from "react";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";

export default function ImageOutputModule(executeData: HistoryEntityData) {
    let outputType = executeData?.outputType
    let outputPath = executeData?.outputPath
    let outputSize = executeData?.outputInfo?.fileSize
    let outputName = executeData?.outputInfo?.fileName

    return (
        <div>
            <div className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300"
                 style={{backgroundColor: '#F6F6F6'}}>
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                    <button className="submit-btn float-right text-sm py-1 border border-gray border-solid rounded-md hover:border-black"
                            onClick={async () => {
                                if (outputName) {
                                    DownloadUtils.download('/' + outputPath, outputName);}
                            }}>Download
                    </button>
                </div>
            </div>
            <div className="overflow-x-hidden max-h-[400px]">
                <br/>
                <p><span className="pl-5 pt-2 font-semibold">Output Format : </span>{outputType} </p>
                <p><span className="pl-5 pt-2 font-semibold">Size : </span>{FileUtils.formatBytes(outputSize)} </p>
                <div className="pl-5 pt-2"
                     style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {outputPath ?
                        <img style={{width: "100%", objectFit: 'contain', maxWidth: '100%', maxHeight: '100%'}}
                             src={'/' + outputPath} alt="single-output" /> : <></>}
                </div>
            </div>
        </div>
    );
}