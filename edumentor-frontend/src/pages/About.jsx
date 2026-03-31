import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={heroTitle}>About EduMentor</h1>
        <p style={heroSubtitle}>
          Empowering students, teachers, and administrators with a modern digital learning ecosystem.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section style={container}>
        <div style={sectionBox}>
          <h2 style={sectionTitle}>Our Mission</h2>
          <p style={sectionText}>
            To simplify academic management by providing a smart, secure, and efficient platform
            for educational institutions. EduMentor helps automate tasks, track progress, and improve communication.
          </p>
        </div>

        <div style={sectionBox}>
          <h2 style={sectionTitle}>Our Vision</h2>
          <p style={sectionText}>
            To become India’s most trusted education management solution by offering seamless experiences
            to students, teachers, and administrators.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={featuresSection}>
        <h2 style={sectionTitle}>Why Choose EduMentor?</h2>

        <div style={featureGrid}>
          {[
            "Secure login with JWT authentication",
            "Role-based dashboards for admin, teachers, and students",
            "Easy attendance & assignment management",
            "Centralized academic records",
            "Mobile-friendly responsive design",
            "Fast and scalable backend with Spring Boot",
          ].map((feature, idx) => (
            <div style={featureCard} key={idx}>
              <h3 style={featureTitle}>{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section style={teamSection}>
        <h2 style={sectionTitle}>Our Team</h2>
        <p style={sectionText}>
          EduMentor was developed with passion, dedication, and a mission to enhance education through technology.
          Designed & Developed by <b>Sanjay Thipparthi</b>.
        </p>
      </section>

      <Footer />
    </>
  );
}

export default About;

/* ---------- Styles ---------- */

const heroSection = {
  padding: "80px 0",
  textAlign: "center",
  background: "linear-gradient(to right, #eef3ff, #dce7ff)",
};

const heroTitle = {
  fontSize: "42px",
  fontWeight: "bold",
  color: "#002a62",
  marginBottom: "10px",
};

const heroSubtitle = {
  fontSize: "18px",
  color: "#555",
};

const container = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  padding: "50px 20px",
};

const sectionBox = {
  width: "45%",
  minWidth: "300px",
  background: "#ffffff",
  padding: "25px",
  margin: "10px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const sectionTitle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "10px",
};

const sectionText = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#444",
};

const featuresSection = {
  background: "#f7faff",
  padding: "60px 20px",
  textAlign: "center",
};

const featureGrid = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: "30px",
};

const featureCard = {
  width: "280px",
  padding: "20px",
  margin: "15px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const featureTitle = {
  fontSize: "18px",
  color: "#002a62",
};

const teamSection = {
  padding: "60px 20px",
  textAlign: "center",
};
