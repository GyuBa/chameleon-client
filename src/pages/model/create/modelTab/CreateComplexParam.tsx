import {useStateContext} from "../../../../contexts/ContextProvider";
import React, {useState} from "react";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {Link} from "react-router-dom";
import {Button} from "../../../../components";
import {dSchema, dUIschema} from "../../../../assets/Dummy";
import ErrorBoundary from "../../module/ParamErrorboundary"
import MonaCoEditor from "@monaco-editor/react";

const initialData = {};

var vSchema = dSchema;
var vUISchema = dUIschema;


function TransForm(stSchema: string, stUISchema: string) {
    const {currentColor} = useStateContext();
    const [data, setData] = useState(initialData);

    try {
        const mschema = JSON.parse(stSchema)
        const muischema = JSON.parse(stUISchema)

        vSchema = mschema
        vUISchema = muischema

    } catch {

    } finally {
        return (
            <ErrorBoundary>
                <div>
                    <JsonForms
                        schema={vSchema}
                        uischema={vUISchema}
                        data={data}
                        renderers={materialRenderers}
                        cells={materialCells}
                        onChange={({errors, data}) => {
                            setData(data);
                        }}
                    />
                    <div>
                        <Link to="/model/execute" state={{schema: vSchema, uischema: vUISchema}}>
                            <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                    className="w-32 p-2" text="Parameter Test"/>
                        </Link>
                    </div>
                </div>
            </ErrorBoundary>
        );
    }

}

export default function CreateComplexParam() {

    const toJson = (val: any) => JSON.stringify(val, null, 2);
    const stringSchema = toJson(dSchema)
    const stringUISchema = toJson(dUIschema)
    const [schema, setSchema] = React.useState<string | undefined>(stringSchema);
    const [uischema, setUISchema] = React.useState<string | undefined>(stringUISchema);

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
                        onChange={(value) => setSchema(value)}
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
                            onChange={(value) => setUISchema(value)}
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
                {TransForm(schema as string, uischema as string)}
            </div>
        </div>
    );
}