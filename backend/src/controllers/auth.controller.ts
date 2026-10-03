import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(result.status).json({ message: result.message, data: result.data });
  }
}

export default new AuthController();
