import React from 'react';
import {Badge, Table} from "flowbite-react";
import {ModelsLayoutProps} from "../../../../types/chameleon-client";
import {TimeUtils} from "../../../../utils/TimeUtils";

export default function ModelsListLayout({models, onModelSelect}: ModelsLayoutProps) {
    return <div>
        <Table hoverable={true}>
            <Table.Head>
                {['Model Name', 'Input Type', 'Output Type', 'Region', 'Register', 'Created Time', 'Category', 'Price'].map((item) => (
                    <Table.HeadCell key={item}>{item}</Table.HeadCell>))}
            </Table.Head>
            <Table.Body className="divide-y">
                {models.map((modelData) => (
                    <Table.Row className="bg-white cursor-pointer" onClick={() => onModelSelect(modelData)}>
                        <Table.Cell
                            className="whitespace-nowrap font-medium text-gray-900">{modelData.name}</Table.Cell>
                        <Table.Cell>
                            <div className="flex"><Badge color="indigo">{modelData.inputType}</Badge></div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className="flex"><Badge color="purple">{modelData.outputType}</Badge></div>
                        </Table.Cell>
                        <Table.Cell>{modelData.image.region.name}</Table.Cell>
                        <Table.Cell>{modelData.register.username}</Table.Cell>
                        <Table.Cell>{TimeUtils.formatTime(modelData.createdTime)}</Table.Cell>
                        {modelData.category === null ? (<Table.Cell></Table.Cell>) : (
                            <Table.Cell>
                                <div className="flex">
                                    <Badge className="bg-teal-100 text-teal-500">{modelData.category}</Badge>
                                </div>
                            </Table.Cell>
                        )}
                        {modelData.price === 0 ? (<Table.Cell></Table.Cell>) : (
                            <Table.Cell>
                                <div className="text-red-600">￦{modelData.price.toLocaleString('ko-KR')}</div>
                            </Table.Cell>)}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>;
};