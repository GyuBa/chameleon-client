import React, {CSSProperties, ReactNode} from "react";

export type HeaderData = {
    category?: string;
    title?: string;
}

export type DefaultButtonData = {
    style?: CSSProperties | undefined,
    className?: string,
    icon?: ReactNode,
    text?: string,
}
// TODO: onClick, event type 수정 필요
export type SubmitButtonData = {
    className?: string,
    text?: string,
    onClick?: Promise<void> | any,
    event?: JSX.Element | any,
    disabled?: boolean
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
    modelId: number | undefined;
    inputPath: number | undefined;
}