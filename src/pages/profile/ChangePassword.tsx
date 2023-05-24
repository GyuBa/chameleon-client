import React, {useState} from "react";
import {Link} from "react-router-dom";
import {SitePaths} from "../../types/chameleon-platform.common";
import {PlatformAPI} from "../../platform/PlatformAPI";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordChange = async () => {
        // console.log(currentPassword);
        // console.log(newPassword);
        // console.log(confirmPassword);

        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
            setErrorMessage("Check if there are any blanks.");
            return;
        } else if (newPassword !== confirmPassword) {
            setErrorMessage("New Password and Confirm New Password do not match.");
            return;
        } else if (newPassword === confirmPassword) {
            try {
                setErrorMessage('');
                await PlatformAPI.modifyPassword(newPassword, currentPassword);
                window.location.href = SitePaths.ACCOUNT;
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="contents">
            <div className="w-3/5 m-2 md:m-10 mt-24 md:p-10">
                <p className='head-text'>Change Password</p>
                <p className="m-2 text-sm text-gray-500 whitespace-nowrap">
                    * More than 8 of digits Number + English + Special Characters</p>
                {errorMessage && (
                    <p className="text-red-500 m-4">{errorMessage}</p>
                )}
                <div className="m-4">
                    <input
                        type="password"
                        className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                        id="pw-1"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm New Password"/>
                </div>
                <div className="flex gap-3 float-right">
                    <Link to={SitePaths.ACCOUNT}>
                        <button className="white-btn text-sm p-2">cancel</button>
                    </Link>
                    <button className="blue-btn text-sm p-2" onClick={handlePasswordChange}>change</button>
                </div>
            </div>
        </div>
    );
};