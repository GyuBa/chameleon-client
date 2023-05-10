import React, {useState} from 'react';
import kakao from '../../assets/images/kakao.png'
import payco from '../../assets/images/payco.png'
import toss from '../../assets/images/toss.png'
import Header from "../../components/layout/Header";
import {PlatformAPI} from "../../platform/PlatformAPI";

export interface Iamport {
    init: (accountID: string) => void;
    request_pay: (params: any, callback?: any) => void;
    certification: (params: any, callback?: any) => void;
}

declare global {
    interface Window {
        IMP?: Iamport;
    }
}

export default function Payment() {
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const handleChange = (e: any) => {
        setX(e.target.value);
        setY(e.target.name);
    }
    const {IMP} = window;
    IMP?.init('imp70327512');
    var k_money = (document.querySelector('input[name="k_money"]:checked') as HTMLInputElement | null)?.value;
    var p_money = (document.querySelector('input[name="p_money"]:checked') as HTMLInputElement | null)?.value;
    var t_money = (document.querySelector('input[name="t_money"]:checked') as HTMLInputElement | null)?.value;
    // var money = $('input[name="money"]:checked').val();

    var data1 = {
        pg: 'kakaopay', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: k_money, // 결제금액
        name: '카카오페이 테스트', // 주문명
        buyer_name: '한성민', // 구매자 이름
        buyer_tel: '01020877881', // 구매자 전화번호
        buyer_email: 'kkx7787@naver.com', // 구매자 이메일
        buyer_addr: '한기대 솔빛관', // 구매자 주소
        buyer_postcode: '06018' // 구매자 우편번호
    };

    var data2 = {
        pg: 'payco', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: p_money, // 결제금액
        name: '페이코 테스트', // 주문명
        buyer_name: '한성민', // 구매자 이름
        buyer_tel: '01020877881', // 구매자 전화번호
        buyer_email: 'kkx7787@naver.com', // 구매자 이메일
        buyer_addr: '한기대 솔빛관', // 구매자 주소
        buyer_postcode: '06018' // 구매자 우편번호
    };

    var data3 = {
        pg: 'tosspay', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
        amount: t_money, // 결제금액
        name: '토스 테스트', // 주문명
        buyer_name: '한성민', // 구매자 이름
        buyer_tel: '01020877881', // 구매자 전화번호
        buyer_email: 'kkx7787@naver.com', // 구매자 이메일
        buyer_addr: '한기대 솔빛관', // 구매자 주소
        buyer_postcode: '06018' // 구매자 우편번호
    };

    function callback(response: any) {
        const {error_msg} = response;
        if (response.success) {
            alert('결제 성공');
            console.log('success');

            /*instance.post("/payment",
                {
                    "amount": (Number(k_money) + Number(t_money) + Number(p_money)),
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )*/
            // TODO: 비동기 처리 등 개선 필요
            PlatformAPI.updatePoint((Number(k_money) + Number(t_money) + Number(p_money)));
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
        alert(Number(k_money) + Number(t_money) + Number(p_money));
        document.location.href = "/main"
    }

    function KaKaopay() {
        IMP?.request_pay(data1, callback);
    }

    function Payco() {
        IMP?.request_pay(data2, callback);
    }

    function Toss() {
        IMP?.request_pay(data3, callback);
    }

    return (
        <div className="contents">
            <div className="m-2 md:m-10 mt-24">
                <Header title="Charge Points"/>
                <div className="my-4 border-gray-400 rounded-3xl border-1 p-6 grid grid-cols-3 divide-x">
                    <div className="text-center">
                        <img className="card-img-top" width="400" height="700" src={kakao} alt="kakao"/>
                        <p className="text-center font-extrabold text-xl">Kakaopay</p> <br/>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="5000"
                                                                  checked={x === "5000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>5,000원</span></label>
                        <label className="box-radio-input"> <input type="radio" name="k_money" value="10000"
                                                                   checked={x === "10000" && y === "k_money"}
                                                                   onChange={handleChange}/><span>10,000원</span></label>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="15000"
                                                                  checked={x === "15000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>15,000원 </span></label>
                        <br/>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="20000"
                                                                  checked={x === "20000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>20,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="25000"
                                                                  checked={x === "25000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>25,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="30000"
                                                                  checked={x === "30000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>30,000원 </span></label><br/>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="35000"
                                                                  checked={x === "35000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>35,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="40000"
                                                                  checked={x === "40000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>40,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="k_money" value="50000"
                                                                  checked={x === "50000" && y === "k_money"}
                                                                  onChange={handleChange}/><span>50,000원 </span></label>
                        <br/> <br/>
                        <p className="text-center text-red-500 margin-top: 30px text-align = center"
                        >카카오페이의 최소 충전금액은 5,000원이며 <br/>최대 충전금액은 50,000원입니다.</p> <br/>
                        <button onClick={KaKaopay}
                                className={`black-btn text-sm p-2 hover:drop-shadow-xl whitespace-nowrap`}
                        >charge
                        </button>
                    </div>
                    <div className="text-center">
                        <img className="card-img-top" width="400" height="700" src={payco} alt="payco"/>
                        <p className="text-center font-extrabold text-xl">Payco</p> <br/>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="5000"
                                                                  checked={x === "5000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>5,000원</span></label>
                        <label className="box-radio-input"> <input type="radio" name="p_money" value="10000"
                                                                   checked={x === "10000" && y === "p_money"}
                                                                   onChange={handleChange}/><span>10,000원</span></label>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="15000"
                                                                  checked={x === "15000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>15,000원 </span></label>
                        <br/>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="20000"
                                                                  checked={x === "20000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>20,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="25000"
                                                                  checked={x === "25000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>25,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="30000"
                                                                  checked={x === "30000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>30,000원 </span></label><br/>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="35000"
                                                                  checked={x === "35000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>35,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="40000"
                                                                  checked={x === "40000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>40,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="p_money" value="50000"
                                                                  checked={x === "50000" && y === "p_money"}
                                                                  onChange={handleChange}/><span>50,000원 </span></label>
                        <br/> <br/>
                        <p className="text-center text-red-500 margin-top: 30px text-align = center"
                        >페이코의 최소 충전금액은 5,000원이며 <br/>최대 충전금액은 50,000원입니다.</p> <br/>
                        <button onClick={Payco}
                            className={`black-btn text-sm p-2 hover:drop-shadow-xl whitespace-nowrap`}
                        >charge
                        </button>
                    </div>
                    <div className="text-center">
                        <img className="card-img-top" width="400" height="1000" src={toss} alt="toss"/>
                        <p className="text-center font-extrabold text-xl">Toss</p> <br/>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="5000"
                                                                  checked={x === "5000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>5,000원</span></label>
                        <label className="box-radio-input"> <input type="radio" name="t_money" value="10000"
                                                                   checked={x === "10000" && y === "t_money"}
                                                                   onChange={handleChange}/><span>10,000원</span></label>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="15000"
                                                                  checked={x === "15000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>15,000원 </span></label>
                        <br/>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="20000"
                                                                  checked={x === "20000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>20,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="25000"
                                                                  checked={x === "25000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>25,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="30000"
                                                                  checked={x === "30000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>30,000원 </span></label><br/>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="35000"
                                                                  checked={x === "35000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>35,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="40000"
                                                                  checked={x === "40000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>40,000원 </span></label>
                        <label className="box-radio-input"><input type="radio" name="t_money" value="50000"
                                                                  checked={x === "50000" && y === "t_money"}
                                                                  onChange={handleChange}/><span>50,000원 </span></label>
                        <br/> <br/>
                        <p className="text-center text-red-500 margin-top: 30px text-align = center"
                        >토스의 최소 충전금액은 5,000원이며 <br/>최대 충전금액은 50,000원입니다.</p> <br/>
                        <button onClick={Toss}
                            className={`black-btn text-sm p-2 hover:drop-shadow-xl whitespace-nowrap`}
                        >charge
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

