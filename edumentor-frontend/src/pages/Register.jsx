import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";

const ROLES = [
  { value:"STUDENT", label:"Student", icon:"🎓", desc:"Access courses & assignments" },
  { value:"TEACHER", label:"Teacher", icon:"👨‍🏫", desc:"Manage classes & content" },
  { value:"ADMIN",   label:"Admin",   icon:"🛡️", desc:"Full platform control" },
];

function Register() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name:"", email:"", password:"", role:"STUDENT" });
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState({ type:"", text:"" });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setMessage({ type:"", text:"" });
    try {
      await registerUser(form);
      setMessage({ type:"success", text:"Account created! Redirecting to login…" });
      setTimeout(() => navigate("/login"), 1600);
    } catch (err) {
      setMessage({ type:"error", text: err.response?.data || "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapper}>
      {/* ── Left Panel ── */}
      <div style={leftPanel}>
        <div style={leftContent}>
          <span style={logoMark}>📚</span>
          <h1 style={brandTitle}>Join EduMentor</h1>
          <p style={brandTagline}>Start your journey with India's smartest education platform.</p>
          <div style={stats}>
            {[["5000+","Students"],["200+","Courses"],["150+","Teachers"]].map(([n,l])=>(
              <div key={l} style={statBox}>
                <div style={statNum}>{n}</div>
                <div style={statLbl}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={decor1}/><div style={decor2}/>
      </div>

      {/* ── Right Panel ── */}
      <div style={rightPanel}>
        <div style={card}>
          <div style={cardHeader}>
            <h2 style={cardTitle}>Create Account</h2>
            <p style={cardSub}>Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Role Selector */}
            <div style={fieldGroup}>
              <label style={label}>I am a…</label>
              <div style={roleGrid}>
                {ROLES.map(r => (
                  <button key={r.value} type="button"
                    style={{ ...roleCard, ...(form.role===r.value ? roleCardActive : {}) }}
                    onClick={() => setForm({ ...form, role: r.value })}>
                    <span style={roleIcon}>{r.icon}</span>
                    <span style={roleName}>{r.label}</span>
                    <span style={roleDesc}>{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div style={fieldGroup}>
              <label style={label}>Full Name</label>
              <div style={inputWrap}>
                <span style={iIcon}>👤</span>
                <input name="name" type="text" style={input} placeholder="John Doe"
                  value={form.name} onChange={handleChange} required />
              </div>
            </div>

            {/* Email */}
            <div style={fieldGroup}>
              <label style={label}>Email Address</label>
              <div style={inputWrap}>
                <span style={iIcon}>✉️</span>
                <input name="email" type="email" style={input} placeholder="you@example.com"
                  value={form.email} onChange={handleChange} required />
              </div>
            </div>

            {/* Password */}
            <div style={fieldGroup}>
              <label style={label}>Password</label>
              <div style={inputWrap}>
                <span style={iIcon}>🔒</span>
                <input name="password" type={showPwd ? "text":"password"} style={input}
                  placeholder="Min 6 characters" value={form.password}
                  onChange={handleChange} required minLength={6} />
                <button type="button" style={eyeBtn} onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? "🙈":"👁️"}
                </button>
              </div>
            </div>

            {/* Message */}
            {message.text && (
              <div style={{ ...msgBox, ...(message.type==="success" ? msgSuccess : msgError) }}>
                {message.type==="success" ? "✅ " : "❌ "}{message.text}
              </div>
            )}

            <button type="submit" style={submitBtn} disabled={loading}>
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>

          <p style={footerTxt}>
            Already have an account?{" "}
            <Link to="/login" style={{ color:"#1a56db", fontWeight:600 }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        input:focus { outline:none; border-color:#1a56db !important; box-shadow:0 0 0 3px rgba(26,86,219,.12) !important; }
        button[type=submit]:hover:not(:disabled){ transform:translateY(-2px); box-shadow:0 8px 24px rgba(26,86,219,.45)!important; }
        button[type=submit]:disabled{ opacity:.7; cursor:not-allowed; }
      `}</style>
    </div>
  );
}

export default Register;

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const wrapper     = { display:"flex", minHeight:"100vh", fontFamily:"'Inter',sans-serif" };
const leftPanel   = { width:"40%", background:"linear-gradient(135deg,#1a56db 0%,#6366f1 100%)",
  display:"flex", alignItems:"center", justifyContent:"center",
  position:"relative", overflow:"hidden" };
const leftContent = { position:"relative", zIndex:2, color:"#fff", padding:"40px" };
const logoMark    = { fontSize:"52px", marginBottom:"12px", display:"block" };
const brandTitle  = { fontSize:"38px", fontWeight:800, marginBottom:"12px" };
const brandTagline= { fontSize:"16px", opacity:.85, lineHeight:1.6, marginBottom:"36px" };
const stats       = { display:"flex", gap:"24px" };
const statBox     = { textAlign:"center" };
const statNum     = { fontSize:"28px", fontWeight:800 };
const statLbl     = { fontSize:"13px", opacity:.8 };
const decor1      = { position:"absolute", top:"-80px", right:"-80px", width:280, height:280,
  borderRadius:"50%", background:"rgba(255,255,255,.08)" };
const decor2      = { position:"absolute", bottom:"-60px", left:"-60px", width:200, height:200,
  borderRadius:"50%", background:"rgba(255,255,255,.06)" };

const rightPanel  = { flex:1, display:"flex", alignItems:"center", justifyContent:"center",
  background:"#f1f5f9", padding:"32px", overflowY:"auto" };
const card        = { background:"#fff", borderRadius:"20px", padding:"36px",
  width:"min(480px,100%)", boxShadow:"0 10px 40px rgba(0,0,0,.1)" };
const cardHeader  = { marginBottom:"24px" };
const cardTitle   = { fontSize:"24px", fontWeight:800, color:"#0f172a", marginBottom:"4px" };
const cardSub     = { color:"#64748b", fontSize:"14px" };

const fieldGroup  = { marginBottom:"16px" };
const label       = { display:"block", fontSize:"13px", fontWeight:600, color:"#334155", marginBottom:"7px" };

const roleGrid    = { display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" };
const roleCard    = { padding:"12px 8px", border:"1.5px solid #e2e8f0", borderRadius:"10px",
  background:"#f8fafc", cursor:"pointer", display:"flex", flexDirection:"column",
  alignItems:"center", gap:"4px", transition:"all .2s", textAlign:"center" };
const roleCardActive={ border:"1.5px solid #1a56db", background:"#eff6ff" };
const roleIcon    = { fontSize:"22px" };
const roleName    = { fontSize:"13px", fontWeight:700, color:"#0f172a" };
const roleDesc    = { fontSize:"10px", color:"#64748b" };

const inputWrap   = { position:"relative", display:"flex", alignItems:"center" };
const iIcon       = { position:"absolute", left:"12px", fontSize:"15px", pointerEvents:"none" };
const input       = { width:"100%", padding:"11px 40px", border:"1.5px solid #e2e8f0",
  borderRadius:"8px", fontSize:"14px", color:"#0f172a", background:"#f8fafc",
  transition:"border .2s,box-shadow .2s" };
const eyeBtn      = { position:"absolute", right:"12px", background:"none", border:"none",
  fontSize:"16px", cursor:"pointer", padding:0 };

const msgBox      = { borderRadius:"8px", padding:"10px 14px", fontSize:"13px",
  marginBottom:"14px", border:"1px solid" };
const msgSuccess  = { background:"#d1fae5", color:"#065f46", borderColor:"#6ee7b7" };
const msgError    = { background:"#fee2e2", color:"#991b1b", borderColor:"#fecaca" };

const submitBtn   = { width:"100%", padding:"13px", background:"linear-gradient(135deg,#1a56db,#6366f1)",
  color:"#fff", border:"none", borderRadius:"8px", fontSize:"15px", fontWeight:700,
  cursor:"pointer", transition:"all .2s", boxShadow:"0 4px 14px rgba(26,86,219,.35)" };
const footerTxt   = { textAlign:"center", marginTop:"18px", fontSize:"13px", color:"#64748b" };
