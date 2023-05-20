import React from 'react';
import {Badge} from "flowbite-react";
import {ModelsLayoutProps} from "../../../../types/chameleon-client";
import {TimeUtils} from "../../../../utils/TimeUtils";

export default function ModelsGridLayout({models, onModelSelect}: ModelsLayoutProps) {
    return <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-4">
        {models.map((modelData) => (
            <div key={modelData.id} onClick={() => onModelSelect(modelData)}
                 className="w-auto px-5 p-5 mb-4 mr-1 bg-white rounded-xl drop-shadow-lg hover:drop-shadow-xl cursor-pointer">
                <div className="flex border-b-2 justify-between">
                    <p className="font-semibold text-xl break-all">{modelData.name}</p>
                    {modelData.price !== 0 && (
                        <div className="flex gap-2 justify-between items-center">
                            <div className="text-red-600 pl-2">￦{modelData.price.toLocaleString('ko-KR')}</div>
                        </div>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex py-3 gap-3">
                        <Badge color="indigo">Input: {modelData.inputType}</Badge>
                        <Badge color="purple">Output: {modelData.outputType}</Badge>
                        {modelData.category !== null && (
                            <Badge className="bg-teal-100 text-teal-500">{modelData.category}</Badge>)}
                    </div>
                </div>
                <div className="flex mt-10 justify-between">
                    <div
                        className="text-sm text-gray-500 py-3">{TimeUtils.timeSince(modelData.createdTime)} · {modelData.register.username}</div>
                    <div className="py-3"><Badge color="gray">{modelData.image.region.name}</Badge></div>
                </div>
            </div>
        ))}
    </div>
};