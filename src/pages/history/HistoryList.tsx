import {Badge, Table} from "flowbite-react";
import React from "react";
import {HistoryEntityData} from "../../types/chameleon-platform.common";

type HistoryRow = {
    rows: HistoryEntityData[]
}

const historyColumn = {
    list: ['index', 'model name', 'started time', 'ended time', 'executor', 'status']
}

function getStatusColor(status: string) {
    if (status === 'cached') return 'gray';
    if (status === 'initializing') return 'info';
    if (status === 'running') return 'success';
    if (status === 'error') return 'failure';
    if (status === 'finished') return 'indigo';
    else return 'pink';
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
                    {rows.map((row) => (
                        <Table.Row key={`history-${row.id}`} className={'bg-white'}>
                            <Table.Cell>{row.id}</Table.Cell>
                            <Table.Cell>{'name'}</Table.Cell>
                            <Table.Cell>{'data'}</Table.Cell>
                            <Table.Cell>{'date'}</Table.Cell>
                            <Table.Cell>{'executor'}</Table.Cell>
                            <Table.Cell>
                                <div className="flex"><Badge color="purple">{row.status}</Badge></div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}