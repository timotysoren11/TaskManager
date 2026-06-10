import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-bold text-gray-800">
          WORK
          <span className="text-2xl font-semibold text-sky-800">
            Sync
          </span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-sky-800">
            {user?.username || "User"}
          </p>

          <p className="text-xs text-gray-500">
            Developer
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-sky-800 text-white flex items-center justify-center font-semibold">
          {user?.username?.charAt(0).toUpperCase() || "U"}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-sky-500 text-white font-semibold hover:bg-gray-600 transition cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;