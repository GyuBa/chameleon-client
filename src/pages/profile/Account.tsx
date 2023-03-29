import React, {useState} from 'react';
import {Button, Header} from '../../components/index';
import {BsPersonCircle} from "react-icons/bs";
import {HiOutlineLockClosed} from "react-icons/hi";
import {useStateContext} from "../../contexts/ContextProvider";
import {Link} from "react-router-dom";
import useGetUserInfo from "../../service/authentication/UserInfoService";
import {SubmitButton} from "../../components";
import useUpdateUserInfo from "../../service/authentication/UserUpdateService";

export default function Account() {
  const {currentColor, onClickButton, isClickedButton} = useStateContext();
  const {username, userEmail} = useGetUserInfo();
  const {user, setUser, updateUser} = useUpdateUserInfo();
  const [newName, setNewName] = useState('');

  const onClickChangeName = async () => {
    try {
      await updateUser({name: newName});
      setUser({...user, name: newName});
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
          <p className="text-xs text-gray-600 mb-1 pb-2">기본정보</p>
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
              <p>{userEmail}</p>
            </div>
            <div onClick={() => onClickButton('changeName')}>
              {isClickedButton.changeName ? (
                <div className="flex gap-3">
                  <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                          className="text-sm p-2" text="취소"/>
                  <SubmitButton
                    style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                    className="text-sm p-2" text="확인"
                    onClick={onClickChangeName}/>
                </div>
              ) : (
                <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                        className="text-sm p-2" text="이름 변경"/>
              )}
            </div>
          </div>
        </div>
        <div className="border-gray-400 rounded-3xl border-1 p-6">
          <p className="text-xs text-gray-600 mb-1 pb-2">기본보안설정</p>
          <div className="flex items-center">
            <HiOutlineLockClosed className="mx-4 w-10 h-10"/>
            <p className="w-full p-2">비밀번호</p>
            <Link to="/change-password">
              <Button style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                      className="text-sm p-2" text="수정"/>
            </Link>
          </div>
        </div>
        <div className="pt-2">
          <button type="button"
                  className="float-right p-2 text-sm text-gray-500 hover:drop-shadow-xl whitespace-nowrap"
          >회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};