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