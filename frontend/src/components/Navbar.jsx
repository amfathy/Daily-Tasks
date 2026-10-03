function Navbar({ user, onLogout }) {
  return (
    <div className="navbar">
      <h2>المهام اليومية</h2>
      <div>
        <span>{user.name}</span>
        <button onClick={onLogout}>خروج</button>
      </div>
    </div>
  );
}

export default Navbar;
