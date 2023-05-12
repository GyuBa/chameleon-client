import React from "react";
import SingleInputUploader from "../module/Input/SingleInputUploader"
import EmptyInputUploader from "../module/Input/EmptyInputUploader"

const modules = [EmptyInputUploader, SingleInputUploader];

export default function InputModule(modelData : any) {
    let target = 'EmptyInputUploader';
    let Module = modules.find(m => m.name === target);

    return (
        <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
            {Module ? <Module/> : <></>}</div>
    );
}