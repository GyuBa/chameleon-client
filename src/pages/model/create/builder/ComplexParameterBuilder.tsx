import React, {useEffect, useState} from 'react';
import ErrorBoundary from "../error/ErrorBoundary";
import {JsonFormPropertyType} from "../../../../types/chameleon-client.enum";
import MonaCoEditor from "@monaco-editor/react";
import {ParameterBuilderProps} from "../../../../types/chameleon-client";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ParameterEditorTab from "./tab/ParameterEditorTab";

const editorOptions = {
    minimap: {
        enabled: false,
    },
    automaticLayout: true,
    fontSize: 17,
    scrollBeyondLastLine: false,
};
export default function ComplexParameterBuilder({parameters, setParameters}: ParameterBuilderProps) {
    const [propertyType, setPropertyType] = useState<JsonFormPropertyType>(JsonFormPropertyType.SCHEMA);
    const [schemaString, setSchemaString] = useState<string>(JSON.stringify(parameters.schema, null, 4));
    const [uiSchemaString, setUISchemaString] = useState<string>(JSON.stringify(parameters.uischema, null, 4));
    const [dataString, setDataString] = useState<string>(JSON.stringify(parameters.data, null, 4));

    useEffect(() => {
        try {
            setParameters({
                ...parameters,
                schema: JSON.parse(schemaString),
                uischema: JSON.parse(uiSchemaString),
                data: JSON.parse(dataString)
            });
        } catch (error) {
            console.error(error);
        }
    }, [schemaString, uiSchemaString, dataString]);

    const EditorTab = ({tabType, value, onChange}: {
        tabType: JsonFormPropertyType,
        value: string,
        onChange: (value: string | undefined) => void
    }) => {
        return <div className="tab-content tab-space">
            <div className={propertyType === tabType ? "block" : "hidden"}>
                <div className="border border-gray-200 block bg-white">
                    <MonaCoEditor
                        className="monaco-editor"
                        language="json"
                        height='500px'
                        theme="vs-light"
                        options={editorOptions}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>;
    }

    return <div>
        <div>
            <div className="gap-3 grid xl:grid-cols-1 md:px-5 md:my-2 2xl:grid-cols-2">
                <div>
                    <div className="flex space-x-3 border-b">
                        <button
                            className={propertyType === JsonFormPropertyType.SCHEMA ? 'default-tab-active' : 'default-tab-inactive'}
                            onClick={() => setPropertyType(JsonFormPropertyType.SCHEMA)}>
                            Schema
                        </button>
                        <button
                            className={propertyType === JsonFormPropertyType.UI_SCHEMA ? 'default-tab-active' : 'default-tab-inactive'}
                            onClick={() => setPropertyType(JsonFormPropertyType.UI_SCHEMA)}>
                            UI Schema
                        </button>
                        <button
                            className={propertyType === JsonFormPropertyType.DATA ? 'default-tab-active' : 'default-tab-inactive'}
                            onClick={() => setPropertyType(JsonFormPropertyType.DATA)}>
                            Data
                        </button>
                    </div>

                    <ParameterEditorTab isVisible={propertyType === JsonFormPropertyType.SCHEMA} value={schemaString}
                                        onChange={(value) => setSchemaString(value || '')}/>
                    <ParameterEditorTab isVisible={propertyType === JsonFormPropertyType.UI_SCHEMA}
                                        value={uiSchemaString} onChange={(value) => setUISchemaString(value || '')}/>
                    <ParameterEditorTab isVisible={propertyType === JsonFormPropertyType.DATA} value={dataString}
                                        onChange={(value) => setDataString(value || '')}/>
                </div>

                <div className="mb-2">
                    <h1 className="md:py-3 text-xl font-bold">Result</h1>
                    <ErrorBoundary>
                        {<JsonForms
                            data={parameters.data}
                            schema={parameters.schema}
                            uischema={parameters.uischema}
                            renderers={materialRenderers}
                            cells={materialCells}
                        />}
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    </div>
};