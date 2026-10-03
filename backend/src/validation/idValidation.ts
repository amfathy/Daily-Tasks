import { z } from "zod";

export const idSchema = z.string().uuid("رقم المهمة غير صحيح");

export const validateId = z.object({
  params: z.object({ id: idSchema }),
});
