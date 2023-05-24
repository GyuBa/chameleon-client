import React from "react";
import MDEditor from "@uiw/react-md-editor";
import {MdOutlineCancel} from "react-icons/md";

export default function ExecuteDescriptionPanel(modelName : string, modelDescription: string) {

    return (
        <div className="contents">
            <div className="m-2 md:my-5 mt-24 p-2 md:pr-5 md:py-10">
                <div className="flex items-center">
                    <div data-color-mode="light" className="my-4 whitespace-pre-wrap">
                        <MDEditor.Markdown className="py-2 whitespace-pre-wrap" source={modelDescription}
                                           style={{whiteSpace: 'pre-wrap'}}/>
                    </div>
                </div>
            </div>
        </div>
    );
};