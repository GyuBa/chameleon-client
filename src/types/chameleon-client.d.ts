import React from "react";
import {
    HistoryEntityData,
    ModelCommonUploadData,
    ModelEntityData,
    ModelInputType,
    ModelParameters,
    RegionEntityData
} from "./chameleon-platform.common";
import {ModelFileType, ParameterType} from "./chameleon-client.enum";

export type HeaderData = {
    category?: string;
    title?: string;
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

};

export type IFile = File & { preview?: string };

export type ModelUploadData = ModelCommonUploadData & { files: IFile[], file: IFile, fileType: ModelFileType };

export interface DescriptionProps {
    modelId: number;
    setSelectedModelId: React.Dispatch<React.SetStateAction<number>>;
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