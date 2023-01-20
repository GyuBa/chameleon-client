/**
 * Context API
 */
import React, {createContext, useContext, useState} from 'react';

const StateContext = createContext();

const initialState = {
  userProfile: false,
  ChangeName: false,
};

export const ContextProvider = ({children}) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [menuState, setMenuState] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('GridLayout');

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

  const onClickMenu = () => {
    setMenuState(prevState => prevState ? false : true )
  }

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{
      currentColor,
      currentMode,
      activeMenu,
      screenSize,
      setScreenSize,
      isClicked,
      initialState,
      setIsClicked,
      setActiveMenu,
      setCurrentColor,
      setCurrentMode,
      themeSettings,
      setThemeSettings,
      menuState,
      setMenuState,
      currentLayout,
      setCurrentLayout,
      handleClick,
      setMode,
      setColor,
      onClickMenu
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);