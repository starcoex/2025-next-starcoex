import { z } from "zod";

export const VerifyEmailSchema = z.object({
  activation_code: z.string().trim(),
});

export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;
