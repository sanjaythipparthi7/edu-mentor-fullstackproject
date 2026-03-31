import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import {
  FaHome,
  FaUsers,
  FaBook,
  FaTasks,
  FaCog,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import "./Layout.css";

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  let user = null;
try {
  const persistedData = localStorage.getItem("persist:root");
  if (persistedData) {
    const parsedRoot = JSON.parse(persistedData);
    const authData = parsedRoot.auth ? JSON.parse(parsedRoot.auth) : null;

    // ✅ If the structure is directly user not nested
    if (authData?.user?.user) {
      user = authData.user.user;
    } else {
      user = authData?.user || null;
    }
  }
} catch (error) {
  console.error("Error reading user data:", error);
}

console.log("✅ Corrected user object:", user);



  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">EduMentor</div>
        <nav>
          {/* Common for all roles */}
          <Link to="/dashboard" className="nav-item">
            <FaHome /> Dashboard
          </Link>
          <Link to="/dashboard/manage-users" className="nav-item">
            <FaUsers /> Manage Users
          </Link>
          <Link to="/dashboard/manage-courses" className="nav-item">
            <FaBook /> Manage Courses
          </Link>
          <Link to="/dashboard/assignments" className="nav-item">
            <FaTasks /> Assignments
          </Link>
          <Link to="/dashboard/settings" className="nav-item">
            <FaCog /> Settings
          </Link>

          {/* ✅ Teacher Only Options */}
          {user?.role === "teacher" && (
            <>
              <Link to="/dashboard/courses" className="nav-item">
                <FaBook /> Courses
              </Link>
              <Link to="/dashboard/assignments" className="nav-item">
                <FaTasks /> Assignments
              </Link>
              <Link to="/dashboard/attendance" className="nav-item">
                <FaClipboardList /> Attendance
              </Link>
            </>
          )}

          {/* ✅ Student Only Options */}
          {user?.role === "student" && (
            <>
              <Link to="/dashboard/courses" className="nav-item">
                <FaBook /> Courses
              </Link>
              <Link to="/dashboard/assignments" className="nav-item">
                <FaTasks /> Assignments
              </Link>
            </>
          )}
        </nav>

        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <h2>Welcome to EduMentor</h2>
        </header>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
