import React from "react";
import {Button} from "../../../components";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import MDEditor from '@uiw/react-md-editor';

export default function CreateDescription() {
  const {currentColor, value, setValue} = useStateContext();

  return (
    <div className="contents">
      <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="container">
          <MDEditor value={value} onChange={setValue}/>
          <MDEditor.Markdown className="py-5" source={value} style={{whiteSpace: 'pre-wrap'}}/>
        </div>
        <div className="flex gap-3 float-right">
          <Link to="/create/model">
            <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                    className="w-16 p-2" text="back"/>
          </Link>
          <Link to="/create/parameter">
            <Button style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}}
                    className="w-16 p-2" text="next"/>
          </Link>
        </div>
      </div>
    </div>
  );
}