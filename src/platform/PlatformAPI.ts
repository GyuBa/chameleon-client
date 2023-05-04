import axios from "axios";
import {ModelEntityData, RegionEntityData, UserEntityData} from "../types/chameleon-client.entitydata";
import {ModelUploadData} from "../types/chameleon-client";

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
        return response?.data as ModelEntityData;
    }

    public static async signIn(email: string, password: string) {
        await this.instance.post('/auth/sign-in', {email, password}, this.defaultConfig);
    }

    public static async signUp(email: string, password: string, username: string) {
        await this.instance.post('/auth/sign-up', {email, password, username}, this.defaultConfig);
    }

    public static async payment(amount: number) {
        await this.instance.post('/payment', {amount}, this.defaultConfig);
    }
}
