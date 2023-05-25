import React from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';
import {SitePaths} from "../../../types/chameleon-platform.common";
import useGlobalContext from "../../../contexts/hook/useGlobalContext";

export default function CreateModelDescription() {
    const navigate = useNavigate();
    const {modelData, setModelData} = useGlobalContext();

    if (!modelData) {
        return <Navigate to={SitePaths.CREATE_MODEL}/>;
    }

    const handleClick = () => {
        setModelData({...modelData});
        navigate(SitePaths.CREATE_MODEL_PARAMETERS);
    }

    return (
        <div className="contents">
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12 overflow-auto">
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
                <div data-color-mode="light" className="container pt-5 p-2 max-w-full description-main-contents">
                    <MDEditor value={modelData.description}
                              onChange={value => {
                                  setModelData({...modelData, description: value as string});
                              }} height={"100%"}/>
                </div>
            </div>
        </div>
    );
}