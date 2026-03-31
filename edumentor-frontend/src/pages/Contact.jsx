import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={heroSection}>
        <h1 style={heroTitle}>Contact Us</h1>
        <p style={heroSubtitle}>
          We're here to help! Reach out anytime for support, questions, or feedback.
        </p>
      </section>

      {/* Contact Section */}
      <section style={container}>
        
        {/* Contact Form */}
        <div style={formContainer}>
          <h2 style={sectionTitle}>Send Us a Message</h2>
          <form style={form}>
            <input type="text" placeholder="Your Name" style={input} required />
            <input type="email" placeholder="Your Email" style={input} required />
            <input type="text" placeholder="Subject" style={input} required />
            <textarea placeholder="Your Message" style={textarea} rows={6} required />
            <button type="submit" style={button}>Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div style={infoContainer}>
          <h2 style={sectionTitle}>Get in Touch</h2>
          <p style={infoText}>
            📍 <b>Address:</b> Hyderabad, Telangana, India
          </p>
          <p style={infoText}>
            📧 <b>Email:</b> support@edumentor.com
          </p>
          <p style={infoText}>
            📞 <b>Phone:</b> +91 98765 43210
          </p>
          <p style={infoText}>
            🕒 <b>Hours:</b> Mon – Sat, 10 AM – 6 PM
          </p>

          <h3 style={{ marginTop: "20px", color: "#003b88" }}>Follow Us</h3>
          <p style={infoText}>📘 Facebook | 📸 Instagram | 🐦 Twitter | 💼 LinkedIn</p>
        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contact;

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
  justifyContent: "space-between",
  flexWrap: "wrap",
  padding: "50px 30px",
};

const formContainer = {
  width: "55%",
  minWidth: "320px",
  background: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const sectionTitle = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#003b88",
  marginBottom: "15px",
};

const form = {
  display: "flex",
  flexDirection: "column",
};

const input = {
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const textarea = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const button = {
  padding: "12px",
  background: "#003b88",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

const infoContainer = {
  width: "35%",
  minWidth: "300px",
  background: "#f7faff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const infoText = {
  fontSize: "16px",
  marginBottom: "12px",
  color: "#444",
};
