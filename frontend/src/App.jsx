import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import SecretaryPage from "./pages/SecretaryPage";
import HeadPage from "./pages/HeadPage";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      {user.role === "secretary" ? <SecretaryPage /> : <HeadPage />}
    </>
  );
}

export default App;
