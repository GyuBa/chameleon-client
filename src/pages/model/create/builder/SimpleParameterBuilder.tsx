import React, {useEffect} from 'react';
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import ErrorBoundary from "../error/ErrorBoundary";
import {ParameterDetail} from "../../../../types/chameleon-client";
import {JsonFormUtils} from "../../../../utils/JsonFormUtils";
import useGlobalContext from "../../../../contexts/hook/useGlobalContext";

export default function SimpleParameterBuilder() {

    const {modelData, setModelData, parameterDetails, setParameterDetails} = useGlobalContext();
    const parameters = modelData?.parameters;

    useEffect(() => {
        setModelData({...modelData, parameters: JsonFormUtils.generateParameters([...parameterDetails])});
    }, [parameterDetails]);

    return <div>
        <div>
            <div
                className="gap-3 grid md:grid-cols-1 md:px-5 md:my-2 xl:grid-cols-1 xl:gap-3 2xl:grid-cols-2">
                <div className="array-jsonform">
                    <JsonForms
                        data={{parameterDetails}}
                        schema={JsonFormUtils.builderSchema}
                        uischema={JsonFormUtils.builderUISchema}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({data}: { data: { parameterDetails: ParameterDetail[] } }) => {
                            setParameterDetails([...data.parameterDetails]);
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