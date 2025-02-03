import { gql } from "@apollo/client";

export const RESEND_CONFIRM_EMAIL_GQL = gql`
  mutation ResendVerificationCode(
    $resendVerificationCodeInput: ResendVerificationCodeInput!
  ) {
    resendVerificationCode(
      resendVerificationCodeInput: $resendVerificationCodeInput
    ) {
      ok
      error
    }
  }
`;
