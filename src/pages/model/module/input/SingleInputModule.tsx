import React, {useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {FileUtils} from "../../../../utils/FileUtils"
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {ModelInputType} from "../../../../types/chameleon-platform.common";
import {DownloadUtils} from "../../../../utils/DownloadUtils"
import {ModuleData} from "../../../../types/chameleon-client";
import videojs from "video.js";

type IFile = File & { preview?: string };

export default function SingleInputModule(moduleData: ModuleData) {
    const [files, setFiles] = useState<IFile[]>([]);
    const [hideDrop, setHideDrop] = useState<boolean>(false);
    const [uploadExplain, setUploadExplain] = useState<string>('');
    const [thumbsText, setThumbsText] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);

    let accept: any = {};
    let extension = moduleData?.model?.inputType
    let modelId = moduleData?.model?.id!
    let parameters = moduleData?.parameters
    let inputPath = moduleData?.history?.inputPath

    if (moduleData?.model?.inputType === ModelInputType.SOUND) {
        accept = {[`audio/*`]: []};
    } else {
        accept = {[`${extension}/*`]: []};
    }

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept,
        onDrop: async acceptedFiles => {
            setHideDrop(true);
            acceptedFiles = acceptedFiles.slice(0, 1);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            moduleData?.model?.inputType === ModelInputType.TEXT && readTextFile(acceptedFiles[0]);

            try {
                const executeInfo = await PlatformAPI.executeModel({
                    modelId,
                    parameters,
                    input: acceptedFiles[0]
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
    });

    const acceptedFileItems = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {FileUtils.formatBytes(file.size)}{" "}
        </li>
    ));

    const readTextFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileText = e.target?.result as string;
            setThumbsText(fileText); // 텍스트 상태로 저장
        };
        reader.readAsText(file);
    };

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                {moduleData?.model?.inputType === ModelInputType.IMAGE &&
                    (<img className="block w-auto h-full"
                          src={file.preview}
                          alt="file"
                          onLoad={() => {
                              URL.revokeObjectURL(file.preview as string)
                          }}
                    />)
                }
                {moduleData?.model?.inputType === ModelInputType.VIDEO &&
                    (<video
                        src={file.preview}
                        className="video-js vjs-theme-city"
                        controls
                        autoPlay={false}
                        ref={videoRef}
                        style={{objectFit: 'contain', maxWidth: '90%', maxHeight: '100%'}}
                    />)
                }
                {moduleData?.model?.inputType === ModelInputType.TEXT &&
                    (<p style={{whiteSpace: 'pre-wrap'}}>{thumbsText}</p>)
                }
                {moduleData?.model?.inputType === ModelInputType.SOUND &&
                    (<AudioPlayer
                        src={file.preview}
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    />)
                }
            </div>
        </div>
    ));

    useEffect(() => {
        if (inputPath) {
            (async () => {
                let text = await fetch('/' + inputPath).then(r => r.text());
                setInputText(text);
            })();
        }
    }, [inputPath]);

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview as string));
    });

    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current, {}, () => {
            });
            player.play();
        }
    })

    return (
        <div>
            <div className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300"
                 style={{backgroundColor: '#F6F6F6'}}>
                <p className="text-xl font-semibold">Input Upload</p>
            </div>
            <div className="h-full">
                <section>
                    {(moduleData.history && moduleData?.history.status !== undefined) ? (
                        <div className="overflow-auto max-h-[243px]">
                            <br/>
                            <p><span
                                className="pl-5 pt-2 font-semibold">FileName : </span>{moduleData?.history?.inputInfo?.fileName}
                            </p>
                            <p><span
                                className="pl-5 pt-2 font-semibold">Type : </span>{moduleData?.history?.inputType == ModelInputType.BINARY ?
                                ModelInputType.BINARY : moduleData?.history?.inputInfo.mimeType}
                            </p>
                            <p><span
                                className="pl-5 pt-2 font-semibold">Size : </span>{FileUtils.formatBytes(moduleData?.history?.inputInfo?.fileSize)}
                            </p>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                {moduleData?.history?.inputType.startsWith('video') &&
                                <div>
                                    <br/>
                                    <video
                                        src={'/' + inputPath}
                                        className="video-js vjs-theme-city"
                                        controls
                                        autoPlay={false}
                                        ref={videoRef}
                                        width={500}
                                        height={300}
                                        style={{objectFit: 'contain'}}
                                    />
                                </div>}
                                {moduleData?.history?.inputType.startsWith('image') &&
                                    <a href='#' onClick={e => {
                                        DownloadUtils.download('/' + moduleData?.history?.inputPath, moduleData?.history?.inputInfo?.fileName);
                                    }}>
                                        {moduleData?.history?.inputInfo?.mimeType?.startsWith('image') ?
                                            <img src={'/' + moduleData?.history?.inputPath} style={{
                                                alignItems: 'center',
                                                objectFit: 'contain',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                justifyContent: 'center'
                                            }} alt="single-input"/> : <></>}
                                    </a>}
                            </div>
                            <div className="pl-5 pt-2">
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    {moduleData?.history?.inputType.startsWith('text') &&
                                        <div style={{justifyContent: ''}}>
                                            <br/>
                                            <p style={{whiteSpace: 'pre-wrap'}}>{inputText}</p>
                                        </div>}
                                </div>
                            </div>
                            {moduleData?.history?.inputInfo?.mimeType?.startsWith('audio') &&
                                <div>
                                    <br/>
                                    <AudioPlayer src={'/' + inputPath} onPlay={e => console.log("onPlay")}/>
                                </div>}
                        </div>
                    ) : (
                        <div>
                            <div {...getRootProps()}
                                 className={hideDrop ? "hidden" : "dropzone cursor-pointer justify-center"}
                                 style={{height: '243px'}}>
                                <input {...getInputProps()}/>
                                <p className="inline-block px-1 text-gray-500 hover:text-gray-700">
                                    Drag & drop some files here, or click to select files</p>
                                <p className="inline-block px-1 text-gray-500 hover:text-gray-700">
                                    Support format : {extension}</p>
                            </div>
                            {hideDrop && (
                                <div className="overflow-auto max-h-[243px]">
                                    <aside className="px-5 py-2">{thumbs}</aside>
                                    <ul className="px-5 py-2">{acceptedFileItems}</ul>
                                    <span className="px-5">{uploadExplain}</span>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}