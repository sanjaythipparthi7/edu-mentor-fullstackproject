import React, { useState } from "react";
import Layout from "../components/Layout";

function AddCoursePage() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [teacherName, setTeacherName] = useState("");

  const handleAddCourse = (e) => {
    e.preventDefault();

    if (!courseName || !teacherName) {
      alert("Please enter both course name and teacher name.");
      return;
    }

    const newCourse = {
      id: Date.now(),
      courseName,
      teacherName,
    };

    setCourses([...courses, newCourse]);
    setCourseName("");
    setTeacherName("");
  };

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h2 style={{ marginBottom: "10px", color: "#333" }}>Add New Course</h2>
        <form
          onSubmit={handleAddCourse}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "300px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            placeholder="Teacher Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#2575fc",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Course
          </button>
        </form>

        <h3 style={{ color: "#444" }}>Course List</h3>
        {courses.length === 0 ? (
          <p>No courses added yet.</p>
        ) : (
          <table
            style={{
              borderCollapse: "collapse",
              width: "80%",
              maxWidth: "600px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={thStyle}>Course Name</th>
                <th style={thStyle}>Teacher Name</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td style={tdStyle}>{course.courseName}</td>
                  <td style={tdStyle}>{course.teacherName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

const thStyle = {
  padding: "10px",
  border: "1px solid #ccc",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ccc",
};

export default AddCoursePage;
