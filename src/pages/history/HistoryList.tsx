import {Badge, Table} from "flowbite-react";
import {historyColumn} from "../../assets/Dummy";
import React from "react";
import {HistoryEntityData, HistoryStatus} from "../../types/chameleon-platform.common";
import {DateUtils} from "../../utils/DateUtils";

type HistoryRow = {
    rows: HistoryEntityData[]
}

function getStatusColor(status: HistoryStatus):string{
    if (status == 'cached') return 'gray'
    if (status == 'initializing') return 'info'
    if (status == 'running') return 'success'
    if (status == 'error') return 'failure'
    if (status == 'finished') return 'indigo'
    else return 'pink'
}

export function HistoryList({rows}: HistoryRow) {
    return (
        <div>
            <Table hoverable={true}>
                <Table.Head>
                    {historyColumn.list.map((item) => (
                        <Table.HeadCell>{item}</Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        rows.length!=0?rows.map((row) => (
                            <Table.Row key={`history-${row.id}`} className={'bg-white'}>
                                <Table.Cell>{row.id}</Table.Cell>
                                <Table.Cell>{row.model.name?row.model.name:''}</Table.Cell>
                                <Table.Cell>{DateUtils.formatDate(row.startedTime)}</Table.Cell>
                                <Table.Cell>{DateUtils.formatDate(row.endedTime)}</Table.Cell>
                                <Table.Cell>{row.executor.username}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex"><Badge color={getStatusColor(row.status)}>{row.status}</Badge></div>
                                </Table.Cell>
                            </Table.Row>
                        )): <>
                            <Table.Row>
                                <Table.Cell className={'text-center'} colSpan={6}>History Data can not found</Table.Cell>
                            </Table.Row>
                        </>
                    }
                </Table.Body>
            </Table>
        </div>
    );
}