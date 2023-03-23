import React from "react";
import SingleImageViewer from "../module/Output/SingleImageViewer"
import SingleTextViewer from "../module/Output/SingleTextViewer"
import ZipGalleryViewer from "../module/Output/ZipGalleryViewer"
import SingleVideoViewer from "../module/Output/SingleVideoViewer"

const modules = [SingleImageViewer, SingleTextViewer, SingleVideoViewer, ZipGalleryViewer];

export default function OutputModule() {
    const Module = modules[0];

    return (
        <div className="row-span-3 col-span-2 md:p-2 rounded-lg border-1 border-gray-300">
            {Module && <Module/>}
        </div>
    );
}