import React, {createContext, useContext, useState} from 'react';
import {useMediaQuery} from "react-responsive";

const StateContext = createContext({});
const initialState = {userProfile: false, ChangeName: false,};

export const ContextProvider = ({children}: { children: React.ReactNode }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [isClickedButton, setIsClickedButton] = useState<any>(initialState);
    // TODO: any 제거
    const [menuState, setMenuState] = useState(false);
    const [currentLayout, setCurrentLayout] = useState('GridLayout');

    const handleClick = (clicked: string) => setIsClicked({...initialState, [clicked]: true});

    const onClickButton = (buttonName: string) => {
        if (buttonName === 'changeName') {
            console.log("check_1");
            setIsClickedButton({...isClickedButton, changeName: !isClickedButton.changeName});
        } else {
            console.log("check_2");
            setIsClickedButton({...isClickedButton, changeName: false});
        }
    };

    const onClickMenu = () => {
        setMenuState(prevState => !prevState)
    };

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    const isDesktopOrMobile = useMediaQuery({query: '(max-width:767px)'});

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined) setActiveMenu(false);
    };

    return (
        <StateContext.Provider value={{
            initialState,
            isDesktopOrMobile,
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            isClickedButton,
            setIsClickedButton,
            menuState,
            setMenuState,
            currentLayout,
            setCurrentLayout,
            handleClick,
            onClickButton,
            onClickMenu,
            handleActiveMenu,
            handleCloseSideBar
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext) as any;
// TODO 타입 형으로 정리