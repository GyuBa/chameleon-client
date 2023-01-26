import instance from "../../ConstantValue";
import {getToken, removeToken, setToken} from "../TokenService";

export async function Signin(email : any, password : any) {
    return instance.post("/login/sign-in",
        {
            'email' : email,
            'password' : password,
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

export async function Signup(email : any, password : any, name : any) {
    return instance.post("/login/sign-up",
        {
            'email' : email,
            'password' : password,
            'name' : name,
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

export function Signout() {
    removeToken();
}

export function isSignon() {
    return getToken() === undefined;
}