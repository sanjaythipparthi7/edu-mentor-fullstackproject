import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

function SettingsPage() {
  const { user } = useSelector(s => s.auth);
  const [name,   setName]   = useState(user?.name || "");
  const [email,  setEmail]  = useState(user?.email || "");
  const [notifs, setNotifs] = useState({ email:true, assignment:true, attendance:false, exam:true });
  const [theme,  setTheme]  = useState("light");
  const [lang,   setLang]   = useState("English");
  const [saved,  setSaved]  = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(()=>setSaved(false),2500); };

  return (
    <>
      <Navbar />
      <div style={page}>
        <h1 className="page-title">⚙️ Settings</h1>

        <div style={grid}>
          {/* Account Settings */}
          <div className="em-card">
            <h2 style={sectionTitle}>👤 Account Settings</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label className="em-label">Display Name</label>
                <input className="em-input" value={name} onChange={e=>setName(e.target.value)} />
              </div>
              <div>
                <label className="em-label">Email Address</label>
                <input className="em-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
              </div>
              <div>
                <label className="em-label">Role</label>
                <input className="em-input" value={user?.role || ""} disabled
                  style={{ opacity:.55, cursor:"not-allowed" }} />
              </div>
              <button className="em-btn em-btn-primary" style={{ alignSelf:"flex-start" }} onClick={handleSave}>
                Save Account Info
              </button>
              {saved && <div style={successBanner}>✅ Settings saved successfully!</div>}
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="em-card">
            <h2 style={sectionTitle}>🔔 Notification Preferences</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[
                { key:"email",      label:"Email Notifications",      desc:"Receive updates via email" },
                { key:"assignment", label:"Assignment Reminders",      desc:"Alerts for upcoming assignments" },
                { key:"attendance", label:"Attendance Alerts",         desc:"Low attendance warnings" },
                { key:"exam",       label:"Exam Notifications",        desc:"Exam schedule & results" },
              ].map(n => (
                <div key={n.key} style={toggleRow}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14 }}>{n.label}</div>
                    <div style={{ fontSize:12, color:"#64748b" }}>{n.desc}</div>
                  </div>
                  <label style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                    <input type="checkbox" checked={notifs[n.key]}
                      onChange={e => setNotifs({...notifs,[n.key]:e.target.checked})} />
                    <span style={{ fontWeight:600, fontSize:13, color:notifs[n.key]?"#10b981":"#94a3b8" }}>
                      {notifs[n.key]?"On":"Off"}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Appearance */}
          <div className="em-card">
            <h2 style={sectionTitle}>🎨 Appearance</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <label className="em-label">Theme</label>
                <div style={{ display:"flex", gap:12 }}>
                  {["light","dark"].map(t => (
                    <button key={t} onClick={() => setTheme(t)}
                      style={{ padding:"10px 24px", borderRadius:8, border:"1.5px solid",
                        borderColor: theme===t?"#1a56db":"#e2e8f0",
                        background:  theme===t?"#eff6ff":"#f8fafc",
                        color:       theme===t?"#1a56db":"#64748b",
                        fontWeight:600, cursor:"pointer", textTransform:"capitalize" }}>
                      {t==="light"?"☀️ Light":"🌙 Dark"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="em-label">Language</label>
                <select className="em-input em-select" value={lang} onChange={e=>setLang(e.target.value)}>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="em-card">
            <h2 style={sectionTitle}>🔐 Security</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={infoRow}>
                <span>🔑</span>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>Password</div>
                  <div style={{ fontSize:12, color:"#64748b" }}>Last changed: Never</div>
                </div>
                <button className="em-btn em-btn-ghost" style={{ fontSize:12, marginLeft:"auto" }}>Change</button>
              </div>
              <div style={infoRow}>
                <span>🛡️</span>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>Two-Factor Auth</div>
                  <div style={{ fontSize:12, color:"#64748b" }}>Add extra security to your account</div>
                </div>
                <button className="em-btn em-btn-ghost" style={{ fontSize:12, marginLeft:"auto" }}>Enable</button>
              </div>
              <div style={dangerZone}>
                <div style={{ fontWeight:700, color:"#ef4444", marginBottom:6, fontSize:14 }}>Delete Account</div>
                <p style={{ fontSize:13, color:"#64748b", marginBottom:10 }}>
                  Permanently remove your account and all data. This cannot be undone.
                </p>
                <button className="em-btn em-btn-danger" style={{ fontSize:13 }}>Delete My Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SettingsPage;

const page         = { padding:"32px", background:"#f1f5f9", minHeight:"calc(100vh - 64px)" };
const grid         = { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(420px,1fr))", gap:20 };
const sectionTitle = { fontSize:18, fontWeight:700, marginBottom:18 };
const toggleRow    = { display:"flex", alignItems:"center", justifyContent:"space-between",
  padding:"12px 14px", background:"#f8fafc", borderRadius:8, border:"1.5px solid #e2e8f0" };
const infoRow      = { display:"flex", alignItems:"center", gap:12, padding:"10px 0",
  borderBottom:"1px solid #f1f5f9" };
const dangerZone   = { marginTop:16, padding:16, background:"#fff5f5", borderRadius:10,
  border:"1.5px solid #fee2e2" };
const successBanner= { background:"#d1fae5", color:"#065f46", padding:"10px 14px",
  borderRadius:8, fontSize:13, border:"1px solid #6ee7b7" };
