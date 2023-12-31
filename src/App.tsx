import React, {useEffect, useState} from 'react';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import './App.css';
import useWebSocket from "react-use-websocket";
import Layout from "./components/layout/Layout";
import Account from "./pages/profile/Account";
import ChangePassword from "./pages/profile/ChangePassword";
import Payment from "./pages/profile/Payment";
import Model from "./pages/model/main/Model";
import CreateModelInfo from "./pages/model/create/CreateModelInfo";
import CreateModelParameters from "./pages/model/create/CreateModelParameters";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import {
    EarnedPointHistoryEntityData,
    PointHistoryEntityData,
    RegionEntityData,
    SitePaths, TerminalSizeOptions,
    UserEntityData,
    WSMessageType
} from "./types/chameleon-platform.common";
import Histories from "./pages/history/board/Histories";
import Models from "./pages/model/board/Models";
import History from "./pages/history/main/History";
import {ModelUploadData, ParameterDetail} from "./types/chameleon-client";
import GlobalContextProvider from "./contexts/GlobalContextProvider";
import CreateModelDescription from "./pages/model/create/CreateModelDescription";
import {CookieUtils} from "./utils/CookieUtils";
import {PlatformAPI} from "./platform/PlatformAPI";
import PaymentHistories from "./pages/profile/PaymentHistories";
import {PaymentHistoriesType} from "./types/chameleon-client.enum";

export default function App() {

    const {
        sendJsonMessage,
        lastJsonMessage,
    } = useWebSocket((window.location.protocol.startsWith('https') ? 'wss://' : 'ws://') + window.location.host + '/websocket', {
        shouldReconnect: (closeEvent) => true,
        share: true
    });

    let path = useLocation().pathname.slice(1);

    useEffect(() => {
        let message = lastJsonMessage as any;
        if (lastJsonMessage && message.msg === WSMessageType.READY) {
            sendJsonMessage({msg: WSMessageType.PATH, path});
        }
    }, [lastJsonMessage, path]);

    useEffect(() => {
        sendJsonMessage({msg: WSMessageType.PATH, path});
    }, [path]);

    const [activeMenu, setActiveMenu] = useState<boolean>(true);
    const [modelData, setModelData] = useState<ModelUploadData>(undefined!);
    const [regions, setRegions] = useState<RegionEntityData[]>([]);
    const [parameterDetails, setParameterDetails] = useState<ParameterDetail[]>([]);
    const [user, setUser] = useState<UserEntityData>({id: -1, username: "", email: "", point: 0, earnedPoint: 0});
    const [enableFooter, setEnableFooter] = useState<boolean>(true);
    const [pointHistoriesData, setPointHistoriesData] = useState<PointHistoryEntityData[] | null>(null);
    const [earnedPointHistoriesData, setEarnedPointHistoriesData] = useState<EarnedPointHistoryEntityData[] | null>(null);
    const [activeTab, setActiveTab] = useState<PaymentHistoriesType>(PaymentHistoriesType.USAGE);
    const [terminalSizeOptions, setTerminalSizeOptions] = useState<TerminalSizeOptions>({cols: 181, rows: 14});

    useEffect(() => {
        const mainPath = '/' + path.split('/').shift();
        setEnableFooter(!(mainPath === SitePaths.MODEL_RAW || mainPath === SitePaths.HISTORY_RAW));
    }, [path]);

    let isSignedIn = CookieUtils.getCookieValue('connect.sid');
    useEffect(() => {
        if (isSignedIn && user.id === -1) {
            setTimeout(async () => {
                try {
                    const loginUser = await PlatformAPI.getLoginUser();
                    setUser(loginUser);
                } catch (e) {
                    CookieUtils.removeCookieValue('connect.sid');
                }
            });
        }
    }, [isSignedIn]);

    return (
        <GlobalContextProvider value={{
            activeMenu,
            setActiveMenu,
            modelData,
            setModelData,
            regions,
            setRegions,
            parameterDetails,
            setParameterDetails,
            user,
            setUser,
            enableFooter,
            setEnableFooter,
            pointHistoriesData,
            setPointHistoriesData,
            earnedPointHistoriesData,
            setEarnedPointHistoriesData,
            activeTab,
            setActiveTab,
        }}>
            <Routes>
                {isSignedIn ? (
                    <Route path="/" element={(<Layout/>)}>
                        <Route path={SitePaths.ACCOUNT} element={<Account/>}/>
                        <Route path={SitePaths.CHANGE_PASSWORD} element={<ChangePassword/>}/>
                        <Route path={SitePaths.PAYMENT} element={<Payment/>}/>
                        <Route path={SitePaths.PAYMENT_HISTORIES} element={<PaymentHistories/>}/>
                        <Route path={SitePaths.MODELS} element={<Navigate to={SitePaths.ALL_MODELS} replace/>}/>
                        <Route path={SitePaths.ALL_MODELS} element={<Models/>}/>
                        <Route path={SitePaths.MY_MODELS} element={<Models ownOnly={true}/>}/>
                        <Route path={SitePaths.MODEL(':username', ':uniqueName')} element={<Model/>}/>
                        <Route path={SitePaths.CREATE_MODEL}
                               element={<Navigate to={SitePaths.CREATE_MODEL_INFO} replace/>}/>
                        <Route path={SitePaths.CREATE_MODEL_INFO} element={<CreateModelInfo/>}/>
                        <Route path={SitePaths.CREATE_MODEL_DESCRIPTION} element={<CreateModelDescription/>}/>
                        <Route path={SitePaths.CREATE_MODEL_PARAMETERS} element={<CreateModelParameters/>}/>
                        <Route path={SitePaths.HISTORIES} element={<Histories/>}/>
                        <Route path={SitePaths.HISTORY(':historyId')} element={<History/>}/>
                    </Route>
                ) : (<Route path="/*" element={<Navigate to={SitePaths.SIGN_IN} replace/>}/>)}
                <Route path={SitePaths.SIGN_IN} element={(<SignIn/>)}/>
                <Route path={SitePaths.SIGN_UP} element={(<SignUp/>)}/>
            </Routes>
        </GlobalContextProvider>

    );
};