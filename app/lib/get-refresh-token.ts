import { API_AUTH_URL } from "@/app/constants/api";
import Cookies from "js-cookie";
import { REFRESH_TOKEN } from "@/app/graphql/authGql/refrsh-token-gql";
import { cookies } from "next/headers";

const getRefreshToken = async () => {
  const cookieStore = await cookies();

  const refresh_token = Cookies.get("refresh_token");
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({
        query: REFRESH_TOKEN,
        variables: {
          refresh_token: refresh_token as string,
        },
      }),
    };
    const response = await fetch(`${API_AUTH_URL}/graphql`, options);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default getRefreshToken;
