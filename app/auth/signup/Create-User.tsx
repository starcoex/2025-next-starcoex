"use client";
import React, { useState } from "react";
import { Link } from "@/app/components/Link";
import { Logo } from "@/app/components/Logo";
import { clsx } from "clsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/generated/graphql";
import { CREATE_USER } from "@/app/graphql/gateway/create-user";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long!"),
  email: z.string().email(),
  phone_number: z.string(),
  password: z.string().min(8, "Password must be at least 8characters long!"),
  password_confirm: z.string().trim(),
});

type SignUpSchema = z.infer<typeof formSchema>;

const CreateUser = () => {
  const [show, setShow] = useState(false);
  // const [state, formAction] = useActionState(createUser, null);

  const [createUserMutation, { loading }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpSchema>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: SignUpSchema) => {
    console.log(data);
    try {
      if (!loading) {
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
        console.log("response", response);
      }
    } catch (err: any) {
      console.log("error", err);
      toast.error(err.message);
    }
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
              <span>{errors.email?.message}</span>
            </div>
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
              <span>{errors.name?.message}</span>
            </div>
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
              <span>{errors.phone_number?.message}</span>
            </div>
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
              <span>{errors.password?.message}</span>
            </div>
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
              <span>{errors.password_confirm?.message}</span>
            </div>
            <div className="mt-8">
              <button type="submit" className="w-full">
                가입하기
              </button>
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
