import Login from "@/app/auth/login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
  description: "계속하려면 계정에 로그인하세요.",
};

const SingIn = () => {
  return <Login />;
};

export default SingIn;
