import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Exams() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={heroTitle}>Examinations & Assessments</h1>
        <p style={heroSubtitle}>
          Stay updated with exam schedules, formats, and preparation resources.
        </p>
      </section>

      {/* Exam Categories Section */}
      <section style={categorySection}>
        <h2 style={sectionHeading}>Exam Categories</h2>

        <div style={categoriesGrid}>
          <div style={categoryCard}>
            <h3 style={categoryTitle}>Internal Exams</h3>
            <p style={categoryText}>
              Regular assessments, assignments, and periodic tests to track academic performance.
            </p>
            <button style={categoryBtn}>View Details</button>
          </div>

          <div style={categoryCard}>
            <h3 style={categoryTitle}>Board Exams</h3>
            <p style={categoryText}>
              Guidance and resources for state and national board examinations.
            </p>
            <button style={categoryBtn}>View Details</button>
          </div>

          <div style={categoryCard}>
            <h3 style={categoryTitle}>Competitive Exams</h3>
            <p style={categoryText}>
              Training and support for exams like JEE, NEET, UPSC, SSC, Banking and more.
            </p>
            <button style={categoryBtn}>View Details</button>
          </div>

          <div style={categoryCard}>
            <h3 style={categoryTitle}>Skill Assessments</h3>
            <p style={categoryText}>
              Evaluate vocational, communication, and technical skills through specialized tests.
            </p>
            <button style={categoryBtn}>View Details</button>
          </div>
        </div>
      </section>

      {/* Upcoming Exams Section */}
      <section style={upcomingSection}>
        <h2 style={sectionHeading}>Upcoming Exams</h2>

        <div style={examList}>
          <div style={examItem}>
            <h4 style={examTitle}>Mid-Term Examination</h4>
            <p style={examDate}>Starting Date: March 5, 2025</p>
            <button style={downloadBtn}>Download Schedule</button>
          </div>

          <div style={examItem}>
            <h4 style={examTitle}>Final Assessment</h4>
            <p style={examDate}>Starting Date: April 18, 2025</p>
            <button style={downloadBtn}>Download Schedule</button>
          </div>

          <div style={examItem}>
            <h4 style={examTitle}>Skill Certification Test</h4>
            <p style={examDate}>Starting Date: May 2, 2025</p>
            <button style={downloadBtn}>Download Schedule</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSection}>
        <h2 style={ctaTitle}>Need Exam Preparation Support?</h2>
        <p style={ctaSubtitle}>
          Get expert guidance, study materials, and personalized resources.
        </p>
        <button style={ctaBtn}>Contact Academic Support</button>
      </section>

      <Footer />
    </>
  );
}

export default Exams;

/* ------------------ STYLES ------------------ */

const heroSection = {
  padding: "90px 20px",
  background: "linear-gradient(to right, #d7e8ff, #eff6ff)",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "42px",
  color: "#003b88",
  fontWeight: "bold",
  marginBottom: "10px",
};

const heroSubtitle = {
  fontSize: "17px",
  color: "#444",
};

const categorySection = {
  padding: "50px 20px",
};

const sectionHeading = {
  textAlign: "center",
  fontSize: "30px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "35px",
};

const categoriesGrid = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
};

const categoryCard = {
  width: "260px",
  padding: "25px",
  background: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const categoryTitle = {
  fontSize: "22px",
  color: "#003b88",
  fontWeight: "bold",
  marginBottom: "8px",
};

const categoryText = {
  fontSize: "15px",
  color: "#555",
  marginBottom: "12px",
};

const categoryBtn = {
  padding: "10px 20px",
  background: "#003b88",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const upcomingSection = {
  padding: "50px 20px",
  background: "#f0f7ff",
  marginTop: "40px",
};

const examList = {
  maxWidth: "700px",
  margin: "0 auto",
};

const examItem = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "15px",
  boxShadow: "0 3px 12px rgba(0, 0, 0, 0.1)",
};

const examTitle = {
  fontSize: "20px",
  color: "#003b88",
  marginBottom: "5px",
};

const examDate = {
  color: "#444",
  marginBottom: "10px",
};

const downloadBtn = {
  padding: "8px 18px",
  background: "#003b88",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const ctaSection = {
  padding: "60px 20px",
  background: "#003b88",
  textAlign: "center",
  color: "white",
  marginTop: "60px",
};

const ctaTitle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "8px",
};

const ctaSubtitle = {
  fontSize: "18px",
  marginBottom: "20px",
};

const ctaBtn = {
  padding: "12px 25px",
  background: "white",
  color: "#003b88",
  border: "none",
  fontWeight: "bold",
  borderRadius: "8px",
  cursor: "pointer",
};
