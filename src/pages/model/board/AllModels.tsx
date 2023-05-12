import React from 'react';
import {PlatformAPI} from "../../../platform/PlatformAPI";
import Models from "./Models";

export default function AllModels() {
	const getModels = async () => {
		try {
			return await PlatformAPI.getModels();
		} catch (error) {
			console.error(error);
			return [];
		}
	};

	return (
		<Models getModels={getModels}/>
	);
};