import { useEffect, useState } from "react";
import { useTask } from "../hooks/useTask";

function TaskForm() {
  const {
    addTask,
    updateTask,
    editingTask,
    setEditingTask,
  } = useTask();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!editingTask) return;

    setTitle(editingTask.title || "");
    setDescription(editingTask.description || "");
    setPriority(editingTask.priority || "medium");
    setDueDate(editingTask.dueDate || "");
  }, [editingTask]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    const taskData = {
      title,
      description,
      priority,
      dueDate,
    };

    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      addTask(taskData);
    }

    resetForm();
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {editingTask && (
        <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 border border-blue-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <p className="text-sm font-medium text-blue-700">
              Editing: {editingTask.title}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCancelEdit}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Task Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Description
        </label>

        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your task..."
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
          Due Date
        </label>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">

        <button
          type="submit"
          className="flex-1 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          {editingTask
            ? "Update Task"
            : "Create Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="px-6 py-2.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default TaskForm;