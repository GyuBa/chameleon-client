import React, { useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import { BiDownload } from "react-icons/bi";
import { DownloadUtils } from "../../../../utils/DownloadUtils";
import { FileUtils } from "../../../../utils/FileUtils";

const imageURL = '/images/image.png'

export default function SingleImageViewer() {
    const extension = imageURL.split('.').pop();
    const [fileSize, setFileSize] = useState<number>(0);

    fetch(imageURL)
        .then((response) => {
            const Size = response.headers.get('Content-Length');
            setFileSize(Number(Size))
        })
        .catch((error) => console.error(error));

    return (
        <div>
            <div className="py-2 flex justify-between items-center space-x-3 border-b rounded-lg">
                <p className="text-xl font-bold">Output</p>
                <div className="flex items-center rounded-full hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="25" color="#484848" className="pl-1" />
                    <SubmitButton
                        text="Download"
                        className="float-end btn-sm info"
                        onClick={() =>
                            DownloadUtils.download(imageURL, 'image.png')
                        }
                    ></SubmitButton>
                </div>
            </div>
            <p className="px-2 pt-2">Output Format : {extension} </p>
            <p className="px-2 pt-2">Size : {FileUtils.formatBytes(fileSize)} </p>
            <img
                style={{ width: "100%" }}
                src={imageURL}
                alt=""
            />
        </div>
    );
}