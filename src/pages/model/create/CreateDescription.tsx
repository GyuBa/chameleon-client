import React, {useState} from "react";
import {Button, Header, SubmitButton} from "../../../components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';

export default function CreateDescription() {
    const navigate = useNavigate();
    const location = useLocation();
    const [description, setDescription] = useState<string|undefined>(`A simple markdown editor with preview, implemented with React.js and TypeScript.`);

    const files = location.state?.files;
    const modelName = location.state?.modelName;
    const inputType = location.state?.inputType;
    const outputType = location.state?.outputType;
    const regionName = location.state?.regionName;

    const handleClick = () => {
        navigate("/model/create/parameter", {
            state: {
                files: files,
                modelName: modelName,
                inputType: inputType,
                outputType: outputType,
                regionName: regionName,
                description: description,
            },
        });
    };

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div className="flex justify-between items-center">
                    <Header category="" title="Model Description"/>
                    <div className="flex gap-3 float-right">
                        <Link to="/model/create">
                            <Button className="white-btn w-16 p-2" text="back"/>
                        </Link>
                        <SubmitButton onClick={handleClick} className="color-btn w-16" text="next"/>
                    </div>
                </div>
                <div className="container pt-4">
                    <MDEditor value={description} onChange={setDescription}/>
                </div>
            </div>
        </div>
    );
}