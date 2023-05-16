import React from "react";
import {BiDownload} from "react-icons/bi";
import SubmitButton from "../../../../components/button/SubmitButton";
import {DownloadUtils} from "../../../../utils/DownloadUtils";

export default function NullViewer() {

    return (
        <div>
            <div className="md:p-2 space-x-3 flex justify-between items-center border-b border-gray-300" style={{ backgroundColor: '#F6F6F6' }}>
                <p className="text-xl font-semibold">Output</p>
                <div className="pt-1 flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                    <BiDownload size="20" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="text-sm"></SubmitButton>
                </div>
            </div>
        </div>
    );
}