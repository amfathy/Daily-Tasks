const BASE = "/api";

async function request(path, method = "GET", body) {
  const token = localStorage.getItem("token");
  const res = await fetch(BASE + path, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "حصل خطأ");
  return data;
}

export const login = (username, password) => request("/auth/login", "POST", { username, password });
export const getTasks = (from, to) => request(`/tasks?from=${from}&to=${to}`);
export const addTask = (text, date) => request("/tasks", "POST", { text, date });
export const editTask = (id, text) => request(`/tasks/${id}`, "PUT", { text });
export const toggleTask = (id) => request(`/tasks/${id}/toggle`, "PUT");
export const deleteTask = (id) => request(`/tasks/${id}`, "DELETE");
