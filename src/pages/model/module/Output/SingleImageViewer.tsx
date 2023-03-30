import React, {useState, useEffect} from "react";
import SubmitButton from "../../../../components/button/SubmitButton"
import {DownloadUtils, FileUtils} from "../../../../utils/Utils"
import cutechameleon from "../../../../assets/images/cutechameleon.png"
import {BiDownload} from "react-icons/bi";

const toBlob = (url: string) => {
    return new Promise<Blob>((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
};

const convertImageToBlob = async () => {
    const blob = await toBlob(cutechameleon);
    return blob;
};

const createObjectURLFromBlob = async () => {
    const blob = await convertImageToBlob();
    const url = window.URL.createObjectURL(blob);
    return url
};

const computeFileSize = async () => {
    const blob = await convertImageToBlob();
    const rawSize = blob.size
    return rawSize
}

export default function SingleImageViewer() {

    let outputExtensions = 'img'
    const [size, setSize] = useState<number>(0)
    useEffect(() => {
        const getSize = async () => {
            const fileSize = await computeFileSize();
            setSize(fileSize);
        }
        getSize();
    }, [])

    const [url, setUrl] = useState<string>("");

    useEffect(() => {
        const getUrl = async () => {
            const blobUrl = await createObjectURLFromBlob();
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
            <img style={{width: '50%'}} src={url}/>
        </div>

    );
}