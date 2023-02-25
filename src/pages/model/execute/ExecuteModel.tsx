import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Button, Header, SubmitButton} from "../../../components";
import {Link, useLocation} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
import OutputModule from "../module/Output"
import OutputDescriptionModule from "../module/OutputDescription"
import {paramtab} from "../../../assets/Dummy";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonForms} from "@jsonforms/react";
import {JsonViewer} from "@textea/json-viewer";

type IFile = File & { preview?: string };
const initialData = {};

export default function ExecuteModel() {
  const {currentColor} = useStateContext();
  const [files, setFiles] = useState<IFile[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [data, setData] = useState(initialData);
  const location = useLocation();
  const schema = location.state.schema
  const uischema = location.state.uischema
  const [hideDrop, setHideDrop] = useState<boolean>(false);

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setHideDrop(true);
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const removeFile = () => {
    setFiles([]);
  }

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes{" "}
    </li>
  ));

  const thumbs = files.map(file => (
    <div key={file.name}>
      <img className="block w-auto h-full"
           src={file.preview}
           alt="file"
           onLoad={() => {
             URL.revokeObjectURL(file.preview as string)
           }}
      />
    </div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview as string));
  });

  return (
    <div className="contents">
      <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
          <Header category="" title="Model01"/>
          <Link to="/model">
            <Button style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}}
              className="text-sm w-full p-1.5" text="back"/>
          </Link>
        </div>
        <div style={{height: '550px'}} className="grid grid-rows-4 grid-cols-2 grid-flow-col gap-2 mt-10">
          <div className="overflow-auto row-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            <div className="flex space-x-3 border-b">
              {/* Loop through tab data and render button for each. */}
              {paramtab.map((tab, idx) => {
                return (
                    <button
                        key={idx}
                        className={`py-2 border-b-4 transition-colors duration-300 ${
                            idx === activeTabIndex
                                ? "border-teal-500"
                                : "border-transparent hover:border-gray-200"
                        }`}
                        // Change the active tab on click.
                        onClick={() => setActiveTabIndex(idx)}>
                      {tab.label}
                    </button>
                );
              })}
            </div>
            <div className="tab-content tab-space">
              <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                <JsonForms
                    schema={schema}
                    uischema={uischema}
                    data={data}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={({errors, data}) => {
                      setData(data);
                    }}
                />
              </div>
              <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                <JsonViewer value={data ? data : {}}/>
              </div>
            </div>
          </div>
          <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Input upload</p>
              <div className="flex items-center gap-4">
                <SubmitButton onClick={removeFile}
                              style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}}
                              className="text-sm w-full py-1 px-1.5" text="Remove"/>
                <SubmitButton onClick={undefined}
                              style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}}
                              className="text-sm w-full py-1 px-1.5" text="Submit"/>
              </div>
            </div>
          </div>
          <OutputModule/>
          <OutputDescriptionModule/>
      </div>
    </div>
    </div>
  );
};