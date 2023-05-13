import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import './styles/Dropzone.css';
import useWebSocket from "react-use-websocket";
import Layout from "./components/layout/Layout";
import Account from "./pages/profile/Account";
import ChangePassword from "./pages/profile/ChangePassword";
import Payment from "./pages/profile/Payment";
import ExecuteModel from "./pages/model/execute/ExecuteModel";
import CreateModel from "./pages/model/create/CreateModel";
import CreateDescription from "./pages/model/create/CreateDescription";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import CreateParameters from "./pages/model/create/CreateParameter";
import {WSMessageType} from "./types/chameleon-platform.common";
import History from "./pages/history/History";
import Models from "./pages/model/board/Models";
import useGetUserInfo from "./service/authentication/UserInfoService";

export default function App() {
    const { getCookieValue } = useGetUserInfo();
    const [connectSid, setConnectSid] = useState<string | null>(null);
    const {sendJsonMessage, lastJsonMessage} =
        useWebSocket((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://')
	        + window.location.host + '/websocket', { shouldReconnect: (closeEvent) => true });

    useEffect(() => {
        let message = lastJsonMessage as any;
        if (lastJsonMessage && message.msg === WSMessageType.READY) {
            sendJsonMessage({msg: WSMessageType.PATH, path: window.location.pathname});
        }
    }, [sendJsonMessage, lastJsonMessage]);

    useEffect(() => {
        sendJsonMessage({msg: WSMessageType.PATH, path: window.location.pathname});
    }, [sendJsonMessage]);

    // TODO: 맨 처음 서버 켜고 로그인 할 때 한 번에 페이지 안되고, 새로고침 1~2번 해야 동작하는 오류
    useEffect(() => {
        const getConnectSid = async () => {
            const sid = await getCookieValue('connect.sid');
            setConnectSid(sid);
            console.log(connectSid);
        };
        getConnectSid();
    }, [getCookieValue, connectSid]);

    return (
        <Routes>
            <Route path="/" element={connectSid ? (<Layout/>) : (<Navigate to="/sign-in" replace/>)}>
                <Route path="/account" element={<Account/>}/>
                <Route path="/change-password" element={<ChangePassword/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/models/my" element={<Models/>}/>
                <Route path="/models/all" element={<Models/>}/>
                <Route path="/models/:modelId" element={<ExecuteModel/>}/>
                <Route path="/models/create" element={<CreateModel/>}/>
                <Route path="/models/create/description" element={<CreateDescription/>}/>
                <Route path="/models/create/parameters" element={<CreateParameters/>}/>
                <Route path="/histories" element={<History/>}/>
            </Route>
            <Route path="/sign-in" element={(<SignIn/>)}/>
            <Route path="/sign-up" element={(<SignUp/>)}/>
        </Routes>
    );
};