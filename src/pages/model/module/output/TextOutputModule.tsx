import React, {useState, useEffect} from "react";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";

export default function TextOutputModule(executeData: HistoryEntityData) {
    let outputType = executeData?.outputType
    let outputPath = executeData?.outputPath
    let outputSize = executeData?.outputInfo?.fileSize
    let outputName = executeData?.outputInfo?.fileName

    let [text, setText] = useState<string>('');

    useEffect(() => {
        if (outputPath) {
            (async () => {
                let text = await fetch('/' + outputPath).then(r => r.text());
                setText(text);
            })();
        }
    }, [outputPath]);

    return (
        <div>
            <div className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300"
                 style={{backgroundColor: '#F6F6F6'}}>
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                    <button className="submit-btn float-right text-sm py-1 border border-gray border-solid rounded-md hover:border-black"
                            onClick={async () => {
                                DownloadUtils.download('/' + outputPath, outputName);
                            }}>Download
                    </button>
                </div>
            </div>
            <div className="overflow-x-hidden max-h-[400px]">
                <br/>
                <p><span className="pl-5 pb-5 font-semibold">Output Format : </span>{outputType} </p>
                <p><span className="pl-5 pt-2 font-semibold">Size : </span>{FileUtils.formatBytes(outputSize)} </p>
                <p><span className="pl-5 pt-2 font-semibold">Output : </span></p>
                <br/>
                <p className="pl-5 pt-2" style={{whiteSpace: 'pre-wrap'}}>{text}</p>
            </div>
        </div>

    );

}