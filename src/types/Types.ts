type HeaderData = {
  category: string;
  title: string;
}

type ButtonData = {
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
  Event: any
}

type NavButtonData = {
  customFunc: any,
  icon: any,
  color: any,
  dotColor: any
}

type WebSocketData = {
  bgColor: any,
  color: any,
  borderRadius: any,
  width: any,
  Event: any
}

export type {HeaderData, ButtonData, NavButtonData, SubmitButtonData, WebSocketData};