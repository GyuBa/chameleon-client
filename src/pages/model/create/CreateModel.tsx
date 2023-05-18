import React, {useState} from 'react';
import {tabsData} from "../../../assets/Dummy";
import CreateModelTab from "./tab/CreateModelTab";

export default function CreateModel() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <div className="contents">
            <div className="w-full m-2 md:my-7 md:mx-10 mt-12">
                <div>
                    <div className="flex space-x-3 border-b">
                        {tabsData.map((tab, idx) => {
                            return (
                                <button
                                    key={idx}
                                    className={`py-2 border-b-4 transition-colors duration-300 
                                    ${idx === activeTabIndex
                                            ? "border-teal-500"
                                            : "border-transparent hover:border-gray-200"
                                    }`}
                                    onClick={() => setActiveTabIndex(idx)}>
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                    <div className="tab-content tab-space">
                        <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                            <CreateModelTab activeTabIndex={activeTabIndex}/>
                        </div>
                        <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                            <CreateModelTab activeTabIndex={activeTabIndex}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};