import {CSSProperties, ReactNode} from "react";

type HeaderData = {
    category?: string;
    title?: string;
}

type DefaultButtonData = {
    style?: CSSProperties | undefined,
    className?: string,
    icon?: ReactNode,
    text?: string,
}

type SubmitButtonData = {
    style?: CSSProperties | undefined,
    className?: string,
    text?: string,
    onClick?: Promise<void> | any,
    event?: JSX.Element | any,
    disabled?: boolean
} // onClick, event type 수정 필요

// WebSocketData type 수정 필요
type WebSocketData = {
    style?: CSSProperties | undefined,
    className?: string,
    event?: JSX.Element | any,
}

type Parameter = {
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

type DownloadButtonProps = {
    url: string;
    format: string;
    filename: string;
}


export type ModelUploadData = {
    modelName: string;
    inputType: string;
    outputType: string;
    regionName: string;
    file: File;
    description: string
}

export type {Parameter, HeaderData, DefaultButtonData, SubmitButtonData, WebSocketData, DownloadButtonProps};