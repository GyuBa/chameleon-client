import {useEffect, useMemo, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {UserEntityData} from "../../types/chameleon-platform.common";

const emptyUser: UserEntityData = {id: -1, username: "", email: ""};
export default function useGetUserInfo(): UserEntityData & { handleSignOut: () => Promise<void> } & { getCookieValue: (name: string) => (string | null) } {
    const [user, setUser] = useState<UserEntityData>(emptyUser);

    const getCookieValue = (name : string) => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) return cookieValue;
        }
        return null;
    };
    const connectSid = getCookieValue('connect.sid');

    useEffect(() => {
      let completed = false;

      async function get() {
        try {
          if (!completed) {
            setUser(await PlatformAPI.getLoginUser());
            localStorage.setItem(connectSid as string, JSON.stringify(await PlatformAPI.getLoginUser()));
          }
        } catch (error) {
          console.error(error);
        }
      }

      const cachedUserInfo = localStorage.getItem(connectSid as string);

      if (cachedUserInfo) {
        setUser(JSON.parse(cachedUserInfo));
      } else get();

      return () => {
        completed = true;
      };
    }, [connectSid]);

    const cachedValues = useMemo(() => {
     return { id: user?.id, username: user?.username, email: user?.email };
    }, [user]);

    const handleSignOut = async () => {
        try {
            console.log("sign out");
            console.log(document.cookie);
            localStorage.removeItem(connectSid as string);
            await PlatformAPI.signOut();
            console.log(document.cookie);
        } catch (error) {
            console.error(error);
        }
    };

    return { ...cachedValues, handleSignOut, getCookieValue };
}