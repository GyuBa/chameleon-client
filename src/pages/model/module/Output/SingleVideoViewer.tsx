import React, {useRef, useEffect, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {DownloadUtils, FileUtils} from "../../../../utils/Utils";
import {BiDownload} from "react-icons/bi";
import videojs from "video.js"
import 'video.js/dist/video-js.css';
import '../../../../styles/custom-video-js.css'; // 추가된 부분

const videoURL = '/videos/test.MOV'

const toBlob = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
};

const convertVideoToBlob = async () => {
    const blob = await toBlob(videoURL);
    return blob;
};

const createObjectURLFromBlob = async () => {
    const blob = await convertVideoToBlob();
    const url = window.URL.createObjectURL(blob);
    return url
};

const computeFileSize = async () => {
    const blob = await convertVideoToBlob();
    const rawSize = blob.size
    return rawSize
}

export default function SingleVideoViewer() {

    let outputExtensions = 'mp4'
    const [size, setSize] = useState<number>(0)
    const [url, setUrl] = useState<string>("");
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {

        const getSize = async () => {
            const fileSize = await computeFileSize();
            setSize(fileSize);
        }
        const getUrl = async () => {
            const blobUrl = await createObjectURLFromBlob();
            setUrl(blobUrl);

            if (videoRef.current) {
                const player = videojs(videoRef.current, {
                }, () => {
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
    }, [])

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