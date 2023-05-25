import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import {HiOutlineSearch, HiViewGrid} from "react-icons/hi";
import {FiList} from "react-icons/fi";
import {RiDeleteBinLine} from "react-icons/ri";
import {BiAddToQueue, BiDotsVerticalRounded, BiTrash} from "react-icons/bi";
import ModelsDescriptionPanel from "./panel/ModelsDescriptionPanel";
import {ModelEntityData, ModelSearchOption, SitePaths} from "../../../types/chameleon-platform.common";
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {useMediaQuery} from "react-responsive";
import {ModelsLayout} from "../../../types/chameleon-client.enum";
import {ModelsProps} from "../../../types/chameleon-client";
import ModelsGridLayout from "./layout/ModelsGridLayout";
import ModelsListLayout from "./layout/ModelsListLayout";
import {MdKeyboardArrowDown} from "react-icons/md";

export default function Models(props: ModelsProps) {
    const [currentLayout, setCurrentLayout] = useState<ModelsLayout>(ModelsLayout.GRID_LAYOUT);
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
                const models = props.ownOnly
                    ? await PlatformAPI.getMyModels({searchOption, searchTerm})
                    : await PlatformAPI.getModels({searchOption, searchTerm});
                if (!completed) setModels(models);
            } catch (error) {
                console.error(error);
                setModels([]);
            }
        })();
        return () => {
            completed = true;
        };
    }, [props.ownOnly, searchOption, searchTerm]);

    const onModelSelect = (modelData: ModelEntityData) => {
        setSelectedModelId(modelData.id);
    };

    const ArrangeMenu = () => (
        <div className="flex items-center gap-2">
            <Link to={SitePaths.CREATE_MODEL}
                  className="flex items-center rounded-full p-1 hover:bg-light-gray focus:bg-gray">
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
            <button type="button" onClick={() => {
                setMenuState(prevState => !prevState)
            }}
                    className="relative text-xl rounded-full p-1 hover:bg-light-gray focus:bg-gray">
                {<BiDotsVerticalRounded aria-hidden="true" size="30"/>}
            </button>
            {menuState ? <Menu/> : null}
        </div>
    );

    const Menu = () => (
        <div className="nav-item absolute right-4 top-30 bg-white drop-shadow-lg py-2 px-4 rounded-lg w-40">
            <Link to={SitePaths.CREATE_MODEL}
                  className="flex gap-1 border-b-1 border-gray-400 hover:bg-gray-100 items-center">
                <BiAddToQueue size="25" color="#484848" className="pl-1"/>
                <span
                    className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Create Model</span>
            </Link>
            <Link to={SitePaths.ROOT} className="flex gap-1 hover:bg-gray-100 items-center">
                <RiDeleteBinLine size="25" color="#484848" className="pl-1"/>
                <span
                    className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">Delete Model</span>
            </Link>
        </div>
    );

    const Dropdown = () => {
        const [isOpen, setIsOpen] = useState(false);
        const handleCategorySelect = (category: ModelSearchOption) => {
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
                            {Object.values(ModelSearchOption).map((item) => (
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
        return (
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
            <div className="w-full m-2 md:m-10 mt-24 md:mb-0">
                <div className="flex justify-between items-center">
                    <div className="flex">
                        {(location.pathname === '/models/my') ?
                            <p className='head-text'>My Models</p> : <p className='head-text'>All Models</p>
                        }
                        <button onClick={() => setCurrentLayout(ModelsLayout.GRID_LAYOUT)} type="button"
                                className={`ml-2 mr-1 text-xl rounded-full p-2 hover:bg-light-gray focus:bg-gray ${currentLayout === ModelsLayout.GRID_LAYOUT ? "bg-light-gray" : ''}`}>
                            {<HiViewGrid size="21" className="text-gray-500"/>}
                        </button>
                        <button onClick={() => setCurrentLayout(ModelsLayout.LIST_LAYOUT)} type="button"
                                className={`text-xl rounded-full p-2 hover:bg-light-gray focus:bg-gray ${currentLayout === ModelsLayout.LIST_LAYOUT ? "bg-light-gray" : ''}`}>
                            {<FiList size="21" className="text-gray-500"/>}
                        </button>
                        {!isDesktopOrMobile ? <ArrangeMenu/> : <DropdownMenu/>}
                    </div>
                    <div className="flex">
                        {<SearchBar/>}
                    </div>
                </div>
                <div className="models-main-contents mt-10 overflow-auto">
                    {currentLayout === ModelsLayout.GRID_LAYOUT ?
                        <ModelsGridLayout models={models} onModelSelect={onModelSelect}/> :
                        <ModelsListLayout models={models} onModelSelect={onModelSelect}/>}
                </div>
            </div>
            {selectedModelId > 0 ?
                <div className="w-[700px] ease-in-out duration-300 translate-x-0">
                    <ModelsDescriptionPanel modelId={selectedModelId} setSelectedModelId={setSelectedModelId}/>
                </div>
                :
                <div className="w-0 ease-in-out duration-300 translate-x-full">
                    <div className="hidden">
                        <ModelsDescriptionPanel modelId={selectedModelId} setSelectedModelId={setSelectedModelId}/>
                    </div>
                </div>
            }
        </div>
    );
};