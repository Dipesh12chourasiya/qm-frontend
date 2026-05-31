import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuthContext();

  const getInitials = (name) => {
    if (!name) return "U";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          QuizMaster
        </Link>

        {!isAuthenticated ? (
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-neutral-600 hover:text-black">
              Login
            </Link>

            <Link to="/register">
              <button className="bg-black text-white px-5 py-2 rounded-xl">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
              {getInitials(user?.name)}
            </div>

            {/* User Info */}
            <div className="hidden sm:block">
              <p className="font-medium text-sm">{user?.name}</p>

              <p className="text-xs text-neutral-500">{user?.role}</p>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-all duration-200"
              title="Logout"
            >
              <LogOut size={20} strokeWidth={2} className="text-black" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
