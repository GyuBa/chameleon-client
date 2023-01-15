import React, {useEffect, useState} from 'react';
import {Button, Header} from "../../../components/index";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Link} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import tar from "../../../assets/images/tar.png";

type IFile = File & { preview?: string };

export default function Tarfile() {
  const {currentColor} = useStateContext();
  const [files, setFiles] = useState<IFile[]>([]);

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    accept: {
      '/*': []
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

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview as string));
  });

  return (
    <div className="contents">
      <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        <div className="flex items-end">
          <Header category="" title="모델 생성"/>
          <h1 className="px-2 text-gray-500">tarfile</h1>
        </div>
        <div className="gap-4 grid md:py-10 md:px-5 md:my-2 md:grid-cols-2">
          <div>
            <div className="mb-3">
              <h1 className="text-xl font-bold">모델 이름</h1>
              <input
                onChange={undefined}
                type="text"
                className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                id="model-name"
                placeholder="모델 이름"/>
            </div>
            <div>
              <h1 className="text-xl font-bold">모델 설명</h1>
              <input
                onChange={undefined}
                type="text"
                className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                id="model-description"
                placeholder="모델 설명"/>
            </div>
          </div>
          <div>
            {/*파일 삭제 버튼 및 tar 파일 업로드 추가*/}
            <h1 className="text-xl font-bold">파일 업로드</h1>
            <div className="md:p-5 rounded border border-solid border-gray-300 text-center item-center">
              <img style={{width: '60px'}} className="object-cover w-full inline-block align-middle" src={tar} alt="tar-file"/>
              <section className="container">
                <div {...getRootProps({className: 'dropzone'})}>
                  <input {...getInputProps()} />
                  <p className="inline-block px-5 py-3 text-gray-500 hover:text-gray-700 cursor-pointer align-middle">Drag
                    & drop some files here, or click to select files</p>
                </div>
                <ul className="px-5 pb-5 pt-2">{acceptedFileItems}</ul>
              </section>
            </div>
          </div>
        </div>
        <div className="flex gap-3 float-right">
          <Link to="/createmodel">
            <Button color="black" bgColor="white" text="취소" borderRadius="10px" width="16"
                    padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
          </Link>
          <Link to="/createmodel">
            <Button color="white" bgColor={currentColor} text="생성" borderRadius="10px" width="16"
                    padding="2" icon={undefined} bgHoverColor={undefined} size={undefined}/>
          </Link>
        </div>
      </div>
    </div>
  );
};