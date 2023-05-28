import React, {useEffect, useState} from "react";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";
import {PlatformAPI} from "../../../../platform/PlatformAPI";
import {CustomImage} from "../../../../types/chameleon-client";
import {AxiosProgressEvent} from "axios";
import {BlobReader, BlobWriter, ZipReader} from "@zip.js/zip.js";
import {FileUtils} from "../../../../utils/FileUtils";
import {ImageUtils} from "../../../../utils/ImageUtils";
import {Progress} from "flowbite-react";
import {Gallery, Image} from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import {Download} from "../../../../hack/lightbox/download/Download";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import {DownloadUtils} from "../../../../utils/DownloadUtils";

export default function ZipGalleryOutputModule(executeData: HistoryEntityData) {
    const isCalledRef = React.useRef(false);
    let [images, setImages] = useState<CustomImage[]>([]);
    let [downloadProgress, setDownloadProgress] = useState<AxiosProgressEvent>({
        bytes: 0,
        total: 0,
        loaded: 0,
        progress: 0
    });
    let [decompressProgress, setDecompressProgress] = useState<AxiosProgressEvent>({
        bytes: 0,
        total: 0,
        loaded: 0,
        progress: 0
    });

    const outputPath = executeData?.outputPath;
    const fileSize = executeData?.outputInfo?.fileSize;
    const [index, setIndex] = useState<number>(-1);
    const handleClick = (index: number, item: CustomImage) => setIndex(index);

    useEffect(() => {
        if (outputPath && fileSize !== 0 && !isCalledRef.current) {
            isCalledRef.current = true;
            (async () => {
                // setImages([]);
                let blob = (await PlatformAPI.instance.get('/' + outputPath, {
                    onDownloadProgress: progress => {
                        if (progress.progress! >= downloadProgress.progress!) {
                            setDownloadProgress(progress);
                        }
                    },
                    timeout: 0,
                    responseType: 'blob'
                })).data;

                const zipFileReader = new BlobReader(blob);
                const zipReader = new ZipReader(zipFileReader);
                let entries = await zipReader.getEntries();
                let total = entries.map(e => e.compressedSize).reduce((a, c) => a + c, 0);
                let currentLoaded = 0;

                let images: CustomImage[] = [];
                for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i];
                    let entryData = await entry.getData?.(new BlobWriter(), {
                        onprogress: async (index, max) => {
                            let loaded = currentLoaded + index;
                            let progress = total ? loaded / total : 0;
                            setDecompressProgress({...decompressProgress, total, loaded, progress});
                            if (progress >= 1) {
                                isCalledRef.current = false;
                            }
                        }
                    });
                    let blobURL = URL.createObjectURL(entryData as Blob);
                    let imageInfo = await ImageUtils.getImageInfo(blobURL);
                    let image: CustomImage = {
                        src: blobURL,
                        original: blobURL,
                        fileName: entry.filename,
                        width: imageInfo.width,
                        height: imageInfo.height,
                        caption: `${entry.filename} (${FileUtils.formatBytes(entry.uncompressedSize)})`,
                        tags: [{value: entry.filename, title: entry.filename}]
                    };
                    images.push(image);
                    currentLoaded += entry.compressedSize;
                }
                setImages(images);
                await zipReader.close();
            })();
        }
    }, [outputPath, fileSize]);

    return <div>
        <div
            className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b border-gray-300 bg-main-gray">
            <p className="text-xl font-semibold">Output</p>
            <div className="flex items-center rounded-lg hover:drop-shadow-xl focus:bg-white bg-white">
                <button
                    className="submit-btn text-sm"
                    onClick={async () => {
                        DownloadUtils.download('/' + outputPath, executeData?.outputInfo?.fileName);
                    }}
                >
                    Download
                </button>
            </div>
        </div>
        <div className="overflow-y-auto max-h-[352px] p-4">
            <p><span className="pl-1 font-semibold">Size : </span>{FileUtils.formatBytes(fileSize)} </p>
            {decompressProgress.progress !== 1 ? <div className='progress-bar-wrapper p-4'>
                {outputPath && fileSize !== 0 && downloadProgress.progress !== 1 ?
                    <Progress progress={downloadProgress.progress! * 100}
                              progressLabelPosition='inside'
                              size='xl'
                              labelText
                              textLabel={`Download - ${Math.floor(downloadProgress.progress! * 100 * 10) / 10}% (${FileUtils.formatBytes(downloadProgress.loaded, 1)}/${FileUtils.formatBytes(downloadProgress.loaded, 1)})`}/>
                    : <></>}
                {outputPath && fileSize !== 0 && downloadProgress.progress === 1 && decompressProgress.progress !== 1 ?
                    <Progress color="yellow" progress={decompressProgress.progress! * 100}
                              progressLabelPosition='inside'
                              size='xl'
                              labelText
                              textLabel={`Decompress - ${Math.floor(decompressProgress.progress! * 100 * 10) / 10}% (${FileUtils.formatBytes(decompressProgress.loaded, 1)}/${FileUtils.formatBytes(decompressProgress.loaded, 1)})`}/>
                    : <></>}
            </div> : <></>}
            <div>
                <Gallery id='gallery'
                         images={images}
                         onClick={handleClick}
                         enableImageSelection={false}
                />
                <Lightbox
                    slides={images.map(({original, width, height, caption}) => ({
                        src: original,
                        title: caption,
                        width,
                        height
                    }))}
                    open={index >= 0}
                    index={index}
                    close={() => {
                        setIndex(-1);
                        setTimeout(_ => document.getElementById("gallery")?.scrollIntoView(), 0);
                    }}
                    downloadInfo={images.map(({fileName, original}) => ({fileName, url: original}))}
                    plugins={[Captions, Zoom, Download, Thumbnails, Fullscreen]}
                />
            </div>
        </div>
    </div>;
}