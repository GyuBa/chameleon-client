import { useState } from "react";
import instance from "../../ConstantValue";
import useGetUserInfo from "./UserInfoService";

interface User {
  name: string;
  email: string;
}

export default function useUpdateUserInfo() {
  const {userName, userEmail} = useGetUserInfo();
  // TODO: 이름 및 비밀번호 변경 백엔 코드 수정 시 작업
  // @ts-ignore
  const [user, setUser] = useState<User>({email: {userName}, name: {userEmail} });

  async function updateUser(newName: { name: string }) {
    try {
      const response = await instance.put("/auth/modify-password", {
        name: newName,
      });

      const updatedUser = { ...user, userName: response.data.name };
      setUser(updatedUser);

      return updatedUser.userName;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return { user, setUser, updateUser };
}