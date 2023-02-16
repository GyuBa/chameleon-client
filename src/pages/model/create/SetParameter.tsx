import React, {useState} from 'react';
import {Header, Button} from "../../../components";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {dSchema, dUIschema} from "../../../assets/Dummy"
import {BiCheckCircle} from "react-icons/bi";
import MonaCoEditor from "@monaco-editor/react"

const url = "https://jsonforms.io/examples/basic"
const initialData = {};
function TransForm(stschema : string, stuischema : string) {
    const {currentColor} = useStateContext();
    const [data, setData] = useState(initialData);

    try {
        const mschema = JSON.parse(stschema)
        const muischema = JSON.parse(stuischema)

        return (
            <div>
                <JsonForms
                    schema={mschema}
                    uischema={muischema}
                    data={data}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({errors, data}) => {
                        setData(data);
                    }}
                />
                <Link to="/execute-model" state = {{data : data, schema : mschema, uischema : muischema}}>
                    <Button color="white" bgColor={currentColor} text="파라미터 test" borderRadius="10px" width="32"
                            padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
                </Link>
            </div>
        );

    } catch {

    }

}

export default function SetParameter() {
    const toJson = (val : any) => JSON.stringify(val, null, 2);
    const StringSchema = toJson(dSchema)
    const StringUISchema = toJson(dUIschema)
    const [schema, setSchema] = React.useState<string | undefined>(StringSchema);
    const [uischema, setUISchema] = React.useState<string | undefined>(StringUISchema);
    const {currentColor} = useStateContext();

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div>
                    <div className="py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Header category="" title="Set Parameter"/>
                                <h1 className="mx-2 text-gray-500">JSONForms</h1>
                            </div>
                            <button onClick={()=>{window.open(url)}} className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                                <BiCheckCircle size="25" color="#484848" className="pl-1"/>
                                <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">참고사이트</span>
                            </button>
                        </div>
                        <div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
                            <div>
                                <div className="mb-2">
                                    <h1 className="md:py-3 text-xl font-bold">Schema</h1>
                                    <MonaCoEditor
                                        language="json"
                                        height={300}
                                        width = {400}
                                        theme="vs-light"
                                        value = {schema}
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
                                    <MonaCoEditor
                                        language="json"
                                        height={300}
                                        width = {400}
                                        theme="vs-light"
                                        value = {uischema}
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
                            <div className="mb-2">
                                <h1 className="md:py-3 text-xl font-bold">Result</h1>
                                {TransForm(schema as string, uischema as string)}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 float-right">
                        <Link to="/create-model">
                            <Button color="black" bgColor="white" text="취소" borderRadius="10px" width="16"
                                    padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
                        </Link>
                        <Link to="/model">
                            <Button color="white" bgColor={currentColor} text="생성" borderRadius="10px" width="32"
                                    padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};