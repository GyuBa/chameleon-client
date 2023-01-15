import React from 'react';
import {Header} from '../components/index';

export default function Payment() {
    // function onClickPayment() {
    //     console.log("결제하기")
    //     /* 1. 가맹점 식별하기 */
    //     const { IMP }: any = window;
    //     IMP.init('imp00000000');
    //
    //     /* 2. 결제 데이터 정의하기 */
    //     const data = {
    //         pg: 'html5_inicis',                           // PG사
    //         pay_method: 'card',                           // 결제수단
    //         merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
    //         amount: 1000,                                 // 결제금액
    //         name: '아임포트 결제 데이터 분석',                  // 주문명
    //         buyer_name: '홍길동',                           // 구매자 이름
    //         buyer_tel: '01012341234',                     // 구매자 전화번호
    //         buyer_email: 'example@example',               // 구매자 이메일
    //         buyer_addr: '신사동 661-16',                    // 구매자 주소
    //         buyer_postcode: '06018',                      // 구매자 우편번호
    //     };
    //
    //     /* 4. 결제 창 호출하기 */
    //     IMP.request_pay(data, callback);
    // }
    //
    // /* 3. 콜백 함수 정의하기 */
    // function callback(response : any) {
    //     const {
    //         success,
    //         merchant_uid,
    //         error_msg
    //     } = response;
    //
    //     if (success) {
    //         alert('결제 성공');
    //     } else {
    //         alert(`결제 실패: ${error_msg}`);
    //     }
    // }

    return (
        <div className="contents">
            <div className="w-full m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
                <Header category="Payment" title="Payment"/>
                {/*<button onClick={onClickPayment}>결제하기</button>*/}
            </div>
        </div>
    );
};