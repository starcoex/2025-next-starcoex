"use client";
import React from "react";
import { useMutation } from "@apollo/client";
import { CONFIRM_EMAIL_GQL } from "@/app/graphql/authGql/confirm-email-gql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VerifyEmailInput,
  VerifyEmailSchema,
} from "@/app/auth/confirm-email/schemas/verify-email";
import {
  VerifyEmailGqlMutation,
  VerifyEmailGqlMutationVariables,
} from "@/generated/graphql";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import { Link } from "@/app/components/Link";
import { Logo } from "@/app/components/Logo";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import ResendVerityCode from "@/app/auth/confirm-email/ResendVerityCode";

const Verification = () => {
  const router = useRouter();
  const [verifyEmailMutation, { loading }] = useMutation<
    VerifyEmailGqlMutation,
    VerifyEmailGqlMutationVariables
  >(CONFIRM_EMAIL_GQL, { errorPolicy: "all" });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<VerifyEmailInput>({ resolver: zodResolver(VerifyEmailSchema) });

  const onSubmit = async (data: VerifyEmailInput) => {
    const activation_token = localStorage.getItem("activation_token");
    console.log(activation_token);

    const response = await verifyEmailMutation({
      variables: {
        verifyEmailInput: {
          activation_token: activation_token as string,
          activation_code: data.activation_code,
        },
      },
    });
    console.log("response", response);
    try {
      if (!loading) {
        if (response.data?.verifyEmailGql.ok) {
          localStorage.removeItem("activation_token");
          localStorage.removeItem("user_email");
          toast.success("이메일 인증에 성공했습니다.");
          router.push("/auth/login");
        }
        if (!response.data?.verifyEmailGql.ok) {
          toast.error(response.data?.verifyEmailGql.error);
        }
      }
      reset();
    } catch (err: any) {
      toast.error(err.message);
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
            <h1 className="mt-8 text-base/6 font-medium">
              받은 편지함을 확인하세요.
            </h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              로그인을 할려고 하면 {localStorage.getItem("user_email")} 주소로
              보내드린 4자리 코드를 입력하세요
            </p>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">검증 OTP</Label>
              <Input
                {...register("activation_code")}
                required
                autoFocus
                maxLength={4}
                placeholder="4자리 코드"
                type="text"
                name="activation_code"
                className={clsx(
                  "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                  "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                  "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black",
                )}
              />
            </Field>
            <div className="mt-8">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting || loading}
              >
                보내기
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
                  코드를 받지 못하셨나요?
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 p-7 sm:p-11">
              <ResendVerityCode message={"코드 재선송"} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Verification;
