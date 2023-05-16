import React, {useEffect, useRef} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {BiDownload} from "react-icons/bi";
import videojs from "video.js"
import 'video.js/dist/video-js.css';
import '../../../../styles/custom-video-js.css';
import {FileUtils} from "../../../../utils/FileUtils";
import {DownloadUtils} from "../../../../utils/DownloadUtils"
import {HistoryEntityData, ModelEntityData} from "../../../../types/chameleon-platform.common";
const videoURL = '/videos/video.mp4'

export default function SingleVideoViewer(executeData : HistoryEntityData) {

    const videoRef = useRef<HTMLVideoElement>(null);
    let outputInformation = executeData?.outputInfo?.fileName
    const extension = outputInformation?.split('.').pop();
    let outputPath = executeData?.outputPath
    let outputSize = executeData?.outputInfo?.fileSize
    let outputName = executeData?.outputInfo?.fileName

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
            <div className="md:p-2 space-x-3 flex justify-between items-center border-b border-gray-300" style={{ backgroundColor: '#F6F6F6' }}>
                <p className="text-xl font-semibold">Output</p>
                <div className="pt-1 flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                    <BiDownload size="20" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="text-sm"
                                  onClick={async () => {DownloadUtils.download('/'+ outputPath, outputName);}}></SubmitButton>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[352px]">
                <p> <span className="px-2 pt-2">Output Format :</span> {extension} </p>
                <p> <span className="px-2 pt-2">Size :</span> {FileUtils.formatBytes(outputSize)} </p>
                <video src={'/'+ outputPath} className="video-js vjs-classic-skin" controls autoPlay={false} ref={videoRef}/>
            </div>
        </div>
    );
}