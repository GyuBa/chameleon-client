import React, {useState} from 'react';
import Button from '../../components/button/Button';
import SubmitButton from '../../components/button/SubmitButton';
import Header from '../../components/layout/Header';
import {BsPersonCircle} from "react-icons/bs";
import {HiOutlineLockClosed} from "react-icons/hi";
import {useStateContext} from "../../contexts/ContextProvider";
import {Link} from "react-router-dom";
import useGetUserInfo from "../../service/authentication/UserInfoService";
import useUpdateUserInfo from "../../service/authentication/UserUpdateService";

export default function Account() {
  const {onClickButton, isClickedButton} = useStateContext();
  const {username, useremail} = useGetUserInfo();
  const {user, setUser, updateUser} = useUpdateUserInfo();
  const [newName, setNewName] = useState('');

  const onClickChangeName = async () => {
    try {
      await updateUser({username: newName});
      setUser({...user, username: newName});
      setNewName('');
      onClickButton('changeName');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contents">
      <div className="w-2/3 m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Account" title="Account"/>
        <div className="my-4 border-gray-400 rounded-3xl border-1 p-6">
          <p className="text-xs text-gray-600 mb-1 pb-2">User Info</p>
          <div className="flex items-center">
            <BsPersonCircle className="w-20 h-20"/>
            <div className="w-full p-3">
              {isClickedButton.changeName ? (
                <input
                  type="text"
                  className="form-control block w-3/4 px-4 py-2 text-base font-normal
                                    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                                    focus:border-blue-600 focus:outline-none"
                  id="change-name"
                  placeholder={username}
                  value={newName} onChange={(e) => setNewName(e.target.value)}
                />
              ) : (
                <p className="font-extrabold text-xl">{username}</p>
              )}
              <p>{useremail}</p>
            </div>
            <div onClick={() => onClickButton('changeName')}>
              {isClickedButton.changeName ? (
                <div className="flex gap-3">
                  <Button className="white-btn text-sm p-2" text="cancel"/>
                  <SubmitButton
                    className="color-btn text-sm p-2" text="change"
                    onClick={onClickChangeName}/>
                </div>
              ) : (
                <Button className="color-btn text-sm p-2" text="rename"/>
              )}
            </div>
          </div>
        </div>
        <div className="border-gray-400 rounded-3xl border-1 p-6">
          <p className="text-xs text-gray-600 mb-1 pb-2">Security Setting</p>
          <div className="flex items-center">
            <HiOutlineLockClosed className="mx-4 w-10 h-10"/>
            <p className="w-full p-2">Password</p>
            <Link to="/change-password">
              <Button className="color-btn text-sm p-2" text="update"/>
            </Link>
          </div>
        </div>
        <div className="pt-2">
          <button type="button"
                  className="float-right p-2 text-sm text-gray-500 hover:drop-shadow-xl whitespace-nowrap"
          >delete your account
          </button>
        </div>
      </div>
    </div>
  );
};