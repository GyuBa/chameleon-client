import {useEffect, useState} from "react";
import instance from "../../ConstantValue";

interface User {
  username: string;
  email: string;
}

export default function useGetUserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
          setUser(response.data);
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
    return {username: "Loading...", useremail: "Loading..."};
  } else if (error) {
    return {username: "User Name", useremail: "User Email"};
  } else {
    return {username: user?.username, useremail: user?.email};
  }
}