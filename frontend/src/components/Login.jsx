import { useState } from "react";
import { login } from "../api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await login(username, password);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      onLogin(res.data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h1>المهام اليومية</h1>
        <input placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">دخول</button>
      </form>
    </div>
  );
}

export default Login;
