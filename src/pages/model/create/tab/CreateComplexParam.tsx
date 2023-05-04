import React, {useState} from "react";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {defaultSchema, defaultUISchema} from "../../../../assets/Dummy";
import ErrorBoundary from "../../module/ParamErrorboundary"
import MonaCoEditor from "@monaco-editor/react";

const initialData = {};

let changedSchema = defaultSchema;
let changedUISchema = defaultUISchema;

export default function CreateComplexParam() {
    const stringSchema = JSON.stringify(defaultSchema, null, 2);
    const stringUISchema = JSON.stringify(defaultUISchema, null, 2);
    const [schema, setSchema] = useState<string>(stringSchema);
    const [uischema, setUISchema] = useState<string>(stringUISchema);
    const [data, setData] = useState(initialData);

    try {
        const parsedSchema = JSON.parse(schema);
        const parsedUISchema = JSON.parse(uischema);

        changedSchema = parsedSchema;
        changedUISchema = parsedUISchema;

    } catch {

    }

    return (
        <div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
            <div>
                <h1 className="md:py-3 text-xl font-bold">Schema</h1>
                <div
                    className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                    <MonaCoEditor
                        language="json"
                        height={300}
                        width={400}
                        theme="vs-light"
                        value={schema}
                        onChange={(value) => setSchema(value || '')}
                        options={{
                            minimap: {
                                enabled: false,
                            },
                            automaticLayout: true,
                        }}
                    />
                </div>
                <div className="mb-2">
                    <h1 className="md:py-3 text-xl font-bold">UISchema</h1>
                    <div
                        className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                        <MonaCoEditor
                            language="json"
                            height={300}
                            width={400}
                            theme="vs-light"
                            value={uischema}
                            onChange={(value) => setUISchema(value || '')}
                            options={{
                                minimap: {
                                    enabled: false,
                                },
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="mb-2">
                <h1 className="md:py-3 text-xl font-bold">Result</h1>
                <ErrorBoundary>
                    <JsonForms
                        schema={changedSchema}
                        uischema={changedUISchema}
                        data={data}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({data}) => {setData(data);}}
                    />
                </ErrorBoundary>
            </div>
        </div>
    );
}