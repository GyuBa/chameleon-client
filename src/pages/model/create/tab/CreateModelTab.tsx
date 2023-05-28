import React, {useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDropzone} from "react-dropzone";
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {ModelInputType, ModelOutputType, SitePaths} from "../../../../types/chameleon-platform.common";
import {FileUtils} from "../../../../utils/FileUtils";
import {ModelFileType} from "../../../../types/chameleon-client.enum";
import tar from "../../../../assets/images/upload/tar.png";
import dockerfile from "../../../../assets/images/upload/dockerfile.png";
import useGlobalContext from "../../../../contexts/hook/useGlobalContext";

const tabsData = {
    [ModelFileType.IMAGE]: {image: tar, label: 'Tar file'},
    [ModelFileType.DOCKERFILE]: {image: dockerfile, label: 'Dockerfile'}
};

export default function CreateModelTab() {
    const navigate = useNavigate();
    const {modelData, setModelData, regions, setRegions} = useGlobalContext();
    useEffect(() => {
        let completed = false;
        (async () => {
            try {
                const loadedRegions = await PlatformAPI.getRegions();
                if (!completed && modelData) {
                    setRegions(loadedRegions);
                    if (!modelData.regionName) {
                        modelData.regionName = loadedRegions?.[0]?.name;
                    }
                }
            } catch (error) {
                console.error(error);
            }
        })();
        return () => {
            completed = true;
        };
    }, [modelData]);

    const handleClick = () => {
        setModelData({...modelData});
        navigate(SitePaths.CREATE_MODEL_DESCRIPTION);
    };

    const {getRootProps, getInputProps} = useDropzone({
        accept: modelData?.fileType === ModelFileType.IMAGE ? {
            'application/x-tar': []
        } : {},
        onDrop: acceptedFiles => {
            if (modelData) {
                modelData.files = acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }));
                setModelData({...modelData});
            }
        }
    });

    const acceptedFileItems = modelData?.files?.map(file => (
        <li key={file.name}>
            {file.name} - {FileUtils.formatBytes(file.size)}
        </li>
    ));

    useEffect(() => {
        return () => modelData?.files?.forEach(file => URL.revokeObjectURL(file.preview as string));
    }, [modelData?.files]);

    const removeFile = () => {
        modelData.files = [];
        setModelData({...modelData});
    }

    const label = tabsData[modelData?.fileType]?.label;
    const image = tabsData[modelData?.fileType]?.image;

    return (
        <div className="py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-end">
                    <p className='head-text'>Model Info</p>
                    <h1 className="mx-2 text-gray-500">{label}</h1>
                </div>
                <div className="flex gap-3 float-right">
                    <Link to={SitePaths.MY_MODELS} onClick={() => {
                        setModelData(undefined as any);
                    }}>
                        <button className="white-btn w-16 p-2">back</button>
                    </Link>
                    <button onClick={handleClick} className="submit-btn w-16">next</button>
                </div>
            </div>
            <div className="gap-4 grid md:pt-10 md:px-5 md:my-2 md:grid-cols-2">
                <div>
                    <div className="md:mt-0 mt-5 mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Model Name</h1>
                        <input
                            type="text"
                            className="model-info-input"
                            placeholder="Model Name"
                            defaultValue={modelData?.modelName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                modelData.modelName = event.target.value
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Input Type</h1>
                        <select
                            className="model-info-input"
                            defaultValue={modelData?.inputType}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => modelData.inputType = event.target.value as ModelInputType}
                        >
                            {Object.values(ModelInputType).map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Output Type</h1>
                        <select
                            className="model-info-input"
                            defaultValue={modelData?.outputType}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => modelData.outputType = event.target.value as ModelOutputType}
                        >
                            {Object.values(ModelOutputType).map(type => <option key={type}
                                                                                value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Model Region</h1>
                        <select
                            className="model-info-input"
                            defaultValue={modelData?.regionName}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => modelData.regionName = event.target.value}
                        >
                            {regions.map((region: { id: number; name: string; }) => (
                                <option key={region.id} value={region.name}>{region.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Category (Optional)</h1>
                        <input
                            type="text"
                            className="model-info-input"
                            id="category"
                            placeholder="Category"
                            defaultValue={modelData?.category}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => modelData.category = event.target.value}
                        />
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">Price (Optional)</h1>
                        <input
                            step={100}
                            type="number"
                            min="0"
                            className="model-info-input"
                            id="price"
                            placeholder="Price"
                            defaultValue={modelData?.price}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => modelData.price = parseInt(event.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <h1 className="md:py-5 text-xl font-bold">File Upload</h1>
                        <div className="py-2 rounded border border-solid border-gray-300 text-center item-center">
                            <img
                                alt="img"
                                className={modelData?.fileType === ModelFileType.IMAGE ? 'tar-image' : 'dockerfile-image'}
                                src={image}/>
                            <section className="container h-full">
                                <div {...getRootProps()}
                                     className={modelData?.files?.length > 0 ? "hidden" : "dropzone cursor-pointer"}>
                                    <input {...getInputProps()} />
                                    <p className="inline-block px-1 text-gray-500 hover:text-gray-700">
                                        Drag & drop a {label} here, or click to select
                                        a {label}</p>
                                </div>
                                <ul className={modelData?.files?.length > 0 ? "px-5 pb-5 pt-2" : "hidden"}>{acceptedFileItems}</ul>
                                <div className="pt-2 pr-3">
                                    <button onClick={removeFile}
                                            className="submit-btn float-right text-sm py-1 px-1.5 border border-gray border-solid rounded-md hover:border-black">remove
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};