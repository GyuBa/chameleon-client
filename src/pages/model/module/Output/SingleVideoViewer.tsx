import React, {useEffect, useRef, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {BiDownload} from "react-icons/bi";
import videojs from "video.js"
import 'video.js/dist/video-js.css';
import '../../../../styles/custom-video-js.css';
import {BlobUtils} from "../../../../utils/BlobUtils";
import {FileUtils} from "../../../../utils/FileUtils";
import {DownloadUtils} from "../../../../utils/DownloadUtils"

const videoURL = '/videos/test.MOV'

export default function SingleVideoViewer() {

    let outputExtensions = 'mp4'
    const videoRef = useRef<HTMLVideoElement>(null);
    const blob = BlobUtils.videoToBlob(videoURL)
    const [size, setSize] = useState<number>(0)
    const [url, setUrl] = useState<string>("");

    useEffect(() => {

        const getSize = async () => {
            const fileSize = await BlobUtils.computeFileSize(await blob);
            setSize(fileSize);
        }
        const getUrl = async () => {
            const blobUrl = await BlobUtils.createObjectURLFromBlob(await blob);
            setUrl(blobUrl);

            if (videoRef.current) {
                const player = videojs(videoRef.current, {}, () => {
                });
                player.src({
                    src: blobUrl,
                    type: 'video/mp4'
                });
                player.play();
            }
        }

        getUrl();
        getSize();
    }, [blob])

    return (
        <div>
            <div className="py-2 flex justify-between items-center space-x-3 border-b">
                <p className="text-xl font-bold">Output</p>
                <div className="flex items-center rounded-full hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="25" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="float-end btn-sm info" onClick={async () => {
                        DownloadUtils.download(url, 'test');
                    }}></SubmitButton>
                </div>
            </div>
            <p className="px-2 pt-2">Output Format : {outputExtensions} </p>
            <p className="px-2 pt-2">Size : {FileUtils.formatBytes(size)} </p>
            <video ref={videoRef} className="video-js vjs-classic-skin" controls autoPlay={false}/>
        </div>
    );
}