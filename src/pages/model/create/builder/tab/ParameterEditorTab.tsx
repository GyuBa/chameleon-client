import React from 'react';
import MonaCoEditor from "@monaco-editor/react";
import {ParameterEditorTabProps} from "../../../../../types/chameleon-client";

export default function ParameterEditorTab({isVisible, value, onChange}: ParameterEditorTabProps) {
    return <div className="tab-content tab-space">
        <div className={isVisible ? "block" : "hidden"}>
            <div className="border border-gray-200 block bg-white">
                <MonaCoEditor
                    className="monaco-editor"
                    language="json"
                    height='60vh'
                    theme="vs-light"
                    options={{
                        minimap: {
                            enabled: false,
                        },
                        automaticLayout: true,
                        fontSize: 17,
                        scrollBeyondLastLine: false,
                    }}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    </div>;
};