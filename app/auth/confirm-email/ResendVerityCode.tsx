import React from "react";
import { useMutation } from "@apollo/client";
import { RESEND_CONFIRM_EMAIL_GQL } from "@/app/graphql/authGql/resend-confirm-email-gql";
import {
  ResendVerificationCodeMutation,
  ResendVerificationCodeMutationVariables,
} from "@/generated/graphql";
import toast from "react-hot-toast";

const ResendVerityCode = ({ message }: { message: string }) => {
  const [resendVerityCodeMutation, { loading }] = useMutation<
    ResendVerificationCodeMutation,
    ResendVerificationCodeMutationVariables
  >(RESEND_CONFIRM_EMAIL_GQL, { errorPolicy: "all" });

  const reSendCodeHandler = async () => {
    const activation_token = localStorage.getItem("activation_token");

    const response = await resendVerityCodeMutation({
      variables: {
        resendVerificationCodeInput: {
          activation_token: activation_token as string,
        },
      },
    });
    console.log(response);
    try {
      if (response.data?.resendVerificationCode.ok) {
        console.log("ok", response);
      }
      if (!response.data?.resendVerificationCode.ok) {
        toast.error(response.data?.resendVerificationCode.error);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <button
      onClick={reSendCodeHandler}
      className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
    >
      <span className="text-sm/6 font-semibold">{message}</span>
    </button>
  );
};

export default ResendVerityCode;
