import React from 'react';
import {Button, Header} from "../../components/index";
import {useStateContext} from "../../contexts/ContextProvider";
import {createModel} from "../../assets/dummy";
import {Link} from "react-router-dom";

export default function CreateModel() {
  const {currentColor} = useStateContext();

  return (
    <div className="contents">
      <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="" title="모델 생성"/>
        <div
          className="flex grid gap-1 mt-10 mb-5 p-10 md:grid-cols-3 grid-cols-2 break-all">
          {createModel.map((item) => (
            <Link to={`/createmodel/${item.link}`}>
              <div className="w-5/6 px-5 py-10 bg-white rounded-3xl drop-shadow-lg hover:drop-shadow-xl">
                <h1 className="text-xl font-bold">{item.name}</h1>
                <p>{item.name}을 통해 모델 생성</p>
              </div>
            </Link>
          ))}
        </div>
        <div>
          <div className="flex gap-3 float-right">
            <Link to="/model">
              <Button color="white" bgColor={currentColor} text="취소" borderRadius="10px" width="16"
                      padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};