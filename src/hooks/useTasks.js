import { useState } from "react";

export function useTasks(initialTasks = []) {
  const [tasks, setTasks] = useState(initialTasks);

  // Add a new task
  function addTask(taskText, projectId) {
    if (taskText.trim() === "") return;

    const newTask = {
      id: Math.random(),
      text: taskText,
      projectId,
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }

  // Delete an existing task
  function deleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  // Get tasks for a specific project
  function getTasksForProject(projectId) {
    return tasks.filter((task) => task.projectId === projectId);
  }

  return { tasks, addTask, deleteTask, getTasksForProject };
}
