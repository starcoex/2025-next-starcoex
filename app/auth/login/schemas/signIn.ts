import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ required_error: "메일은 필수 항목입니다." }).email().trim(),
  password: z.string().trim(),
});
export type SignInInput = z.infer<typeof signInSchema>;
