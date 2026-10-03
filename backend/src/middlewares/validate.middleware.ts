import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ message: error.errors[0].message });
        return;
      }
      res.status(400).json({ message: "بيانات غير صحيحة" });
    }
  };

export default validateResource;
