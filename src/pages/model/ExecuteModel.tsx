import React, {useEffect, useState} from 'react';
import {Header} from '../../components/index';
import {useDropzone} from 'react-dropzone';

type IFile = File & { preview?: string };

export default function ExecuteModel() {
  const [files, setFiles] = useState<IFile[]>([]);

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
        <Header category="ExecuteModel" title="ExecuteModel"/>
        <div className="mb-10 text-black">Model description</div>
        <div className="my-4 md:p-5 rounded-3xl bg-slate-300">
          <p className="p-5 text-xl font-bold">Input</p>
          <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p className="inline-block px-5 py-3 text-gray-500 hover:text-gray-700 cursor-pointer">
                Drag & drop some files here, or click to select files</p>
            </div>
            <aside className="px-5 py-2">{thumbs}</aside>
            <ul className="px-5 pb-5 pt-2">{acceptedFileItems}</ul>
          </section>
        </div>
        <div className="my-4 md:p-5 rounded-3xl bg-slate-300">
          <p className="p-5 text-xl font-bold">Output</p>
        </div>
      </div>
    </div>
  );
};