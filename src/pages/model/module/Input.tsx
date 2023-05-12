import React from "react";
import SingleInputUploader from "../module/Input/SingleInputUploader"
import EmptyInputUploader from "../module/Input/EmptyInputUploader"

export default function InputModule(parameter : Object, modelData : any) {
    let inputType = modelData?.inputType;

    return (
        <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
            {inputType === "none" ? EmptyInputUploader(parameter, modelData) : SingleInputUploader(parameter, modelData)}</div>
    );
}