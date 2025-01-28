import { cookies } from "next/headers";
import { API_AUTH_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: FormData) => {
  const response = await fetch(`${API_AUTH_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const json = await response.json();
    if (response.status === 401) {
      return { error: getErrorMessage(json), statusCode: json.statusCode };
    } else if (response.status === 404) {
      return { error: getErrorMessage(json), statusCode: json.statusCode };
    } else {
      return { error: getErrorMessage(json) };
    }
  }
  return { error: "", statusCode: null };
};
