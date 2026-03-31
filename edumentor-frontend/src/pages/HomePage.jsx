import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./HomePage.css";

const FEATURES = [
  { icon:"🎓", title:"Student Dashboard",  desc:"Track courses, assignments, attendance and grades all in one place." },
  { icon:"👨‍🏫", title:"Teacher Portal",    desc:"Create assignments, mark attendance, and monitor student progress." },
  { icon:"🛡️", title:"Admin Control",      desc:"Full user management, course control, reports and platform settings." },
  { icon:"📊", title:"Live Analytics",     desc:"Real-time charts on enrollment, attendance trends and performance." },
  { icon:"🔔", title:"Smart Notifications",desc:"Get instant alerts for assignments, exams, and attendance warnings." },
  { icon:"🔐", title:"Secure & Fast",      desc:"JWT-secured APIs, role-based access control and blazing-fast UI." },
];

const ROLES = [
  {
    title:"For Students",
    gradient:"linear-gradient(135deg,#1a56db,#3b82f6)",
    icon:"🎓",
    items:["View enrolled courses & progress","Submit & track assignments","Monitor attendance records","Check exam schedules","Download study materials"],
  },
  {
    title:"For Teachers",
    gradient:"linear-gradient(135deg,#10b981,#059669)",
    icon:"👨‍🏫",
    items:["Create and manage courses","Upload assignments & materials","Mark & track attendance","Grade student submissions","Communicate with students"],
  },
  {
    title:"For Admins",
    gradient:"linear-gradient(135deg,#6366f1,#7c3aed)",
    icon:"🛡️",
    items:["Manage all users & roles","Create & publish courses","View platform analytics","Configure system settings","Generate detailed reports"],
  },
];

const TESTIMONIALS = [
  { text:"EduMentor completely changed how I track my academics. I know exactly where I stand in every subject!", name:"Priya Sharma", role:"B.Tech Student" },
  { text:"Managing attendance and assignments has never been easier. My students love the interactive dashboards.", name:"Dr. Ramesh Kumar", role:"CS Professor" },
  { text:"As an admin, I finally have full visibility into platform usage. The reports feature is outstanding.", name:"Meena Iyer", role:"College Administrator" },
];

function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">🚀 India's Smartest Education Platform</div>
          <h1 className="hero-title">
            Empowering Education<br />
            with <span>EduMentor</span>
          </h1>
          <p className="hero-subtext">
            A role-based learning management system built for students, teachers, and administrators to manage academics seamlessly.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary">Get Started Free →</Link>
            <Link to="/login"    className="btn-secondary">Sign In</Link>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-2673.jpg"
            alt="EduMentor platform illustration"
          />
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="stats-strip">
        {[
          { num:"5,000+", lbl:"Active Students" },
          { num:"200+",   lbl:"Courses Available" },
          { num:"150+",   lbl:"Expert Teachers" },
          { num:"98%",    lbl:"Satisfaction Rate" },
        ].map(s => (
          <div key={s.lbl} className="stat-item">
            <div className="stat-big">{s.num}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="features-section">
        <h2 className="section-title">Everything You Need to Succeed</h2>
        <p className="section-subtitle">
          A complete academic platform with powerful tools for every role.
        </p>
        <div className="features-container">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roles ── */}
      <section className="roles-section">
        <h2 className="section-title">Built for Every Role</h2>
        <p className="section-subtitle">
          Tailored dashboards and tools for students, teachers, and administrators.
        </p>
        <div className="roles-grid">
          {ROLES.map(r => (
            <div key={r.title} className="role-card">
              <div className="role-card-header" style={{ background:r.gradient }}>
                <div style={{ fontSize:44, marginBottom:10 }}>{r.icon}</div>
                <h3 style={{ color:"#fff", fontSize:22, fontWeight:800 }}>{r.title}</h3>
              </div>
              <div className="role-card-body">
                <ul>
                  {r.items.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <p className="section-subtitle">Trusted by thousands across India.</p>
        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="test-card">
              <p className="test-text">{t.text}</p>
              <div className="test-author">
                <div className="test-avatar">{t.name[0]}</div>
                <div className="test-info">
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2>Ready to Transform Your Learning?</h2>
        <p>Join thousands of students and teachers already using EduMentor.</p>
        <Link to="/register" className="btn-primary" style={{ fontSize:18, padding:"16px 44px" }}>
          Start for Free →
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
