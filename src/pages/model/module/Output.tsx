import React, {useState} from "react";
import SingleImageViewer from "../module/Output/SingleImageViewer"
import SingleTextViewer from "../module/Output/SingleTextViewer"
import ZipGalleryViewer from "../module/Output/ZipGalleryViewer"
import SingleVideoViewer from "../module/Output/SingleVideoViewer"
import {testOutputTabs} from "../../../assets/Dummy";

const modules = [SingleImageViewer, SingleTextViewer, SingleVideoViewer, ZipGalleryViewer];

export default function OutputModule() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const Module0 = modules[0];
    const Module1 = modules[1];
    const Module2 = modules[2];
    const Module3 = modules[3];


    return (
        <div className="row-span-3 col-span-2 md:p-2 rounded-lg border-1 overflow-scroll border-gray-300">
            <div className="tab-content tab-space">
                <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                    {Module0 && <Module0/>}
                </div>
                <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                    {Module1 && <Module1/>}
                </div>
                <div className={activeTabIndex === 2 ? "block" : "hidden"} id="link3">
                    {Module2 && <Module2/>}
                </div>
                <div className={activeTabIndex === 3 ? "block" : "hidden"} id="link4">
                    {Module3 && <Module3/>}
                </div>
            </div>
            <div className="flex space-x-3 border-t">
                {/* Loop through tab data and render button for each. */}
                {testOutputTabs.map((tab, idx) => {
                    return (
                        <button
                            key={idx}
                            className={`border-t-4 transition-colors duration-300 ${
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
        </div>
    );
}