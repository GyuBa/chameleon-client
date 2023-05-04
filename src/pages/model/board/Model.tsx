import React, {useEffect, useState} from 'react';
import {Badge, Table} from "flowbite-react";
import {myModel} from "../../../assets/Dummy";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Header} from "../../../components";
import {Description} from "../../../components/index";
import {HiViewGrid} from "react-icons/hi";
import {FiList} from "react-icons/fi";
import {RiDeleteBinLine} from "react-icons/ri";
import {BiPencil, BiAddToQueue, BiDotsVerticalRounded, BiTrash} from "react-icons/bi";
import {VscDebugStart} from "react-icons/vsc";
import instance from "../../../ConstantValue";

interface ModelInfo {
  updatedTime: string;
  uniqueName: string;
  modelName: string;
  inputType: string;
  outputType: string;
  username: string;
  regionName: string;
}

export default function Model() {
  const {
    menuState,
    onClickMenu,
    currentLayout,
    setCurrentLayout,
    isDesktopOrMobile
  } = useStateContext();
  const [modelList, setModelList] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");

  useEffect(() => {
    let completed = false;

    (async function get() {
      try {
        const response = await instance.get(`/model/legacy-list`, {
          timeout: 5000,
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!completed) {
          setModelList(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      completed = true;
    };
  }, []);

  const onModelSelect = (modelInfo: ModelInfo) => {
    setSelectedModel(modelInfo?.uniqueName);
  };

  const ArrangeMenu = () => (
    <div className="flex items-center gap-2">
      <Link to="/model/create" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
        <BiAddToQueue size="25" color="#484848" className="pl-1"/>
        <span
          className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Create Model</span>
      </Link>
      <Link to="/" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
        <BiPencil size="25" color="#484848" className="pl-1"/>
        <span
          className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Update Model</span>
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
      <Link to="/model/create" className="flex gap-1 border-b-1 border-gray-400 hover:bg-gray-100 items-center">
        <BiAddToQueue size="25" color="#484848" className="pl-1"/>
        <span
          className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Create Model</span>
      </Link>
      <Link to="/" className="flex gap-1 border-b-1 border-gray-400 hover:bg-gray-100 items-center">
        <BiPencil size="25" color="#484848" className="pl-1"/>
        <span
          className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Update Model</span>
      </Link>
      <Link to="/" className="flex gap-1 hover:bg-gray-100 items-center">
        <RiDeleteBinLine size="25" color="#484848" className="pl-1"/>
        <span
          className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Delete Model</span>
      </Link>
    </div>
  );

  const GridLayout = () => (
    <div
      className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-4 mt-10 overflow-auto overflow-scroll max-h-screen">
      {modelList.map((modelInfo) => (
        <div onClick={() => onModelSelect(modelInfo)}
             className="w-auto px-5 p-5 mb-4 mr-1 bg-white rounded-xl drop-shadow-lg hover:drop-shadow-xl cursor-pointer">
          <p className="border-b-2 font-semibold text-xl break-all">{modelInfo?.modelName}</p>
          <div className="flex">
            <div className="py-3"><Badge color="indigo">Input: {modelInfo?.inputType}</Badge></div>
            <div className="p-3"><Badge color="purple">Output: {modelInfo?.outputType}</Badge></div>
          </div>
          <div className="flex mt-10 justify-between">
            <div className="text-sm text-gray-500 py-3">Updated {(modelInfo?.updatedTime)?.substring(0, 10)} · {modelInfo?.username} · 20KB</div>
            <div className="py-3"><Badge color="gray">{modelInfo?.regionName}</Badge></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ListLayout = () => (
    <div className="mt-10 overflow-auto overflow-scroll max-h-screen">
      <Table hoverable={true}>
        <Table.Head>
          {myModel.header.map((item) => (
            <Table.HeadCell>{item}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {modelList.map((modelInfo) => (
            <Table.Row className="bg-white">
              <Table.Cell
                className="whitespace-nowrap font-medium text-gray-900">{modelInfo?.modelName}</Table.Cell>
              <Table.Cell>
                <div className="flex"><Badge color="indigo">{modelInfo?.inputType}</Badge></div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex"><Badge color="purple">{modelInfo?.outputType}</Badge></div>
              </Table.Cell>
              <Table.Cell>{modelInfo?.username}</Table.Cell>
              <Table.Cell>{(modelInfo?.updatedTime)?.substring(0, 10)}</Table.Cell>
              <Table.Cell>
                <VscDebugStart onClick={() => onModelSelect(modelInfo)}
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
      <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl overflow-auto">
        <div className="flex justify-between items-center">
          <div className="flex">
            <Header category="" title="Models"/>
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
        {currentLayout === "GridLayout" ? <GridLayout/> : <ListLayout/>}
      </div>
      {selectedModel ?
        <div className="w-2/6 ease-in-out duration-300 translate-x-0"><Description uniqueName={selectedModel} /></div>
        :
        <div className="w-0 ease-in-out duration-300 translate-x-full hidden"><Description uniqueName={selectedModel} /></div>
      }
    </div>
  );
};