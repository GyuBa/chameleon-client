import {useEffect, useMemo} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {UserEntityData} from "../../types/chameleon-platform.common";

const emptyUser: UserEntityData = {id: -1, username: "", email: "", point: -1};
let loadedUser: UserEntityData = emptyUser;

export default function useGetUserInfo(): { handleSignOut: () => Promise<void> } & {
    getCookieValue: (name: string) => (string | null),
    user: UserEntityData
} {
    const getCookieValue = useMemo(() => {
        return (name: string) => {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                const [cookieName, cookieValue] = cookie.split('=');
                if (cookieName === name) return cookieValue;
            }
            return null;
        };
    }, []);

    useEffect(() => {
        (async () => {
            if (loadedUser === emptyUser) {
                try {
                    loadedUser = await PlatformAPI.getLoginUser();
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }, []);

    const handleSignOut = async () => {
        try {
            await PlatformAPI.signOut();
            loadedUser = emptyUser;
        } catch (error) {
            console.error(error);
        }
    };

    return {handleSignOut, getCookieValue, user: loadedUser};
}