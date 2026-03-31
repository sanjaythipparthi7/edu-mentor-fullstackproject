import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";
import AdminDashboard from "./AdminDashboard";
import CoursesPage from "./CoursesPage";
import AssignmentsPage from "./AssignmentsPage";
import AttendancePage from "./AttendancePage";

function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/" />;

  return (
    <Layout>
      <Routes>
        <Route path="student" element={<StudentDashboard />} />
        <Route path="teacher" element={<TeacherDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="assignments" element={<AssignmentsPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        
      </Routes>
    </Layout>
  );
}

export default Dashboard;
