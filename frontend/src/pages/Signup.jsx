// frontend/src/pages/Signup.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/signup",
        form,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Save token to localStorage for authenticated requests
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      onSignup?.(res.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create an Account
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
