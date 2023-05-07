import {Table} from "flowbite-react";
import {historyColumn} from "../../assets/Dummy";
import React from "react";

export function HistoryList() {
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
                        </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}