import {BiDownload} from "react-icons/bi";
import React from "react";
import {DownloadButtonProps} from "../../../../types/Types";
import axios from "axios/index";

export default function SingleImageViewer() {

    const DownloadButton = ({url, format, filename}: DownloadButtonProps) => {
        const handleClick = async () => {
            const response = await axios.get(`${url}?format=${format}`, {
                responseType: 'blob',
            });
            const blob = new Blob([response.data], {type: response.headers['content-type']});
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `${filename}.${format}`;
            link.click();
        };

        return <button onClick={handleClick}>Download {format.toUpperCase()}</button>;
    };

    return (
        <div>
            <div className="py-2 flex justify-between items-center space-x-3 border-b">
                <p className="text-xl font-bold">Output</p>
                <div className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="25" color="#484848" className="pl-1"/>
                    <DownloadButton url='api/' format="jpg" filename="data"/>
                </div>
            </div>
            <p className="px-2 pt-2">Output Format : </p>
            <p className="px-2 font-bold">Size : </p>
        </div>

    );


}