import React, {useEffect, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {PlatformAPI} from "../../../../platform/PlatformAPI";

export default function EmptyInputUploader(parameter : Object, modelData : any) {
    let modelId = modelData?.id
    let file = new File(["{}"], "empty");
    let parameters = JSON.stringify({parameter : parameter});
    const [historyStatus, setHistoryStatus] = useState<string>('');

    const handleModelStart = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const executeInfo = await PlatformAPI.executeModel({
                modelId,
                parameters,
                input: file
            });
            console.log(executeInfo);
            console.log('Upload done!');

        } catch (error) {
            console.log('Upload error...');
        }
    }

    useEffect(() => {
        let completed = false;

        (async function () {
            try {
                const model = await PlatformAPI.getHistories();
                console.log(model)

            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            completed = true;
        };
    }, []);

    return (
        <div>
            <div className="pb-1 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Control Model</p>
            </div>
            <div className="flex justify-center rounded-lg md:py-10 hover:bg-light-gray focus:bg-gray">
                <SubmitButton onClick={handleModelStart} text="Start Model"
                              className="color-btn text-2xl"/>
            </div>
        </div>
    );
}