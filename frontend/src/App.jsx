import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import SavedMeals from "./pages/SavedMeals";
import DailySummary from "./pages/DailySummary";
import MealSuggestion from "./components/MealSuggestions";
import Sidebar from "./components/Sidebar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/UserProfile";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage on login/signup
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Clear user from localStorage on logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // PrivateRoute component to guard routes that need authentication
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Show Sidebar only if user is logged in */}
        {user && <Sidebar user={user} onLogout={handleLogout} />}

        <main className="flex-1 p-4 bg-gray-100">
          <Routes key={user ? user._id : "guest"}>
            {/* Public routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup onSignup={handleLogin} />} />

            {/* Private routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/saved-meals"
              element={
                <PrivateRoute>
                  <SavedMeals user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/summary"
              element={
                <PrivateRoute>
                  <DailySummary user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/meal-suggestions"
              element={
                <PrivateRoute>
                  <MealSuggestion user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  {/* 👇 Pass setUser here to allow name update in Profile */}
                  <Profile user={user} setUser={setUser} />
                </PrivateRoute>
              }
            />

            {/* Catch-all fallback route */}
            <Route
              path="*"
              element={
                user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
