import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Placements() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={heroTitle}>Placements & Career Support</h1>
        <p style={heroSubtitle}>
          Helping students build successful careers with expert guidance and top company connections.
        </p>
      </section>

      {/* Recruiters Section */}
      <section style={recruitersSection}>
        <h2 style={sectionHeading}>Our Top Recruiters</h2>

        <div style={recruitersGrid}>
          {[
            "Google",
            "Amazon",
            "Infosys",
            "TCS",
            "Wipro",
            "HCL",
            "Microsoft",
            "Accenture",
          ].map((company, index) => (
            <div key={index} style={recruiterCard}>
              <p style={companyLogo}>{company}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Placement Stats */}
      <section style={statsSection}>
        <h2 style={sectionHeading}>Placement Highlights</h2>

        <div style={statsGrid}>
          <div style={statCard}>
            <h3 style={statNumber}>95%</h3>
            <p style={statLabel}>Placement Rate</p>
          </div>

          <div style={statCard}>
            <h3 style={statNumber}>500+</h3>
            <p style={statLabel}>Partner Companies</p>
          </div>

          <div style={statCard}>
            <h3 style={statNumber}>12 LPA</h3>
            <p style={statLabel}>Highest Package</p>
          </div>

          <div style={statCard}>
            <h3 style={statNumber}>4.5 LPA</h3>
            <p style={statLabel}>Average Package</p>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section style={storiesSection}>
        <h2 style={sectionHeading}>Student Success Stories</h2>

        <div style={storiesGrid}>
          <div style={storyCard}>
            <h3 style={storyName}>Rahul Sharma</h3>
            <p style={storyPlaced}>Placed at: Google</p>
            <p style={storyText}>
              “EduMentor helped me improve my technical & soft skills. The mock interviews and training helped me crack Google.”
            </p>
          </div>

          <div style={storyCard}>
            <h3 style={storyName}>Priya Singh</h3>
            <p style={storyPlaced}>Placed at: Infosys</p>
            <p style={storyText}>
              “The placement team guided me through resume building, communication skills, and aptitude preparation.”
            </p>
          </div>

          <div style={storyCard}>
            <h3 style={storyName}>Aman Verma</h3>
            <p style={storyPlaced}>Placed at: Amazon</p>
            <p style={storyText}>
              “Hands-on projects and coding support from EduMentor helped me secure a high-paying role at Amazon.”
            </p>
          </div>
        </div>
      </section>

      {/* Placement Process Section */}
      <section style={processSection}>
        <h2 style={sectionHeading}>Our Placement Process</h2>

        <div style={processSteps}>
          {[
            "Resume Building",
            "Aptitude Training",
            "Technical Training",
            "Mock Interviews",
            "Company Interviews",
            "Final Placement",
          ].map((step, index) => (
            <div key={index} style={processCard}>
              <h4 style={processNumber}>{index + 1}</h4>
              <p style={processText}>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSection}>
        <h2 style={ctaTitle}>Ready to Build Your Career?</h2>
        <p style={ctaSubtitle}>
          Join EduMentor’s Placement Training Program and unlock top opportunities.
        </p>
        <button style={ctaBtn}>Contact Placement Cell</button>
      </section>

      <Footer />
    </>
  );
}

export default Placements;

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

const sectionHeading = {
  textAlign: "center",
  fontSize: "30px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "35px",
};

const recruitersSection = {
  padding: "50px 20px",
  background: "#fff",
};

const recruitersGrid = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
};

const recruiterCard = {
  width: "150px",
  height: "80px",
  background: "#f4f7ff",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#003b88",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const companyLogo = { margin: 0 };

const statsSection = {
  padding: "50px 20px",
  background: "#f0f7ff",
};

const statsGrid = {
  display: "flex",
  justifyContent: "center",
  gap: "25px",
  flexWrap: "wrap",
};

const statCard = {
  background: "white",
  padding: "25px",
  width: "180px",
  textAlign: "center",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const statNumber = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#003b88",
};

const statLabel = {
  fontSize: "14px",
  color: "#555",
};

const storiesSection = {
  padding: "50px 20px",
};

const storiesGrid = {
  display: "flex",
  gap: "25px",
  justifyContent: "center",
  flexWrap: "wrap",
};

const storyCard = {
  width: "300px",
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
};

const storyName = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#003b88",
};

const storyPlaced = {
  fontSize: "14px",
  color: "green",
  marginBottom: "10px",
};

const storyText = {
  fontSize: "15px",
  color: "#444",
};

const processSection = {
  padding: "50px 20px",
  background: "#eef4ff",
};

const processSteps = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const processCard = {
  width: "160px",
  background: "white",
  padding: "20px",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const processNumber = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#003b88",
};

const processText = {
  fontSize: "15px",
  color: "#444",
};

const ctaSection = {
  padding: "70px 20px",
  background: "#003b88",
  textAlign: "center",
  color: "white",
};

const ctaTitle = {
  fontSize: "32px",
  fontWeight: "bold",
};

const ctaSubtitle = {
  fontSize: "18px",
  marginTop: "5px",
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
