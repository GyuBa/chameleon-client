import {Badge, Table} from "flowbite-react";
import React from "react";
import {HistoryEntityData, HistoryStatus} from "../../../types/chameleon-platform.common";
import {DateUtils} from "../../../utils/DateUtils";
import {useNavigate} from "react-router-dom";

type HistoryRow = {
    rows: HistoryEntityData[]
}

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

const historyColumn = ['index', 'model name', 'stated time', 'ended time', 'excutor', 'status'];

export function HistoryListTable({rows}: HistoryRow) {
    const navigate = useNavigate();
    const navigateToDetail = (id: number) => {
        navigate('/history/detail', {state: rows[id]})
    }
    return (
        <div>
            <Table hoverable={true}>
                <Table.Head>
                    {historyColumn.map((item, index) => (
                        <Table.HeadCell key={index}>{item}</Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="bg-white">
                    {
                        rows.length != 0 ? rows.map((row, index) => (
                            <Table.Row key={row.id} className={'bg-white'} onClick={() => navigateToDetail(index)}>
                                <Table.Cell>{row.id}</Table.Cell>
                                <Table.Cell>{row.model ? (
                                    row.model.name) : (
                                    <p style={{color: "red"}}>deleted</p>
                                )}</Table.Cell>
                                <Table.Cell>{DateUtils.formatDate(row.startedTime)}</Table.Cell>
                                <Table.Cell>{row.endedTime ? DateUtils.formatDate(row.endedTime) : '-'}</Table.Cell>
                                <Table.Cell>{row.executor.username}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex"><Badge color={getStatusColor(row.status)}>{row.status}</Badge>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )) : <>
                            <Table.Row>
                                <Table.Cell className={'text-center'} colSpan={6}>History Data can not
                                    found</Table.Cell>
                            </Table.Row>
                        </>
                    }
                </Table.Body>
            </Table>
        </div>
    );
}