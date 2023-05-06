import {useEffect, useMemo, useState} from "react";
import instance from "../../ConstantValue";

const USER_INFO_KEY = "user_info";

export default function useGetUserInfo() {
  const [user, setUser] = useState({ username: '', email: '' });
  const token = "1234";

  useEffect(() => {
    let completed = false;

    async function get() {
      try {
        const response = await instance.get(`/auth/legacy-info`, {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `${token}`,
          }
        });

        if (!completed) {
          setUser(response.data);
          localStorage.setItem(USER_INFO_KEY, JSON.stringify(response.data));
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
    return { username: user?.username, useremail: user?.email };
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem(USER_INFO_KEY);
  };

  return {...cachedValues, handleSignOut};
}