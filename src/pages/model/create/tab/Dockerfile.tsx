import React, {useEffect, useState} from 'react';
import {tabsData} from "../../../../assets/Dummy";
import {Link, useNavigate} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import Button from "../../../../components/button/Button";
import SubmitButton from "../../../../components/button/SubmitButton";
import Header from "../../../../components/layout/Header";
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {RegionEntityData} from "../../../../types/chameleon-client.entitydata";

type IFile = File & { preview?: string };

export default function Dockerfile() {
    const navigate = useNavigate();
    const [hideDrop, setHideDrop] = useState<boolean>(false);
    const [files, setFiles] = useState<IFile[]>([]);
    const [modelName, setModelName] = useState<string>('');
    const [inputType, setInputType] = useState<string>('');
    const [outputType, setOutputType] = useState<string>('');
    const [regionName, setRegionName] = useState<string>('');
    const [regionList, setRegionList] = useState<RegionEntityData[]>([]);

    const handleModelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setModelName(event.target.value);
    };
    const handleInputTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setInputType(event.target.value);
    };
    const handleOutputTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOutputType(event.target.value);
    };
    const handleRegionNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegionName(event.target.value);
    };

    const handleClick = () => {
        navigate("/model/create/description", {
            state: {
                files: files,
                modelName: modelName,
                inputType: inputType,
                outputType: outputType,
                regionName: regionName,
            },
        });
    };

    useEffect(() => {
        let completed = false;

        (async function get() {
            try {
                const regions = await PlatformAPI.getRegionList();
                if (!completed) {
                    setRegionList(regions);
                    setRegionName(regions[0]?.name);
                }
            } catch (error) {
                console.error(error);
            }
        })();

        return () => {
            completed = true;
        };
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'application/x-tar': []
        },
        onDrop: acceptedFiles => {
            setHideDrop(true);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const acceptedFileItems = files.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview as string));
    }, [files]);

    const removeFile = () => {
        setFiles([]);
        setHideDrop(false);
    }

    return (
        <div className="py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-end">
                    <Header category="" title="Model Info"/>
                    <h1 className="mx-2 text-gray-500">{tabsData[1].label}</h1>
                </div>
                <div className="flex gap-3 float-right">
                    <Link to="/model"><Button className="white-btn w-16 p-2" text="back"/></Link>
                    <SubmitButton onClick={handleClick} className="color-btn w-16" text="next"/>
                </div>
            </div>
            <div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
                <div>
                    <div className="md:mt-0 mt-5 mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Model Name</h1>
                        <input
                            type="text"
                            className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                            id="model-name"
                            placeholder="Model Name"
                            value={modelName}
                            onChange={handleModelNameChange}/>
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Input Type</h1>
                        <select id="Input"
                                className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                                value={inputType}
                                onChange={handleInputTypeChange}>
                            <option disabled hidden>Input Type</option>
                            <option value="none">(none)</option>
                            <option value="image">image</option>
                            <option value="binary">binary</option>
                            <option value="text">text</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Output Type</h1>
                        <select id="Output"
                                className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                                value={outputType}
                                onChange={handleOutputTypeChange}>
                            <option disabled hidden>Output Type</option>
                            <option value="image">image</option>
                            <option value="binary">binary</option>
                            <option value="text">text</option>
                        </select>
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Model Region</h1>
                        <select id="countries"
                                className="form-control block w-full px-4 py-2 text-base font-normal
                  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                  focus:border-blue-600 focus:outline-none"
                                value={regionName}
                                onChange={handleRegionNameChange}>
                            <option disabled hidden>Model Region</option>
                            {regionList.map((region: { id: number; name: string; }) => (
                                <option key={region.id} value={region.name}>{region.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">File Upload</h1>
                        <div
                            className="py-5 rounded border border-solid border-gray-300 text-center item-center">
                            <img style={{width: '60px'}} alt="img"
                                 className="object-cover w-full inline-block align-middle" src={tabsData[1].img}/>
                            <section className="container">
                                <div {...getRootProps()}
                                     className={hideDrop ? "hidden" : "dropzone cursor-pointer"}>
                                    <input {...getInputProps()} />
                                    <p className="inline-block px-1 text-gray-500 hover:text-gray-700">
                                        Drag & drop some files here, or click to select files</p>
                                </div>
                                <ul className="px-5 pb-5 pt-2">{acceptedFileItems}</ul>
                                <div className="pr-3">
                                    <SubmitButton onClick={removeFile} text="remove"
                                                  className="float-right text-sm py-1 px-1.5 border border-gray border-solid
                                rounded-md hover:border-black"/>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};