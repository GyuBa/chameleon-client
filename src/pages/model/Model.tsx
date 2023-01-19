import React from 'react';
import {Header} from "../../components";
import {BsFillGrid3X3GapFill} from "react-icons/bs";
import {FiGrid} from "react-icons/fi";
import {TfiViewListAlt} from "react-icons/tfi";
import {MyModel} from "../../assets/dummy";
import {Link} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider";
import {AiOutlinePlus} from "react-icons/ai";
import {MdOutlineAutoFixNormal, MdOutlineDelete} from "react-icons/md";

export default function Model() {
  const {currentColor, menuState, onClickMenu} = useStateContext();

  const Menu = () => (
    <div className="nav-item absolute right-20 top-48 bg-white drop-shadow-lg py-2 px-4 rounded-lg w-36">
      <Link to="/createmodel" className="flex border-b-1 border-gray-400 hover:bg-gray-100 items-center">
        <AiOutlinePlus size="25" color="#484848"/>
        <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델생성</span>
      </Link>
      <Link to="/" className="flex gap-1 border-b-1 border-gray-400 hover:bg-gray-100 items-center">
        <MdOutlineAutoFixNormal size="25" color="#484848"/>
        <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델수정</span>
      </Link>
      <Link to="/" className="flex gap-1 hover:bg-gray-100 items-center">
        <MdOutlineDelete size="25" color="#484848"/>
        <span className="text-gray-700 flex justify-between w-full px-1 py-2 text-sm leading-5 text-left">모델삭제</span>
      </Link>
    </div>
  );

  return (
    <div className="contents">
      <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Header category="" title="My Models"/>
            <button type="button" className="mx-2 text-xl rounded-full p-3 hover:bg-light-gray focus:bg-gray">
              {<FiGrid size="24" className="text-gray-500"/>}
            </button>
            <button type="button" className=" text-xl rounded-full p-3 hover:bg-light-gray focus:bg-gray">
              {<TfiViewListAlt size="21" className="text-gray-500"/>}
            </button>
          </div>
          <button type="button" onClick={onClickMenu}
                  className=" text-xl rounded-full p-3 hover:bg-light-gray focus:bg-gray">
            {<BsFillGrid3X3GapFill size="24" color={currentColor}/>}
          </button>
          {menuState ? <Menu/> : null}
        </div>
        <div className="grid grid-cols-3 gap-4 m-10">
          {MyModel.map((item) => (
            <Link to={`/executemodel/${item.link}`}>
              <div className="w-auto px-5 pt-5 pb-10 bg-white rounded-xl drop-shadow-lg hover:drop-shadow-xl">
                <p className="border-b-2 font-semibold text-xl">{item.name}</p>
                <p className="text-sm">{item.name} description</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};