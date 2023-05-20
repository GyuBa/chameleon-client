import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {SitePaths} from "../../types/chameleon-platform.common";
import {BiCreditCard, BiFolder} from 'react-icons/bi';
import {RiHistoryFill} from 'react-icons/ri';
import {MdOutlineAccountCircle, MdOutlineCancel} from 'react-icons/md';
import useGlobalContext from "../../contexts/hook/useGlobalContext";
import {GiChameleonGlyph} from "react-icons/gi";


const links = [
    {
        title: 'Models',
        links: [
            {
                name: 'All Models',
                link: SitePaths.ALL_MODELS,
                icon: <BiFolder/>,
            },
            {
                name: 'My Models',
                link: SitePaths.MY_MODELS,
                icon: <BiFolder/>,
            },
            {
                name: 'Histories',
                link: SitePaths.HISTORIES,
                icon: <RiHistoryFill/>,
            },
        ],
    },
    {
        title: 'My Profile',
        links: [
            {
                name: 'Account',
                link: SitePaths.ACCOUNT,
                icon: <MdOutlineAccountCircle/>,
            },
            {
                name: 'Payment',
                link: SitePaths.PAYMENT,
                icon: <BiCreditCard/>,
            },
        ],
    },
];
export default function Sidebar() {
    const {activeMenu, setActiveMenu} = useGlobalContext();
    const handleCloseSideBar = () => {
        if (activeMenu !== undefined) setActiveMenu(false);
    };

    return (
        <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            {activeMenu && (
                <div>
                    <div className="flex justify-between items-center">
                        <Link to={SitePaths.ALL_MODELS} onClick={handleCloseSideBar}
                              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900">
                            <GiChameleonGlyph/><span>Chameleon Platform</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setActiveMenu(!activeMenu)}
                            className="main-color text-xl rounded-full p-2 hover:bg-light-gray mt-4 mr-2 block md:hidden"
                        ><MdOutlineCancel/></button>
                    </div>
                    <div className="mt-10 ">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                                {item.links.map((link) => (
                                    <NavLink
                                        onClick={handleCloseSideBar}
                                        to={`${link.link}`}
                                        key={link.name}
                                        className={({isActive}) => isActive ? 'side-bar-nav-link-active' : 'side-bar-nav-link'}
                                    >
                                        {link.icon}
                                        <span className="capitalize">{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};