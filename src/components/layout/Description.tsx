import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Badge} from "flowbite-react";
import MDEditor from "@uiw/react-md-editor";
import Button from "../button/Button";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {ModelEntityData} from "../../types/chameleon-platform.common";

interface DescriptionProps {
    modelId: number;
}

export default function Description({modelId}: DescriptionProps) {
    const [modelData, setModelData] = useState<ModelEntityData>();

    useEffect(() => {
        let completed = false;

        (async function () {
            try {
                const model = await PlatformAPI.getModelById(modelId);
                if (!completed && model.id === modelId) {
                    setModelData(model);
                }
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            completed = true;
        };
    }, [modelId]);

    return (
        <div className="contents">
            <div className="m-2 md:my-10 mt-24 p-2 md:pr-5 md:py-10">
                <div
                    className="flex justify-between items-center pb-6 border-b-1 border-gray-300 overflow-auto max-h-screen">
                    <p className="text-3xl font-extrabold tracking-tight text-slate-900">{modelData?.name}</p>
                    <div className="flex gap-2">
                        <Link to="/models/execute" state={{model : modelData}}>
                            <Button className="color-btn text-sm w-full p-1.5" text="start"/>
                        </Link>
                    </div>
                </div>
                <div className="mt-8 overflow-auto overflow-scroll max-h-screen">
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Model Name:ㅤ</p>
                        <p>{modelData?.name}</p>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Model Register:ㅤ</p>
                        <p>{modelData?.register?.username}</p>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Region:ㅤ</p>
                        <p>{modelData?.image?.region?.name}</p>
                    </div>
                    <div className="flex">
                        <div className="py-3"><Badge color="indigo">Input: {modelData?.inputType}</Badge></div>
                        <div className="p-3"><Badge color="purple">Output: {modelData?.outputType}</Badge></div>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Parameters:ㅤ</p>
                        <p>{JSON.stringify(modelData?.parameters)}</p>
                    </div>
                    <div data-color-mode="light" className="my-2 whitespace-pre-wrap">
                        <p className="text-lg font-bold">Model Description:ㅤ</p>
                        <MDEditor.Markdown className="py-2" source={modelData?.description} style={{whiteSpace: 'pre-wrap'}} />
                    </div>
                </div>
            </div>
        </div>
    );
};