import { z } from "zod";

export const loginValidation = z.object({
  body: z.object({
    username: z.string().min(1, "اكتب اسم المستخدم"),
    password: z.string().min(1, "اكتب كلمة المرور"),
  }),
});
