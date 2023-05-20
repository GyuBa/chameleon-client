import React, {useState, useEffect} from 'react';
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ErrorBoundary from "../error/ErrorBoundary";
import {ParameterBuilderProps, ParameterDetail} from "../../../../types/chameleon-client";
import {JsonFormUtils} from "../../../../utils/JsonFormUtils";
import {ParameterType} from "../../../../types/chameleon-client.enum";

export default function SimpleParameterBuilder({parameters, setParameters}: ParameterBuilderProps) {
    const [simpleBuilderData, setSimpleBuilderData] = useState({
        parameterDetails: [{
            name: 'name',
            type: ParameterType.STRING
        }]
    });

    useEffect(() => {
        setParameters(JsonFormUtils.generateParameters(simpleBuilderData.parameterDetails));
    }, [simpleBuilderData]);

    return <div>
        <div>
            <div
                className="gap-3 grid md:grid-cols-1 md:px-5 md:my-2 xl:grid-cols-1 xl:gap-3 2xl:grid-cols-2">
                <div className="array-jsonform">
                    <JsonForms
                        data={simpleBuilderData}
                        schema={JsonFormUtils.builderSchema}
                        uischema={JsonFormUtils.builderUISchema}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({data}: { data: { parameterDetails: ParameterDetail[] } }) => {
                            setSimpleBuilderData(data);
                        }}
                    />
                </div>
                <div>
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