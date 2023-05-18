import React, {useEffect, useState} from "react";

import {useDropzone} from "react-dropzone";
import {FileUtils} from "../../../../utils/FileUtils"
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";
import {DownloadUtils} from "../../../../utils/DownloadUtils"
import {InputModelInfo} from "../../../../types/chameleon-client";
import {PageType} from "../../../../types/chameleon-client.enum";
// import * as zip from "@zip.js/zip.js";

type IFile = File & { preview?: string };

export default function SingleInputUploader(type: PageType, parameter: Object, modelData: InputModelInfo, executeData: HistoryEntityData) {
    const [files, setFiles] = useState<IFile[]>([]);
    const [hideDrop, setHideDrop] = useState<boolean>(false);
    const [uploadExplain, setUploadExplain] = useState<string>('');
    const extension = modelData?.inputType

    let accept: any = {};
    if (extension) {
        accept = {[`${extension}/*`]: []};
    } else {
        accept = {'image/*': []};
    }
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept,
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
            {file.name} - {FileUtils.formatBytes(file.size)}{" "}
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

    let parameters = JSON.stringify({parameter: parameter});
    const modelId = modelData?.id

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
            const executeInfo = await PlatformAPI.executeModel({
                modelId,
                parameters,
                input: files[0]
            });
            console.log(executeInfo);
            setUploadExplain('Upload Done');
            console.log('Upload done!');

        } catch (error) {
            setFiles([]);
            setHideDrop(false);
            setUploadExplain('Upload error..');
            console.log('Upload error...');
        }
    }

    return (
        <div>
            <div className="md:p-2 space-x-3 flex justify-between items-center border-b border-gray-300"
                 style={{backgroundColor: '#F6F6F6'}}>
                <p className="text-xl font-semibold">Input Upload</p>
                {
                    type == PageType.EXECUTE ? (
                        <div className="flex items-center gap-4">
                            <button onClick={removeFile}
                                    className="submit-btn text-sm py-1 px-1.5 border border-gray border-solid
                                              rounded-md hover:bg-white bg-white"
                                    disabled={executeData !== undefined}>remove
                            </button>
                            <button onClick={handleSubmit}
                                    className="submit-btn text-sm py-1 px-1.5 border border-gray border-solid
                                              rounded-md hover:bg-white bg-white"
                                    disabled={executeData !== undefined}>start
                            </button>
                        </div>
                    ) : ('')
                }

            </div>
            <div className="overflow-auto max-h-[213px] h-full">
                <section className="container h-full">
                    {executeData?.status !== undefined ? (
                        <div>
                            <br/>
                            <p><span
                                className="px-2 pt-2 font-semibold">FileName :</span>{executeData?.inputInfo?.fileName}
                            </p>
                            <p><span className="px-2 pt-2 font-semibold">Type :</span>{executeData?.inputInfo?.mimeType}
                            </p>
                            <p><span
                                className="px-2 pt-2 font-semibold">Size :</span>{FileUtils.formatBytes(executeData?.inputInfo?.fileSize)}
                            </p>
                            <div className="px-2 pt-2"
                                 style={{overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>
                                {executeData?.inputInfo?.mimeType?.startsWith('image') ? <a href='#' onClick={e => {
                                    DownloadUtils.download('/' + executeData?.inputPath, executeData?.inputInfo?.fileName);
                                }}>
                                    {executeData?.inputInfo?.mimeType?.startsWith('image') ?
                                        <img src={'/' + executeData?.inputPath} style={{
                                            objectFit: 'contain',
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                        }}/> : <></>}
                                </a> : <></>}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div {...getRootProps()}
                                 className={hideDrop ? "hidden" : "dropzone cursor-pointer justify-center"}
                                 style={{height: '200px'}}>
                                <input {...getInputProps()}/>
                                <p className="inline-block px-1 text-gray-500 hover:text-gray-700">
                                    Drag & drop some files here, or click to select files</p>
                                <p className="inline-block px-1 text-gray-500 hover:text-gray-700">
                                    Support format : {extension}</p>
                            </div>
                            {hideDrop && (
                                <div>
                                    <aside className="px-5 py-2 w-48">{thumbs}</aside>
                                    <ul className="px-5 py-2">{acceptedFileItems}</ul>
                                    <span>{uploadExplain}</span>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}