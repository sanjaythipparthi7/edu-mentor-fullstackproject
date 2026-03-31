import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

/*
  Expected course object shape from backend:
  {
    id: 1,
    title: "Intro to Java",
    description: "Basics of Java...",
    category: "Programming",
    price: 0,
    duration: "6 weeks"
  }
*/

function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    duration: ""
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
  };

  const openCreate = () => {
    setEditingCourse(null);
    setForm({ title: "", description: "", category: "", price: "", duration: "" });
    setShowForm(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setForm({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "",
      price: course.price ?? "",
      duration: course.duration || ""
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  const handleFormChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      if (editingCourse) {
        // Update
        await axios.put(`http://localhost:8080/api/courses/${editingCourse.id}`, {
          ...form,
          price: parseFloat(form.price || 0)
        });
      } else {
        // Create
        await axios.post("http://localhost:8080/api/courses", {
          ...form,
          price: parseFloat(form.price || 0)
        });
      }
      await loadCourses();
      closeForm();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Error saving course. See console.");
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/courses/${id}`);
      loadCourses();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting course.");
    }
  };

  const filtered = courses.filter(c => {
    const matchesSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "ALL" || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // derive categories for filter dropdown
  const categories = ["ALL", ...Array.from(new Set(courses.map(c => c.category).filter(Boolean)))];

  return (
    <>
      <Navbar />

      <div style={page}>
        <h1 style={heading}>Manage Courses</h1>

        <div style={controls}>
          <input
            placeholder="Search courses..."
            style={searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select style={selectStyle} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <button style={primaryBtn} onClick={openCreate}>+ Add Course</button>
        </div>

        <div style={cardList}>
          {filtered.length === 0 && <div style={{ padding: 20 }}>No courses found.</div>}

          {filtered.map(course => (
            <div key={course.id} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ margin: "0 0 6px" }}>{course.title}</h3>
                  <div style={{ fontSize: 13, color: "#555", marginBottom: 8 }}>
                    {course.description?.slice(0, 140)}{course.description?.length > 140 ? "..." : ""}
                  </div>
                  <div style={{ fontSize: 13, color: "#333" }}>
                    <strong>Category:</strong> {course.category || "—"} &nbsp; • &nbsp;
                    <strong>Duration:</strong> {course.duration || "—"}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: "bold", color: "#012b62", marginBottom: 10 }}>₹{course.price ?? 0}</div>
                  <button style={secondaryBtn} onClick={() => openEdit(course)}>Edit</button>
                  <button style={dangerBtn} onClick={() => deleteCourse(course.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Modal form */}
      {showForm && (
        <div style={modalOverlay}>
          <div style={modal}>
            <h2 style={{ marginTop: 0 }}>{editingCourse ? "Edit Course" : "Create Course"}</h2>

            <form onSubmit={submitForm}>
              <label style={label}>Title</label>
              <input name="title" value={form.title} onChange={handleFormChange} style={input} />

              <label style={label}>Description</label>
              <textarea name="description" value={form.description} onChange={handleFormChange} style={textarea} />

              <label style={label}>Category</label>
              <input name="category" value={form.category} onChange={handleFormChange} style={input} />

              <label style={label}>Duration</label>
              <input name="duration" value={form.duration} onChange={handleFormChange} style={input} placeholder="e.g. 6 weeks" />

              <label style={label}>Price (INR)</label>
              <input name="price" value={form.price} onChange={handleFormChange} style={input} type="number" />

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
                <button type="button" onClick={closeForm} style={cancelBtn}>Cancel</button>
                <button type="submit" style={primaryBtn}>{editingCourse ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageCoursesPage;

/* ---------------- Styles ---------------- */

const page = {
  padding: 28,
  background: "#f5f7ff",
  minHeight: "88vh"
};

const heading = {
  color: "#012b62",
  marginBottom: 18
};

const controls = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  marginBottom: 18
};

const searchInput = {
  padding: "10px",
  borderRadius: 6,
  border: "1px solid #ccc",
  width: 300
};

const selectStyle = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #ccc"
};

const primaryBtn = {
  background: "#1976d2",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: 6,
  cursor: "pointer"
};

const secondaryBtn = {
  background: "#efefef",
  border: "1px solid #ddd",
  padding: "6px 10px",
  borderRadius: 6,
  marginBottom: 6,
  cursor: "pointer"
};

const dangerBtn = {
  background: "#d32f2f",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  cursor: "pointer",
  marginLeft: 6
};

const cardList = {
  display: "grid",
  gap: 12
};

const card = {
  background: "white",
  padding: 16,
  borderRadius: 10,
  boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const modal = {
  width: 680,
  background: "white",
  padding: 20,
  borderRadius: 10
};

const label = { display: "block", marginTop: 8, marginBottom: 6, fontWeight: 600 };

const input = { padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" };

const textarea = { minHeight: 90, padding: 10, width: "100%", borderRadius: 6, border: "1px solid #ccc" };

const cancelBtn = {
  background: "#f0f0f0",
  border: "1px solid #ddd",
  padding: "10px 14px",
  borderRadius: 6,
  cursor: "pointer"
};
