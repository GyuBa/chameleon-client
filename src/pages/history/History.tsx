import React, {useEffect, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import Header from "../../components/layout/Header";
import {HistoryList} from "./HistoryList";
import {HistoryEntityData} from "../../types/chameleon-platform.common";

const Dummy = [
    {
        "id": 197,
        "createdTime": "2023-05-09T14:35:42.311Z",
        "updatedTime": "2023-05-09T14:35:43.000Z",
        "status": "running",
        "inputPath": "uploads\\inputs\\2e73dccbc4cef6ce93240780a5943b0a",
        "inputInfo": {
            "size": 84954,
            "mimeType": "image/png",
            "originalName": "image.png"
        },
        "outputPath": "uploads/outputs/1d4d5593605f69355af881620a9985c3",
        "outputInfo": {
            "fileName": "output_image.png}",
            "fileSize": 84954
        },
        "startedTime": "2023-05-09T14:35:42.000Z",
        "parameters": {
            "param1": "example1",
            "param2": 2
        }
    }
]
export default function History() {
    const [histories, setHistories] = useState<HistoryEntityData[]>([]);

    useEffect(() => {
        let completed = false;

        (async function () {
            try {
                // const histories = await PlatformAPI.getMyHistories();
                const histories = await PlatformAPI.getHistories();
                if (!completed) {
                    console.log('history');
                    console.log(histories);
                    // @ts-ignore
                    setHistories(Dummy);
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