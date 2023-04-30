import React, {useEffect} from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import {Layout} from './components';
import './App.css';
import './styles/Dropzone.css';
import {
    Account,
    ChangePassword,
    CreateDescription,
    CreateModel,
    CreateParameter,
    Dockerfile,
    ExecuteModel,
    Main,
    Model,
    Payment,
    SignIn,
    SignUp,
    TarFile,
    WebSocket
} from './pages';
import useWebSocket from "react-use-websocket";
import {WSMessageType} from "./types/chameleon-client.enum";

export default function App() {

    const location = useLocation();

    const {
        sendJsonMessage,
        lastJsonMessage
    } = useWebSocket((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://') + window.location.host + '/websocket', {
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        let message = lastJsonMessage as any;
        if (lastJsonMessage && message.msg === WSMessageType.Ready) {
            sendJsonMessage({msg: 'path', path: window.location.pathname});
        }
    }, [lastJsonMessage]);

    useEffect(() => {
        sendJsonMessage({msg: 'path', path: window.location.pathname});
    }, [window.location.pathname]);

    return (
        <Routes>
            <Route path="/" element={(<Layout/>)}>
                <Route path="/main" element={(<Main/>)}/>
                <Route path="/account" element={<Account/>}/>
                <Route path="/change-password" element={<ChangePassword/>}/>
                <Route path="/payment" element={<Payment/>}/>
                <Route path="/ws-test" element={<WebSocket/>}/>
                {/*모델별 경로 고려*/}
                <Route path="/model" element={<Model/>}/>
                <Route path="/model/execute" element={<ExecuteModel/>}/>
                <Route path="/model/create" element={<CreateModel/>}/>
                <Route path="/model/create/description" element={<CreateDescription/>}/>
                <Route path="/model/create/parameter" element={<CreateParameter/>}/>
                <Route path="/menu/tar-file" element={<TarFile/>}/>
                <Route path="/menu/dockerfile" element={<Dockerfile/>}/>
            </Route>
            <Route path="/sign-in" element={(<SignIn/>)}/>
            <Route path="/sign-up" element={(<SignUp/>)}/>
        </Routes>

    );
};