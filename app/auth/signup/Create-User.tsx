"use client";
import React, { useState } from "react";
import { Link } from "@/app/components/Link";
import { Logo } from "@/app/components/Logo";
import { clsx } from "clsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import {
  CreateUserGqlMutation,
  CreateUserGqlMutationVariables,
} from "@/generated/graphql";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  CreateUserInput,
  createUserSchema,
} from "@/app/auth/signup/schemas/create-user";
import { CREATE_USER_GQL } from "@/app/graphql/authGql/create-user-gql";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/Button";
import FetchError from "@/app/components/FetchError";

const CreateUser = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [createUserMutation, { loading }] = useMutation<
    CreateUserGqlMutation,
    CreateUserGqlMutationVariables
  >(CREATE_USER_GQL);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserInput) => {
    const response = await createUserMutation({
      variables: {
        createUserInput: {
          email: data.email,
          password: data.password,
          passwordConfirmation: data.password_confirm,
          phone_number: data.phone_number,
          name: data.name,
        },
      },
    });
    if (!loading) {
      if (response.data?.createUserGql.user) {
        localStorage.setItem(
          "activation_token",
          response.data.createUserGql.activation_token as string,
        );
        localStorage.setItem(
          "user_email",
          response.data.createUserGql.user.email,
        );
        toast.success("User created successfully.");
        router.push("/auth/confirm-email");
      }
      if (response.data?.createUserGql.error) {
        toast.error(response.data.createUserGql.error);
      }
    }
    reset();
  };
  return (
    <main className="overflow-hidden">
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form onSubmit={handleSubmit(onSubmit)} className="p-7 sm:p-11">
            <div className="flex items-start">
              <Link href="/" title="Home">
                <Logo className="h-12" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">가입하기</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              계속하려면 계정을 만드세요!
            </p>
            <div className="mt-8 space-y-3">
              <label className="text-sm/5 font-medium">Email</label>
              <input
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
            </div>
            {errors.email && <FetchError message={errors.email?.message} />}
            <div className="mt-8 space-y-3">
              <label className="text-sm/5 font-medium">Name</label>
              <input
                {...register("name")}
                required
                autoFocus
                type="text"
                name="name"
                className={clsx(
                  "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                  "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                  "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black",
                )}
              />
            </div>
            {errors.name && <FetchError message={errors.name?.message} />}

            <div className="mt-8 space-y-3">
              <label className="text-sm/5 font-medium">Phone</label>
              <input
                {...register("phone_number")}
                required
                autoFocus
                type="text"
                name="phone_number"
                className={clsx(
                  "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                  "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                  "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black",
                )}
              />
            </div>
            {errors.phone_number && (
              <FetchError message={errors.phone_number?.message} />
            )}

            <div className="mt-8 space-y-3 relative">
              <label className="text-sm/5 font-medium">Password</label>
              <input
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
            </div>
            {errors.password && (
              <FetchError message={errors.password?.message} />
            )}
            <div className="mt-8 space-y-3 relative">
              <label className="text-sm/5 font-medium">Password-Confirm</label>
              <input
                {...register("password_confirm")}
                required
                type={`${show ? "password" : "text"}`}
                name="password_confirm"
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
            </div>
            {errors.password_confirm && (
              <FetchError message={errors.password_confirm?.message} />
            )}
            <div className="mt-8">
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full"
              >
                가입하기
              </Button>
            </div>
          </form>
          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            계정이 있으신가요?{" "}
            <Link
              href="/auth/login"
              className="font-medium hover:text-gray-600"
              title="Login"
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateUser;
