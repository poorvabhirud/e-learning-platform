import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage.jsx";
import CoursesPage from "../pages/CoursesPage.jsx";
import CourseDetailPage from "../pages/CourseDetailPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import AdminPage from "../pages/AdminPage.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
         // <PrivateRoute requiredRole="admin">
            <AdminPage />
         // </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
