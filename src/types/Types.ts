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
} // onClick, Event type 수정 필요

// WebSocketData type 수정 필요
type WebSocketData = {
  message?: any,
  icon?: ReactNode,
  bgColor?: any,
  color?: any,
  bgHoverColor?: any,
  size?: any,
  text?: any,
  borderRadius?: any,
  width?: any,
  Event?: any
}

export type {HeaderData, DefaultButtonData, SubmitButtonData, WebSocketData};