import React from 'react';
import {Link} from "react-router-dom";
import {Button, Header} from "../../../components";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Badge} from "flowbite-react";

export default function Description() {
  const {currentColor} = useStateContext();
  return (
    <div className="contents">
      <div className="w-2/4 m-2 md:my-10 md:mr-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-auto">
        <div className="flex justify-between items-center pb-6 border-b-1 border-gray-300">
          <Header category="" title="Model01"/>
          <div className="flex gap-2">
            <Link to="/execute-model " state = {{}}>
              <Button color="white" bgColor={currentColor} text="start" borderRadius="10px" width="full"
                      padding="1.5" size="sm" icon={undefined} bgHoverColor={undefined}/>
            </Link>
          </div>
        </div>
        <div className="my-8">
          {/*임시 데이터*/}
          <div className="flex my-2 items-center">
            <p className="text-lg font-bold">Model Name:ㅤ</p>
            <p>Model01</p>
          </div>
          <div className="flex my-2 items-center">
            <p className="text-lg font-bold">Model Developer:ㅤ</p>
            <p>최수연</p>
          </div>
          <div className="flex my-2 items-center">
            <p className="text-lg font-bold">Region:ㅤ</p>
            <p>Mongle</p>
          </div>
          <div className="flex">
            <div className="py-3"><Badge color="indigo">Input: text</Badge></div>
            <div className="p-3"><Badge color="purple">Output: binary</Badge></div>
          </div>
          <div className="flex my-2 items-center">
            <p className="text-lg font-bold">Parameter:ㅤ</p>
            <p>~~</p>
          </div>
          <div className="my-2 whitespace-pre-wrap">
            <p className="text-lg font-bold">Model Description:ㅤ</p>
            <div className="whitespace-pre-wrap">Hey everyone!
              It's almost 2022 and we still don't know if there is aliens living among us, or do we? Maybe the person
              writing this is an alien.
              You will never know.
            </div>
            <div className="text-blue-600 underline cursor-pointer whitespace-pre-wrap">https://portal.koreatech.ac.kr</div>
          </div>
        </div>
      </div>
    </div>
  );
};