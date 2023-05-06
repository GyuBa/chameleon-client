import {useState} from "react";
import instance from "../../ConstantValue";
import useGetUserInfo from "./UserInfoService";

interface User {
  username: string;
  email: string;
}

export default function useUpdateUserInfo() {
  const {username, useremail} = useGetUserInfo();
  // TODO: 이름 및 비밀번호 변경 백엔 코드 수정 시 작업
  const [user, setUser] = useState<User>({username: username as string, email: useremail as string });

  async function updateUser(newName: { username: string }) {
    try {
      const response = await instance.put("/auth/modify-password", {
        username: newName,
      });

      const updatedUser = { ...user, username: response.data.username };
      setUser(updatedUser);

      return updatedUser.username;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { user, setUser, updateUser };
}