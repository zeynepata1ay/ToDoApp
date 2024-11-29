import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Prevent rendering before auth state is resolved
  const [authError, setAuthError] = useState(null);

  // Sign up function
  async function signup(email, password, displayName = "") {
    setAuthError(null); // Clear previous errors
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's profile if displayName is provided
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      const { email: userEmail, uid } = userCredential.user;
      setCurrentUser({ displayName, email: userEmail, uid });
      return userCredential.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  // Login function
  async function login(email, password) {
    setAuthError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { displayName, email: userEmail, uid } = userCredential.user;
      setCurrentUser({ displayName, email: userEmail, uid });
      return userCredential.user;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  // Logout function
  async function logout() {
    setAuthError(null);
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  }

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid } = user;
        setCurrentUser({ displayName, email, uid });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return unsubscribe; //listener is  removed when the component unmounts
  }, []);

  // Provide current user and auth functions
  const value = {
    currentUser,
    signup,
    login,
    logout,
    authError,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children} {/* Render loading state */}
    </AuthContext.Provider>
  );
}
