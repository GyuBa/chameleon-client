import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {SubmitButton} from '../index';
import chameleon from '../../assets/images/chameleon.png';
import {useStateContext} from "../../contexts/ContextProvider";
import {Signup} from "../../service/login/LoginToken"

export default function SignUp() {
  const {currentColor} = useStateContext();
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [Name, setName] = useState<string>("");

  const [EmailMessage, setEmailMessage] = useState<string>("");
  const [PasswordMessage, setPasswordMessage] = useState<string>("");
  const [NameMessage, setNameMessage] = useState<string>("");

  const [IsEmail, setIsEmail] = useState<boolean>(false);
  const [IsPassword, setIsPassword] = useState<boolean>(false);
  const [IsName, setIsName] = useState<boolean>(false);

  const signup = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!Email && !Password && !Name) {
        return alert("Name과 Email과 Password를 입력하세요.");
      } else if (!Email && !Password) {
        return alert("Email과 Password을 입력하세요.");
      } else if (!Email && !Name) {
        return alert("Name과 Email을 입력하세요.");
      } else if (!Password && !Name) {
        return alert("Name과 Password를 입력하세요.")
      } else if (!Email) {
        return alert("Email을 입력하세요.");
      } else if (!Password) {
        return alert("Password를 입력하세요.");
      } else if (!Name) {
        return alert("Name을 입력하세요.");
      } else {
        Signup(Email, Password, Name).then(function (response) {
          console.log("가입 성공");
          alert("가입에 성공하셨습니다!");
          document.location.href = "/login";

        })
          .catch((error) => {
            alert('가입에 실패하셨습니다. 가입하고자 하는 Email을 재확인바랍니다.');
            console.log(error);
          })
      }
    },
    [Name, Email, Password]
  )

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력!')
      setIsName(false)
    } else {
      setNameMessage('올바른 이름 형식입니다.');
      setIsName(true)
    }
  }, [])
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 올바르지 않습니다. 재입력해주시기 바랍니다.')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식입니다.')
      setIsEmail(true)
    }
  }, [])

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자 조합으로 8자리 이상 입력 부탁드립니다!')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요')
      setIsPassword(true)
    }
  }, [])

  return (
    <div className="h-screen">
      <div className="flex justify-center px-6 h-full text-gray-800">
        <div className="h-full g-6">
          <div
            className="flex justify-center my-10">
            <img style={{width: '30%'}} className="object-cover w-full" src={chameleon} alt="chameleon"/>
          </div>
          <div className="w-auto my-10">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-sm mb-0 mr-4 dark:text-white text-black">Already have an Account?</p>
                <Link to="/login"
                      className="text-sm text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Login</Link>
              </div>
              <div className="flex my-4 flex-1 border-t-1 border-gray-300 mt-0.5"/>
              <div className="mb-6">
                <input
                  onChange={onChangeName}
                  type="text"
                  className="text-base form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                  id="su-name"
                  placeholder="Name"
                />
                {Name.length > 0 && <span className={`message ${IsName ? 'success' : 'error'}`}>{NameMessage} </span>}

              </div>
              <div className="mb-6">
                <input
                  onChange={onChangeEmail}
                  type="text"
                  className="text-base form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                  id="su-email"
                  placeholder="Email address"
                />
                {Email.length > 0 &&
                  <span className={`message ${IsEmail ? 'success' : 'error'}`}>{EmailMessage} </span>}
              </div>
              <div className="mb-6">
                <input
                  onChange={onChangePassword}
                  type="password"
                  className="text-base form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="su-password"
                  placeholder="Password"
                />
                {Password.length > 0 &&
                  <span className={`message ${IsPassword ? 'success' : 'error'}`}>{PasswordMessage} </span>}
              </div>
              <div className="text-center lg:text-left">
                <SubmitButton
                  Event={SignUp}
                  onClick={signup}
                  color="white"
                  bgColor={currentColor}
                  text="SignUp"
                  borderRadius="10px"
                  width="full"
                  icon={undefined}
                  bgHoverColor={undefined}
                  size={undefined}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};