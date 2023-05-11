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
            <div className="pb-1 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="20" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="text-sm"
                                  onClick={async () => {DownloadUtils.download(url, 'test');}}></SubmitButton>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[352px]">
                <p className="px-2 pt-2">Output Format : {outputExtensions} </p>
                <p className="px-2 pt-2">Size : {FileUtils.formatBytes(size)} </p>
            </div>
        </div>
    );
}