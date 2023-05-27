import React, {useEffect, useState} from "react";
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {HistoriesTable} from "./HistoriesTable";
import {HistoryEntityData} from "../../../types/chameleon-platform.common";

export default function Histories() {
    const [histories, setHistories] = useState<HistoryEntityData[]>([]);

    useEffect(() => {
        let completed = false;

        (async function () {
            try {
                const histories = await PlatformAPI.getHistories();
                if (!completed) {
                    setHistories(histories);
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
                        <p className='head-text'>Histories</p>
                    </div>
                </div>
                <div className="mt-10 h-full overflow-auto">
                    <HistoriesTable histories={histories}/>
                </div>
            </div>
        </div>
    );
};