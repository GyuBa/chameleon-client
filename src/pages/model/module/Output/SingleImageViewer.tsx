import React, {useEffect, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton"
import cuteChameleon from "../../../../assets/images/cutechameleon.png"
import {BiDownload} from "react-icons/bi";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";

export default function SingleImageViewer() {

    let outputExtensions = 'img'
    const blob = DownloadUtils.imageToBlob(cuteChameleon)
    const [size, setSize] = useState<number>(0)
    useEffect(() => {
        const getSize = async () => {
            const fileSize = await DownloadUtils.computeFileSize(await blob);
            setSize(fileSize);
        }
        getSize();
    }, [])

    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        const getUrl = async () => {
            const blobUrl = await DownloadUtils.createObjectURLFromBlob(await blob);
            setUrl(blobUrl);
        }
        getUrl();
    }, [])

    return (
        <div>
            <div className="py-2 flex justify-between items-center space-x-3 border-b rounded-lg">
                <p className="text-xl font-bold">Output</p>
                <div className="flex items-center rounded-full hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="25" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="float-end btn-sm info" onClick={async () => {
                        DownloadUtils.download(url, 'chameleon');
                    }}></SubmitButton>
                </div>
            </div>
            <p className="px-2 pt-2">Output Format : {outputExtensions} </p>
            <p className="px-2 pt-2">Size : {FileUtils.formatBytes(size)} </p>
            <img style={{width: '50%'}} src={url} alt=""/>
        </div>
    );
}