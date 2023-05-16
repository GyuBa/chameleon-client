import {HistoryEntityData, HistoryStatus, ModelOutputType} from "../../../types/chameleon-platform.common";
import SingleImageViewer from "./Output/SingleImageViewer"
import SingleTextViewer from "./Output/SingleTextViewer";
import SingleVideoViewer from "./Output/SingleVideoViewer";
import React from "react";
import NullViewer from "./Output/NullViewer";

export default function OutputModule(executeData : HistoryEntityData) {
	let outputType = executeData?.outputType;
	let status = executeData?.status

	let Module;

	if (status === HistoryStatus.FINISHED && (outputType === ModelOutputType.IMAGE || outputType === ModelOutputType.BINARY)) {
		Module = (executeData) ? () => SingleImageViewer(executeData) : NullViewer;
	} else if (status === HistoryStatus.FINISHED && outputType === ModelOutputType.TEXT) {
		Module = (executeData) ? () => SingleTextViewer(executeData) : NullViewer;
	} else if (status === HistoryStatus.FINISHED && outputType === ModelOutputType.VIDEO) {
		Module = (executeData) ? () => SingleVideoViewer(executeData) : NullViewer;
	} else
		Module = NullViewer

	return (
		<div className="row-span-3 col-span-2 rounded-lg border-1 border-gray-300 overflow-auto">
			{Module ? <Module/> : <></>}
		</div>
	);
}