import React from "react";
import SingleInputUploader from "../module/Input/SingleInputUploader"
import EmptyInputUploader from "../module/Input/EmptyInputUploader"
import {HistoryEntityData, ModelEntityData, ModelInputType} from "../../../types/chameleon-platform.common";

export default function InputModule(parameter: Object, modelData: ModelEntityData, executeData: HistoryEntityData) {
    let inputType = modelData?.inputType;
    let Module;

    if (inputType === ModelInputType.NONE) {
        Module = (parameter && modelData) ? () => EmptyInputUploader(parameter, modelData, executeData) : null;
    } else if (inputType === undefined) {
        Module = null;
    } else
        Module = (parameter && modelData) ? () => SingleInputUploader(parameter, modelData, executeData) : null;


    return (
        <div className="row-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
            {Module ? <Module/> : <></>}
        </div>
    );
}