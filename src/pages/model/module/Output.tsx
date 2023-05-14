import SingleImageViewer from "../module/Output/SingleImageViewer"
import SingleTextViewer from "../module/Output/SingleTextViewer"
import SingleVideoViewer from "../module/Output/SingleVideoViewer"
import {useEffect, useState} from "react";
import {PlatformAPI} from "../../../platform/PlatformAPI";
import {HistoryEntityData} from "../../../types/chameleon-platform.common";

export default function OutputModule() {

	const [historyStatus, setHistoryStatus] = useState<HistoryEntityData>();

	return (
		<div className="row-span-3 col-span-2 md:p-2 rounded-lg border-1 border-gray-300 overflow-auto">
		</div>
	);
}