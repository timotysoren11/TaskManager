import { useTask } from "../hooks/useTask";

function TaskList({ page = "tasks", onEdit, searchTerm="", filter="all" }) {
  const {
    tasks,
    deleteTask,
    toggleTask,
    setEditingTask,
  } = useTask();

  // Filter tasks according to page
  let filteredTasks =
  page === "completed"
    ? tasks.filter((task) => task.status === "completed")
    : tasks;

// Search
filteredTasks = filteredTasks.filter(
  (task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
);

// Filters
if (filter === "pending") {
  filteredTasks = filteredTasks.filter(
    (task) => task.status === "pending"
  );
}

if (filter === "completed") {
  filteredTasks = filteredTasks.filter(
    (task) => task.status === "completed"
  );
}

if (filter === "high") {
  filteredTasks = filteredTasks.filter(
    (task) =>
      task.priority?.toLowerCase() === "high"
  );
}

  const showEditButton = page === "tasks";

  const priorityStyles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  if (filteredTasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">📝</div>

        <h2 className="text-xl font-semibold text-sky-800-700">
          No Tasks Found
        </h2>

        <p className="text-sky-800-500 mt-2">
          Nothing to display here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Task
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Priority
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Due Date
              </th>

              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {filteredTasks.map((task) => (
              <tr
                key={task._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Task */}
                <td className="px-6 py-4">
                  <div>
                    <h3
                      className={`text-sm font-medium ${
                        task.status === "completed"
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {task.description}
                      </p>
                    )}
                  </div>
                </td>

                {/* Priority */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                      priorityStyles[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {task.status === "completed" ? "Completed" : "Pending"}
                  </span>
                </td>

                {/* Due Date */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "—"}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">

                    {/* Tasks & Dashboard */}
                    {page !== "completed" && (
                      <button
                        onClick={() => toggleTask(task._id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                          task.status === "completed"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-green-50 text-green-700"
                        }`}
                      >
                        {task.status === "completed"
                          ? "Undo"
                          : "Complete"}
                      </button>
                    )}

                    {/* Completed Page */}
                    {page === "completed" && (
                      <button
                        onClick={() => toggleTask(task._id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 ${
                          task.status === "completed" 
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                        }`}
                      >
                        { task.status === "completed" ? "Undo" : "Complete"}
                      </button>
                    )}

                    {/* Edit only on Tasks page */}
                    {showEditButton && (
                      <button
                        onClick={() => {
                          setEditingTask(task);
                          onEdit?.();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors duration-200"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 transition-colors duration-200"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;