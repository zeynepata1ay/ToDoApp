import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await signup(email, password);
      navigate("/");
    } catch {
      setError("Failed to sign up");
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-primary w-full mt-1"
            required
          />
        </label>
        <label className="mt-4 block">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-primary w-full mt-1"
            required
          />
        </label>
        <label className="mt-4 block">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-primary w-full mt-1"
            required
          />
        </label>
        <button type="submit" className="btn-primary w-full mt-4">
          Sign Up
        </button>
      </form>
    </div>
  );
}
