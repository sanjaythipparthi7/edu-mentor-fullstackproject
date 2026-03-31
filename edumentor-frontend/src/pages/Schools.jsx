import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Schools() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={heroTitle}>Explore Our Schools</h1>
        <p style={heroSubtitle}>
          A diverse range of school programs designed to empower learning for every stage.
        </p>
      </section>

      {/* School Categories */}
      <section style={schoolsContainer}>
        <h2 style={sectionTitle}>School Programs We Offer</h2>

        <div style={schoolBox}>
          <div style={schoolCard}>
            <h3 style={schoolTitle}>Primary School</h3>
            <p style={schoolText}>
              Building strong foundations for young learners with engaging lessons and activities.
            </p>
            <button style={btnLearnMore}>Learn More</button>
          </div>

          <div style={schoolCard}>
            <h3 style={schoolTitle}>Middle School</h3>
            <p style={schoolText}>
              Encouraging curiosity and conceptual understanding through structured academics.
            </p>
            <button style={btnLearnMore}>Learn More</button>
          </div>

          <div style={schoolCard}>
            <h3 style={schoolTitle}>High School</h3>
            <p style={schoolText}>
              Preparing students for higher education and career readiness with advanced learning.
            </p>
            <button style={btnLearnMore}>Learn More</button>
          </div>

          <div style={schoolCard}>
            <h3 style={schoolTitle}>Skill Development School</h3>
            <p style={schoolText}>
              Empowering learners with specialized skills in technology, arts, and vocational areas.
            </p>
            <button style={btnLearnMore}>Learn More</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={ctaSection}>
        <h2 style={ctaHeading}>Start Your Learning Journey Today</h2>
        <p style={ctaText}>
          Join EduMentor and choose the right path towards a brighter future.
        </p>
        <button style={ctaButton}>Explore Admissions</button>
      </section>

      <Footer />
    </>
  );
}

export default Schools;

/* ---------- Styles ---------- */

const heroSection = {
  padding: "90px 20px",
  textAlign: "center",
  background: "linear-gradient(to right, #f0f7ff, #d7e8ff)",
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
};

const schoolsContainer = {
  padding: "50px 20px",
};

const sectionTitle = {
  textAlign: "center",
  fontSize: "32px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "40px",
};

const schoolBox = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
};

const schoolCard = {
  width: "260px",
  padding: "25px",
  background: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const schoolTitle = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "10px",
};

const schoolText = {
  fontSize: "15px",
  color: "#555",
  marginBottom: "15px",
};

const btnLearnMore = {
  padding: "10px 20px",
  backgroundColor: "#003b88",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const ctaSection = {
  marginTop: "50px",
  padding: "60px 20px",
  textAlign: "center",
  background: "#003b88",
  color: "white",
};

const ctaHeading = {
  fontSize: "32px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const ctaText = {
  fontSize: "18px",
  marginBottom: "20px",
};

const ctaButton = {
  padding: "12px 25px",
  background: "white",
  color: "#003b88",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
