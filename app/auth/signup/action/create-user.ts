"use server";

import { CREATE_USER } from "@/app/graphql/gateway/create-user";
import { API_AUTH_URL } from "@/app/constants/api";
import { createUserSchema } from "@/app/auth/signup/schemas/create-user";

const createUser = async (_preState: any, formData: FormData) => {
  try {
    const userData = {
      email: formData.get("email"),
      name: formData.get("name"),
      phone_number: formData.get("phone_number"),
      password: formData.get("password"),
    };
    const createUserInput = createUserSchema.parse(userData);
    console.log("CREATE USER", createUserInput);
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer YOUR_ACCESS_TOKEN", // 필요 시, 인증 토큰 추가
    };
    const requestBody = {
      query: CREATE_USER,
      variables: {
        email: "corp.starcoex@gmail.com",
        name: "고정훈",
        phone_number: "01066921359",
        password: "121212A",
      },
    };
    const options = {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody),
    };
    const response = await (
      await fetch(`${API_AUTH_URL}/graphql`, options)
    ).json();
    console.log("RESPONSE FROM FETCH REQUEST", response?.data);
  } catch (err) {
    console.log("ERROR DURING FETCH REQUEST", err);
  }
};
export default createUser;
