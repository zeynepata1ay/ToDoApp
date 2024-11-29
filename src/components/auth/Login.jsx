import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setError("");
      await login(email, password);
      navigate("/"); // Redirect to the main app page after successful login
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto mt-20 p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-center text-2xl font-bold mb-4 dark:text-white">Log In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="input-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium dark:text-gray-300">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="input-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full"
        >
          Log In
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm dark:text-gray-300">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
