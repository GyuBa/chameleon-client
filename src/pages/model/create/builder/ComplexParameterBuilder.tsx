import React, {useEffect, useState} from 'react';
import ErrorBoundary from "../error/ErrorBoundary";
import {JsonFormPropertyType} from "../../../../types/chameleon-client.enum";
import MonaCoEditor from "@monaco-editor/react";
import {ParameterBuilderProps} from "../../../../types/chameleon-client";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ParameterEditorTab from "./tab/ParameterEditorTab";
import useGlobalContext from "../../../../contexts/hook/useGlobalContext";

const editorOptions = {
    minimap: {
        enabled: false,
    },
    automaticLayout: true,
    fontSize: 17,
    scrollBeyondLastLine: false,
};
export default function ComplexParameterBuilder() {
    const {modelData, setModelData} = useGlobalContext();
    const [propertyType, setPropertyType] = useState<JsonFormPropertyType>(JsonFormPropertyType.SCHEMA);
    const [schemaString, setSchemaString] = useState<string>(JSON.stringify(modelData?.parameters.schema, null, 4));
    const [uiSchemaString, setUISchemaString] = useState<string>(JSON.stringify(modelData?.parameters.uischema, null, 4));
    const [dataString, setDataString] = useState<string>(JSON.stringify(modelData?.parameters.data, null, 4));

    useEffect(() => {
        try {
            setModelData({
                ...modelData, parameters: {
                    ...modelData?.parameters,
                    schema: JSON.parse(schemaString),
                    uischema: JSON.parse(uiSchemaString),
                    data: JSON.parse(dataString)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }, [schemaString, uiSchemaString, dataString]);

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
                            data={modelData?.parameters.data}
                            schema={modelData?.parameters.schema}
                            uischema={modelData?.parameters.uischema}
                            renderers={materialRenderers}
                            cells={materialCells}
                        />}
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    </div>
};