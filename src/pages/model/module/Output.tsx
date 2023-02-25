import React from "react";
import domtoimage from "dom-to-image";
import {saveAs} from "file-saver";
import {BiDownload} from "react-icons/bi"


export default function OutputModule() {

    const onDownloadBtn = () => {
        domtoimage
            .toBlob(document.querySelector('.card') as Node)
            .then((blob) => {
                saveAs(blob, 'card.png');
            });
    };

    return (
        <div className="row-span-3 col-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            <div className="py-2 flex justify-between items-center space-x-3 border-b">
                <p className="text-xl font-bold">Output</p>
                <div className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="25" color="#484848" className="pl-1"/>
                    <button onClick={onDownloadBtn}>Download</button>
                </div>
            </div>
            <p className="px-2 pt-2">Output Format : </p>
            <p className="px-2 font-bold">Size : </p>
        </div>
    );

}