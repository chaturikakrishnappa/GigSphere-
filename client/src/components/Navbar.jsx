import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          GigSphere
        </Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/browse-gigs">Browse Gigs</Link>
              <Link to="/applications">Applications</Link>
              {user.role === "client" && (
                <>
                  <Link to="/post-gig">Post Gig</Link>
                  <Link to="/ai-matches">AI Matches</Link>
                </>
              )}
              <button onClick={handleLogout} className="rounded-md bg-slate-900 px-3 py-1.5 text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="rounded-md bg-indigo-600 px-3 py-1.5 text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
