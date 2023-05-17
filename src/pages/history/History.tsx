import React, {useEffect, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import Header from "../../components/layout/Header";
import {HistoryList} from "./HistoryList";
import {HistoryEntityData} from "../../types/chameleon-platform.common";

export default function History() {
    const [histories, setHistories] = useState<HistoryEntityData[]>([]);

    useEffect(() => {
        let completed = false;

        (async function () {
            try {
                // const histories = await PlatformAPI.getMyHistories();
                const histories = await PlatformAPI.getMyHistories();
                if (!completed) {
                    setHistories(histories);
                    console.log(histories);
                }
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
                        <Header category="" title="Histories"/>
                    </div>
                </div>
                <div className="mt-10 max-h-screen overflow-auto">
                    <HistoryList rows={histories}/>
                </div>
            </div>
        </div>
    );
};