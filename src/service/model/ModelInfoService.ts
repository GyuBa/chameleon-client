import {useEffect, useState} from "react";
import instance from "../../ConstantValue";

interface ModelInfo {
  username: string;
  modelname: string;
  region: string;
  input: string;
  output: string;
  description: string;
}

export default function useGetModelInfo(){
  // TODO: Model, Description 의 get 요청 분리
}