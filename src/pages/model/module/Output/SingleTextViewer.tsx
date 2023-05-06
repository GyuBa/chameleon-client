import React, {useEffect, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton"
import {testtext} from "../../../../assets/Dummy"
import {BiDownload} from "react-icons/bi";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";

export default function SingleTextViewer() {

    let outputExtensions = 'text'
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const getText = async () => {
            let text = await fetch(url).then(r => r.text());
            setText(text);
        }
        getText();
    })

    const file = new File([testtext], "text.txt", {type: "text/plain"});
    const blob = new Blob([file], {type: "text/plain"});
    const url = window.URL.createObjectURL(blob);
    const size = blob.size

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
            <p className="px-2 pt-2">Output : </p>
            <br/>
            <p className="px-2 pt-2" style={{whiteSpace: "pre-wrap"}}>{text}</p>
        </div>

    );

}