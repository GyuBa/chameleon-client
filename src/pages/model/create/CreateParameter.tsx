import React, {useState} from 'react';
import {Header, Button} from "../../../components";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {crparamTab} from "../../../assets/Dummy"
import {BiCheckCircle} from "react-icons/bi";
import {CreateSimpleParam} from "./tab/CreateSimpleParam";
import CreateComplexParam from "./tab/CreateComplexParam"

const url = "https://jsonforms.io/examples/basic"

export default function CreateParameter() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const {currentColor} = useStateContext();

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div>
                    <div className="py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Header category="" title="Set Parameter"/>
                                <h1 className="mx-2 text-gray-500">JSONForms</h1>
                            </div>
                            <button onClick={() => {
                                window.open(url)
                            }} className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                                <BiCheckCircle size="25" color="#484848" className="pl-1"/>
                                <span
                                    className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">참고사이트</span>
                            </button>
                        </div>
                        <div className="flex space-x-3 border-b">
                            {/* Loop through tab data and render button for each. */}
                            {crparamTab.map((tab, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        className={`py-2 border-b-4 transition-colors duration-300 ${
                                            idx === activeTabIndex
                                                ? "border-teal-500"
                                                : "border-transparent hover:border-gray-200"
                                        }`}
                                        // Change the active tab on click.
                                        onClick={() => setActiveTabIndex(idx)}>
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="tab-content tab-space">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <CreateSimpleParam />
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <CreateComplexParam/>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 float-right">
                        <Link to="/model/create/description">
                            <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                                    className="w-16 p-2" text="back"/>
                        </Link>
                        <Link to="/model">
                            <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                    className="w-16 p-2" text="create"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};