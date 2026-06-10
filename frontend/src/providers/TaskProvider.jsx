import { useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import taskApi from "../api/taskApi";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  // Load Tasks
  const fetchTasks = async () => {
    try {
      const response = await taskApi.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Fetch Tasks Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create Task
  const addTask = async ({
    title,
    description,
    priority,
    dueDate,
  }) => {
    try {
      const response = await taskApi.post("/tasks", {
        title,
        description,
        priority,
        dueDate,
      });

      setTasks((prev) => [
        response.data,
        ...prev,
      ]);
    } catch (error) {
      console.error("Add Task Error:", error);
    }
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    try {
      await taskApi.delete(`/tasks/${taskId}`);

      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.error("Delete Task Error:", error);
    }
  };

  // Toggle Task Status
  const toggleTask = async (taskId) => {
    try {
      const response =
        await taskApi.patch(
          `/tasks/${taskId}/toggle`
        );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? response.data
            : task
        )
      );
    } catch (error) {
      console.error("Toggle Task Error:", error);
    }
  };

  // Update Task
  const updateTask = async (
    taskId,
    updatedTask
  ) => {
    try {
      const response =
        await taskApi.put(
          `/tasks/${taskId}`,
          updatedTask
        );

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? response.data
            : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      console.error("Update Task Error:", error);
    }
  };

  const value = {
    tasks,
    filter,
    setFilter,

    addTask,
    deleteTask,
    toggleTask,
    updateTask,

    editingTask,
    setEditingTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};