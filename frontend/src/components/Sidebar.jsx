import { FiHome,FiPlusCircle, FiCheckSquare, FiFlag, FiSettings } from "react-icons/fi";

const Sidebar = ({ activePage = "dashboard", onPageChange }) => {
  const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "tasks", label: "Tasks", icon: FiCheckSquare },
  { id: "new-task", label: "New Task", icon: FiPlusCircle },
  { id: "completed", label: "Completed", icon: FiFlag },
  { id: "settings", label: "Settings", icon: FiSettings },
];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full">
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">
          Task<span className="text-gray-300">Manager</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">Internship Project</p>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange?.(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          © 2024 Task Manager
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;