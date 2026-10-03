import express from "express";
import authController from "../controllers/auth.controller";
import validateResource from "../middlewares/validate.middleware";
import { loginValidation } from "../validation/auth.validation";

const router = express.Router();

router.post("/login", validateResource(loginValidation), authController.login);

export default router;
