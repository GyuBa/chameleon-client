import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import chameleon from '../../assets/images/chameleon.png';
import SubmitButton from "../../components/button/SubmitButton";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {AxiosError} from "axios";
import useGetUserInfo from "../../service/authentication/UserInfoService";

export default function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { getCookieValue } = useGetUserInfo();

    const signIn = async (e: any) => {
        e.preventDefault();
        if (!email) {
            alert("이메일을 입력하기 바랍니다.");
            return;
        } else if (!password) {
            alert("비밀번호를 입력하기 바랍니다.");
            return;
        } else {
            try {
                await PlatformAPI.signIn(email, password);
                const isSignedIn = getCookieValue('connect.sid');
                if(isSignedIn) {
                    window.location.href = '/models/all';
                }
            } catch (e) {
                if (e instanceof AxiosError && e.status === 401) {
                    alert('로그인에 실패하였습니다.');
                } else {
                    alert('가입되지 않은 이메일이거나, 잘못된 비밀번호입니다.');
                }
                console.error(e);
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.code === 'Enter') {
            setTimeout(() => signIn(e));
        }
    }

    return (
        <div className="h-screen" onKeyDown={handleKeyDown}>
            <div className="flex justify-center mt-10 px-6 text-gray-800">
                <div className="mt-10 g-6">
                    <div className="flex justify-center my-10">
                        <img style={{width: '30%'}} className="object-cover w-full" src={chameleon} alt="chameleon"/>
                    </div>
                    <div className="w-auto my-10">
                        <form>
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <p className="text-sm mb-0 mr-4 text-black">Don't have an account?</p>
                                <Link to="/sign-up"
                                      className="text-sm text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                >Sign Up</Link>
                            </div>
                            <div className="flex my-4 flex-1 border-t-1 border-gray-300 mt-0.5"/>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="li-email"
                                    placeholder="Email Address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="li-password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <div className="form-group form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input appearance-none h-4 w-4 border border-gray-300
                    rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none
                    transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                        id="remember"
                                    />
                                    <label className="form-check-label inline-block text-gray-800" htmlFor="remember"
                                    >Remember me</label>
                                </div>
                                <Link to="#!" className="text-gray-800">Forgot password?</Link>
                            </div>
                            <div className="text-center lg:text-left">
                                <SubmitButton className="color-btn w-full" text="Sign In" onClick={signIn} disabled={!email || !password}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};