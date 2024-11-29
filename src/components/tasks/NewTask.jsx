import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useTheme } from "../../context/ThemeContext";

export default function NewTask({ projectId }) {
  const [enteredTask, setEnteredTask] = useState("");
  const [error, setError] = useState("");

  const { addTask } = useAppContext();
  const { theme } = useTheme();

  function handleChange(event) {
    setEnteredTask(event.target.value);
  }

  async function handleClick() {
    if (!enteredTask.trim()) {
      setError("Task name cannot be empty.");
      return;
    }
    setError("");

    // Add task to Firestore
    try {
      await addTask({
        text: enteredTask,
        projectId,
        completed: false,
        createdAt: new Date(),
      });

      // Clear input after successful addition
      setEnteredTask("");
    } catch (err) {
      setError("Failed to add task. Please try again.");
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${theme === "dark" ? "dark" : ""}`}>
      {/* Error message */}
      {error && (
        <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
      )}
      <div className="flex items-center gap-4">
        {/* Task input */}
        <input
          type="text"
          className="input-primary"
          onChange={handleChange}
          value={enteredTask}
          placeholder="Enter task name..."
        />
        {/* Add Task Button */}
        <button
          className="btn-primary"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
