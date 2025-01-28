import { Metadata } from "next";
import CreateUser from "@/app/auth/signup/Create-User";

export const metadata: Metadata = {
  title: "가압하기",
  description: "계정 가입하기",
};

const SignUp = () => {
  return <CreateUser />;
};

export default SignUp;
