import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* TOP BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 15px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        {user.name} ▼
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: 0,
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            borderRadius: "6px",
            padding: "10px",
            width: "180px",
            zIndex: 1000,
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{user.name}</p>
          <p
            style={{ margin: "5px 0 10px 0", color: "#777", fontSize: "13px" }}
          >
            {user.role}
          </p>

          <div
            style={{
              height: "1px",
              backgroundColor: "#ddd",
              margin: "8px 0",
            }}
          ></div>

          <button
            onClick={() => navigate("/profile")}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              padding: "8px",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Profile
          </button>

          <button
            onClick={() => navigate(`/dashboard/${user.role.toLowerCase()}`)}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              padding: "8px",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            Dashboard
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              padding: "8px",
              textAlign: "left",
              cursor: "pointer",
              color: "red",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
