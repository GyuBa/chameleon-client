import React, {useEffect, useState} from 'react';
import OutputModule from "../module/Output"
import OutputDescriptionModule from "../module/OutputDescription"
import {useDropzone} from 'react-dropzone';
import {Button, Header} from "../../../components";
import {Link, useLocation} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";
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

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const thumbs = files.map(file => (
    <div className="inline-flex rounded border border-black border-solid p-4" key={file.name}>
      <img className="block w-auto h-full"
           src={file.preview}
           alt="model"
           onLoad={() => {
             URL.revokeObjectURL(file.preview as string)
           }}
      />
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
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
            <p className="text-xl font-bold">Input upload</p>
            <section className="container">
              <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p className="inline-block px-5 py-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                  Drag & drop some files here, or click to select files</p>
              </div>
              <aside className="px-5 py-2 w-80">{thumbs}</aside>
              <ul className="px-5 pb-5 pt-2">{acceptedFileItems}</ul>
            </section>
          </div>
          <OutputModule/>
          <OutputDescriptionModule/>
        </div>
      </div>
    </div>
  );
};