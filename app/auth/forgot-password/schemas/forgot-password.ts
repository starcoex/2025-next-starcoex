import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim(),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
