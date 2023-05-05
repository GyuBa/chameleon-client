import {useEffect, useMemo, useState} from "react";
import instance from "../../ConstantValue";

export default function useGetUserInfo() {
  const [user, setUser] = useState({ username: 'User Name', email: 'User Email' });
  const token = "1234";

  useEffect(() => {
    let completed = false;

    (async function get() {
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
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      completed = true;
    };
  }, []);

  const cachedValues = useMemo(() => {
    return { username: user?.username, useremail: user?.email };
  }, [user]);

  return {...cachedValues};
}