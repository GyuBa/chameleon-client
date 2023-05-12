import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Link, useLocation} from "react-router-dom";
import OutputModule from "../module/Output"
import OutputDescriptionModule from "../module/OutputDescription"
import {executeParam} from "../../../assets/Dummy";
import {materialCells, materialRenderers} from "@jsonforms/material-renderers";
import {JsonForms} from "@jsonforms/react";
import {JsonViewer} from "@textea/json-viewer";
import Button from "../../../components/button/Button";
import Header from "../../../components/layout/Header";
import SubmitButton from "../../../components/button/SubmitButton";

type IFile = File & { preview?: string };
const initialData = {};

export default function ExecuteModel() {
    //const modelId = useParams();
    const [files, setFiles] = useState<IFile[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [data, setData] = useState(initialData);
    const location = useLocation();
    const schema = location.state.schema
    const uischema = location.state.uischema
    const [hideDrop, setHideDrop] = useState<boolean>(false);

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {'*/*': []},
        onDrop: async acceptedFiles => {
            setHideDrop(true);
            acceptedFiles = acceptedFiles.slice(0, 1);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const removeFile = () => {
        setFiles([]);
        setHideDrop(false);
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData();
        for (const file of acceptedFiles) {
            console.log(file);
            data.append('files', file, file.name);
        }

        // TODO: 미사용으로 인한 주석 처리, 다른 구조로 수정 필요
        /*// TODO: Input Upload 경로 수정 필요
        try {
            const response = await instance.post('/upload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // TODO: status 설정
            if (response.data.status === 'success') {
            } else {
                setFiles([]);
                setHideDrop(false);
            }
        } catch (error) {
            setFiles([]);
            setHideDrop(false);
        }*/
    }

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24">
                <div className="flex justify-between items-center pb-2 border-b-1 border-gray-300">
                    <Header title="Model"/>
                    <Link to="/models/all"><Button className="color-btn text-sm w-full p-1.5" text="back"/></Link>
                </div>
                <div style={{height: '550px'}} className="grid grid-rows-4 grid-cols-2 grid-flow-col gap-2 mt-10">
                    <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
                        <div className="flex space-x-3 border-b">
                            {executeParam.map((tab, idx) => {
                                return (
                                    <button
                                        key={idx}
                                        className={`text-xl font-semibold pb-2 border-b-4 transition-colors duration-300 ${
                                            idx === activeTabIndex
                                                ? "border-teal-500"
                                                : "border-transparent hover:border-gray-200"
                                        }`}
                                        onClick={() => setActiveTabIndex(idx)}>
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="tab-content tab-space overflow-y-auto max-h-[212px]">
                            <div className={activeTabIndex === 0 ? "block" : "hidden"} id="link1">
                                <JsonForms
                                    schema={schema}
                                    uischema={uischema}
                                    data={data}
                                    renderers={materialRenderers}
                                    cells={materialCells}
                                    onChange={({data}) => {
                                        setData(data);
                                    }}
                                />
                            </div>
                            <div className={activeTabIndex === 1 ? "block" : "hidden"} id="link2">
                                <JsonViewer value={data ? data : {}}/>
                            </div>
                        </div>
                    </div>
                    <div className="row-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
                        <div className="pb-1 flex justify-between items-center border-b">
                            <p className="text-xl font-semibold">Input Upload</p>
                            <div className="flex items-center gap-4">
                                <SubmitButton onClick={removeFile} text="remove"
                                            className="text-sm py-1 px-1.5 border border-gray border-solid
                                              rounded-md hover:border-black"/>
                                <SubmitButton onClick={handleSubmit} text="submit"
                                            className="text-sm py-1 px-1.5 border border-gray border-solid
                                              rounded-md hover:border-black"/>
                            </div>
                        </div>
                        <div className="overflow-auto max-h-[217px] h-full">
                            <section className="container h-full">
                                <div {...getRootProps()}
                                    className={hideDrop ? "hidden" : "dropzone cursor-pointer justify-center"}>
                                    <input {...getInputProps()}/>
                                    <p className="inline-block px-1 text-gray-500 hover:text-gray-700">
                                        Drag & drop some files here, or click to select files</p>
                                </div>
                                {hideDrop && (
                                    <div>
                                        <aside className="px-5 py-2 w-48">{thumbs}</aside>
                                        <ul className="px-5 py-2">{acceptedFileItems}</ul>
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                    <OutputModule/>
                    <OutputDescriptionModule/>
                </div>
            </div>
        </div>
    );
};