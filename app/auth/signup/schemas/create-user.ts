import { z } from "zod";
import { checkFirstChar } from "@/app/lib/form-check";
import validator from "validator";

export const createUserSchema = z
  .object({
    email: z
      .string({ required_error: "메일은 필수 항목입니다." })
      .email({ message: "메일 형식이 잘못 되었습니다." })
      .trim(),
    name: z
      .string({ required_error: "이름은 필수 항목입니다." })
      .min(2, { message: "이름은 최소 한글자 이상입니다." })
      .trim()
      .refine(checkFirstChar, {
        message: "첫번째 글자는 숫자는 불가능 합니다.",
      }),
    phone_number: z
      .string({ required_error: "번호는 필수입니다." })
      .trim()
      .transform((value) => "+82" + value.replace(/^0/, ""))
      .refine(
        (phone_number: string) =>
          validator.isMobilePhone(phone_number, "ko-KR"),
        "전화번호 양식이 틀립니다.",
      ),
    password: z
      .string()
      .min(6, { message: "비밀번호는 6자 이상이어야 합니다." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "비밀번호는 최소 하나의 소문자, 대문자, 숫자 및 특수 문자를 포함해야 합니다.",
      ),
    password_confirm: z.string(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "패스워드가 일치하지 않습니다",
    path: ["password_confirm"],
  });
export type CreateUserInput = z.infer<typeof createUserSchema>;
