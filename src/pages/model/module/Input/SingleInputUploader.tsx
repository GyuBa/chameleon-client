import React, {useEffect, useRef, useState} from "react";
import {useDropzone} from "react-dropzone";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {FileUtils} from "../../../../utils/FileUtils"
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {HistoryEntityData, ModelInputType} from "../../../../types/chameleon-platform.common";
import {DownloadUtils} from "../../../../utils/DownloadUtils"
import {InputModelInfo} from "../../../../types/chameleon-client";
import {PageType} from "../../../../types/chameleon-client.enum";
import videojs from "video.js";
// import * as zip from "@zip.js/zip.js";

const binaryIconURL = '/images/binary-code'
type IFile = File & { preview?: string };

export default function SingleInputUploader(type: PageType, parameter: Object, modelData: InputModelInfo, executeData: HistoryEntityData) {
    const [files, setFiles] = useState<IFile[]>([]);
    const [hideDrop, setHideDrop] = useState<boolean>(false);
    const [uploadExplain, setUploadExplain] = useState<string>('');
    const [thumbsText, setThumbsText] = useState<string>('');
    const [inputText, setInputText] = useState<string>('');
    const videoRef = useRef<HTMLVideoElement>(null);

    let extension = modelData?.inputType
    let accept: any = {};
    let parameters = JSON.stringify({parameter: parameter});
    let modelId = modelData?.id
    let inputPath = executeData?.inputPath

    if (modelData?.inputType === ModelInputType.SOUND) {
        accept = {[`audio/*`]: []};
    } else if (modelData?.inputType === ModelInputType.BINARY) {
        accept = {['']: []};
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
            modelData?.inputType === ModelInputType.TEXT && readTextFile(acceptedFiles[0]);

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
                {modelData?.inputType === ModelInputType.IMAGE &&
                    (<img className="block w-auto h-full"
                          src={file.preview}
                          alt="file"
                          onLoad={() => {
                              URL.revokeObjectURL(file.preview as string)
                          }}
                    />)
                }
                {modelData?.inputType === ModelInputType.VIDEO &&
                    (<video className="block w-auto h-full"
                            src={file.preview}
                            onLoad={() => {
                                URL.revokeObjectURL(file.preview as string)
                            }}
                    />)
                }
                {modelData?.inputType === ModelInputType.TEXT &&
                    (<p style={{whiteSpace: 'pre-wrap'}}>{thumbsText}</p>)
                }
                {modelData?.inputType === ModelInputType.SOUND &&
                    (<AudioPlayer
                        src={file.preview}
                        onPlay={e => console.log("onPlay")}
                        // other props here
                    />)
                }
                {modelData?.inputType === ModelInputType.BINARY &&
                    (<img style={{width: '70%'}}
                          className="object-cover w-full"
                          src={binaryIconURL}
                          alt="chameleon"/>)
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
            <div className="overflow-auto max-h-[213px] h-full">
                <section className="container h-full">
                    {executeData?.status !== undefined ? (
                        <div>
                            <br/>
                            <p><span
                                className="pl-5 pt-2 font-semibold">FileName : </span>{executeData?.inputInfo?.fileName}
                            </p>
                            <p><span className="pl-5 pt-2 font-semibold">Type : </span>{executeData?.inputInfo?.mimeType}
                            </p>
                            <p><span
                                className="pl-5 pt-2 font-semibold">Size : </span>{FileUtils.formatBytes(executeData?.inputInfo?.fileSize)}
                            </p>
                            <div className="pl-5 pt-2"
                                 style={{overflow: 'hidden', display: 'flex'}}>
                                <div>
                                    {executeData?.inputInfo?.mimeType?.startsWith('image') &&
                                        <a href='#' onClick={e => {
                                            DownloadUtils.download('/' + executeData?.inputPath, executeData?.inputInfo?.fileName);
                                        }}>
                                            {executeData?.inputInfo?.mimeType?.startsWith('image') ?
                                                <img src={'/' + executeData?.inputPath} style={{
                                                    objectFit: 'contain',
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                }} alt="single-input"/> : <></>}
                                        </a>}
                                    {executeData?.inputInfo?.mimeType?.startsWith('text') &&
                                        <div>
                                            <br/>
                                            <p style={{whiteSpace: 'pre-wrap'}}>{inputText}</p>
                                        </div>}
                                    {executeData?.inputInfo?.mimeType?.startsWith('video') &&
                                        <div>
                                            <video
                                                src={'/' + inputPath}
                                                className="video-js vjs-theme-city"
                                                controls
                                                ref={videoRef}
                                                style={{ maxWidth: '100%', maxHeight : '70%'}}
                                            />
                                        </div>}
                                </div>
                            </div>
                            {executeData?.inputInfo?.mimeType?.startsWith('audio') &&
                                <div>
                                    <br/>
                                    <AudioPlayer src={'/' + inputPath} onPlay={e => console.log("onPlay")}/>
                                </div>}
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