import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AuthRequest from "../interfaces/AuthRequest";

class Authorization {
  private checkRole(allowedRoles: string[], req: AuthRequest, res: Response, next: NextFunction): void {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        res.status(401).json({ message: "يرجى تسجيل الدخول " });
        return;
      }

      const secretKey = process.env.JWT_SECRET_KEY as string;
      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      if (!decoded.userId || !decoded.role) {
        res.status(403).json({ message: "التوكن غير صحيح" });
        return;
      }

      if (!allowedRoles.includes(decoded.role)) {
        res.status(403).json({ message: "ليس لديك صلاحية لهذا الإجراء" });
        return;
      }

      req.user = { userId: decoded.userId, role: decoded.role };
      next();
    } catch (error) {
      res.status(401).json({ message: "انتهت الجلسة، سجل دخول من جديد" });
    }
  }

  IsSecretary = (req: AuthRequest, res: Response, next: NextFunction): void => {
    this.checkRole(["secretary"], req, res, next);
  };

  IsHead = (req: AuthRequest, res: Response, next: NextFunction): void => {
    this.checkRole(["head"], req, res, next);
  };

  IsLoggedIn = (req: AuthRequest, res: Response, next: NextFunction): void => {
    this.checkRole(["secretary", "head"], req, res, next);
  };
}

export default new Authorization();
