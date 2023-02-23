type HeaderData = {
  category: string;
  title: string;
}

type DefaultButtonData = {
  icon: any,
  bgColor: any,
  color: any,
  bgHoverColor: any,
  size: any,
  text: any,
  borderRadius: any,
  width: any
  padding: any
}

type SubmitButtonData = {
  icon: any,
  bgColor: any,
  color: any,
  bgHoverColor: any,
  size: any,
  text: any,
  borderRadius: any,
  width: any,
  onClick: any,
  disabled?: any,
  Event: any
}

type NavButtonData = {
  customFunc: any,
  icon: any,
  color: any,
  dotColor: any
}

type WebSocketData = {
  bgColor: string,
  color: string,
  borderRadius: string,
  width: string,
  Event: any
}

export type {HeaderData, DefaultButtonData, NavButtonData, SubmitButtonData, WebSocketData};