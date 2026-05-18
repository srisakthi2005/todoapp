import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth.service.js";

const Header = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container header-row">
        <h1>Todo App</h1>
        <nav>
          {authenticated ? (
            <>
              <Link to="/tasks">Tasks</Link>
              <Link to="/summary">Summary</Link>
              <button type="button" onClick={handleLogout} className="link-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
