import React, { useEffect, useRef } from "react";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/city/index.css";
import videojs from "video.js";
import { FileUtils } from "../../../../utils/FileUtils";
import { DownloadUtils } from "../../../../utils/DownloadUtils";
import { HistoryEntityData } from "../../../../types/chameleon-platform.common";

export default function VideoOutputModule(executeData: HistoryEntityData) {

    let outputType = executeData?.outputType
    let outputPath = executeData?.outputPath;
    let outputSize = executeData?.outputInfo?.fileSize;
    let outputName = executeData?.outputInfo?.fileName;
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current, {}, () => {
            });
            player.pause();
        }
    })

    return (
        <div>
            <div
                className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300"
                style={{ backgroundColor: '#F6F6F6' }}
            >
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                    <button
                        className="submit-btn text-sm"
                        onClick={async () => {
                            DownloadUtils.download('/' + outputPath, outputName);
                        }}
                    >
                        Download
                    </button>
                </div>
            </div>
            <div className="overflow-x-hidden max-h-[400px]">
                <br/>
                <p><span className="pl-5 pt-2 font-semibold">Output Format : </span>{outputType} </p>
                <p><span className="pl-5 pt-2 font-semibold">Size : </span>{FileUtils.formatBytes(outputSize)} </p>
                <p><span className="pl-5 pt-2 font-semibold">Output : </span></p>
                <br/>
                <div className="flex justify-center items-center">
                    <video
                        src={'/'+ outputPath}
                        className="video-js vjs-theme-city object-contain"
                        controls
                        autoPlay={false}
                        ref={videoRef}
                        width={500}
                        height={300}
                    />
                </div>
            </div>
        </div>
    );
}