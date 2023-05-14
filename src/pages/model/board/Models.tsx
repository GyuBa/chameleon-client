import React, {useEffect, useState} from 'react';
import {Badge, Table} from "flowbite-react";
import {Link, useLocation} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {HiViewGrid} from "react-icons/hi";
import {FiList} from "react-icons/fi";
import {RiDeleteBinLine} from "react-icons/ri";
import {BiAddToQueue, BiDotsVerticalRounded, BiTrash} from "react-icons/bi";
import {VscDebugStart} from "react-icons/vsc";
import Description from "../../../components/layout/Description";
import Header from "../../../components/layout/Header";
import {ModelEntityData} from "../../../types/chameleon-platform.common";
import {DateUtils} from "../../../utils/DateUtils";
import {PlatformAPI} from "../../../platform/PlatformAPI";

const modelColumn = {
    list: ['Model Name', 'Input Type', 'Output Type', 'Register', 'Last Modified Date', 'start']
};

export default function Models() {
    const {
        menuState,
        onClickMenu,
        currentLayout,
        setCurrentLayout,
        isDesktopOrMobile
    } = useStateContext();
    const [models, setModels] = useState<ModelEntityData[]>([]);
    const [selectedModelId, setSelectedModelId] = useState<number>(-1);
    const location = useLocation();

    useEffect(() => {
        setSelectedModelId(-1);
        let completed = false;
        (async function () {
            try {
                const models = (location.pathname === '/models/my') ? await PlatformAPI.getMyModels() : await PlatformAPI.getModels();
                if (!completed) {
                    setModels(models);
                }
            } catch (error) {
                console.error(error);
                setModels([]);
            }
        })();
        return () => {
            completed = true;
        };
    }, [location.pathname]);

    const onModelSelect = (modelData: ModelEntityData) => {
        setSelectedModelId(modelData.id);
    };

    const ArrangeMenu = () => (
      <div className="flex items-center gap-2">
        <Link to="/models/create" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
          <BiAddToQueue size="25" color="#484848" className="pl-1"/>
          <span
            className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Create Model</span>
        </Link>
        <Link to="/" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
          <BiTrash size="25" color="#484848" className="pl-1"/>
          <span
            className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Delete Model</span>
        </Link>
      </div>
    );

    const DropdownMenu = () => (
      <div>
        <button type="button" onClick={onClickMenu}
                className="relative text-xl rounded-full p-1 hover:bg-light-gray focus:bg-gray">
          {<BiDotsVerticalRounded aria-hidden="true" size="30"/>}
        </button>
        {menuState ? <Menu/> : null}
      </div>
    );

    const Menu = () => (
      <div className="nav-item absolute right-4 top-30 bg-white drop-shadow-lg py-2 px-4 rounded-lg w-40">
        <Link to="/models/create" className="flex gap-1 border-b-1 border-gray-400 hover:bg-gray-100 items-center">
          <BiAddToQueue size="25" color="#484848" className="pl-1"/>
          <span
            className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Create Model</span>
        </Link>
        <Link to="/" className="flex gap-1 hover:bg-gray-100 items-center">
          <RiDeleteBinLine size="25" color="#484848" className="pl-1"/>
          <span
            className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Delete Model</span>
        </Link>
      </div>
    );

    const GridLayout = () => (
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-4">
          {models.map((modelData) => (
              <div key={modelData.id} onClick={() => onModelSelect(modelData)}
                   className="w-auto px-5 p-5 mb-4 mr-1 bg-white rounded-xl drop-shadow-lg hover:drop-shadow-xl cursor-pointer">
                  <p className="border-b-2 font-semibold text-xl break-all">{modelData.name}</p>
                  <div className="flex">
                      <div className="py-3"><Badge color="indigo">Input: {modelData.inputType}</Badge></div>
                      <div className="p-3"><Badge color="purple">Output: {modelData.outputType}</Badge></div>
                  </div>
                  <div className="flex mt-10 justify-between">
                      <div
                          className="text-sm text-gray-500 py-3">Updated {DateUtils.formatDate(modelData.updatedTime)} · {modelData.register.username} ·
                          20KB
                      </div>
                      <div className="py-3"><Badge color="gray">{modelData.image.region.name}</Badge></div>
                  </div>
              </div>
          ))}
      </div>
    );

    const ListLayout = () => (
      <div>
          <Table hoverable={true}>
              <Table.Head>
                  {modelColumn.list.map((item) => (
                      <Table.HeadCell>{item}</Table.HeadCell>
                  ))}
              </Table.Head>
              <Table.Body className="divide-y">
                  {models.map((modelData) => (
                      <Table.Row className="bg-white">
                          <Table.Cell
                              className="whitespace-nowrap font-medium text-gray-900">{modelData.name}</Table.Cell>
                          <Table.Cell>
                              <div className="flex"><Badge color="indigo">{modelData.inputType}</Badge></div>
                          </Table.Cell>
                          <Table.Cell>
                              <div className="flex"><Badge color="purple">{modelData.outputType}</Badge></div>
                          </Table.Cell>
                          <Table.Cell>{modelData.register.username}</Table.Cell>
                          <Table.Cell>{DateUtils.formatDate(modelData.updatedTime)}</Table.Cell>
                          <Table.Cell>
                              <VscDebugStart onClick={() => onModelSelect(modelData)}
                                             className="text-white py-1 w-10 h-6 rounded bg-blue-500 hover:bg-blue-600 hover:drop-shadow-lg"/>
                          </Table.Cell>
                      </Table.Row>
                  ))}
              </Table.Body>
          </Table>
      </div>
  );

  return (
    <div className="contents">
        <div className="w-full m-2 md:m-10 mt-24">
            <div className="flex justify-between items-center">
                <div className="flex">
                    {(location.pathname === '/models/my') ?
                        <Header title="My Models"/> : <Header title="All Models"/>
                    }
                    <button onClick={() => setCurrentLayout("GridLayout")} type="button"
                            className={`ml-2 mr-1 text-xl rounded-full p-2 hover:bg-light-gray focus:bg-gray ${currentLayout === "GridLayout" ? "bg-light-gray" : null}`}>
                        {<HiViewGrid size="21" className="text-gray-500"/>}
                    </button>
                    <button onClick={() => setCurrentLayout("ListLayout")} type="button"
                            className={`text-xl rounded-full p-2 hover:bg-light-gray focus:bg-gray ${currentLayout === "ListLayout" ? "bg-light-gray" : null}`}>
                        {<FiList size="21" className="text-gray-500"/>}
                    </button>
                </div>
                {!isDesktopOrMobile ? <ArrangeMenu/> : <DropdownMenu/>}
            </div>
            <div className="mt-10 max-h-screen overflow-auto">
                {currentLayout === "GridLayout" ? <GridLayout/> : <ListLayout/>}
            </div>
        </div>
        {selectedModelId > 0 ?
            <div className="w-[700px] ease-in-out duration-300 translate-x-0">
                <Description modelId={selectedModelId} setSelectedModelId={setSelectedModelId}/>
            </div>
            :
            <div className="w-0 ease-in-out duration-300 translate-x-full">
                <div className="hidden">
                    <Description modelId={selectedModelId} setSelectedModelId={setSelectedModelId}/>
                </div>
            </div>
        }
    </div>
  );
};