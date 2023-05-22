import React from "react";
import {ModuleData} from "../../../../types/chameleon-client";
import {InputModuleMap} from "../../../../types/chameleon-client.enum";

export default function InputModule(moduleData : ModuleData) {

    const Module = InputModuleMap[moduleData.model?.inputType!]

    return (
        <div className="row-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
            <Module {...moduleData}/>
        </div>
    );
}