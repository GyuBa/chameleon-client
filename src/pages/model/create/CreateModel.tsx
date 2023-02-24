import React, {useState} from 'react';
import {tabsData} from "../../../assets/dummy"
import CreateModelTab from "../model/modelTab/CreateModelTab";

export default function CreateModel() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
      <div className="contents">
        <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div>
            <div className="flex space-x-3 border-b">
              {/* Loop through tab data and render button for each. */}
              {tabsData.map((tab, idx) => {
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
            {/* Show active tab content. */}
            <div className="tab-content tab-space">
              <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                {CreateModelTab(0)}
              </div>
              <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                {CreateModelTab(1)}
              </div>
              <div className={activeTabIndex === 2 ? "block" : "hidden"} id="link3">
                {CreateModelTab(2)}
              </div>
              {/*리팩토링 필요할 듯 (굳이 조건문을 써야하나?)*/}
            </div>
          </div>
        </div>
      </div>
  );
};