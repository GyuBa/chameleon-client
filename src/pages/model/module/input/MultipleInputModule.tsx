import React, {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {FileUtils} from "../../../../utils/FileUtils"
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {ModelInputType} from "../../../../types/chameleon-platform.common";
import {ModuleData} from "../../../../types/chameleon-client";
import {PageType} from "../../../../types/chameleon-client.enum";
import JSZip from 'jszip';

type IFile = File & { preview?: string };

export default function MultiInputModule(moduleData : ModuleData) {
    const [files, setFiles] = useState<IFile[]>([]);
    const [hideDrop, setHideDrop] = useState<boolean>(false);
    const [uploadExplain, setUploadExplain] = useState<string>('');

    let accept: any = {};
    let modelId = moduleData?.model?.id!
    let parameters = moduleData?.parameters

    if (moduleData?.model?.inputType === ModelInputType.ZIP) {
        accept = {[`image/*`]: []};
    }

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept,
        onDrop: async acceptedFiles => {
            setFiles(acceptedFiles);
        }
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {FileUtils.formatBytes(file.size)}{" "}
        </li>
    ));

    const thumbs = files.map(file => (
        <div key={file.name}>
        </div>
    ));

    const removeFile = () => {
        setFiles([]);
        setHideDrop(false);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const zip = new JSZip();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const data = await file.arrayBuffer();
            zip.file(file.name, data);
        }

        const zipFile = new File(
            [await zip.generateAsync({ type: 'blob' })],
            'files.zip',
            { type: 'application/zip' }
        );

        try {
            const executeInfo = await PlatformAPI.executeModel({
                modelId,
                parameters,
                input: zipFile
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

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview as string));
    });

    return (
        <div>
            <div className="md:p-2 space-x-3 flex justify-between items-center rounded-t-lg border-b border-gray-300"
                 style={{backgroundColor: '#F6F6F6'}}>
                <p className="text-xl font-semibold">Input Upload</p>
                {
                    moduleData?.type === PageType.EXECUTE ? (
                        <div className="flex items-center gap-4">
                            <button onClick={removeFile}
                                    className="submit-btn text-sm py-1 px-1.5 border border-gray border-solid
                                              rounded-md hover:bg-white bg-white"
                                    disabled={moduleData.history !== undefined}>remove
                            </button>
                            <button onClick={handleSubmit}
                                    className="submit-btn text-sm py-1 px-1.5 border border-gray border-solid
                                              rounded-md hover:bg-white bg-white"
                                    disabled={moduleData.history !== undefined}>start
                            </button>
                        </div>
                    ) : ('')
                }
            </div>
            <div className="h-full">
                <section>
                    {moduleData.history && moduleData?.history.status !== undefined ? (
                        <div className="overflow-auto max-h-[243px]">
                            <br/>
                            <p><span
                                className="pl-5 pt-2 font-semibold">FileName : </span>{moduleData?.history?.inputInfo?.fileName}
                            </p>
                            <p><span className="pl-5 pt-2 font-semibold">Type : </span>{moduleData?.history?.inputInfo?.mimeType}
                            </p>
                            <p><span
                                className="pl-5 pt-2 font-semibold">Size : </span>{FileUtils.formatBytes(moduleData?.history?.inputInfo?.fileSize)}
                            </p>
                            <div className="px-2 pt-2"
                                 style={{overflow: 'hidden', display: 'flex', justifyContent: 'center'}}>

                            </div>
                        </div>
                    ) : (
                        <div>
                            <div {...getRootProps()}
                                 className={hideDrop ? "hidden" : "dropzone cursor-pointer justify-center"}
                                 style={{height: '243px'}}>
                                <input {...getInputProps()}/>
                                {files &&
                                Array.isArray(files) &&
                                files.length ? (
                                    <div className="selected-file">
                                        {files.length > 3
                                            ? `${files.length} files`
                                            : files.map((file) => file.name).join(", ")}
                                    </div>
                                ) : (<p className="text-gray-500 hover:text-gray-700 flex justify-center items-center flex-col text-center">
                                        Drag & drop some files here, or click to select files<br/>
                                        <span>Support format: {ModelInputType.IMAGE}</span>
                                    </p>
                                )}
                            </div>
                            {hideDrop && (
                                <div className="overflow-auto max-h-[243px]">
                                    <aside className="px-5 py-2">{thumbs}</aside>
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