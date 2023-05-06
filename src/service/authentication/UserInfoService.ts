import {useEffect, useMemo, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {UserEntityData} from "../../types/chameleon-client.entitydata";

const USER_INFO_KEY = "user_info";
const emptyUser: UserEntityData = {id: -1, username: "", email: ""};
export default function useGetUserInfo(): UserEntityData {
    const [user, setUser] = useState<UserEntityData>(emptyUser);

    useEffect(() => {
      let completed = false;

      async function get() {
        try {
          if (!completed) {
            setUser(await PlatformAPI.getUserInfo());
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(await PlatformAPI.getUserInfo()));
          }
        } catch (error) {
          console.error(error);
        }
      }

      const cachedUserInfo = localStorage.getItem(USER_INFO_KEY);

      if (cachedUserInfo) {
        setUser(JSON.parse(cachedUserInfo));
      } else get();

      return () => {
        completed = true;
      };
    }, []);

    const cachedValues = useMemo(() => {
     return { id: user?.id, username: user?.username, email: user?.email };
    }, [user]);

    // TODO: 로그아웃 구현
    const handleSignOut = () => {
      localStorage.removeItem(USER_INFO_KEY);
    };

    return {...cachedValues};
}