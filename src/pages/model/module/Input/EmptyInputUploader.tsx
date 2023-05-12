import React from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
import {PlatformAPI} from "../../../../platform/PlatformAPI";

export default function EmptyInputUploader(modelData : any) {
    let modelId = modelData?.modelId
    const schema = modelData?.parameters?.schema;
    const uiSchema = modelData?.parameters?.uiSchema;
    let file = new File(["{}"], "empty");
    let parameters = JSON.stringify({schema: schema, uiSchema: uiSchema});

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