import {useEffect, useState} from "react";
import instance from "../../ConstantValue";

export default function useGetUserInfo(userId: any) {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = "1234";

  useEffect(() => {
    let completed = false;

    async function get() {
      const result = await instance.get(`/login/info`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authentication': `${token}`,
          }
        }
      )
        .then(function (response) {
          console.log("response");
          console.log(response);
          return response;
        })
        .catch(function (error) {
          console.log("ERROR");
          console.error(error);
          setError(true);
          return error.response;
        });

      if (!completed) {
        setLoading(false);
        setUser(result.data);
        console.log("COMPLETED");
        console.log(user);
      }
    }

    get();

    return () => {
      completed = true
    }
  }, []);

  if (!loading && !error) {
    const user: any = userId;
    return (
      {
        userName: user.name,
        userEmail: user.email,
      }
    );
  }

  return (
    {
      userName: "사용자 이름",
      userEmail: "사용자 이메일",
    }
  )
}