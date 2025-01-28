"use client";
import React, { useActionState, useState } from "react";
import { Link } from "@/app/components/Link";
import { Logo } from "@/app/components/Logo";
import { Checkbox, Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Button } from "@/app/components/Button";
import loginAction from "@/app/auth/loginAction/action/loginAction";
import { CheckIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import googleIcon from "@/app/images/google.svg";
import smsIcon from "@/app/images/sms.svg";
import { API_AUTH_URL } from "@/app/constants/api";
import FetchError from "@/app/components/FetchError";

const LoginAction = () => {
  const [show, setShow] = useState(false);
  const [state, formAction] = useActionState(loginAction, {
    error: "",
    statusCode: undefined,
  });
  return (
    <main className="overflow-hidden">
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form action={formAction} method="POST" className="p-7 sm:p-11">
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
            {state?.statusCode === 404 && <FetchError message={state?.error} />}
            <Field className="mt-8 space-y-3 relative">
              <Label className="text-sm/5 font-medium">Password</Label>
              <Input
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
            {state?.statusCode === 401 && <FetchError message={state?.error} />}
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
                onClick={() =>
                  (window.location.href = `${API_AUTH_URL}/auth/google`)
                }
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

export default LoginAction;
