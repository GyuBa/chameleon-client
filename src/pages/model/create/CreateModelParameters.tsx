import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import "../../../styles/hide-form-name.css"
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {RiErrorWarningFill} from "react-icons/ri";
import LoadingCircle from "../../../components/static/LoadingCircle";
import {ModelParameters, SitePaths} from "../../../types/chameleon-platform.common";
import useGlobalContext from "../../../contexts/hook/useGlobalContext";
import {BuilderType, ModelFileType, ParameterType} from "../../../types/chameleon-client.enum";
import {JsonFormUtils} from "../../../utils/JsonFormUtils";
import SimpleParameterBuilder from "./builder/SimpleParameterBuilder";
import ComplexParameterBuilder from "./builder/ComplexParameterBuilder";

export default function CreateModelParameters() {
    const [builderType, setBuilderType] = useState<BuilderType>(BuilderType.SIMPLE);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(true);
    const [showError, setShowError] = useState(false);

    const [parameters, setParameters] = useState<ModelParameters>({
        schema: JsonFormUtils.generateSchema([
            {name: 'name', type: ParameterType.STRING}
        ]),
        uischema: {
            type: 'VerticalLayout',
            elements: [{
                type: 'Control',
                scope: `#/properties/name`
            }]
        },
        data: {}
    });

    useEffect(() => {
        if (modelData) {
            modelData.parameters = parameters;
            setModelData(modelData);
        }
    }, [parameters]);


    useEffect(() => {
        if (!isCompleted) {
            setShowError(true);
            const timeout = setTimeout(() => {
                setShowError(false);
                setIsCompleted(true);
            }, 3000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isCompleted]);

    const {modelData, setModelData} = useGlobalContext();

    if (!modelData) {
        return <Navigate to={SitePaths.CREATE_MODEL}/>;
    }
    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (modelData.modelFileType === ModelFileType.IMAGE) {
                modelData.file = modelData.files?.[0];
                modelData.files = undefined as any;
                await PlatformAPI.uploadModelWithImage(modelData);
            } else {
                await PlatformAPI.uploadModelWithDockerfile(modelData);
            }
            setIsLoading(false);
            navigate(SitePaths.MY_MODELS);
        } catch (error: any) {
            setIsLoading(false);
            setIsCompleted(false);
            if (error.response && error.response.status === 501) {
                console.error(error.response.data);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="contents">
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12">
                <div>
                    <div className="flex space-x-3 border-b">
                        <button
                            className={builderType === BuilderType.SIMPLE ? 'default-tab-active' : 'default-tab-inactive'}
                            onClick={() => setBuilderType(BuilderType.SIMPLE)}>
                            Simple Builder
                        </button>
                        <button
                            className={builderType === BuilderType.COMPLEX ? 'default-tab-active' : 'default-tab-inactive'}
                            onClick={() => setBuilderType(BuilderType.COMPLEX)}>
                            Complex Builder
                        </button>
                    </div>
                    <div className="pt-4 flex justify-between items-center">
                        <div className="flex items-center">
                            <p className='head-text'>Model Parameter</p>
                        </div>
                        <div className="flex gap-3 float-right">
                            {!isLoading && !isCompleted && (
                                <div
                                    className={`flex px-3 py-2 text-red-800 justify-center items-center rounded-lg bg-red-50 ${
                                        showError ? 'opacity-100 ease-in duration-150' : 'opacity-0 ease-out duration-150'}`}>
                                    <RiErrorWarningFill size={20}/>
                                    <div className="ml-2 text-sm font-medium">Warning: Upload Error! Check if there are
                                        any blanks.
                                    </div>
                                </div>
                            )}
                            <Link to={SitePaths.CREATE_MODEL_DESCRIPTION}>
                                <button className="white-btn w-16 p-2">back</button>
                            </Link>
                            <button className="blue-btn w-16" onClick={handleSubmit}>create</button>
                        </div>
                    </div>
                    <div className="tab-content tab-space">
                        {builderType === BuilderType.SIMPLE ?
                            <SimpleParameterBuilder parameters={parameters} setParameters={setParameters}/> :
                            <ComplexParameterBuilder parameters={parameters} setParameters={setParameters}/>}
                    </div>
                </div>
            </div>
            {isLoading && <LoadingCircle/>}
        </div>
    );
};