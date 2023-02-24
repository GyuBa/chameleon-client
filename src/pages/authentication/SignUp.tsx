import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {SubmitButton} from '../../components/index';
import chameleon from '../../assets/images/chameleon.png';
import {useStateContext} from "../../contexts/ContextProvider";
import instance from "../../ConstantValue";
import {setToken} from "../../service/TokenService";

function authSignUp(email : string, password : string, userName : string) {
  return instance.post("/auth/sign-up",
      {
        'email' : email,
        'password' : password,
        'userName' : userName,
      },
      {
        headers: {
          'Content-Type' : 'application/json',
        }
      }
  )
      .then(function(response) {
        setToken(response.data.access_token);
        if(response.data.code === 401) {
          alert('가입에 실패하셨습니다. 가입하고자 하는 Email을 재확인바랍니다.');
        }
      });
}

export default function SignUp() {
  const {currentColor} = useStateContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setuserName] = useState<string>("");

  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");

  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isuserName, setIsuserName] = useState<boolean>(false);

  const signup = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userName) {
        alert("사용자명을 입력하세요.");
        return;
      } else if (!password) {
        alert("비밀번호를 입력하세요.");
        return;
      } else if (!email) {
        alert("이메일을 입력하세요.");
        return;
      } else {
        authSignUp(email, password, userName).then(function (response) {
          console.log("가입 성공");
          alert("가입에 성공하셨습니다!");
          document.location.href = "/auth/sign-in";

        })
          .catch((error) => {
            alert('가입에 실패하셨습니다. 가입하고자 하는 이메일을 재확인바랍니다.');
            console.log(error);
          })
      }
    },
    [userName, email, password]
  )

  const onChangeuserName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setuserName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 16) {
      setNameMessage('2글자 이상 16글자 미만으로 입력!')
      setIsuserName(false)
    } else {
      setNameMessage('올바른 사용자명 형식입니다.');
      setIsuserName(true)
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
      <div className="flex justify-center px-6 mt-10 text-gray-800">
        <div className="mt-10 g-6">
          <div
            className="flex justify-center my-10">
            <img style={{width: '30%'}} className="object-cover w-full" src={chameleon} alt="chameleon"/>
          </div>
          <div className="w-auto my-10">
            <form>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-sm mb-0 mr-4 text-black">Already have an Account?</p>
                <Link to="/sign-in"
                      className="text-sm text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                >Login</Link>
              </div>
              <div className="flex my-4 flex-1 border-t-1 border-gray-300 mt-0.5"/>
              <div className="mb-6">
                <input
                  onChange={onChangeuserName}
                  type="text"
                  className="text-base form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                  id="su-name"
                  placeholder="User name"
                />
                {userName.length > 0 && <span className={`message ${isuserName ? 'success' : 'error'}`}>{nameMessage} </span>}

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
                {email.length > 0 &&
                  <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage} </span>}
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
                {password.length > 0 &&
                  <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage} </span>}
              </div>
              <div className="text-center lg:text-left">
                <SubmitButton style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}}
                              className="w-full" text="SignUp" Event={SignUp} onClick={signup}
                              disabled = {!(isuserName && isEmail && isPassword)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};