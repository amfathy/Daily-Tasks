import crypto from "crypto";
import jsonStorage from "../storage/jsonStorage";
import ITask from "../interfaces/Task";

const TASKS_FILE = "tasks.json";

class TaskService {
  async getTasks(from: string, to: string) {
    try {
      const tasks = jsonStorage.read<ITask>(TASKS_FILE);
      const result = tasks
        .filter((t) => t.date >= from && t.date <= to)
        .sort((a, b) => a.date.localeCompare(b.date) || a.createdAt.localeCompare(b.createdAt));
      return { success: true, status: 200, message: "تم جلب المهام", data: result };
    } catch (error) {
      return { success: false, status: 500, message: "حصل خطأ أثناء جلب المهام", data: null };
    }
  }

  async addTask(text: string, date: string, userId: string) {
    try {
      const tasks = jsonStorage.read<ITask>(TASKS_FILE);
      const task: ITask = {
        id: crypto.randomUUID(),
        text,
        date,
        done: false,
        createdBy: userId,
        createdAt: new Date().toISOString(),
      };
      tasks.push(task);
      jsonStorage.write(TASKS_FILE, tasks);
      return { success: true, status: 201, message: "تمت إضافة المهمة", data: task };
    } catch (error) {
      return { success: false, status: 500, message: "حصل خطأ أثناء إضافة المهمة", data: null };
    }
  }

  async updateTask(id: string, text: string) {
    try {
      const tasks = jsonStorage.read<ITask>(TASKS_FILE);
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        return { success: false, status: 404, message: "المهمة غير موجودة", data: null };
      }
      task.text = text;
      jsonStorage.write(TASKS_FILE, tasks);
      return { success: true, status: 200, message: "تم تعديل المهمة", data: task };
    } catch (error) {
      return { success: false, status: 500, message: "حصل خطأ أثناء التعديل", data: null };
    }
  }

  async toggleDone(id: string) {
    try {
      const tasks = jsonStorage.read<ITask>(TASKS_FILE);
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        return { success: false, status: 404, message: "المهمة غير موجودة", data: null };
      }
      task.done = !task.done;
      jsonStorage.write(TASKS_FILE, tasks);
      return { success: true, status: 200, message: "تم تحديث حالة المهمة", data: task };
    } catch (error) {
      return { success: false, status: 500, message: "حصل خطأ أثناء التحديث", data: null };
    }
  }

  async deleteTask(id: string) {
    try {
      const tasks = jsonStorage.read<ITask>(TASKS_FILE);
      const remaining = tasks.filter((t) => t.id !== id);
      if (remaining.length === tasks.length) {
        return { success: false, status: 404, message: "المهمة غير موجودة", data: null };
      }
      jsonStorage.write(TASKS_FILE, remaining);
      return { success: true, status: 200, message: "تم حذف المهمة", data: null };
    } catch (error) {
      return { success: false, status: 500, message: "حصل خطأ أثناء الحذف", data: null };
    }
  }
}

export default new TaskService();
