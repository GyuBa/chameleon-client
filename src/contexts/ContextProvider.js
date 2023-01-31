/**
 * Context API
 */
import React, {createContext, useContext, useState} from 'react';
import {useMediaQuery} from "react-responsive";

const StateContext = createContext();
const currentColor = '#1E4DB7';
const initialState = { userProfile: false, ChangeName: false, };

export const ContextProvider = ({children}) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [menuState, setMenuState] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('GridLayout');

  const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

  const onClickMenu = () => {setMenuState(prevState => !prevState )};

  const isDesktopOrMobile = useMediaQuery({query: '(max-width:767px)'});

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{
      initialState,
      isDesktopOrMobile,
      currentColor,
      activeMenu,
      setActiveMenu,
      screenSize,
      setScreenSize,
      isClicked,
      setIsClicked,
      menuState,
      setMenuState,
      currentLayout,
      setCurrentLayout,
      handleClick,
      onClickMenu,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);