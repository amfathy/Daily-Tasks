import { Request, Response, NextFunction } from "express";

const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({ message: " خطأ في السيرفر" });
};

export default ErrorHandler;
