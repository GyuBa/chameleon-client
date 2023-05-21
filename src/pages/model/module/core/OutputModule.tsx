import React from "react";
import {HistoryEntityData, HistoryStatus, ModelOutputType} from "../../../../types/chameleon-platform.common";
import ImageOutputModule from "../output/ImageOutputModule"
import TextOutputModule from "../output/TextOutputModule";
import VideoOutputModule from "../output/VideoOutputModule";
import SoundOutputModule from "./Output/SoundOutputModule";
import EmptyOutputModule from "../output/EmptyOutputModule";
import ZipGalleryOutputModule from "./Output/ZipGalleryOutputModule";

export default function OutputModule(executeData: HistoryEntityData) {
    let outputType = executeData?.outputType;
    let status = executeData?.status
    let Module;

    if (status === HistoryStatus.FINISHED && (outputType === ModelOutputType.IMAGE || outputType === ModelOutputType.BINARY)) {
        Module = (executeData) ? () => ImageOutputModule(executeData) : EmptyOutputModule;
    } else if (status === HistoryStatus.FINISHED && outputType === ModelOutputType.TEXT) {
        Module = (executeData) ? () => TextOutputModule(executeData) : EmptyOutputModule;
    } else if (status === HistoryStatus.FINISHED && outputType === ModelOutputType.VIDEO) {
        Module = (executeData) ? () => VideoOutputModule(executeData) : EmptyOutputModule;
    } else if (status === HistoryStatus.FINISHED && outputType === ModelOutputType.SOUND) {
        Module = (executeData) ? () => SoundOutputModule(executeData) : NullViewer;
    } else if (status === HistoryStatus.FINISHED && outputType === ModelOutputType.ZIP) {
        Module = (executeData) ? () => ZipGalleryOutputModule(executeData) : NullViewer;
    }else
        Module = EmptyOutputModule

    return (
        <div className="row-span-3 col-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
            {Module ? <Module/> : <></>}
        </div>
    );
}