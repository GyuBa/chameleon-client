import {useState} from "react";
import useGetUserInfo from "./UserInfoService";
import {UserEntityData} from "../../types/chameleon-platform.common";
import {PlatformAPI} from "../../platform/PlatformAPI";

// TODO: 이름 및 비밀번호 변경 백엔 코드 수정 시 작업
export default function useUpdateUserInfo() {
    const loadedUser = useGetUserInfo();
    // TODO: 이름 및 비밀번호 변경 백엔 코드 수정 시 작업
    const [user, setUser] = useState<UserEntityData>(loadedUser);

    // TODO: 의도 파악 불가로 수정 후 임시로 남겨진 Legacy code
    /*
    async function updateUser(newUsername: { username: string }) {
        try {
            const response = await instance.put("/auth/modify-password", {
                username: newUsername,
            });

            const updatedUser = {...user, username: response.data.username};
            setUser(updatedUser);

            return updatedUser.username;
        } catch (error) {
            console.error(error);
            return null;
        }
    }*/

    // TODO: 의도 파악 불가
    async function updateUser(newUsername: string) {
        /*try {
            const newUser = await PlatformAPI.modifyPassword(newUsername);
            // modifyPassword는 newUser를 반환하지 않고, password만 바꾸는 API임
            setUser(newUser);

            return newUser.username;
        } catch (error) {
            console.error(error);
            return null;
        }*/
    }

    return {user, setUser, updateUser};
}