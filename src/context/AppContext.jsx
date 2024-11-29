import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

// Create the AppContext
const AppContext = createContext();

// Hook to use the AppContext
export function useAppContext() {
  return useContext(AppContext);
}

// AppProvider component to manage tasks and projects
export function AppProvider({ children }) {
  const { currentUser } = useAuth();
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: null,
    projects: [], // set to empty array to prevent runtime errors when rendering projectsState.projects.map(...).

  }); // State for projects and selected project
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true)

  // Fetch projects for the current user from Firestore
  useEffect(() => {
    // No user logged in
    if (!currentUser) {
      setProjectsState({ selectedProjectId: null, projects: [] });
      setTasks([]);
      setLoading(false);
      return;
    }

    // When a user is logged in
    const q = query(
      collection(db, "projects"),
      where("userId", "==", currentUser.uid) // Fetch only the projects of the logged-in user
    );

    const unsubscribe = onSnapshot( //Real-time listener
      q,
      (snapshot) => {
        const projects = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          dueDate: doc.data().dueDate?.toDate() || null, // Convert Firestore Timestamp to JS Date
        }));
        setProjectsState((prev) => ({ ...prev, projects }));
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Fetch tasks for the current user from Firestore
  useEffect(() => {
    if (!currentUser) {
      setTasks([]);
      return;
    }

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", currentUser.uid) // Fetch only the tasks of the logged-in user
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasks);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Add a new project to Firestore
  const addProject = async (projectData) => {
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    try {
      await addDoc(collection(db, "projects"), {
        ...projectData,
        userId: currentUser.uid,
        dueDate: projectData.dueDate
          ? Timestamp.fromDate(new Date(projectData.dueDate))
          : null, 
      });
    } catch (error) {
      console.error("Failed to add project:", error);
    }
  };

  // Delete a project from Firestore
  const deleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  // Add a new task to Firestore
  const addTask = async (taskData) => {
    if (!currentUser) {
      console.error("No user is logged in.");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        ...taskData,
        userId: currentUser.uid,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Delete a task from Firestore
  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Select a project
  const selectProject = (projectId) => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: projectId,
    }));
  };

  // Reset selected project
  const resetSelectedProject = () => {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  };

  // Bundles state variables and functions
  const contextValue = {
    projectsState,
    tasks,
    addProject,
    deleteProject,
    addTask,
    deleteTask,
    selectProject,
    resetSelectedProject,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {!loading && children} {/* Render children only after loading */}
    </AppContext.Provider>
  );
}
