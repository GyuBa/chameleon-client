import React, {useEffect} from 'react';
import CreateModelTab from "./tab/CreateModelTab";
import {ModelFileType, ParameterType} from "../../../types/chameleon-client.enum";
import useGlobalContext from "../../../contexts/hook/useGlobalContext";
import {ModelInputType, ModelOutputType} from "../../../types/chameleon-platform.common";
import {ModelUploadData} from "../../../types/chameleon-client";
import {JsonFormUtils} from "../../../utils/JsonFormUtils";

export default function CreateModelInfo() {
    const {modelData, setModelData, setParameterDetails} = useGlobalContext();

    useEffect(() => {
        if (!modelData) {
            const parameterDetails = [
                {name: 'name', type: ParameterType.STRING}
            ];
            setModelData({
                modelName: '',
                inputType: ModelInputType.EMPTY,
                outputType: ModelOutputType.BINARY,
                regionName: '',
                category: '',
                price: 0,
                fileType: ModelFileType.IMAGE,
                description: `# Your model name \n\n Please enter a description of the model`,
                parameters: {
                    schema: JsonFormUtils.generateSchema(parameterDetails),
                    uischema: {
                        type: 'VerticalLayout',
                        elements: [{
                            type: 'Control',
                            scope: `#/properties/name`
                        }]
                    },
                    data: {}
                }
            } as ModelUploadData);
            setParameterDetails(parameterDetails);
        }
    }, []);

    return (
        <div className="contents">
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12 overflow-auto">
                <div>
                    <div className="flex space-x-3 border-b">
                        <button
                            className={ModelFileType.IMAGE === modelData?.fileType
                                ? "default-tab-active"
                                : "default-tab-inactive"
                            }
                            onClick={() => setModelData({...modelData, fileType: ModelFileType.IMAGE})}>
                            Tar image
                        </button>
                        <button
                            className={ModelFileType.DOCKERFILE === modelData?.fileType
                                ? "default-tab-active"
                                : "default-tab-inactive"
                            }
                            onClick={() => setModelData({...modelData, fileType: ModelFileType.DOCKERFILE})}>
                            Dockerfile
                        </button>
                    </div>
                    <div className="tab-content tab-space">
                        <CreateModelTab/>
                    </div>
                </div>
            </div>
        </div>
    );
};