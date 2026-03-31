import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { loginUser } from "../api/api";

function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [message, setMessage]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [shake, setShake]       = useState(false);

  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await loginUser({ email, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ user: { name: user.name, email: user.email, role: user.role }, token }));
      const role = user.role.toUpperCase();
      if (role === "ADMIN")        navigate("/admin-dashboard");
      else if (role === "TEACHER") navigate("/dashboard/teacher");
      else                         navigate("/dashboard/student");
    } catch {
      setMessage("Invalid email or password. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapper}>
      {/* ── Left Panel ── */}
      <div style={leftPanel}>
        <div style={leftContent}>
          <div style={logoMark}>📚</div>
          <h1 style={brandTitle}>EduMentor</h1>
          <p style={brandTagline}>Empowering learners,<br />one lesson at a time.</p>
          <div style={featureList}>
            {["Role-Based Dashboards", "Real-Time Attendance", "Assignment Tracking", "Course Management"].map(f => (
              <div key={f} style={featureItem}>
                <span style={featureDot}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
        <div style={leftDecor1} />
        <div style={leftDecor2} />
      </div>

      {/* ── Right Panel ── */}
      <div style={rightPanel}>
        <div style={{ ...card, ...(shake ? { animation: "shake .4s ease" } : {}) }}>
          <div style={cardHeader}>
            <h2 style={cardTitle}>Welcome back</h2>
            <p style={cardSub}>Sign in to your EduMentor account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={fieldGroup}>
              <label style={label}>Email address</label>
              <div style={inputWrap}>
                <span style={inputIcon}>✉️</span>
                <input
                  type="email"
                  style={input}
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div style={fieldGroup}>
              <label style={label}>Password</label>
              <div style={inputWrap}>
                <span style={inputIcon}>🔒</span>
                <input
                  type={showPwd ? "text" : "password"}
                  style={input}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" style={eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error */}
            {message && <div style={errorBox}>{message}</div>}

            {/* Submit */}
            <button type="submit" style={submitBtn} disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>

          <p style={footerText}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#1a56db", fontWeight: 600 }}>Create one</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        input:focus { outline:none; border-color:#1a56db !important; box-shadow:0 0 0 3px rgba(26,86,219,.12) !important; }
        button[type=submit]:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,86,219,.45) !important; }
        button[type=submit]:disabled { opacity:0.7; cursor:not-allowed; }
      `}</style>
    </div>
  );
}

export default Login;

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const wrapper      = { display:"flex", minHeight:"100vh", fontFamily:"'Inter',sans-serif" };

const leftPanel    = {
  width:"45%", background:"linear-gradient(135deg,#1a56db 0%,#6366f1 100%)",
  display:"flex", alignItems:"center", justifyContent:"center",
  position:"relative", overflow:"hidden",
  "@media(max-width:768px)":{ display:"none" }
};
const leftContent  = { position:"relative", zIndex:2, color:"#fff", padding:"40px" };
const logoMark     = { fontSize:"52px", marginBottom:"12px" };
const brandTitle   = { fontSize:"42px", fontWeight:800, marginBottom:"12px", letterSpacing:"-1px" };
const brandTagline = { fontSize:"18px", opacity:.85, lineHeight:1.6, marginBottom:"36px" };
const featureList  = { display:"flex", flexDirection:"column", gap:"12px" };
const featureItem  = { display:"flex", alignItems:"center", gap:"10px", fontSize:"15px", opacity:.9 };
const featureDot   = { background:"rgba(255,255,255,.2)", borderRadius:"50%", width:24, height:24,
  display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", flexShrink:0 };
const leftDecor1   = { position:"absolute", top:"-80px", right:"-80px", width:300, height:300,
  borderRadius:"50%", background:"rgba(255,255,255,.08)" };
const leftDecor2   = { position:"absolute", bottom:"-60px", left:"-60px", width:220, height:220,
  borderRadius:"50%", background:"rgba(255,255,255,.06)" };

const rightPanel   = { flex:1, display:"flex", alignItems:"center", justifyContent:"center",
  background:"#f1f5f9", padding:"32px" };
const card         = { background:"#fff", borderRadius:"20px", padding:"40px",
  width:"min(420px,100%)", boxShadow:"0 10px 40px rgba(0,0,0,.1)" };
const cardHeader   = { marginBottom:"28px" };
const cardTitle    = { fontSize:"26px", fontWeight:800, color:"#0f172a", marginBottom:"6px" };
const cardSub      = { color:"#64748b", fontSize:"14px" };

const fieldGroup   = { marginBottom:"18px" };
const label        = { display:"block", fontSize:"13px", fontWeight:600, color:"#334155", marginBottom:"7px" };
const inputWrap    = { position:"relative", display:"flex", alignItems:"center" };
const inputIcon    = { position:"absolute", left:"12px", fontSize:"15px",pointerEvents:"none" };
const input        = { width:"100%", padding:"12px 40px 12px 40px", border:"1.5px solid #e2e8f0",
  borderRadius:"8px", fontSize:"14px", color:"#0f172a", background:"#f8fafc",
  transition:"border .2s,box-shadow .2s" };
const eyeBtn       = { position:"absolute", right:"12px", background:"none", border:"none",
  fontSize:"16px", cursor:"pointer", padding:0 };

const errorBox     = { background:"#fee2e2", color:"#991b1b", borderRadius:"8px",
  padding:"10px 14px", fontSize:"13px", marginBottom:"16px", border:"1px solid #fecaca" };

const submitBtn    = { width:"100%", padding:"13px", background:"linear-gradient(135deg,#1a56db,#6366f1)",
  color:"#fff", border:"none", borderRadius:"8px", fontSize:"15px", fontWeight:700,
  cursor:"pointer", transition:"all .2s", boxShadow:"0 4px 14px rgba(26,86,219,.35)" };

const footerText   = { textAlign:"center", marginTop:"20px", fontSize:"13px", color:"#64748b" };
