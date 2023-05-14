import React, {useEffect, useRef} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {BiDownload} from "react-icons/bi";
import videojs from "video.js"
import 'video.js/dist/video-js.css';
import '../../../../styles/custom-video-js.css';
import {FileUtils} from "../../../../utils/FileUtils";
import {DownloadUtils} from "../../../../utils/DownloadUtils"
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";
const videoURL = '/videos/video.mp4'

export default function SingleVideoViewer(historyStatus : HistoryEntityData) {

    const videoRef = useRef<HTMLVideoElement>(null);
    let outputInformation = historyStatus?.outputInfo?.fileName
    const extension = outputInformation?.split('.').pop();
    let outputPath = historyStatus?.outputPath
    let outputSize = historyStatus?.outputInfo?.fileSize
    let outputName = historyStatus?.outputInfo?.fileName

    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current, {}, () => {
            });
            player.src({
                src: videoURL,
                type: 'video/mp4'
            });
            player.play();
        }
    })

    return (
        <div>
            <div className="pb-1 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="20" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="text-sm"
                                  onClick={async () => {DownloadUtils.download('/'+ outputPath, outputName);}}></SubmitButton>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[352px]">
                <p className="px-2 pt-2">Output Format : {extension} </p>
                <p className="px-2 pt-2">Size : {FileUtils.formatBytes(outputSize)} </p>
                <video src={'/'+ outputPath} className="video-js vjs-classic-skin" controls autoPlay={false} ref={videoRef}/>
            </div>
        </div>
    );
}