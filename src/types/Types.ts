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
  icon?: ReactNode,
  text?: string,
  onClick?: Promise<void> | any,
  Event?: JSX.Element | any,
  disabled? : boolean
}

type WebSocketData = {
  style?: CSSProperties | undefined,
  className?: string,
  Event?: JSX.Element | any,
}

export type {HeaderData, DefaultButtonData, SubmitButtonData, WebSocketData};