/**
 * Context API
 */
import React, {createContext, useContext, useState} from 'react';
import {useMediaQuery} from "react-responsive";

const StateContext = createContext();
const currentColor = '#1E4DB7';
const initialState = { userProfile: false, ChangeName: false, };

export const ContextProvider = ({children}) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [menuState, setMenuState] = useState(false);
  const [modelState, setModelState] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('GridLayout');
  const [value, setValue] = useState(
    `A simple markdown editor with preview, implemented with React.js and TypeScript. This React Component aims to provide a simple Markdown editor with syntax highlighting support. This is based on \`textarea\` encapsulation, so it does not depend on any modern code editors such as Acs, CodeMirror, Monaco etc.
### Features
- 📑 Indent line or selected text by pressing tab key, with customizable indentation.
- ♻️ Based on \`textarea\` encapsulation, does not depend on any modern code editors.
- 🚧 Does not depend on the [\`uiw\`](https://github.com/uiwjs/uiw) component library.
- 🚘 Automatic list on new lines.
- 😻 GitHub flavored markdown support.
- 🌒 Support dark-mode/night-mode **@v3.11.0+**.
- 💡 Support [next.js](https://github.com/uiwjs/react-md-editor/issues/52#issuecomment-848969341), [Use examples](#support-nextjs) in [next.js](https://nextjs.org/).
### Quick Start
\`\`\`bash
npm i @uiw/react-md-editor
\`\`\`
### Using
[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/markdown-editor-for-react-izdd6?fontsize=14&hidenavigation=1&theme=dark)
[![Open in Github gh-pages](https://img.shields.io/badge/Open%20In-Github%20gh--pages-blue?logo=github)](https://uiwjs.github.io/react-md-editor/)
[![Open in Gitee gh-pages](https://img.shields.io/badge/Open%20In-Gitee%20gh--pages-blue?logo=web)](https://uiw.gitee.io/react-md-editor/)
\`\`\`jsx mdx:preview
import React from "react";
import MDEditor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
    </div>
  );
}
\`\`\``);

  const handleClick = (clicked) => setIsClicked({...initialState, [clicked]: true});

  const onClickMenu = () => {setMenuState(prevState => !prevState )};

  const selectModel = () => {setModelState(prevState => !prevState)};

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const isDesktopOrMobile = useMediaQuery({query: '(max-width:767px)'});

  const handleCloseSideBar = () => {if (activeMenu !== undefined) setActiveMenu(false);};

  return (
    <StateContext.Provider value={{
      initialState,
      isDesktopOrMobile,
      currentColor,
      activeMenu,
      setActiveMenu,
      isClicked,
      setIsClicked,
      menuState,
      setMenuState,
      currentLayout,
      setCurrentLayout,
      modelState,
      setModelState,
      value,
      setValue,
      handleClick,
      onClickMenu,
      selectModel,
      handleActiveMenu,
      handleCloseSideBar
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);