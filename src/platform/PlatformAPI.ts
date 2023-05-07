import axios from "axios";
import {ModelEntityData, RegionEntityData, UserEntityData} from "../types/chameleon-client.entitydata";
import {ModelsRequestOptions, ModelUploadData} from "../types/chameleon-client";
import {DataUtils} from "../utils/DataUtils";

export class PlatformAPI {
    private static readonly instance = axios.create({
        baseURL: '/api/',
        withCredentials: true,
        timeout: 3000
    });
    private static readonly defaultConfig = {headers: {'Content-Type': 'application/json'}};

    public static async uploadModel(uploadData: ModelUploadData): Promise<any> {
        const formData = new FormData();
        Object.entries(uploadData).forEach(([name, value]) => {
            formData.append(name, value);
        });
        const response = await this.instance.post('/models/upload', formData, {
            ...this.defaultConfig, timeout: 0, headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response?.data;
    }

    public static async getMyModels(): Promise<ModelEntityData[]> {
        return await this.getModels({ownOnly: true});
    }

    public static async getModels(options?: ModelsRequestOptions): Promise<ModelEntityData[]> {
        const response = await this.instance.get('/models', {...this.defaultConfig, params: options});
        response?.data.forEach((m: ModelEntityData) => DataUtils.restoreTimeProperty(m));
        return response?.data as ModelEntityData[];
    }

    public static async getLoginUser(): Promise<UserEntityData> {
        const response = await this.instance.get('/users/my', this.defaultConfig);
        return response?.data as UserEntityData;
    }

    public static async getRegions(): Promise<RegionEntityData[]> {
        const response = await this.instance.get('/regions', this.defaultConfig);
        return response?.data as RegionEntityData[];
    }

    public static async getModelByUniqueName(uniqueName: string): Promise<ModelEntityData> {
        const response = await this.instance.get(`/models/name/${uniqueName}`, {...this.defaultConfig});
        DataUtils.restoreTimeProperty(response?.data);
        return response?.data as ModelEntityData;
    }

    // TODO: 작업 중
    public static async modifyPassword(uniqueName: string): Promise<UserEntityData> {
        return {} as UserEntityData;
    }

    // TODO: 반환 형 타입 지정
    public static async signIn(email: string, password: string): Promise<any> {
        const response = await this.instance.post('/auths/sign-in', {email, password}, this.defaultConfig);
        return response?.data;
    }

    // TODO: 반환 형 타입 지정
    public static async signUp(email: string, password: string, username: string): Promise<any> {
        const response = await this.instance.post('/auths/sign-up', {email, password, username}, this.defaultConfig);
        return response?.data;
    }

    // TODO: 반환 형 명시, 함수명과 API도 동사 형태로 수정 필요
    public static async updatePoint(amount: number) {
        const response = await this.instance.post('/points/update', {amount}, this.defaultConfig);
        return response?.data;
    }
    // TODO: apply path
    public static async getHistories() {
        const response = await this.instance.get('', this.defaultConfig);
        return response?.data;
    }
}
