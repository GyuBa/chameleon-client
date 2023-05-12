import React, {useEffect, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {testtext} from "../../../../assets/Dummy";
import {BiDownload} from "react-icons/bi";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";

export default function SingleTextViewer() {
    let outputExtensions = 'text';
    const [text, setText] = useState<string>("");

    useEffect(() => {
        const getText = async () => {
            let text = await fetch(url).then(r => r.text());
            setText(text);
        }
        getText();
    });

    const file = new File([testtext], "text.txt", {type: "text/plain"});
    const blob = new Blob([file], {type: "text/plain"});
    const url = window.URL.createObjectURL(blob);
    const size = blob.size;

    return (
        <div>
            <div className="pb-1 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:bg-light-gray focus:bg-gray">
                    <BiDownload size="20" color="#484848" className="pl-1"/>
                    <SubmitButton text="Download" className="text-sm"
                                  onClick={() => DownloadUtils.download(url, 'test')}/>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[352px]">
                <p className="px-2 pt-2">Output Format : {outputExtensions} </p>
                <p className="px-2 pt-2">Size : {FileUtils.formatBytes(size)} </p>
                <p className="px-2 pt-2">Output : </p>
                <br/>
                <p className="px-2 pt-2" style={{whiteSpace: "pre-wrap"}}>{text}</p>
            </div>
        </div>

    );

}