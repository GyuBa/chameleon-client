import {Table} from "flowbite-react";
import {historyColumn} from "../../assets/Dummy";
import React from "react";
import {HistoryEntityData} from "../../types/chameleon-client.entitydata";

type HistoryRow = {
    rows: HistoryEntityData[]
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
                        <Table.Row className="bg-white">
                            {
                                rows.map((row) => (
                                    <Table.Cell></Table.Cell>
                                ))
                            }
                        </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}