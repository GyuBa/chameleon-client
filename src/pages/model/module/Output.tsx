import React from "react";
import SingleImageViewer from "../module/Output/SingleImageViewer"
import SingleTextViewer from "../module/Output/SingleTextViewer"
import ZipGalleryViewer from "../module/Output/ZipGalleryViewer"
import SingleBinaryViewer from "./Output/SingleBinaryViewer";

const modules = [SingleImageViewer, SingleTextViewer, ZipGalleryViewer, SingleBinaryViewer];

export default function OutputModule() {
    const Module = modules[0];

    return (
        <div>
            {Module && <Module />}
        </div>
    );
}