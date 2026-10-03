import { Request, Response } from "express";
import AuthRequest from "../interfaces/AuthRequest";
import taskService from "../services/task.service";

class TaskController {
  async getTasks(req: Request, res: Response): Promise<void> {
    const from = req.query.from as string;
    const to = req.query.to as string;
    const result = await taskService.getTasks(from, to);
    res.status(result.status).json({ message: result.message, data: result.data });
  }

  async addTask(req: AuthRequest, res: Response): Promise<void> {
    const { text, date } = req.body;
    const userId = req.user?.userId as string;
    const result = await taskService.addTask(text, date, userId);
    res.status(result.status).json({ message: result.message, data: result.data });
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    const result = await taskService.updateTask(req.params.id, req.body.text);
    res.status(result.status).json({ message: result.message, data: result.data });
  }

  async toggleDone(req: Request, res: Response): Promise<void> {
    const result = await taskService.toggleDone(req.params.id);
    res.status(result.status).json({ message: result.message, data: result.data });
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const result = await taskService.deleteTask(req.params.id);
    res.status(result.status).json({ message: result.message, data: result.data });
  }
}

export default new TaskController();
