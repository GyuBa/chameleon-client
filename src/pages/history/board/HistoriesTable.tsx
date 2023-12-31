import {Badge, Table} from "flowbite-react";
import React from "react";
import {HistoryStatus, SitePaths} from "../../../types/chameleon-platform.common";
import {TimeUtils} from "../../../utils/TimeUtils";
import {useNavigate} from "react-router-dom";
import {HistoriesProps} from "../../../types/chameleon-client";

function getStatusColor(status: HistoryStatus): string {
    switch (status) {
        case HistoryStatus.CACHED:
            return 'gray'
        case HistoryStatus.INITIALIZING:
            return 'info'
        case HistoryStatus.RUNNING:
            return 'success'
        case HistoryStatus.ERROR:
            return 'failure'
        case HistoryStatus.FINISHED:
            return 'indigo'
    }
}

export function HistoriesTable({histories}: HistoriesProps) {
    const navigate = useNavigate();
    console.log(histories)
    return (
        <div>
            <Table hoverable={true}>
                <Table.Head>
                    {['History ID', 'Parent ID', 'Model Name', 'Started Time', 'Ended Time', 'Executor', 'Status'].map((item, index) => (
                        <Table.HeadCell key={index}>{item}</Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="bg-white cursor-pointer">
                    {
                        histories.length !== 0 ? histories.map((historyData, index) => (
                            <Table.Row key={historyData.id} className="bg-white"
                                       onClick={() => navigate(SitePaths.HISTORY(historyData.id), {state: histories[index]})}>
                                <Table.Cell>{historyData.id}</Table.Cell>
                                {
                                    <Table.Cell>{
                                        historyData?.parent?.id ? <div className="flex"><Badge
                                                href={SitePaths.HISTORY(historyData?.parent?.id)}
                                                color={'gray'}>{historyData?.parent?.id}</Badge>
                                            </div>
                                            :
                                            <div className="flex"><Badge
                                                color={'gray'}>{'None'}</Badge>
                                            </div>
                                    }</Table.Cell>
                                }
                                <Table.Cell>{historyData.model ? (
                                    historyData.model.name) : (
                                    <p className="text-red">deleted model</p>
                                )}</Table.Cell>
                                <Table.Cell>{TimeUtils.formatTime(historyData.startedTime)}</Table.Cell>
                                <Table.Cell>{historyData.endedTime ? TimeUtils.formatTime(historyData.endedTime) : '-'}</Table.Cell>
                                <Table.Cell>{historyData.executor.username}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex"><Badge
                                        color={getStatusColor(historyData.status)}>{historyData.status}</Badge>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )) : <>
                            <Table.Row>
                                <Table.Cell className="text-center" colSpan={6}>History Data can not found</Table.Cell>
                            </Table.Row>
                        </>
                    }
                </Table.Body>
            </Table>
        </div>
    );
}