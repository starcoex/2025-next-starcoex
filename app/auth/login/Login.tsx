"use client";
import { Logo } from "@/app/components/Logo";
import { Checkbox, Field, Input, Label } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";
import { Button } from "@/app/components/Button";
import { Link } from "@/app/components/Link";
import { clsx } from "clsx";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { SignInInput, signInSchema } from "@/app/auth/login/schemas/signIn";
import { zodResolver } from "@hookform/resolvers/zod";
import googleIcon from "../../images/google.svg";
import smsIcon from "../../images/sms.svg";
import Image from "next/image";
import FetchError from "@/app/components/FetchError";
import { useMutation } from "@apollo/client";
import { LOGIN_GQL } from "@/app/graphql/authGql/login";
import {
  LoginGraphqlMutation,
  LoginGraphqlMutationVariables,
} from "@/generated/graphql";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [login, { loading, error }] = useMutation<
    LoginGraphqlMutation,
    LoginGraphqlMutationVariables
  >(LOGIN_GQL, { errorPolicy: "all" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInInput>({ resolver: zodResolver(signInSchema) });
  const [show, setShow] = useState(false);

  const onSubmit = async (data: SignInInput) => {
    const response = await login({
      variables: {
        loginInput: {
          email: data.email,
          password: data.password,
        },
      },
    });
    try {
      if (!loading) {
        if (response.data?.loginGraphql.user) {
          toast.success("로그인에 성공했습니다.");
          Cookies.set(
            "access_token",
            response.data?.loginGraphql.access_token as string,
          );
          Cookies.set(
            "refresh_token",
            response.data?.loginGraphql.refresh_token as string,
          );
          reset();
          router.push("/");
        } else if (!response.data?.loginGraphql.ok) {
          toast.error(response.data?.loginGraphql.error);
        } else {
          toast.error(response.errors?.map((error) => error?.message));
        }
        reset();
      }
      // Bad Request Exception
      console.log(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <main className="overflow-hidden">
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
            className="p-7 sm:p-11"
          >
            <div className="flex items-start">
              <Link href="/" title="Home">
                <Logo className="h-12" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">환영합니다.</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              계속하려면 계정에 로그인하세요!
            </p>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Email</Label>
              <Input
                {...register("email")}
                required
                autoFocus
                type="email"
                name="email"
                className={clsx(
                  "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                  "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                  "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black",
                )}
              />
            </Field>
            {errors.email && <FetchError message={errors.email.message} />}
            {error?.message && <FetchError message={error?.message} />}

            <Field className="mt-8 space-y-3 relative">
              <Label className="text-sm/5 font-medium">Password</Label>
              <Input
                {...register("password")}
                required
                type={`${show ? "password" : "text"}`}
                name="password"
                className={clsx(
                  "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                  "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                  "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black",
                )}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute bottom-2 right-1 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-2 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
            </Field>
            {errors.password && (
              <FetchError message={errors.password.message} />
            )}
            {error?.message && <FetchError message={error?.message} />}

            <div className="mt-8 flex items-center justify-between text-sm/5">
              <Field className="flex items-center gap-3">
                <Checkbox
                  name="remember-me"
                  className={clsx(
                    "group block size-4 rounded border border-transparent shadow ring-1 ring-black/10 focus:outline-none",
                    "data-[checked]:bg-black data-[checked]:ring-black",
                    "data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-black",
                  )}
                >
                  <CheckIcon className="fill-white opacity-0 group-data-[checked]:opacity-100" />
                </Checkbox>
                <Label>나를 기억해</Label>
              </Field>
              <Link href="#" className="font-medium hover:text-gray-600">
                비밀번호를 잊으셨나요?
              </Link>
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </div>
          </form>
          <div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm/6 font-medium">
                <span className="bg-white px-6 text-gray-900">
                  또는 계속 진행하세요
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-7 sm:p-11">
              <Link
                href="#"
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              >
                <Image src={googleIcon} alt="google icon" className="h-6 w-6" />
                <span className="text-sm/6 font-semibold">구글</span>
              </Link>

              <Link
                href="#"
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
              >
                <Image src={smsIcon} alt="sms icon" className="h-6 w-6" />
                <span className="text-sm/6 font-semibold">구)로그인 방식</span>
              </Link>
            </div>
          </div>
          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            회원이 아니신가요?{" "}
            <Link
              href="/auth/signup"
              className="font-medium hover:text-gray-600"
              title="CreateUser"
            >
              계정 만들기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
