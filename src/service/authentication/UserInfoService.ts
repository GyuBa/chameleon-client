import {useEffect, useMemo, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {UserEntityData} from "../../types/chameleon-platform.common";

const emptyUser: UserEntityData = {id: -1, username: "", email: ""};
export default function useGetUserInfo(): UserEntityData & { handleSignOut: () => Promise<void> } & { getCookieValue: (name: string) => (string | null) } {
    const [user, setUser] = useState<UserEntityData>(emptyUser);
    //TODO: LocalStorage 삭제 후 계속 렌더링 0~1초 걸림
    const getCookieValue = useMemo(() => {
        return (name : string) => {
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
      let completed = false;
      async function get() {
        try {
          if (!completed) setUser(await PlatformAPI.getLoginUser());
        } catch (error) {
            console.error(error);
        }
      }
      get();
      return () => {
        completed = true;
      };
    }, []);

    const cachedValues: UserEntityData = useMemo(() => {
     return { id: user?.id, username: user?.username, email: user?.email };
    }, [user]);

    const handleSignOut = async () => {
        try {
            console.log("sign out");
            console.log(document.cookie);
            await PlatformAPI.signOut();
            console.log(document.cookie);
            setUser(emptyUser);
        } catch (error) {
            console.error(error);
        }
    };

    return { ...cachedValues, handleSignOut, getCookieValue };
}