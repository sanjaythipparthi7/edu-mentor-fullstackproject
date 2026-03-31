import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Admissions() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={heroTitle}>Admissions at EduMentor</h1>
        <p style={heroSubtitle}>
          Join thousands of learners advancing their education with our smart platform.
        </p>
        <button style={heroButton}>Start Your Application</button>
      </section>

      {/* Steps Section */}
      <section style={stepsContainer}>
        <h2 style={sectionTitle}>How the Admission Process Works</h2>

        <div style={stepsBox}>
          <div style={stepCard}>
            <div style={stepNumber}>1</div>
            <h3 style={stepTitle}>Register Online</h3>
            <p style={stepText}>
              Create your account and provide necessary basic information to begin.
            </p>
          </div>

          <div style={stepCard}>
            <div style={stepNumber}>2</div>
            <h3 style={stepTitle}>Submit Details</h3>
            <p style={stepText}>
              Fill in academic details, course preferences, and upload documents.
            </p>
          </div>

          <div style={stepCard}>
            <div style={stepNumber}>3</div>
            <h3 style={stepTitle}>Verification</h3>
            <p style={stepText}>
              Our team verifies your details and ensures your eligibility.
            </p>
          </div>

          <div style={stepCard}>
            <div style={stepNumber}>4</div>
            <h3 style={stepTitle}>Admission Confirmation</h3>
            <p style={stepText}>
              Once approved, your admission gets confirmed and you'll be notified.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section style={programContainer}>
        <h2 style={sectionTitle}>Programs Offered</h2>

        <div style={programBox}>
          <div style={programCard}>
            <h3 style={programTitle}>Primary Education</h3>
            <p style={programText}>
              Engaging foundation-level programs for early learners.
            </p>
          </div>

          <div style={programCard}>
            <h3 style={programTitle}>Secondary Education</h3>
            <p style={programText}>
              Strengthening academic excellence with structured learning.
            </p>
          </div>

          <div style={programCard}>
            <h3 style={programTitle}>Higher Education</h3>
            <p style={programText}>
              Advanced programs preparing learners for future careers.
            </p>
          </div>

          <div style={programCard}>
            <h3 style={programTitle}>Skill Development</h3>
            <p style={programText}>
              Boost your career with hands-on training and industry skills.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Admissions;

/* ---------- Styles ---------- */

const heroSection = {
  padding: "90px 20px",
  textAlign: "center",
  background: "linear-gradient(to right, #eef3ff, #dce7ff)",
};

const heroTitle = {
  fontSize: "42px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "10px",
};

const heroSubtitle = {
  fontSize: "18px",
  color: "#444",
  marginBottom: "20px",
};

const heroButton = {
  padding: "12px 25px",
  background: "#003b88",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

const stepsContainer = {
  padding: "50px 20px",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "32px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "40px",
};

const stepsBox = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
};

const stepCard = {
  width: "260px",
  padding: "25px",
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const stepNumber = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  background: "#003b88",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  margin: "0 auto 15px",
};

const stepTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#002a62",
  marginBottom: "10px",
};

const stepText = {
  fontSize: "15px",
  color: "#555",
};

const programContainer = {
  padding: "50px 20px",
  background: "#f6f9ff",
};

const programBox = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  marginTop: "20px",
};

const programCard = {
  width: "260px",
  padding: "25px",
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const programTitle = {
  fontSize: "20px",
  color: "#003b88",
  fontWeight: "bold",
  marginBottom: "10px",
};

const programText = {
  fontSize: "15px",
  color: "#555",
};
