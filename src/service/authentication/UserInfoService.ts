import {useEffect, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {UserEntityData} from "../../types/chameleon-client.entitydata";

const emptyUser: UserEntityData = {id: -1, username: "사용자 이름", email: "사용자 이메일"};
const loadingDummyUser: UserEntityData = {id: -1, username: "불러오는 중...", email: "불러오는 중..."};
export default function useGetUserInfo(): UserEntityData {
    const [user, setUser] = useState<UserEntityData>();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let completed = false;

        (async function () {
            try {
                if (!completed) {
                    setLoading(false);
                    setUser(await PlatformAPI.getUserInfo());
                }
            } catch (error) {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        })();

        return () => {
            completed = true;
        };
    }, []);

    if (loading) {
        return loadingDummyUser;
    } else if (error) {
        return emptyUser;
    } else {
        return {...emptyUser, ...user};
    }
}