import SingleImageViewer from "../module/Output/SingleImageViewer"
import SingleTextViewer from "../module/Output/SingleTextViewer"
import SingleVideoViewer from "../module/Output/SingleVideoViewer"
import {useEffect, useState} from "react";
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {HistoryEntityData} from "../../../types/chameleon-platform.common";

export default function OutputModule() {

	const [historyStatus, setHistoryStatus] = useState<HistoryEntityData>();

	useEffect(() => {
		let completed = false;

		(async function () {
			try {
				const model = await PlatformAPI.getHistories();
				if (!completed) {
					setHistoryStatus(model[0]);
				}
			} catch (error) {
				console.error(error);
			}
		})();

		return () => {
			completed = true;
		};
	});

	let status = historyStatus?.status
	let outputInformation = historyStatus?.outputInfo?.fileName
	const extension = outputInformation?.split('.').pop();
	let Module;

	if(status === "finished") {
		if(extension === "png" || extension === "image" || extension === "jpg") {
			Module = historyStatus ? () => SingleImageViewer(historyStatus) : null;
		}
		else if(extension === "txt") {
			Module = historyStatus ? () => SingleTextViewer(historyStatus) : null;
		}
		else {
			Module = historyStatus ? () => SingleVideoViewer(historyStatus) : null;
		}
	}

	return (
		<div className="row-span-3 col-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
			{Module ? <Module/> : <></>}</div>
	);
}