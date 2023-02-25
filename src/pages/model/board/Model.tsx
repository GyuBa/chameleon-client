import React from 'react';
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

export default function Model() {
    const {
        menuState,
        onClickMenu,
        selectModel,
        modelState,
        currentLayout,
        setCurrentLayout,
        isDesktopOrMobile
    } = useStateContext();

    const ArrangeMenu = () => (
        <div className="flex items-center gap-2">
            <Link to="/model/create" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                <BiAddToQueue size="25" color="#484848" className="pl-1"/>
                <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델생성</span>
            </Link>
            <Link to="/" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                <BiPencil size="25" color="#484848" className="pl-1"/>
                <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델수정</span>
            </Link>
            <Link to="/" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                <BiTrash size="25" color="#484848" className="pl-1"/>
                <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델삭제</span>
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
        <div className="nav-item absolute right-4 top-30 bg-white drop-shadow-lg py-2 px-4 rounded-lg w-36">
            <Link to="/model/create" className="flex gap-1 border-b-1 border-gray-400 hover:bg-gray-100 items-center">
                <BiAddToQueue size="25" color="#484848" className="pl-1"/>
                <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델생성</span>
            </Link>
            <Link to="/" className="flex gap-1 border-b-1 border-gray-400 hover:bg-gray-100 items-center">
                <BiPencil size="25" color="#484848" className="pl-1"/>
                <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델수정</span>
            </Link>
            <Link to="/" className="flex gap-1 hover:bg-gray-100 items-center">
                <RiDeleteBinLine size="25" color="#484848" className="pl-1"/>
                <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델삭제</span>
            </Link>
        </div>
    );

    const GridLayout = () => (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 gap-4 mt-10 overflow-auto overflow-scroll max-h-screen">
            {myModel.data.map((item) => (
                <div onClick={selectModel}
                     className="w-auto px-5 p-5 bg-white rounded-xl drop-shadow-lg hover:drop-shadow-xl cursor-pointer">
                    <p className="border-b-2 font-semibold text-xl break-all">{item.name}</p>
                    <div className="flex">
                        <div className="py-3"><Badge color="indigo">Input: text</Badge></div>
                        <div className="p-3"><Badge color="purple">Output: binary</Badge></div>
                    </div>
                    <div className="flex mt-10 justify-between">
                        <div className="text-sm text-gray-500 py-3">Updated 2022.03.01. · 최수연 · 20KB</div>
                        <div className="py-3"><Badge color="gray">Mongle</Badge></div>
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
                    {myModel.data.map((item) => (
                        <Table.Row className="bg-white">
                            <Table.Cell
                                className="whitespace-nowrap font-medium text-gray-900">{item.name}</Table.Cell>
                            <Table.Cell>
                                <div className="flex"><Badge color="indigo">{item.input}</Badge></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex"><Badge color="purple">{item.output}</Badge></div>
                            </Table.Cell>
                            <Table.Cell>{item.developer}</Table.Cell>
                            <Table.Cell>{item.date}</Table.Cell>
                            <Table.Cell>{item.size}</Table.Cell>
                            <Table.Cell>
                                <VscDebugStart onClick={selectModel}
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
            {modelState?
                <div className="w-2/6 ease-in-out duration-300 translate-x-0"><Description/></div>
                :
                <div className="w-0 ease-in-out duration-300 translate-x-full"><Description/></div>
            }
        </div>
    );
};