import React, {useEffect, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import Header from "../../components/layout/Header";
import {HistoryList} from "./HistoryList";
import {HistoryEntityData} from "../../types/chameleon-client.entitydata";

const DUMMY_HISTORIES:HistoryEntityData[] = [

];
export default function History() {
    const [histories, setHistories] = useState<HistoryEntityData[]>([]);

    useEffect(() => {
        let completed = false;

        (async function () {
            try {
                // const histories = await PlatformAPI.getHistories();
                // if (!completed) {
                //     setHistories(histories);
                // }

                setHistories(DUMMY_HISTORIES);
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            completed = true;
        };
    }, []);


    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        <Header category="" title="History"/>
                    </div>
                </div>
                <div className="mt-10 max-h-screen overflow-auto">
                    <HistoryList rows={histories}/>
                </div>
            </div>
        </div>
    );
};