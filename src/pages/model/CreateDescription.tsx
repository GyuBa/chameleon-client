import React, {useState} from "react";
import {Button} from "../../components";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";
import MDEditor from '@uiw/react-md-editor';

export default function CreateDescription() {
  const {currentColor} = useStateContext();
  const [value, setValue] = useState<string | undefined>("**Hello world!!!**");
  return (
    <div className="contents">
      <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="container">
          <MDEditor value={value} onChange={setValue}/>
          <MDEditor.Markdown className="py-5" source={value} style={{whiteSpace: 'pre-wrap'}}/>
        </div>
        <div className="flex gap-3 float-right">
          <Link to="/createmodel">
            <Button color="black" bgColor="white" text="back" borderRadius="10px" width="16"
                    padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
          </Link>
          <Link to="/createmodel/parameter">
            <Button color="white" bgColor={currentColor} text="next" borderRadius="10px" width="16"
                    padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
          </Link>
        </div>
      </div>
    </div>
  );
}