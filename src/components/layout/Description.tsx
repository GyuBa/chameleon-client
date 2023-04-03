import React from 'react';
import {Link} from "react-router-dom";
import {Badge} from "flowbite-react";
import MDEditor from "@uiw/react-md-editor";
import {Button} from "../index";
import {useStateContext} from "../../contexts/ContextProvider";

interface DescriptionProps {
    descriptionInfo: {
        username: string;
        modelname: string;
        region: string;
        input: string;
        output: string;
        description: string;
    };
}

export default function Description({descriptionInfo}: DescriptionProps) {
    const {currentColor, value} = useStateContext();
    const {modelname, username, region, input, output, description} = descriptionInfo;

    if (!descriptionInfo) {
        return <div>Loading...</div>;
    }
    return (
        <div className="contents">
            <div className="m-2 md:my-10 mt-24 p-2 md:pr-5 md:py-10 bg-white rounded-3xl overflow-auto">
                <div className="flex justify-between items-center pb-6 border-b-1 border-gray-300 overflow-auto overflow-scroll max-h-screen">
                    <p className="text-3xl font-extrabold tracking-tight text-slate-900">{modelname}</p>
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
                        <p>{modelname}</p>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Model Developer:ㅤ</p>
                        <p>{username}</p>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Region:ㅤ</p>
                        <p>{region}</p>
                    </div>
                    <div className="flex">
                        <div className="py-3"><Badge color="indigo">Input: {input}</Badge></div>
                        <div className="p-3"><Badge color="purple">Output: {output}</Badge></div>
                    </div>
                    <div className="flex my-2 items-center">
                        <p className="text-lg font-bold">Parameter:ㅤ</p>
                        <p>~~</p>
                    </div>
                    <div className="my-2 whitespace-pre-wrap">
                        <p className="text-lg font-bold">Model Description:ㅤ</p>
                        <MDEditor.Markdown className="py-5" source={value} style={{whiteSpace: 'pre-wrap'}}/>
                        {/*{description}*/}
                    </div>
                </div>
            </div>
        </div>
    );
};