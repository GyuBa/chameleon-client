import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';
import Button from "../../../components/button/Button";
import Header from "../../../components/layout/Header";
import SubmitButton from "../../../components/button/SubmitButton";

export default function CreateDescription() {
    const navigate = useNavigate();
    const location = useLocation();
    const [description, setDescription] = useState<string | undefined>(`A simple markdown editor with preview, implemented with React.js and TypeScript.`);
    const files = location.state?.files;
    const modelName = location.state?.modelName;
    const inputType = location.state?.inputType;
    const outputType = location.state?.outputType;
    const regionName = location.state?.regionName;

    const handleClick = () => {
        navigate("/models/create/parameters", {
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
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12">
                <div className="flex space-x-3">
                    <div className="py-2 pt-[36.5px]"></div>
                </div>
                <div className="py-4 flex justify-between items-center">
                    <Header title="Model Description"/>
                    <div className="flex gap-3 float-right">
                        <Link to="/models/create">
                            <Button className="white-btn w-16 p-2" text="back"/>
                        </Link>
                        <SubmitButton onClick={handleClick} className="color-btn w-16" text="next"/>
                    </div>
                </div>
                <div data-color-mode="light" className="container pt-5 max-w-full">
                    <MDEditor value={description} onChange={setDescription} height={500}/>
                </div>
            </div>
        </div>
    );
}