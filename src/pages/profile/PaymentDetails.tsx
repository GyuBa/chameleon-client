import React from 'react';
import {MdPayment} from "react-icons/md";
import {Link} from "react-router-dom";
import {SitePaths} from "../../types/chameleon-platform.common";
import {FaRegPauseCircle} from "react-icons/fa";

export default function PaymentDetails() {
	return (
		<div className="contents">
			<div className="w-2/3 m-2 md:m-10 mt-24 md:p-10">
				<p className='head-text'>Payment Details</p>
				<div className="my-4 border-gray-400 rounded-3xl border-1 p-6">
					<div className="flex justify-between mb-2">
						<p className="text-xs text-gray-600 mb-1 pb-2">Payment Details</p>
						<Link to={SitePaths.ACCOUNT}>
							<button className="blue-btn text-sm p-2">back</button>
						</Link>
					</div>
					<div className="flex items-center">
						<FaRegPauseCircle className="mx-2 w-10 h-10"/>
						<div className="w-full pl-2">
							<div className="font-semibold text-left">Image output model</div>
							<div className="text-xs text-gray-600 text-left">2023.05.22 08:09:21</div>
						</div>
						<div className="my-2">
							<div className="font-semibold text-red-500 text-right">-500</div>
							<div className="text-xs text-gray-600 text-right">116,446</div>
						</div>
					</div>
					<div className="flex items-center">
						<MdPayment className="mx-2 w-10 h-10"/>
						<div className="w-full pl-2">
							<div className="font-semibold text-left">Charge Points</div>
							<div className="text-xs text-gray-600 text-left">2023.05.22 08:09:21</div>
						</div>
						<div className="my-2">
							<div className="font-semibold text-green-500 text-right">+10000</div>
							<div className="text-xs text-gray-600 text-right">116,946</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};