import React from 'react';
import {Button, Header} from '../../components/index';
import {Link} from "react-router-dom";

export default function ChangePassword() {

    return (
        <div className="contents">
            <div className="w-3/5 m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="" title="Change Password"/>
                <p className="m-2 text-sm text-gray-500 whitespace-nowrap">* 숫자+영문자+특수문자 조합으로 8자리 이상</p>
                <p className="m-2 text-sm text-gray-500 whitespace-nowrap">* More than 8 of digits Number + English + Special Characters</p>
                <div className="m-4">
                    <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                        id="pw-1"
                        placeholder="Current Password"/>
                </div>
                <div className="m-4">
                    <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                        id="pw-2"
                        placeholder="New Password"/>
                </div>
                <div className="m-4">
                    <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                        id="pw-3"
                        placeholder="Confirm New Password"/>
                </div>
                <div className="flex gap-3 float-right">
                    <Link to="/account"><Button className="white-btn text-sm p-2" text="cancel"/></Link>
                    <Link to="/account"><Button className="color-btn text-sm p-2" text="change"/></Link>
                </div>
            </div>
        </div>
    );
};