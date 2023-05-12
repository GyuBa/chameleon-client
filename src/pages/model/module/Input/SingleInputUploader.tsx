import React, {useEffect, useState} from "react";
import SubmitButton from "../../../../components/button/SubmitButton";
// import * as zip from "@zip.js/zip.js";
import {useDropzone} from "react-dropzone";
import {FileUtils} from "../../../../utils/FileUtils"
import {PlatformAPI} from "../../../../platform/PlatformAPI";

type IFile = File & { preview?: string };
export default function SingleInputUploader(modelData : any) {

    const [files, setFiles] = useState<IFile[]>([]);
    const [hideDrop, setHideDrop] = useState<boolean>(false);
    const [uploadExplain, setUploadExplain] = useState<string>('');

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
    const schema = modelData?.parameters?.schema;
    const uiSchema = modelData?.parameters?.uiSchema;
    const parameters = JSON.stringify({schema: schema, uiSchema: uiSchema});
    const modelId = modelData?.modelId

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const executeInfo = await PlatformAPI.executeModel({
                modelId,
                parameters,
                input: files[0]
                });
            console.log(executeInfo);
            console.log('Upload done!');

        } catch (error) {
            setFiles([]);
            setHideDrop(false);
            setUploadExplain('Execute error..')
            console.log('Upload error...');
        }
    }

    return (
        <div>
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
                            <span>{uploadExplain}</span>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}