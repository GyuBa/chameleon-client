import React, {useEffect, useState} from "react";
import fetchProgress from 'fetch-progress';
import {BlobReader, BlobWriter, ZipReader} from '@zip.js/zip.js';
import {Gallery, Image} from "react-grid-gallery";
import Lightbox from "yet-another-react-lightbox";
/* import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"; */
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import {DownloadUtils} from "../../../../utils/DownloadUtils";
import {FileUtils} from "../../../../utils/FileUtils";
import {HistoryEntityData} from "../../../../types/chameleon-platform.common";

export interface CustomImage extends Image {
    original: string;
    fileName: string;
}


type FetchProgressData = fetchProgress.FetchProgressData &
    {
        percent: number;
        scaledPercent: number;
    };


function getImageInfo(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        let image = document.createElement('img');
        image.src = url;
        image.onload = function () {
            resolve(image);
        }
    })
}

export default function ZipGalleryOutputModule(executeData: HistoryEntityData) {
    let outputInformation = executeData?.outputInfo?.fileName
    const extension = outputInformation?.split('.').pop();
    let outputPath = executeData?.outputPath
    let outputSize = executeData?.outputInfo?.fileSize
    let outputName = executeData?.outputInfo?.fileName

    let [images, setImages] = useState<CustomImage[]>([]);
    let [downloadProgress, setDownloadProgress] = useState<FetchProgressData>({
        total: 0,
        transferred: 0,
        speed: 0,
        eta: 0,
        percent: 0,
        scaledPercent: 0,
    });
    let [decompressProgress, setDecompressProgress] = useState<FetchProgressData>({
        total: 0,
        transferred: 0,
        speed: 0,
        eta: 0,
        percent: 0,
        scaledPercent: 0,
    });

    const [index, setIndex] = useState(-1);
    const handleClick = (index: number, item: CustomImage) => setIndex(index);

    useEffect(() => {
        if (outputPath) {
            (async () => {
                setImages([]);
                let blob = await fetch('/' + outputPath).then(
                    fetchProgress({
                        onProgress(progress) {
                            let percent = progress.total ? progress.transferred / progress.total * 100 : 0;
                            let scaledPercent = Math.floor(percent * 10) / 10;
                            setDownloadProgress({...progress, percent, scaledPercent});
                        }
                    })
                ).then(r => r.blob());

                const zipFileReader = new BlobReader(blob);
                const zipReader = new ZipReader(zipFileReader);
                let entries = await zipReader.getEntries();
                let total = entries.map(e => e.compressedSize).reduce((a, c) => a + c, 0);
                let currentTransferred = 0;

                let images: CustomImage[] = [];
                for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i];
                    let blobURL = URL.createObjectURL(await entry.getData!(new BlobWriter(), {
                        onprogress: async (index, max) => {
                            let transferred = currentTransferred + index;
                            let percent = total ? transferred / total * 100 : 0;
                            let scaledPercent = Math.floor(percent * 10) / 10;
                            setDecompressProgress({...decompressProgress, total, transferred, percent, scaledPercent});
                        }
                    }));
                    let imageInfo = await getImageInfo(blobURL);
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
                    currentTransferred += entry.compressedSize;
                }
                setImages(images);
                await zipReader.close();
            })();
        }
    }, [outputPath, outputSize]);

    return (
        <div>
            <div className="md:px-5 md:py-2 space-x-3 flex justify-between items-center border-b">
                <p className="text-xl font-semibold">Output</p>
                <div className="flex items-center rounded-lg hover:bg-light-gray focus:bg-gray">
                    <button className="submit-btn text-sm"
                            onClick={() => DownloadUtils.download('/' + outputPath, 'test')}>Download
                    </button>
                </div>
            </div>
            <div className="overflow-y-auto max-h-[350px]">
                <br/>
                <p className="pl-5">Output Format : {extension} </p>
                <p className="pl-5">Size : {FileUtils.formatBytes(outputSize)} </p>
                {outputPath ? <div>
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
                    />
                </div> : <></>}
            </div>
        </div>
    );
}