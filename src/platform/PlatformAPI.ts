import axios from "axios";
import {ModelEntityData, RegionEntityData, UserEntityData} from "../types/chameleon-client.entitydata";
import {ModelUploadData} from "../types/chameleon-client";
import {DataUtils} from "../utils/DataUtils";

export class PlatformAPI {
    private static readonly instance = axios.create({
        baseURL: '/api/',
        withCredentials: true,
        timeout: 1000
    });
    private static readonly defaultConfig = {headers: {'Content-Type': 'application/json'}};

    public static async uploadModel(uploadData: ModelUploadData): Promise<any> {
        const formData = new FormData();
        Object.entries(uploadData).forEach(([name, value]) => {
            formData.append(name, value);
        });
        const response = await this.instance.post('/model/upload', formData, {
            ...this.defaultConfig, timeout: 0, headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response?.data;
    }


    public static async getModelList(): Promise<ModelEntityData[]> {
        const response = await this.instance.get('/model/list', this.defaultConfig);
        response?.data.forEach((m: ModelEntityData) => DataUtils.restoreTimeProperty(m));
        return response?.data as ModelEntityData[];
    }

    public static async getUserInfo(): Promise<UserEntityData> {
        const response = await this.instance.get('/user/info', this.defaultConfig);
        return response?.data as UserEntityData;
    }

    public static async getRegionList(): Promise<RegionEntityData[]> {
        const response = await this.instance.get('/region/list', this.defaultConfig);
        return response?.data as RegionEntityData[];
    }

    public static async getModelInfo(uniqueName: string): Promise<ModelEntityData> {
        const response = await this.instance.get('/model/info', {...this.defaultConfig, params: {uniqueName}});
        DataUtils.restoreTimeProperty(response?.data);
        return response?.data as ModelEntityData;
    }

    // TODO: 작업 중
    public static async modifyPassword(uniqueName: string): Promise<UserEntityData> {
        return {} as UserEntityData;
    }

    // TODO: 반환 형 타입 지정
    public static async signIn(email: string, password: string): Promise<any> {
        const response = await this.instance.post('/auth/sign-in', {email, password}, this.defaultConfig);
        return response?.data;
    }

    // TODO: 반환 형 타입 지정
    public static async signUp(email: string, password: string, username: string): Promise<any> {
        const response = await this.instance.post('/auth/sign-up', {email, password, username}, this.defaultConfig);
        return response?.data;
    }

    // TODO: 반환 형 명시, 함수명과 API도 동사 형태로 수정 필요
    public static async payment(amount: number) {
        await this.instance.post('/payment', {amount}, this.defaultConfig);
    }
}
