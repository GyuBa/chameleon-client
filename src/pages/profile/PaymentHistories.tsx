import React, {useEffect, useState} from 'react';
import {MdPayment} from "react-icons/md";
import {Link} from "react-router-dom";
import {PointHistoryEntityData, PointHistoryType, SitePaths} from "../../types/chameleon-platform.common";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {HiChip} from "react-icons/hi";
import {TimeUtils} from "../../utils/TimeUtils";

export default function PaymentHistories() {
	const [pointHistoriesData, setPointHistoriesData] = useState<PointHistoryEntityData[] | null>(null);

	useEffect(() => {
		(async function () {
			try {
				const result = await PlatformAPI.getPointsHistories();
				setPointHistoriesData(result || []);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="contents">
			<div className="w-2/3 m-2 md:m-10 mt-24 md:px-10">
				<p className='head-text'>Payment Histories</p>
				<div className="my-4 border-gray-400 rounded-3xl border-1 p-6">
					<div className="flex justify-between mb-2">
						<p className="text-xs text-gray-600 mb-1 pb-2">Payment Histories</p>
						<Link to={SitePaths.ACCOUNT}>
							<button className="blue-btn text-sm p-2">back</button>
						</Link>
					</div>
					<div className="px-3 h-[560px] overflow-auto">
						{pointHistoriesData?.length ? (
							pointHistoriesData?.slice(0).reverse().map((history) => (
							<div className="flex items-center">
								{history.type === PointHistoryType.USE_PAID_MODEL ? (
									<HiChip className="mx-1 w-10 h-10"/>
								) : (
									<MdPayment className="mx-1 w-10 h-10"/>
								)}
								<div className="w-full pl-2">
									<div className="font-semibold text-left">{history.modelHistory?.name}</div>
									<div className="text-xs text-gray-600 text-left">{TimeUtils.formatTime(new Date(history.createdTime))}</div>
								</div>
								<div className="my-2">
									<div className={history.type === PointHistoryType.USE_PAID_MODEL
										? `font-semibold text-red-500 text-right`
										: `font-semibold text-green-500 text-right`}>{history.delta.toLocaleString('ko-KR')}</div>
									<div className="text-xs text-gray-600 text-right">{history.leftPoint.toLocaleString('ko-KR')}</div>
								</div>
							</div>
							))) : (
							<p className="text-center text-gray-700">No payment histories found.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};