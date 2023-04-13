import React, {useEffect} from 'react';
import {Routes, Route, useLocation, useMatch} from 'react-router-dom';
import {Layout} from './components';
import './App.css';
import './styles/Dropzone.css';
import {
    Main,
    SignIn,
    SignUp,
    Payment,
    Account,
    ChangePassword,
    Model,
    ExecuteModel,
    CreateModel,
    TarFile,
    Dockerfile,
    WebSocket,
    CreateDescription,
    CreateParameter
} from './pages';
import useWebSocket from "react-use-websocket";

export default function App() {

    const location = useLocation();

    const {
        sendJsonMessage,
    } = useWebSocket((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://') + window.location.host + '/websocket', {
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        sendJsonMessage({ msg: 'path', path: window.location.pathname });
    }, [sendJsonMessage, window.location.pathname]);


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