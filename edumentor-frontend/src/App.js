import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Admissions from "./pages/Admissions";
import Exams from "./pages/Exams";
import Schools from "./pages/Schools";
import Placements from "./pages/Placements";
import ManageUsersPage from "./pages/ManageUsersPage";
import ManageCoursesPage from "./pages/ManageCoursesPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import SettingsPage from "./pages/SettingsPage";
import AttendancePage from "./pages/AttendancePage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ReportsPage from "./pages/ReportsPage";
import ProgressPage from "./pages/ProgressPage";
import CoursesPage from "./pages/CoursesPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/"            element={<HomePage />} />
        <Route path="/home"        element={<HomePage />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/about"       element={<About />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/admissions"  element={<Admissions />} />
        <Route path="/exams"       element={<Exams />} />
        <Route path="/schools"     element={<Schools />} />
        <Route path="/placements"  element={<Placements />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* ── Protected Routes (any logged-in user) ── */}
        <Route path="/dashboard"   element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile"     element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/courses"     element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/progress"    element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="/dashboard/assignments" element={<ProtectedRoute><AssignmentsPage /></ProtectedRoute>} />
        <Route path="/dashboard/settings"    element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/dashboard/attendance"  element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
        <Route path="/dashboard/reports"     element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
        <Route path="/dashboard/manage-users"   element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />
        <Route path="/dashboard/manage-courses" element={<ProtectedRoute><ManageCoursesPage /></ProtectedRoute>} />

        {/* ── Role-Based Routes ── */}
        <Route path="/admin-dashboard"
          element={<RoleProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></RoleProtectedRoute>} />
        <Route path="/manage-users"
          element={<RoleProtectedRoute allowedRoles={["ADMIN"]}><ManageUsersPage /></RoleProtectedRoute>} />
        <Route path="/dashboard/teacher"
          element={<RoleProtectedRoute allowedRoles={["TEACHER"]}><TeacherDashboard /></RoleProtectedRoute>} />
        <Route path="/dashboard/student"
          element={<RoleProtectedRoute allowedRoles={["STUDENT"]}><StudentDashboard /></RoleProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
