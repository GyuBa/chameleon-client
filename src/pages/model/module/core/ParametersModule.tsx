import React from "react";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonViewer} from "@textea/json-viewer";
import {ParametersData} from "../../../../types/chameleon-client"
import {ParameterStatus} from "../../../../types/chameleon-client.enum";

export default function ParametersModule(parametersData: ParametersData) {

    let status;
    const modelData = parametersData.modelData
    const schema = modelData?.parameters.schema
    const uiSchema = modelData?.parameters.uischema
    const parameters = parametersData?.parameters
    const setParameters = parametersData?.setParameters
    const activeTabIndex = parametersData?.activeTabIndex
    const setActiveTabIndex = parametersData?.setActiveTabIndex
    const historyData = parametersData?.history
    const jsonTabChoose = parametersData?.jsonTabChoose
    const setJsonTabChoose = parametersData?.setJsonTabChoose

    if (!jsonTabChoose && modelData && historyData && activeTabIndex !== 1) {
        status = ParameterStatus.IMMEDIATE_AFTER_EXECUTION;
    } else if (!modelData && historyData) {
        status = ParameterStatus.HISTORY;
    } else if (historyData) {
        status = ParameterStatus.AFTER_EXECUTION;
    } else if (parameters) {
        status = ParameterStatus.READY_EXECUTION
    }

    const tabLabel = (status === ParameterStatus.HISTORY) ? ['Parameters (JSON)'] : ['Parameters', 'Parameters (JSON)']

    if (status === ParameterStatus.IMMEDIATE_AFTER_EXECUTION) {
        setActiveTabIndex(1);
        setJsonTabChoose!(true)
    }

    return (
        <div className="row-span-2 rounded-lg border-1 border-gray-300">
            <div className="border-b border-gray-300 rounded-t-lg" style={{backgroundColor: '#F6F6F6'}}>
                <div className="flex md:px-5 md:py-2 space-x-3 rounded-lg">
                    {tabLabel.map((label, idx) => {
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
            {status === ParameterStatus.HISTORY ?
                <div className="tab-content tab-space overflow-y-auto max-h-[243px] md:px-5">
                    <div className={activeTabIndex === 0 ? "block" : "hidden"}>
                        <br/>
                        <JsonViewer className="text-lg" value={parameters ? parameters : {}}/>
                    </div>
                </div> :
                <div className="tab-content tab-space overflow-y-auto max-h-[243px] md:px-5">
                    <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                        {status === ParameterStatus.AFTER_EXECUTION ?
                            <div>
                                <br/>
                                <JsonForms
                                    data={historyData.parameters}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    readonly
                                />
                            </div>:
                            <div>
                                <br/>
                                {(status === ParameterStatus.READY_EXECUTION) && (
                                    <JsonForms
                                        schema={schema}
                                        uischema={uiSchema}
                                        data={parameters}
                                        renderers={materialRenderers}
                                        cells={materialCells}
                                        onChange={({data}) => {
                                            setParameters!(data);
                                        }}
                                    />
                                )}
                            </div>
                        }
                    </div>
                    <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                        <br/>
                        <JsonViewer className="text-lg" value={parameters ? parameters : {}}/>
                    </div>
                </div>}
        </div>
    );
}