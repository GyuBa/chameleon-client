import React, {useState} from 'react';
import kakao from '../../assets/images/payment/kakao.png'
import payco from '../../assets/images/payment/payco.png'
import toss from '../../assets/images/payment/toss.png'
import {PlatformAPI} from "../../platform/PlatformAPI";
import {SitePaths} from "../../types/chameleon-platform.common";

export default function Payment() {
    const [chargeUnit, setChargeUnit] = useState('');
    const [pgType, setPGType] = useState('');

    const handleChange = (e: any) => {
        setChargeUnit(e.target.value);
        setPGType(e.target.name);
    }

    const {IMP} = window;
    IMP?.init('imp55065412');

    const kakapPayInfo = {
        pg: 'kakaopay', // PG사
        amount: chargeUnit, // 결제금액
        name: `Chameleon Platform Point ${chargeUnit}P`, // 주문명
    };

    const paycoPayInfo = {
        pg: 'payco', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: chargeUnit, // 결제금액
        name: `Chameleon Platform Point ${chargeUnit}P`, // 주문명
    };

    const tossPayInfo = {
        pg: 'tosspay', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: chargeUnit, // 결제금액
        name: `Chameleon Platform Point ${chargeUnit}P`, // 주문명
    };

    async function callback(response: any) {
        const {error_msg} = response;
        if (response.success) {
            console.log(response);
            await PlatformAPI.chargePoint(response);
            alert(`${response.paid_amount} points charged!`);

        } else {
            alert(`Error: ${error_msg}`);
        }

        document.location.href = SitePaths.PAYMENT;
    }

    return (
        <div className="contents">
            <div className="m-2 md:m-10 mt-24">
                <p className='head-text'>Charge Points</p>
                <div className="my-4 border-gray-400 rounded-3xl border-1 p-6 grid grid-cols-3 divide-x">
                    <div className="text-center">
                        <img className="card-img-top" width="400" height="700" src={kakao} alt="kakao"/>
                        <p className="text-center font-extrabold text-xl">KakaoPay</p> <br/>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="5000"
                                                                  checked={chargeUnit === "5000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 5,000 ₩ </span></label>
                        <label className="box-radio-input"> <input type="radio" name="kakao_money" value="10000"
                                                                   checked={chargeUnit === "10000" && pgType === "kakao_money"}
                                                                   onChange={handleChange}/><span> 10,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="15000"
                                                                  checked={chargeUnit === "15000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 15,000 ₩ </span></label>
                        <br/>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="20000"
                                                                  checked={chargeUnit === "20000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 20,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="25000"
                                                                  checked={chargeUnit === "25000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 25,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="30000"
                                                                  checked={chargeUnit === "30000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 30,000 ₩ </span></label><br/>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="35000"
                                                                  checked={chargeUnit === "35000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 35,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="40000"
                                                                  checked={chargeUnit === "40000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 40,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="kakao_money" value="50000"
                                                                  checked={chargeUnit === "50000" && pgType === "kakao_money"}
                                                                  onChange={handleChange}/><span> 50,000 ₩ </span></label>
                        <br/> <br/>
                        <p className="text-center text-red-500 margin-top: 30px text-align = center">The minimum charge
                            amount for KakaoPay is 5,000₩<br/>and the maximum charge amount is 50,000₩</p>
                        <br/>
                        <button onClick={() => IMP?.request_pay(kakapPayInfo, callback)}
                                className={`black-btn text-sm p-2 hover:drop-shadow-xl whitespace-nowrap`}
                        >charge
                        </button>
                    </div>
                    <div className="text-center">
                        <img className="card-img-top" width="400" height="700" src={payco} alt="payco"/>
                        <p className="text-center font-extrabold text-xl">Payco</p> <br/>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="5000"
                                                                  checked={chargeUnit === "5000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 5,000 ₩ </span></label>
                        <label className="box-radio-input"> <input type="radio" name="payco_money" value="10000"
                                                                   checked={chargeUnit === "10000" && pgType === "payco_money"}
                                                                   onChange={handleChange}/><span> 10,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="15000"
                                                                  checked={chargeUnit === "15000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 15,000 ₩ </span></label>
                        <br/>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="20000"
                                                                  checked={chargeUnit === "20000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 20,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="25000"
                                                                  checked={chargeUnit === "25000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 25,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="30000"
                                                                  checked={chargeUnit === "30000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 30,000 ₩ </span></label><br/>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="35000"
                                                                  checked={chargeUnit === "35000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 35,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="40000"
                                                                  checked={chargeUnit === "40000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 40,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="payco_money" value="50000"
                                                                  checked={chargeUnit === "50000" && pgType === "payco_money"}
                                                                  onChange={handleChange}/><span> 50,000 ₩ </span></label>
                        <br/> <br/>
                        <p className="text-center text-red-500 margin-top: 30px text-align = center">The minimum charge
                            amount for PAYCO is 5,000₩<br/>and the maximum charge amount is 50,000₩</p><br/>
                        <button onClick={() => IMP?.request_pay(paycoPayInfo, callback)}
                                className={`black-btn text-sm p-2 hover:drop-shadow-xl whitespace-nowrap`}
                        >charge
                        </button>
                    </div>
                    <div className="text-center">
                        <img className="card-img-top" width="400" height="1000" src={toss} alt="toss"/>
                        <p className="text-center font-extrabold text-xl">Toss</p> <br/>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="5000"
                                                                  checked={chargeUnit === "5000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 5,000 ₩ </span></label>
                        <label className="box-radio-input"> <input type="radio" name="toss_money" value="10000"
                                                                   checked={chargeUnit === "10000" && pgType === "toss_money"}
                                                                   onChange={handleChange}/><span> 10,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="15000"
                                                                  checked={chargeUnit === "15000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 15,000 ₩ </span></label>
                        <br/>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="20000"
                                                                  checked={chargeUnit === "20000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 20,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="25000"
                                                                  checked={chargeUnit === "25000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 25,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="30000"
                                                                  checked={chargeUnit === "30000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 30,000 ₩ </span></label><br/>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="35000"
                                                                  checked={chargeUnit === "35000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 35,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="40000"
                                                                  checked={chargeUnit === "40000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 40,000 ₩ </span></label>
                        <label className="box-radio-input"><input type="radio" name="toss_money" value="50000"
                                                                  checked={chargeUnit === "50000" && pgType === "toss_money"}
                                                                  onChange={handleChange}/><span> 50,000 ₩ </span></label>
                        <br/> <br/>
                        <p className="text-center text-red-500 margin-top: 30px text-align = center">The minimum charge
                            amount for TossPay is 5,000₩<br/>and the maximum charge amount is 50,000₩</p><br/>
                        <button onClick={() => IMP?.request_pay(tossPayInfo, callback)}
                                className={`black-btn text-sm p-2 hover:drop-shadow-xl whitespace-nowrap`}
                        >charge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

