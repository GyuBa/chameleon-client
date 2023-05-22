import React from "react";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";
import AudioPlayer from "react-h5-audio-player";

export default function SoundOutputModule(executeData: HistoryEntityData) {
    let outputInformation = executeData?.outputInfo?.fileName
    const extension = outputInformation?.split('.').pop();
    let outputPath = executeData?.outputPath
    let outputSize = executeData?.outputInfo?.fileSize
    let outputName = executeData?.outputInfo?.fileName

    return (
        <div>
            <div className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300"
                 style={{backgroundColor: '#F6F6F6'}}>
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                    <button className="submit-btn text-sm"
                            onClick={async () => {
                                DownloadUtils.download('/' + outputPath, outputName);
                            }}>Download
                    </button>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[352px]">
                <br/>
                <p><span className="pl-5 pt-2 font-semibold">Output Format : </span>{extension} </p>
                <p><span className="pl-5 pt-2 font-semibold">Size : </span>{FileUtils.formatBytes(outputSize)} </p>
                <p><span className="pl-5 pt-2 font-semibold">Output : </span></p>
                <br/>
                <AudioPlayer className="px-5 pt-2" src={'/' + outputPath} onPlay={e => console.log("onPlay")}/>
            </div>
        </div>

    );

}