import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import TaskList from "../components/TaskList";

// Task hooks
import { useTask } from "../hooks/useTask";

const Dashboard = () => {

  const { tasks } = useTask();
  console.log(tasks);

  const [currentPage, setCurrentPage] = useState("dashboard");
  const [taskFilter, setTaskFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const user  = JSON.parse(localStorage.getItem("user") || "null");

  const pageTitles = {
    dashboard: "Dashboard",
    tasks: "All Tasks",
    "new-task": "New Task",
    completed: "Completed Tasks",
    settings: "Settings",
  };

  // stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const progress = totalTasks === 0 ? 0 : Math.round(
    completedTasks / totalTasks * 100
  );

  const highPriorityTasks = tasks.filter(
    (task) => task.priority?.toLowerCase() === "high"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar
          activePage={currentPage}
          onPageChange={setCurrentPage}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">

            {/* Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentPage === "dashboard"
                  ? `Welcome back, ${user?.username || "User"}`
                  : pageTitles[currentPage]}
              </h1>

              <p className="text-slate-500 mt-2 text-lg">
                Manage your tasks, monitor progress, and stay productive.
              </p>
              <p className="text-sm text-slate-400 mt-3">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Dashboard */}
            {currentPage === "dashboard" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                  <TaskCard
                    title="Total Tasks"
                    value={totalTasks}
                  />

                  <TaskCard
                    title="Completed"
                    value={completedTasks}
                  />

                  <TaskCard
                    title="Pending"
                    value={pendingTasks}
                  />
                </div>

                {/* Form + Progress */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Progress */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-xl font-semibold mb-6">
                      Today's Progress
                    </h2>

                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Completion Rate
                        </span>

                        <span className="font-semibold">
                          {progress}%
                        </span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-sky-800 h-3 rounded-full"
                          style={{
                            width: `${progress}%`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                          Active Tasks
                        </p>

                        <h3 className="text-2xl font-bold mt-1">
                          {pendingTasks}
                        </h3>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                          High Priority
                        </p>

                        <h3 className="text-2xl font-bold text-red-500 mt-1">
                          {highPriorityTasks}
                        </h3>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Recent Tasks */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">

                    <h2 className="text-xl font-semibold">
                      Recent Tasks
                    </h2>

                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search tasks..."
                      className="mt-3 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <TaskList page="dashboard" searchTerm={searchTerm} />
                </div>
              </>
            )}

            {/* Tasks Page */}
            {currentPage === "tasks" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">

                  <h2 className="text-xl font-semibold">
                    All Tasks
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      onClick={() => setTaskFilter("all")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        taskFilter === "all"
                          ? "bg-sky-800 text-white"
                          : "bg-gray-100"
                      }`}
                      >
                        All
                      </button>

                      <button
                      onClick={() => setTaskFilter("pending")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        taskFilter === "pending"
                          ? "bg-sky-800 text-white"
                          : "bg-gray-100"
                      }`}
                      >
                      Pending
                      </button>

                      <button
                      onClick={() => setTaskFilter("completed")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        taskFilter === "completed"
                          ? "bg-sky-800 text-white"
                          : "bg-gray-100"
                      }`}
                      >
                        Completed
                      </button>

                      <button
                      onClick={() => setTaskFilter("high")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        taskFilter === "high"
                          ? "bg-sky-800 text-white"
                          : "bg-gray-100"
                      }`}
                      >
                        High Priority
                      </button> 
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tasks..."
                    className="mt-3 md:mt-0 px-4 py-2 border border-gray-300 rounded-lg w-full md:w-72"
                  />
                </div>

                <TaskList 
                  page="tasks"
                  searchTerm={searchTerm}
                  filter={taskFilter}
                  onEdit={() => setCurrentPage("new-task")}
                />
              </div>
            )}

            {/* New Tasks */}
            {currentPage === "new-task" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-6">
                  New Tasks
                </h2>
                <TaskForm />
              </div>

            )}

            {/* Completed Page */}
            {currentPage === "completed" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-6">
                  Completed Tasks
                </h2>

                <TaskList page="completed" searchTerm={searchTerm} />
              </div>
            )}

            {/* Settings Page */}
            {currentPage === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-xl font-semibold mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Notification Preferences
                    </label>

                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>Email Notifications</option>
                      <option>Push Notifications</option>
                      <option>No Notifications</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Account Type
                    </label>

                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option>Standard User</option>
                      <option>Power User</option>
                    </select>
                  </div>

                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;