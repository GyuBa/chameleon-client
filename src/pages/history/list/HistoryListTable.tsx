import {Badge, Table} from "flowbite-react";
import {historyColumn} from "../../../assets/Dummy";
import React from "react";
import {HistoryEntityData, HistoryStatus} from "../../../types/chameleon-platform.common";
import {DateUtils} from "../../../utils/DateUtils";
import {useNavigate} from "react-router-dom";

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

export function HistoryListTable({rows}: HistoryRow) {
    const navigate = useNavigate();
    const navigateToDetail = (id: number) => {
        navigate('/history/detail',{state:{'id': id}})
    }
    return (
        <div>
            <Table hoverable={true}>
                <Table.Head>
                    {historyColumn.list.map((item, index) => (
                        <Table.HeadCell key={index}>{item}</Table.HeadCell>
                    ))}
                </Table.Head>
                <Table.Body className="bg-white">
                    {
                        rows.length!=0?rows.map((row) => (
                            <Table.Row key={row.id} className={'bg-white'} onClick={() => navigateToDetail(row.id)}>
                                <Table.Cell>{row.id}</Table.Cell>
                                <Table.Cell>{row.model.name?row.model.name:''}</Table.Cell>
                                <Table.Cell>{DateUtils.formatDate(row.startedTime)}</Table.Cell>
                                <Table.Cell>{row.endedTime?DateUtils.formatDate(row.endedTime): '-'}</Table.Cell>
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