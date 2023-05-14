import React from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import { BiDownload } from "react-icons/bi";
import { DownloadUtils } from "../../../../utils/DownloadUtils";
import { FileUtils } from "../../../../utils/FileUtils";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";

export default function SingleImageViewer(historyStatus : HistoryEntityData) {
    let outputInformation = historyStatus?.outputInfo?.fileName
    const extension = outputInformation?.split('.').pop();
    let outputPath = historyStatus?.outputPath
    let outputSize = historyStatus?.outputInfo?.fileSize
    let outputName = historyStatus?.outputInfo?.fileName

    return (
        <div>
            <div className="pb-1 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="20" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="text-sm" onClick={async() => {
                        if(outputName) {
                            DownloadUtils.download('/' + outputPath, outputName);
                        }
                    }}></SubmitButton>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[352px]">
                <p className="px-2 pt-2">Output Format : {extension} </p>
                <p className="px-2 pt-2">Size : {FileUtils.formatBytes(outputSize)} </p>
                {outputPath ? <img style={{width: "100%"}} src={'/' + outputPath} alt="" /> : <></>}
            </div>
        </div>
    );
}