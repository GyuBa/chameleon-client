import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Badge} from "flowbite-react";
import MDEditor from "@uiw/react-md-editor";
import {Button} from "../index";
import {useStateContext} from "../../contexts/ContextProvider";
import instance from "../../ConstantValue";

interface ModelInfo {
    modelName: string;
    inputType: string;
    outputType: string;
    username: string;
    regionName: string;
    description: string;
    parameter: string;
}

export default function Description() {
    const {currentColor, value} = useStateContext();
    const [modelInfo, setModelInfo] = useState<ModelInfo[]>([]);

    useEffect(() => {
        let completed = false;

        (async function get() {
            try {
                const response = await instance.get(`/model/info`, {
                    timeout: 5000,
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!completed) {
                    setModelInfo(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            completed = true;
        };
    }, []);

    return (
        <div className="contents">
            <div className="m-2 md:my-10 mt-24 p-2 md:pr-5 md:py-10 bg-white rounded-3xl overflow-auto">
                <div className="flex justify-between items-center pb-6 border-b-1 border-gray-300 overflow-auto overflow-scroll max-h-screen">
                    <p className="text-3xl font-extrabold tracking-tight text-slate-900">{modelInfo?.modelName}</p>
                    <div className="flex gap-2">
                        <Link to="/model/execute" state={{}}>
                            <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                    className="text-sm w-full p-1.5" text="start"/>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 overflow-auto overflow-scroll max-h-screen">
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Model Name:ㅤ</p>
                        <p>{modelInfo?.modelName}</p>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Model Developer:ㅤ</p>
                        <p>{modelInfo?.username}</p>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Region:ㅤ</p>
                        <p>{modelInfo?.regionName}</p>
                    </div>
                    <div className="flex">
                        <div className="py-3"><Badge color="indigo">Input: {modelInfo?.inputType}</Badge></div>
                        <div className="p-3"><Badge color="purple">Output: {modelInfo?.outputType}</Badge></div>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Parameter:ㅤ</p>
                        <p>{modelInfo?.parameter}</p>
                    </div>
                    <div className="my-2 whitespace-pre-wrap">
                        <p className="text-lg font-bold">Model Description:ㅤ</p>
                        <MDEditor.Markdown className="py-5" source={value} style={{whiteSpace: 'pre-wrap'}}/>
                        {modelInfo?.description}
                    </div>
                </div>
            </div>
        </div>
    );
};