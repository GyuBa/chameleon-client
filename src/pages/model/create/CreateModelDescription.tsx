import React, {useState} from "react";
import {Link, Navigate, useLocation, useNavigate} from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';
import {SitePaths} from "../../../types/chameleon-platform.common";
import useGlobalContext from "../../../contexts/hook/useGlobalContext";

export default function CreateModelDescription() {
    const navigate = useNavigate();
    const {modelData, setModelData} = useGlobalContext();
    const [description, setDescription] = useState<string>(modelData ? modelData.description : '');
    if (!modelData) {
        return <Navigate to={SitePaths.CREATE_MODEL}/>;
    }

    const handleClick = () => {
        setModelData({...modelData});
        navigate(SitePaths.CREATE_MODEL_PARAMETERS);
    }

    return (
        <div className="contents">
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12">
                <div className="flex space-x-3">
                    <div className="py-2 pt-[36.5px]"/>
                </div>
                <div className="py-4 flex justify-between items-center">
                    <p className='head-text'>Model Description</p>
                    <div className="flex gap-3 float-right">
                        <Link to={SitePaths.CREATE_MODEL_INFO}>
                            <button className="white-btn w-16 p-2">back</button>
                        </Link>
                        <button onClick={handleClick} className="blue-btn w-16">next</button>
                    </div>
                </div>
                <div data-color-mode="light" className="container pt-5 max-w-full">
                    <MDEditor value={description}
                              onChange={value => {
                                  setDescription(value as string)
                              }} height={500}/>
                </div>
            </div>
        </div>
    );
}