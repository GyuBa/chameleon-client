import {Table} from "flowbite-react";
import {historyColumn} from "../../assets/Dummy";
import React from "react";
import {HistoryEntityData} from "../../types/chameleon-platform.common";
import {DateUtils} from "../../utils/DateUtils";

type HistoryRow = {
    rows: HistoryEntityData[]
}

function getStatusColor(status: string){
    if (status == 'cached') return '#ffff33'
    if (status == 'initializing') return '#ffffff'
    if (status == 'running') return '#00cc66'
    if (status == 'error') return '#ff6666'
    if (status == 'finished') return '#3333ff'
    else return '#ff0000'
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
                            <Table.Cell>{row.status}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}