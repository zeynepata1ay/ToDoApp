import { useAppContext } from "./context/AppContext";
import NewProject from "./components/projects/NewProject.jsx";
import NoProjectSelected from "./components/projects/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/projects/ProjectsSidebar.jsx";
import SelectedProject from "./components/projects/SelectedProject.jsx";
import ThemeToggle from "./components/shared/ThemeToggle.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";

function App() {
  // Access global state and methods for projects and tasks
  const {
    projectsState, // Contains projects and the currently selected project ID
    addProject,
    deleteProject,
    selectProject,
    resetSelectedProject,
    tasks,
    addTask,
    deleteTask,
  } = useAppContext();

  // Logout function from authentication context
  const { logout } = useAuth();

  // State to manage dark and light mode theme
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Sync theme with localStorage and update the document's root class
  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);

    return () => {
      document.documentElement.classList.remove("dark", "light");
    };
  }, [isDarkMode]);

  console.log(
    "Rendering content for selectedProjectId:",
    projectsState.selectedProjectId
  );

  // Determine the currently selected project
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  // Render content dynamically based on the selected project
  let content;
  if (projectsState.selectedProjectId === null) {
    // No project selected: Show new project creation form
    content = (
      <NewProject
        onAdd={(projectData) => {
          addProject(projectData);
          resetSelectedProject();
        }}
        onCancel={resetSelectedProject} 
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    // No projects yet: Show a placeholder component
    content = <NoProjectSelected onStartAddProject={resetSelectedProject} />;
  } else if (selectedProject) {
    // Project selected: Show project details and tasks
    content = (
      <SelectedProject
        project={selectedProject}
        tasks={tasks.filter((task) => task.projectId === selectedProject.id)}
        onAddTask={(taskText) =>
          addTask({ text: taskText, projectId: selectedProject.id })
        }
        onDeleteTask={deleteTask}
        onDelete={() => {
          deleteProject(selectedProject.id);
          resetSelectedProject();
        }}
      />
    );
  }

  // Function to handle user logout
  async function handleLogout() {
    try {
      await logout();
      window.location.reload(); // Reload to redirect to login
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  }

  // Return the application layout
  return (
    <main className="h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200">
      {/* Header section with theme toggle and logout button */}
      <header className="fixed top-0 left-0 w-full p-4 flex justify-between bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-white z-10 shadow-md">
        <ThemeToggle
          isDarkMode={isDarkMode} // Pass current theme
          onToggle={() => setIsDarkMode((prev) => !prev)}
        />
        <button
          className="ml-4 btn-primary"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </header>

      {/* Sidebar and content layout */}
      <div className="flex-1 flex mt-16">
        <ProjectsSidebar
          onStartAddProject={resetSelectedProject}
          projects={projectsState.projects} 
          onSelectProject={selectProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
        {/* Main content area */}
        <section className="flex-1 p-8">{content}</section>
      </div>
    </main>
  );
}

export default App;