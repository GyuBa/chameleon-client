import {BiDownload} from "react-icons/bi";
import React, {useEffect, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";

const zipURL = '/test.Zip'

const toBlob = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
};

const convertZipToBlob = async () => {
    const blob = await toBlob(zipURL);
    return blob;
};

const createObjectURLFromBlob = async () => {
    const blob = await convertZipToBlob();
    const url = window.URL.createObjectURL(blob);
    return url
};

const computeFileSize = async () => {
    const blob = await convertZipToBlob();
    const rawSize = blob.size
    return rawSize
}

export default function ZipGalleryViewer() {

    let outputExtensions = 'zip'
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

    const [zip, setZip] = useState<Blob>();

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
        </div>
    );
}