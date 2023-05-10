import React, {useEffect, useRef, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {BiDownload} from "react-icons/bi";
import videojs from "video.js"
import 'video.js/dist/video-js.css';
import '../../../../styles/custom-video-js.css';
import {FileUtils} from "../../../../utils/FileUtils";
import {DownloadUtils} from "../../../../utils/DownloadUtils"

const videoURL = '/videos/test.MOV'

export default function SingleVideoViewer() {

    const extension = videoURL.split('.').pop(); // 'MOV'
    const videoRef = useRef<HTMLVideoElement>(null);
    const [fileSize, setFileSize] = useState<number>(0);

    fetch(videoURL)
        .then((response) => {
            const Size = response.headers.get('Content-Length');
            setFileSize(Number(Size))
        })
        .catch((error) => console.error(error));

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
            <div className="py-2 flex justify-between items-center space-x-3 border-b">
                <p className="text-xl font-bold">Output</p>
                <div className="flex items-center rounded-full hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="25" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="float-end btn-sm info" onClick={async () => {
                        DownloadUtils.download(videoURL, 'test');
                    }}></SubmitButton>
                </div>
            </div>
            <p className="px-2 pt-2">Output Format : {extension} </p>
            <p className="px-2 pt-2">Size : {FileUtils.formatBytes(fileSize)} </p>
            <video src={videoURL} className="video-js vjs-classic-skin" controls autoPlay={false} ref={videoRef}/>
        </div>
    );
}