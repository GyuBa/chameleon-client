import React, {useState, useEffect} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {HistoryEntityData, ModelEntityData} from "../../../../types/chameleon-platform.common";
import useWebSocket from "react-use-websocket";
import useGetUserInfo from "../../../../service/authentication/UserInfoService"
export default function EmptyInputUploader(parameter : Object, modelData : ModelEntityData) {

    const loadedUser = useGetUserInfo();
    const username = loadedUser?.username
    let modelId = modelData?.id
    let modelUniqueName = modelData?.uniqueName
    let file = new File(["{}"], "empty");
    let parameters = JSON.stringify({parameter : parameter});

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