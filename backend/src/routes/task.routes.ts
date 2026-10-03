import express from "express";
import taskController from "../controllers/task.controller";
import Authorization from "../middlewares/auth.middleware";
import validateResource from "../middlewares/validate.middleware";
import { createTaskValidation, updateTaskValidation, getTasksValidation } from "../validation/task.validation";
import { validateId } from "../validation/idValidation";

const router = express.Router();

router.get("/", Authorization.IsLoggedIn, validateResource(getTasksValidation), taskController.getTasks);

router.post("/", Authorization.IsSecretary, validateResource(createTaskValidation), taskController.addTask);

router.put("/:id", Authorization.IsSecretary, validateResource(updateTaskValidation), taskController.updateTask);

router.put("/:id/toggle", Authorization.IsLoggedIn, validateResource(validateId), taskController.toggleDone);

router.delete("/:id", Authorization.IsLoggedIn, validateResource(validateId), taskController.deleteTask);

export default router;
