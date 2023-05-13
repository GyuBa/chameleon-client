import {useEffect, useMemo, useState} from "react";
import {PlatformAPI} from "../../platform/PlatformAPI";
import {UserEntityData} from "../../types/chameleon-platform.common";

const USER_INFO_KEY = "user_info";
const emptyUser: UserEntityData = {id: -1, username: "", email: ""};
export default function useGetUserInfo(): UserEntityData & { handleSignOut: () => Promise<void> } {
    const [user, setUser] = useState<UserEntityData>(emptyUser);

    useEffect(() => {
      let completed = false;

      async function get() {
        try {
          if (!completed) {
            setUser(await PlatformAPI.getLoginUser());
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(await PlatformAPI.getLoginUser()));
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

    const handleSignOut = async () => {
        try {
            localStorage.removeItem(USER_INFO_KEY);
            await PlatformAPI.signOut();
            console.log("sign out");
        } catch (error) {
            console.error(error);
        }
    };

    return { ...cachedValues, handleSignOut };
}