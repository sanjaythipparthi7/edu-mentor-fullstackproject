import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  // Fetch all users from backend
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
        loadUsers(); // refresh data
      } catch (error) {
        console.log("Delete error:", error);
      }
    }
  };

  // Filtering and searching
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <Navbar />

      <div style={container}>
        <h1 style={title}>Manage Users</h1>

        {/* Filters */}
        <div style={filterBox}>
          <input
            type="text"
            placeholder="Search by name or email..."
            style={searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            style={filterSelect}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        {/* Users Table */}
        <div style={table}>
          <div style={tableHeader}>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Actions</span>
          </div>

          {filteredUsers.map((u) => (
            <div key={u.id} style={tableRow}>
              <span>{u.name}</span>
              <span>{u.email}</span>

              {/* Role Badge */}
              <span>
                <span
                  style={{
                    ...badge,
                    background:
                      u.role === "ADMIN"
                        ? "#c62828"
                        : u.role === "TEACHER"
                        ? "#1565c0"
                        : "#2e7d32",
                  }}
                >
                  {u.role}
                </span>
              </span>

              <span>
                <button
                  style={deleteBtn}
                  onClick={() => deleteUser(u.id)}
                >
                  Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ManageUsersPage;

/* ------------------ STYLES ------------------ */

const container = {
  padding: "30px",
  background: "#f5f7ff",
  minHeight: "90vh",
};

const title = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#012b62",
  marginBottom: "20px",
};

const filterBox = {
  display: "flex",
  gap: "15px",
  marginBottom: "25px",
};

const searchInput = {
  padding: "10px",
  width: "250px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const filterSelect = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const table = {
  background: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  background: "#012b62",
  color: "white",
  padding: "12px",
  fontWeight: "bold",
};

const tableRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr",
  padding: "12px",
  borderBottom: "1px solid #eee",
  alignItems: "center",
};

const badge = {
  padding: "5px 10px",
  borderRadius: "15px",
  color: "white",
  fontWeight: "bold",
};

const deleteBtn = {
  background: "#d9534f",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

