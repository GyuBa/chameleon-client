import React from "react";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonViewer} from "@textea/json-viewer";
import {ParametersData} from "../../../../types/chameleon-client"

export default function ParametersModule(parametersData : ParametersData) {

    const schema = parametersData.modelData?.parameters.schema
    const uiSchema = parametersData.modelData?.parameters.uischema
    const parameters = parametersData?.parameters
    const setParameters = parametersData?.setParameters
    const activeTabIndex = parametersData?.activeTabIndex
    const setActiveTabIndex = parametersData?.setActiveTabIndex
    const historyData = parametersData?.history

    return (
        <div className="row-span-2 rounded-lg border-1 border-gray-300">
            <div className="border-b border-gray-300" style={{backgroundColor: '#F6F6F6'}}>
                <div className="flex md:px-5 md:py-2 space-x-3 rounded-lg">
                    {['Parameters', 'Parameters (JSON)'].map((label, idx) => {
                        return (
                            <button
                                key={idx}
                                className={`text-xl font-semibold pb-2 border-b-4 transition-colors duration-300 ${
                                    idx === activeTabIndex
                                        ? "border-teal-500"
                                        : "border-transparent hover:border-gray-200"
                                }`}
                                onClick={() => setActiveTabIndex(idx)}>
                                {label}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="tab-content tab-space overflow-y-auto max-h-[212px] md:px-5">
                <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                    {historyData === undefined ?
                    <JsonForms
                        schema={schema}
                        uischema={uiSchema}
                        data={parameters}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({data}) => {
                            setParameters!(data);
                        }}
                    /> : <JsonForms
                            data={historyData.parameters}
                            renderers={materialRenderers}
                            cells={materialCells}
                            readonly
                        />}
                </div>
                <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                    <br/>
                    <JsonViewer className="text-lg" value={parameters ? parameters : {}} />
                </div>
            </div>
        </div>
    );
}