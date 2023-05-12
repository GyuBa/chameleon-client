import React from "react";
import SingleImageViewer from "../module/Output/SingleImageViewer"
import SingleTextViewer from "../module/Output/SingleTextViewer"
import SingleVideoViewer from "../module/Output/SingleVideoViewer"

const modules = [SingleImageViewer, SingleTextViewer, SingleVideoViewer];

export default function OutputModule() {
	let target = 'SingleImageViewer';
	let Module = modules.find(m => m.name === target);

	return (
		<div className="row-span-3 col-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
			{Module ? <Module/> : <></>}</div>
	);
}