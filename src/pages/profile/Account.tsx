import React, {useEffect} from 'react';
import {BsPersonCircle} from "react-icons/bs";
import {HiChip, HiOutlineLockClosed, HiOutlineMail} from "react-icons/hi";
import {Link} from "react-router-dom";
import {GrMoney} from "react-icons/gr";
import {PointHistoryType, SitePaths} from "../../types/chameleon-platform.common";
import useGlobalContext from "../../contexts/hook/useGlobalContext";
import {MdPayment} from "react-icons/md";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {TimeUtils} from "../../utils/TimeUtils";
import {PaymentHistoriesType} from "../../types/chameleon-client.enum";

export default function Account() {
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
            <div className="w-2/3 md:m-10 md:px-10 overflow-auto">
                <p className='head-text'>Account</p>
                <div className="my-4 border-gray-400 rounded-3xl border-1 p-5">
                    <p className="text-xs text-gray-600 mb-1 pb-2">User Info</p>
                    <div className="flex items-center border-b-1 border-gray-300 mx-4 pb-4 mb-4 gap-5">
                        <BsPersonCircle className="w-10 h-10"/>
                        <p className="text-2xl font-extrabold">{user.username}</p>
                    </div>
                    <div className="mx-4 text-16">
                        <div className="flex m-2 gap-4">
                            <div className="flex gap-2 items-center">
                                <HiOutlineMail/>
                                <p className="font-semibold w-16">Email</p>
                            </div>
                            <p className="text-gray-600 font-semibold">{user.email}</p>
                        </div>
                        <div className="flex m-2 gap-4">
                            <div className="flex gap-2 items-center">
                                <GrMoney/>
                                <p className="font-semibold w-16">Point</p>
                            </div>
                            <p className="text-gray-600 font-semibold">₩{user.point.toLocaleString('ko-KR')}</p>
                        </div>
                    </div>
                </div>
                <div className="my-4 border-gray-400 rounded-3xl border-1 px-5 pt-5 pb-2">
                    <div className="flex justify-between">
                        <p className="text-xs text-gray-600 mb-1 pb-2">Payment Histories</p>
                        <Link to={SitePaths.PAYMENT_HISTORIES}>
                            <button className="blue-btn text-sm p-2">more</button>
                        </Link>
                    </div>
                    <div className="flex space-x-3 border-b mb-2 mx-4">
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
                        pointHistoriesData?.length ? (
                            pointHistoriesData?.slice(-4).reverse().map((index) => (
                                <div className="flex items-center">
                                    {index.type === PointHistoryType.USE_PAID_MODEL
                                        ? <HiChip className="mx-4 w-10 h-10"/> : <MdPayment className="mx-4 w-10 h-10"/>}
                                    <div className="w-full pl-2">
                                        <div className="font-semibold text-left">
                                            {index.modelHistory?.model?.name == null ? (
                                                index.type === PointHistoryType.USE_PAID_MODEL ? 'Deleted Model' : 'Charge Points'
                                            ) : index.modelHistory?.model?.name}
                                        </div>
                                        <div className="text-xs text-gray-600 text-left">{TimeUtils.formatTime(new Date(index.createdTime))}</div>
                                    </div>
                                    <div className="my-2 mr-4">
                                        <div className={index.type === PointHistoryType.USE_PAID_MODEL
                                            ? `font-semibold text-red-500 text-right`
                                            : `font-semibold text-green-500 text-right`}>{index.delta.toLocaleString('ko-KR')}</div>
                                        <div className="text-xs text-gray-600 text-right">{index.leftPoint.toLocaleString('ko-KR')}</div>
                                    </div>
                                </div>
                            ))) : (
                            <p className="mt-2 text-center text-gray-700">No usage histories found.</p>
                        )
                    )}
                    {activeTab === PaymentHistoriesType.REVENUE && (
                        earnedPointHistoriesData?.length ? (
                            earnedPointHistoriesData?.slice(-3).reverse().map((index) => (
                                <div className="flex items-center">
                                    <HiChip className="mx-4 w-10 h-10"/>
                                    <div className="w-full pl-2">
                                        <div className="font-semibold text-left">
                                            {index.model?.name == null ? 'Deleted Model' : index.model?.name}
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="text-xs text-gray-600 text-left border-r-1 border-gray-300 pr-2">{index.executor?.username}</div>
                                            <div className="text-xs text-gray-600 text-left">{TimeUtils.formatTime(new Date(index.createdTime))}</div>
                                        </div>
                                    </div>
                                    <div className="my-2 mr-4">
                                        <div className="font-semibold text-green-500 text-right">{index.delta.toLocaleString('ko-KR')}</div>
                                        <div className="text-xs text-gray-600 text-right">{index.leftEarnedPoint.toLocaleString('ko-KR')}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="mt-2 text-center text-gray-700">No revenue histories found.</p>
                        )
                    )}
                    {activeTab === PaymentHistoriesType.REVENUE && (
                        <div className="flex border-t mx-4 mt-3 justify-between box-border h-[44px] items-center">
                            <div className="font-semibold">Total Revenue:</div>
                            <div className="font-semibold">￦{user?.earnedPoint.toLocaleString('ko-KR')}</div>
                        </div>
                    )}
                </div>
                <div className="border-gray-400 rounded-3xl border-1 p-5">
                    <p className="text-xs text-gray-600 mb-1 pb-2">Security Setting</p>
                    <div className="flex items-center">
                        <HiOutlineLockClosed className="mx-4 w-10 h-10"/>
                        <p className="w-full p-2 font-semibold">Password</p>
                        <Link to={SitePaths.CHANGE_PASSWORD}>
                            <button className="blue-btn text-sm p-2">change</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};