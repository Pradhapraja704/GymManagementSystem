import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <header className="navbar">
      <div>
        <h2>Gym Management</h2>
      </div>

      <button onClick={logout} className="logout-button">
        Logout
      </button>
    </header>
  );
};

export default Navbar;