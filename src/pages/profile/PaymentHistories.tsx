import React, {useEffect} from 'react';
import {MdPayment} from "react-icons/md";
import {Link} from "react-router-dom";
import {PointHistoryType, SitePaths} from "../../types/chameleon-platform.common";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {HiChip} from "react-icons/hi";
import {TimeUtils} from "../../utils/TimeUtils";
import {PaymentHistoriesType} from "../../types/chameleon-client.enum";
import useGlobalContext from "../../contexts/hook/useGlobalContext";

export default function PaymentHistories() {
	const {
		user,
		pointHistoriesData,
		setPointHistoriesData,
		earnedPointHistoriesData,
		setEarnedPointHistoriesData,
		activeTab,
		setActiveTab
	} = useGlobalContext();

	useEffect(() => {
		(async function () {
			try {
				if (activeTab === PaymentHistoriesType.USAGE) {
					const result = await PlatformAPI.getPointsHistories();
					setPointHistoriesData(result || []);
				} else if (activeTab === PaymentHistoriesType.REVENUE) {
					const result = await PlatformAPI.getEarnedPointsHistories();
					setEarnedPointHistoriesData(result || []);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [activeTab]);

	return (
		<div className="contents">
			<div className="w-2/3 m-2 md:m-10 md:px-10">
				<p className='head-text'>Payment Histories</p>
				<div className="my-4 border-gray-400 rounded-3xl border-1 p-6">
					<div className="flex justify-between">
						<p className="text-xs text-gray-600 mb-1 pb-2">Payment Histories</p>
						<Link to={SitePaths.ACCOUNT}>
							<button className="blue-btn text-sm p-2">back</button>
						</Link>
					</div>
					<div className="flex space-x-3 border-b mb-2 ml-4 pr-2">
						<button
							className={activeTab === PaymentHistoriesType.USAGE ? "default-tab-active" : "default-tab-inactive"}
							onClick={() => setActiveTab(PaymentHistoriesType.USAGE)}
						>Usage Histories
						</button>
						<button
							className={activeTab === PaymentHistoriesType.REVENUE ? "default-tab-active" : "default-tab-inactive"}
							onClick={() => setActiveTab(PaymentHistoriesType.REVENUE)}
						>Revenue Histories
						</button>
					</div>
					{activeTab === PaymentHistoriesType.USAGE && (
						<div className={pointHistoriesData && pointHistoriesData?.length > 10
							? `pl-3 pr-2 contents-area-payment flex flex-col` : `pl-3 pr-2 flex flex-col`}>
							<div className="overflow-auto contents-area-payment-scroll">
								{activeTab === PaymentHistoriesType.USAGE && ( pointHistoriesData?.length ? (
									pointHistoriesData?.slice(0).reverse().map((index) => (
										<div className="flex items-center">
											{index.type === PointHistoryType.USE_PAID_MODEL
												? <HiChip className="w-10 h-10"/> : <MdPayment className="w-10 h-10"/>}
											<div className="w-full pl-2">
												<div className="font-semibold text-left">
													{index.modelHistory?.model?.name == null ? (
														index.type === PointHistoryType.USE_PAID_MODEL ? 'Deleted Model' : 'Charge Points'
													) : index.modelHistory?.model?.name}
												</div>
												<div className="text-xs text-gray-600 text-left">{TimeUtils.formatTime(new Date(index.createdTime))}</div>
											</div>
											<div className="my-2 mr-2">
												<div className={index.type === PointHistoryType.USE_PAID_MODEL
													? `font-semibold text-red-500 text-right`
													: `font-semibold text-green-500 text-right`}>{index.delta.toLocaleString('ko-KR')}</div>
												<div className="text-xs text-gray-600 text-right">{index.leftPoint.toLocaleString('ko-KR')}</div>
											</div>
										</div>
									))) : (
									<p className="mt-2 text-center text-gray-700">No usage histories found.</p>
								))}
							</div>
						</div>
					)}
					{activeTab === PaymentHistoriesType.REVENUE && (
						<div className={earnedPointHistoriesData && earnedPointHistoriesData?.length > 10
							? `pl-3 pr-2 contents-area-payment flex flex-col` : `pl-3 pr-2 flex flex-col`}>
							<div className="overflow-auto contents-area-payment-scroll">
								{activeTab === PaymentHistoriesType.REVENUE && ( earnedPointHistoriesData?.length ? (
									earnedPointHistoriesData?.slice(0).reverse().map((index) => (
										<div className="flex items-center">
											<HiChip className="w-10 h-10"/>
											<div className="w-full pl-2">
												<div className="font-semibold text-left">
													{index.model?.name == null ? 'Deleted Model' : index.model?.name}
												</div>
												<div className="flex gap-2">
													<div className="text-xs text-gray-600 text-left border-r-1 border-gray-300 pr-2">{index.executor?.username}</div>
													<div className="text-xs text-gray-600 text-left">{TimeUtils.formatTime(new Date(index.createdTime))}</div>
												</div>
											</div>
											<div className="my-2 mr-2">
												<div className="font-semibold text-green-500 text-right">{index.delta.toLocaleString('ko-KR')}</div>
												<div className="text-xs text-gray-600 text-right">{index.leftEarnedPoint.toLocaleString('ko-KR')}</div>
											</div>
										</div>
									))) : (
									<p className="mt-2 text-center text-gray-700">No revenue histories found.</p>
								))}
							</div>
							{activeTab === PaymentHistoriesType.REVENUE && (
								<div className="flex border-t mx-2 mt-3 pt-3 justify-between items-center">
									<div className="font-semibold">Total Revenue:</div>
									<div className="font-semibold">￦{user?.earnedPoint.toLocaleString('ko-KR')}</div>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};