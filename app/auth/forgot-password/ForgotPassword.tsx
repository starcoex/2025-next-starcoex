"use client";
import React from "react";
import { Link } from "@/app/components/Link";
import { Logo } from "@/app/components/Logo";
import { Field, Input, Label } from "@headlessui/react";
import { clsx } from "clsx";
import { Button } from "@/app/components/Button";
import ResendVerityCode from "@/app/auth/confirm-email/ResendVerityCode";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD_GQL } from "@/app/graphql/authGql/forgot-password-gql";
import {
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
} from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordInput,
  forgotPasswordSchema,
} from "@/app/auth/forgot-password/schemas/forgot-password";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const router = useRouter();
  const [forgotPasswordMutation, { loading }] = useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(FORGOT_PASSWORD_GQL);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const response = await forgotPasswordMutation({
        variables: {
          forgotPasswordInput: {
            email: data.email,
          },
        },
      });
      if (response.data?.forgotPassword.ok) {
        toast.success("Please check your email to reset your password!");
        router.push("/auth/login");
      }
      if (!response.data?.forgotPassword.ok) {
        toast.error(response.data?.forgotPassword.message);
      }
    } catch (error: any) {
      console.log(error);
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
            <h1 className="mt-8 text-base/6 font-medium">
              비밀번호를 잊으셨나요?
            </h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              당신에 메일주소를 입력하세요
            </p>
            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">이메일 입력</Label>
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
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
