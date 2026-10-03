import { z } from "zod";
import { idSchema } from "./idValidation";

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "التاريخ لازم يكون بالشكل 2026-10-01");

const textSchema = z
  .string()
  .min(1, "اكتب نص المهمة")
  .max(300, "نص المهمة طويل جدًا");

export const createTaskValidation = z.object({
  body: z.object({
    text: textSchema,
    date: dateSchema,
  }),
});

export const updateTaskValidation = z.object({
  params: z.object({ id: idSchema }),
  body: z.object({ text: textSchema }),
});

export const getTasksValidation = z.object({
  query: z.object({
    from: dateSchema,
    to: dateSchema,
  }),
});
