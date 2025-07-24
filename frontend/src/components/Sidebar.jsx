// src/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ onLogout, userName }) => {
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded-md text-sm font-medium tracking-wide transition duration-200 ${
      isActive
        ? "bg-gray-700 text-white shadow-md"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col border-r border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-semibold text-white tracking-wide">
          DineBoard
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          {userName ? `Hello, ${userName}` : "Your Smart Meal Planner"}
        </p>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <li>
            <NavLink to="/" className={linkClasses} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/saved-meals" className={linkClasses}>
              Saved Meals
            </NavLink>
          </li>
          <li>
            <NavLink to="/summary" className={linkClasses}>
              Daily Summary
            </NavLink>
          </li>
          <li>
            <NavLink to="/meal-suggestions" className={linkClasses}>
              Meal Suggestions
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={linkClasses}>
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>

      <footer className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full text-left text-gray-300 hover:text-white hover:bg-gray-700 px-4 py-2 rounded-md text-sm"
        >
          Logout
        </button>
        <p className="mt-4 text-xs text-gray-500 text-center">
          &copy; {new Date().getFullYear()} DineBoard Inc.
        </p>
      </footer>
    </aside>
  );
};

export default Sidebar;
