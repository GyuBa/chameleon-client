import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Button, Header, SubmitButton} from "../../../components";
import {Link} from "react-router-dom";
import {useStateContext} from "../../../contexts/ContextProvider";

type IFile = File & { preview?: string };

export default function ExecuteModel() {
  const {currentColor} = useStateContext();
  const [files, setFiles] = useState<IFile[]>([]);
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
           alt="model"
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
          <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            <p className="text-xl font-bold">Parameter</p>
          </div>
          <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">Input upload</p>
              <div className="flex items-center gap-4">
                <SubmitButton onClick={removeFile} style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}} className="text-sm w-full py-1 px-1.5" text="Remove"/>
                <SubmitButton onClick={undefined} style={{backgroundColor: `${currentColor}`, color: "white", borderRadius: "10px"}} className="text-sm w-full py-1 px-1.5" text="Submit"/>
              </div>
            </div>
              <section className="container">
                <div {...getRootProps()} className={hideDrop ? "hidden dropzone" : "dropzone"}>
                  <input {...getInputProps()}/>
                  <p className="inline-block px-5 py-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                    Drag & drop some files here, or click to select files</p>
                </div>
                <aside className="px-5 py-2 w-48">{thumbs}</aside>
                <ul className="px-5 pb-5 pt-2">{acceptedFileItems}</ul>
              </section>
          </div>
          <div className="row-span-3 col-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            <p className="text-xl font-bold">Output</p>
          </div>
          <div className="row-span-1 col-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            <p className="text-xl font-bold">Output Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};