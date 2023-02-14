import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {GiChameleonGlyph} from 'react-icons/gi';
import {MdOutlineCancel} from 'react-icons/md';
import {links} from '../../assets/Dummy';
import {useStateContext} from '../../contexts/ContextProvider';

export default function Sidebar() {
  const {currentColor, activeMenu, setActiveMenu, handleCloseSideBar} = useStateContext();

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-light-gray m-2';

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <div>
          <div className="flex justify-between items-center">
            <Link to="/main" onClick={handleCloseSideBar}
                  className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900">
              <GiChameleonGlyph/><span>Chameleon</span>
            </Link>
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
              style={{color: currentColor}}
              className="text-xl rounded-full p-2 hover:bg-light-gray mt-4 mr-2 block md:hidden"
            ><MdOutlineCancel/></button>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    onClick={handleCloseSideBar}
                    to={`/${link.name}`}
                    key={link.name}
                    style={({isActive}) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({isActive}) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
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