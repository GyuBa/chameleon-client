import React from "react";
import {
    HistoryEntityData,
    ModelCommonUploadData,
    ModelEntityData,
    ModelInputType,
    ModelParameters,
    RegionEntityData, UserEntityData
} from "./chameleon-platform.common";
import {ModelFileType, ParameterType, PageType} from "./chameleon-client.enum";

export type ModuleData = {
    history: HistoryEntityData,
    model?: InputModelInfo,
    type: PageType,
    parameters: ModelParameters
}

export type ParameterDetail = {
    name: string;
    type: ParameterType;
    minInteger?: number,
    maxInteger?: number,
    maxNumber?: number,
    minNumber?: number,
    pattern?: string,
    defaultInteger?: number,
    defaultNumber?: number,
    defaultString?: string,
    defaultBoolean?: boolean,
    defaultDate?: string,
    defaultTime?: string,
    defaultDatetime?: string,
    integerEnum?: number[],
    numberEnum?: number[],
    stringEnum?: string[],
    description?: string,
}

export type GlobalContextData = {
    activeMenu: boolean;
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>
    modelData: ModelUploadData;
    setModelData: React.Dispatch<React.SetStateAction<ModelUploadData>>
    regions: RegionEntityData[];
    setRegions: React.Dispatch<React.SetStateAction<RegionEntityData[]>>
    parameterDetails: ParameterDetail[]
    setParameterDetails: React.Dispatch<React.SetStateAction<ParameterDetail[]>>
    user: UserEntityData;
    setUser: React.Dispatch<React.SetStateAction<UserEntityData>>
};

export type IFile = File & { preview?: string };

export type ModelUploadData = ModelCommonUploadData & { files: IFile[], file: IFile, fileType: ModelFileType };

export interface DescriptionProps {
    modelId: number;
    setSelectedModelId: React.Dispatch<React.SetStateAction<number>>;
    setDeleteModalContext: React.Dispatch<React.SetStateAction<DeleteModalContext>>;
}

export interface InputModelInfo {
    id: number;
    inputType: ModelInputType;
}

export interface HistoriesProps {
    histories: HistoryEntityData[]
}

export interface ModelsProps {
    ownOnly?: boolean
}

export interface ModelsLayoutProps {
    models: ModelEntityData[];
    onModelSelect: (modelData: ModelEntityData) => void;
}

export interface ParameterBuilderProps {
    parameters: ModelParameters;
    setParameters: Function;
}

export type ParameterEditorTabProps = {
    isVisible: boolean
    value: string,
    onChange: (value: string | undefined) => void
}

export type ModuleData = {
    parameters: ModelParameters
    history: HistoryEntityData,
    model?: ModelEntityData,
    type: PageType,
}

export type DeleteModalContext = {
    currentModel: ModelEntityData;
    open: boolean;
}