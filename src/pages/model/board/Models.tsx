import React, {useEffect, useState} from 'react';
import {Badge, Table} from "flowbite-react";
import {Link, useLocation} from "react-router-dom";
import {HiViewGrid, HiOutlineSearch} from "react-icons/hi";
import {FiList} from "react-icons/fi";
import {RiDeleteBinLine} from "react-icons/ri";
import {BiAddToQueue, BiDotsVerticalRounded, BiTrash} from "react-icons/bi";
import Description from "../../../components/layout/Description";
import Header from "../../../components/layout/Header";
import {ModelEntityData, ModelSearchOption} from "../../../types/chameleon-platform.common";
import {TimeUtils} from "../../../utils/TimeUtils";
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {useMediaQuery} from "react-responsive";
import {MdKeyboardArrowDown} from "react-icons/md";

const modelColumn = {
    list: ['Model Name', 'Input Type', 'Output Type', 'Region', 'Register', 'Created Time', 'Category', 'Price']
};
const ModelSearchOptions = Object.values(ModelSearchOption);

export default function Models() {
    const [currentLayout, setCurrentLayout] = useState('GridLayout');
    const [menuState, setMenuState] = useState(false);
    const [models, setModels] = useState<ModelEntityData[]>([]);
    const [selectedModelId, setSelectedModelId] = useState<number>(-1);
    const location = useLocation();
    const isDesktopOrMobile = useMediaQuery({query: '(max-width:767px)'});
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState(ModelSearchOption.NAME);

    useEffect(() => {
        setSelectedModelId(-1);
        let completed = false;
        (async function () {
            try {
                const models = (location.pathname === '/models/my')
                    ? await PlatformAPI.getMyModels()
                    : await PlatformAPI.getModels({ searchOption, searchTerm });
                if (!completed) setModels(models);
            } catch (error) {
                console.error(error);
                setModels([]);
            }
        })();
        return () => {
            completed = true;
        };
    }, [location.pathname, searchOption, searchTerm]);

    const onModelSelect = (modelData: ModelEntityData) => {
        setSelectedModelId(modelData.id);
    };

    const ArrangeMenu = () => (
        <div className="flex items-center gap-1">
            <Link to="/models/create" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                <BiAddToQueue size="25" color="#484848" className="pl-1"/>
                <span
                    className="text-gray-700 flex justify-between w-full px-1 py-1 text-sm leading-5 text-left">Create Model</span>
            </Link>
            <Link to="/" className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                <BiTrash size="25" color="#484848" className="pl-1"/>
                <span
                    className="text-gray-700 flex justify-between w-full px-1 py-1 text-sm leading-5 text-left">Delete Model</span>
            </Link>
        </div>
    );

    const DropdownMenu = () => (
        <div>
            <button type="button" onClick={() => {setMenuState(prevState => !prevState)}}
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
                    <div className="flex border-b-2 justify-between">
                        <p className="font-semibold text-xl break-all">{modelData.name}</p>
                        {modelData.price !== 0 && (
                            <div className="flex gap-2 justify-between items-center">
                                <div className="text-red-600 pl-2">￦{modelData.price.toLocaleString('ko-KR')}</div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex py-3 gap-3">
                            <Badge color="indigo">Input: {modelData.inputType}</Badge>
                            <Badge color="purple">Output: {modelData.outputType}</Badge>
                            {modelData.category !== null && (<Badge className="bg-teal-100 text-teal-500">{modelData.category}</Badge>)}
                        </div>
                    </div>
                    <div className="flex mt-10 justify-between">
                        <div className="text-sm text-gray-500 py-3">{TimeUtils.timeSince(modelData.createdTime)} · {modelData.register.username}</div>
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
                    {modelColumn.list.map((item) => (<Table.HeadCell>{item}</Table.HeadCell>))}
                </Table.Head>
                <Table.Body className="divide-y">
                    {models.map((modelData) => (
                        <Table.Row className="bg-white cursor-pointer" onClick={() => onModelSelect(modelData)}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900">{modelData.name}</Table.Cell>
                            <Table.Cell>
                                <div className="flex"><Badge color="indigo">{modelData.inputType}</Badge></div>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex"><Badge color="purple">{modelData.outputType}</Badge></div>
                            </Table.Cell>
                            <Table.Cell>{modelData.image.region.name}</Table.Cell>
                            <Table.Cell>{modelData.register.username}</Table.Cell>
                            <Table.Cell>{TimeUtils.formatTime(modelData.createdTime)}</Table.Cell>
                            {modelData.category === null ? (<Table.Cell></Table.Cell>) : (
                                <Table.Cell>
                                    <div className="flex">
                                        <Badge className="bg-teal-100 text-teal-500">{modelData.category}</Badge>
                                    </div>
                                </Table.Cell>
                            )}
                            {modelData.price === 0 ? ( <Table.Cell></Table.Cell> ) : (
                                <Table.Cell><div className="text-red-600">￦{modelData.price.toLocaleString('ko-KR')}</div></Table.Cell>)}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );

    const Dropdown = () => {
        const [isOpen, setIsOpen] = useState(false);
        const handleCategorySelect = (category :  ModelSearchOption) => {
            setSearchOption(category);
            setIsOpen(false);
            setSearchTerm('');
        };
        return (
            <div className="relative">
                <button id="dropdown-button"
                    className="flex items-center py-2.5 px-4 text-sm font-medium
                    text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200
                    focus:ring-4 focus:outline-none focus:ring-gray-100 w-[190px]"
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex-grow text-left">
                        {searchOption}
                    </div>
                    <div className="text-right">
                        <MdKeyboardArrowDown size={20} className="text-gray-400 text-14"/>
                    </div>
                </button>
                {isOpen && (
                    <div id="dropdown"
                        className="absolute w-full z-20 bg-white divide-y divide-gray-100 rounded-lg shadow">
                        <ul className="py-2 text-sm text-gray-700">
                            {ModelSearchOptions.map((item) => (
                                <li key={item}>
                                    <button type="button"
                                            className="inline-flex text-left w-full px-4 py-2 hover:bg-gray-100"
                                            onClick={() => handleCategorySelect(item)}
                                    >{item}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    const SearchBar = () => {
        const [temporarySearchTerm, setTemporarySearchTerm] = useState('');
        return(
            <div className="flex">
                <Dropdown/>
                <div className="relative w-96">
                    <input
                        type="search"
                        id="search-dropdown"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900
                    bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2
                    border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search Model Name, Input, Output..."
                        value={temporarySearchTerm}
                        onChange={(e) => setTemporarySearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setSearchTerm(temporarySearchTerm);
                            }
                        }}
                    />
                    <button
                        type="button"
                        className="absolute top-0 right-0 p-2.5 text-sm font-medium
                    text-white bg-main-blue rounded-r-lg border border-blue-700
                    hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        onClick={() => setSearchTerm(temporarySearchTerm)}
                    ><HiOutlineSearch size={20}/>
                    </button>
                </div>
            </div>
        )
    };

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
                        {!isDesktopOrMobile ? <ArrangeMenu/> : <DropdownMenu/>}
                    </div>
                    <div className="flex">
                        {(location.pathname === '/models/all') && <SearchBar/>}
                    </div>
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