import { useState, useEffect } from "react";
import { getTasks, addTask, editTask, toggleTask, deleteTask } from "../api";
import { toISO } from "../dateHelpers";

function useTasks(days) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const from = toISO(days[0]);
  const to = toISO(days[days.length - 1]);

  async function loadTasks() {
    try {
      const res = await getTasks(from, to);
      setTasks(res.data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [from, to]);

  async function handleAdd(text, date) {
    try {
      await addTask(text, date);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEdit(id, text) {
    try {
      await editTask(id, text);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(id) {
    try {
      await toggleTask(id);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("متأكد إنك عايز تحذف المهمة؟")) return;
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  function tasksOfDay(date) {
    const iso = toISO(date);
    return tasks.filter((t) => t.date === iso);
  }

  return { error, tasksOfDay, handleAdd, handleEdit, handleToggle, handleDelete };
}

export default useTasks;
