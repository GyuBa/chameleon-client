import React, {useState} from 'react';
import CreateModelTab from "./tab/CreateModelTab";
import {ModelFileType} from "../../../types/chameleon-client.enum";

export default function CreateModelInfo() {
    const [modelFileType, setModelFileType] = useState<ModelFileType>(ModelFileType.IMAGE);

    return (
        <div className="contents">
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12">
                <div>
                    <div className="flex space-x-3 border-b">
                        <button
                            className={ModelFileType.IMAGE === modelFileType
                                ? "default-tab-active"
                                : "default-tab-inactive"
                            }
                            onClick={() => setModelFileType(ModelFileType.IMAGE)}>
                            Tar image
                        </button>
                        <button
                            className={ModelFileType.DOCKERFILE === modelFileType
                                ? "default-tab-active"
                                : "default-tab-inactive"
                            }
                            onClick={() => setModelFileType(ModelFileType.DOCKERFILE)}>
                            Dockerfile
                        </button>
                    </div>
                    <div className="tab-content tab-space">
                        <div className={ModelFileType.IMAGE === modelFileType ? "block" : "hidden"}>
                            <CreateModelTab modelFileType={modelFileType}/>
                        </div>
                        <div className={ModelFileType.DOCKERFILE === modelFileType ? "block" : "hidden"}>
                            <CreateModelTab modelFileType={modelFileType}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};