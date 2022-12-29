import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SubmitButton} from '../index';
import chameleon from '../../assets/images/chameleon.png';
import {useStateContext} from "../../contexts/ContextProvider";
import {SignIn} from "../../Service/Login/LoginToken"

export default function Login() {
  const {currentColor} = useStateContext();
  const [Email, setEmail] = useState<String>("")
  const [Password, setPassword] = useState<String>("")

  const login = async (e:any) => {
    e.preventDefault();
    if (!Email && !Password) {
      return alert("Email과 Password를 입력하세요.");
    } else if (!Email) {
      return alert("ID를 입력하세요.");
    } else if (!Password) {
      return alert("Password를 입력하세요.");
    } else {
      SignIn(Email, Password)
          .then((response) => {
            alert('로그인 성공하셨습니다!');
            document.location.href = "../Main";
          })
          .catch((error) => {
            alert('가입하지 않은 아이디거나, 잘못된 비밀번호입니다.');
            console.log(error)
          })

    }
  }

  return (
    <div className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center justify-center items-center flex-wrap h-full g-6">
          <div
            className="flex justify-center grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
            <img style={{width: '70%'}} className="mt-10 object-cover w-full" src={chameleon} alt="chameleon"/>
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-sm mb-0 mr-4 dark:text-white text-black">Don't have an account?</p>
                <Link to="/signup"
                      className="text-sm text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Register</Link>
              </div>
              <div className="flex my-4 flex-1 border-t-1 border-gray-300 mt-0.5"/>
              <div className="mb-6">
                <input
                  type="text"
                  className="text-base form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="li-email"
                  placeholder="Email address"
                  onChange = {(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  className="text-base form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="li-password"
                  placeholder="Password"
                  onChange = {(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="remember"
                  />
                  <label className="form-check-label inline-block text-gray-800 dark:text-white" htmlFor="remember"
                  >Remember me</label>
                </div>
                <Link to="#!" className="text-gray-800 dark:text-white">Forgot password?</Link>
              </div>

              <div className="text-center lg:text-left">
                <SubmitButton
                    Event = {Login}
                    onClick = {login}
                    color="white"
                    bgColor={currentColor}
                    text="Login"
                    borderRadius="10px"
                    width="full" icon={undefined} bgHoverColor={undefined} size={undefined}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};