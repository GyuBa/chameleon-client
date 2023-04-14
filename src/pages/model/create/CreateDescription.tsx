import React, {useState} from "react";
import {Button, Header, SubmitButton} from "../../../components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import MDEditor from '@uiw/react-md-editor';

export default function CreateDescription() {
    const navigate = useNavigate();
    const location = useLocation();
    const {currentColor} = useStateContext();
    const [description, setDescription] = useState<string|undefined>(
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

    const files = location.state?.files;
    const modelName = location.state?.modelName;
    const inputType = location.state?.inputType;
    const outputType = location.state?.outputType;
    const regionName = location.state?.regionName;

    const handleClick = () => {
        navigate("/model/create/parameter", {
            state: {
                files: files,
                modelName: modelName,
                inputType: inputType,
                outputType: outputType,
                regionName: regionName,
                description: description,
            },
        });
    };

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div className="flex justify-between items-center">
                    <Header category="" title="Model Description"/>
                    <div className="flex gap-3 float-right">
                        <Link to="/model/create">
                            <Button style={{backgroundColor: "white", color: "black", borderRadius: "10px"}}
                                    className="w-16 p-2" text="back"/>
                        </Link>
                        <SubmitButton onClick={handleClick}
                                      style={{backgroundColor: currentColor, color: "white", borderRadius: "10px"}}
                                      className="w-16" text="next"/>
                    </div>
                </div>
                <div className="container pt-4">
                    <MDEditor value={description} onChange={setDescription}/>
                </div>
            </div>
        </div>
    );
}