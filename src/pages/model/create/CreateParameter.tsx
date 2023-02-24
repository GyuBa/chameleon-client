import React, {useState} from 'react';
import {Header, Button} from "../../../components";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {JsonForms} from "@jsonforms/react";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {schema, uischema} from "../../../assets/Dummy"
import {BiCheckCircle} from "react-icons/bi";
const initialData = {};

export default function CreateParameter() {
    const {currentColor} = useStateContext();
    const [data, setData] = useState(initialData);
    const url = "https://jsonforms.io/examples/basic"
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
                        <JsonForms
                            schema={schema}
                            uischema={uischema}
                            data={data}
                            renderers={materialRenderers}
                            cells={materialCells}
                            onChange={({errors, data}) => {
                                setData(data);
                            }}
                        />
                    </div>
                    <div className="flex gap-3 float-right">
                        <Link to="/model/create/description">
                            <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                                    className="w-16 p-2" text="back"/>
                        </Link>
                        <Link to="/model">
                            <Button style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}}
                                    className="w-16 p-2" text="create"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};