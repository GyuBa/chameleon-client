import React from "react";
import {ModelInputType} from "./chameleon-platform.common";

export type HeaderData = {
    category?: string;
    title?: string;
}

export type Parameter = {
    name: string;
    type: string;
    minInteger?: number,
    maxInteger?: number,
    maxNumber?: number,
    minNumber?: number,
    regex?: string,
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

export type DownloadButtonProps = {
    url: string;
    format: string;
    filename: string;
}

export interface DescriptionProps {
    modelId: number;
    setSelectedModelId: React.Dispatch<React.SetStateAction<number>>;
}

export interface InputModelInfo {
    id: number;
    inputType: ModelInputType;
}