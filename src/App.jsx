import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/SignUp/SignUp";

// ✅ Utility to check if user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Check if token exists
};

// ✅ Protected route component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 👇 Redirect root (/) to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 👇 Login and Signup pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 👇 Protected Dashboard route */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />

        {/* 👇 404 route */}
        <Route
          path="*"
          element={
            <div className="p-8 text-center text-red-600">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
