import React, { useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import { BiDownload } from "react-icons/bi";
import { DownloadUtils } from "../../../../utils/DownloadUtils";
import { FileUtils } from "../../../../utils/FileUtils";

const imageURL = '/images/image.png';

export default function SingleImageViewer() {
    const extension = imageURL.split('.').pop();
    const [fileSize, setFileSize] = useState<number>(0);

    fetch(imageURL)
        .then((response) => {
            const Size = response.headers.get('Content-Length');
            setFileSize(Number(Size));
        })
        .catch((error) => console.error(error));

    return (
        <div>
            <div className="pb-1 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="20" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="text-sm"
                        onClick={() => DownloadUtils.download(imageURL, 'image.png')}/>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[352px]">
                <p className="px-2 pt-2">Output Format : {extension} </p>
                <p className="px-2 pt-2">Size : {FileUtils.formatBytes(fileSize)} </p>
                <img style={{width: "100%"}} src={imageURL} alt=""/>
            </div>
        </div>
    );
}