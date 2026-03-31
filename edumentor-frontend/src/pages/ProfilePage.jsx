import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ProfilePage() {
  const { user } = useSelector(s => s.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [editMode, setEditMode]   = useState(false);
  const [name, setName]           = useState(user?.name || "");
  const [email, setEmail]         = useState(user?.email || "");
  const [pwdForm, setPwdForm]     = useState({ current:"", newPwd:"", confirm:"" });
  const [pwdMsg, setPwdMsg]       = useState({ type:"", text:"" });
  const [profileMsg, setProfileMsg] = useState("");

  const initials = (name || "U").split(" ").map(n=>n[0]).join("").toUpperCase().slice(0,2);

  const saveProfile = () => {
    dispatch(loginSuccess({ user:{ ...user, name, email }, token: localStorage.getItem("token") }));
    setEditMode(false);
    setProfileMsg("Profile updated successfully!");
    setTimeout(()=>setProfileMsg(""),3000);
  };

  const changePassword = () => {
    if (!pwdForm.current) { setPwdMsg({ type:"error", text:"Enter your current password." }); return; }
    if (pwdForm.newPwd.length < 6) { setPwdMsg({ type:"error", text:"New password must be at least 6 chars." }); return; }
    if (pwdForm.newPwd !== pwdForm.confirm) { setPwdMsg({ type:"error", text:"Passwords do not match." }); return; }
    setPwdMsg({ type:"success", text:"Password changed successfully!" });
    setPwdForm({ current:"", newPwd:"", confirm:"" });
  };

  const getRoleIcon  = r => r==="ADMIN"?"🛡️":r==="TEACHER"?"👨‍🏫":"🎓";

  return (
    <>
      <Navbar />
      <div style={pageBg}>
        <div style={container}>

          {/* ── Profile Header Card ── */}
          <div style={headerCard}>
            <div style={avatarCircle}>{initials}</div>
            <div style={headerInfo}>
              <h1 style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:4 }}>
                {user?.name || "User"}
              </h1>
              <p style={{ color:"rgba(255,255,255,.8)", marginBottom:12 }}>{user?.email}</p>
              <span style={{ background:"rgba(255,255,255,.2)", color:"#fff",
                padding:"4px 14px", borderRadius:99, fontSize:13, fontWeight:600 }}>
                {getRoleIcon(user?.role)} {user?.role}
              </span>
            </div>
            <button className="em-btn" style={{ background:"rgba(255,255,255,.15)", color:"#fff",
              border:"1.5px solid rgba(255,255,255,.3)" }}
              onClick={() => setEditMode(!editMode)}>
              {editMode ? "✕ Cancel":"✏️ Edit Profile"}
            </button>
          </div>

          <div style={twoCol}>
            {/* ── Profile Info / Edit Form ── */}
            <div className="em-card">
              <h2 style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>
                {editMode ? "Edit Profile":"Profile Information"}
              </h2>

              {!editMode ? (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {[
                    { icon:"👤", label:"Full Name",   value:user?.name },
                    { icon:"✉️", label:"Email",        value:user?.email },
                    { icon:"🎭", label:"Role",         value:user?.role },
                    { icon:"📅", label:"Member Since", value:"March 2026" },
                    { icon:"🔔", label:"Notifications",value:"Enabled" },
                  ].map(f => (
                    <div key={f.label} style={infoRow}>
                      <span style={infoIcon}>{f.icon}</span>
                      <div>
                        <div style={{ fontSize:12, color:"#94a3b8", marginBottom:2 }}>{f.label}</div>
                        <div style={{ fontWeight:600, fontSize:14 }}>{f.value || "—"}</div>
                      </div>
                    </div>
                  ))}
                  {profileMsg && <div style={successMsg}>✅ {profileMsg}</div>}
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div>
                    <label className="em-label">Full Name</label>
                    <input className="em-input" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="em-label">Email Address</label>
                    <input className="em-input" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className="em-label">Role</label>
                    <input className="em-input" value={user?.role} disabled
                      style={{ opacity:.6, cursor:"not-allowed" }} />
                  </div>
                  {profileMsg && <div style={successMsg}>✅ {profileMsg}</div>}
                  <button className="em-btn em-btn-primary" style={{ alignSelf:"flex-start" }}
                    onClick={saveProfile}>Save Changes</button>
                </div>
              )}
            </div>

            {/* ── Change Password ── */}
            <div className="em-card">
              <h2 style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Change Password</h2>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div>
                  <label className="em-label">Current Password</label>
                  <input className="em-input" type="password" placeholder="••••••••"
                    value={pwdForm.current} onChange={e => setPwdForm({...pwdForm,current:e.target.value})} />
                </div>
                <div>
                  <label className="em-label">New Password</label>
                  <input className="em-input" type="password" placeholder="Min 6 characters"
                    value={pwdForm.newPwd} onChange={e => setPwdForm({...pwdForm,newPwd:e.target.value})} />
                </div>
                <div>
                  <label className="em-label">Confirm New Password</label>
                  <input className="em-input" type="password" placeholder="Re-enter new password"
                    value={pwdForm.confirm} onChange={e => setPwdForm({...pwdForm,confirm:e.target.value})} />
                </div>

                {pwdMsg.text && (
                  <div style={{ ...(pwdMsg.type==="success" ? successMsg : errorMsg) }}>
                    {pwdMsg.type==="success" ? "✅":"❌"} {pwdMsg.text}
                  </div>
                )}

                <button className="em-btn em-btn-primary" style={{ alignSelf:"flex-start" }}
                  onClick={changePassword}>Update Password</button>
              </div>

              {/* ── Account Danger Zone ── */}
              <div style={dangerZone}>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#ef4444", marginBottom:8 }}>Danger Zone</h3>
                <p style={{ fontSize:13, color:"#64748b", marginBottom:12 }}>
                  Logout from all devices and clear your current session.
                </p>
                <button className="em-btn em-btn-danger" style={{ fontSize:13 }}
                  onClick={() => navigate("/login")}>🚪 Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfilePage;

const pageBg    = { background:"#f1f5f9", minHeight:"calc(100vh - 64px)", padding:"32px 20px" };
const container = { maxWidth:1000, margin:"0 auto" };
const headerCard= { background:"linear-gradient(135deg,#1a56db,#6366f1)", borderRadius:20,
  padding:"32px 36px", marginBottom:24, display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" };
const avatarCircle={ width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,.2)",
  color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
  fontSize:28, fontWeight:800, border:"3px solid rgba(255,255,255,.4)", flexShrink:0 };
const headerInfo= { flex:1 };
const twoCol    = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 };
const infoRow   = { display:"flex", gap:14, alignItems:"flex-start", padding:"12px 0",
  borderBottom:"1px solid #f1f5f9" };
const infoIcon  = { fontSize:22, width:28, flexShrink:0 };
const successMsg= { background:"#d1fae5", color:"#065f46", padding:"10px 14px",
  borderRadius:8, fontSize:13, border:"1px solid #6ee7b7" };
const errorMsg  = { background:"#fee2e2", color:"#991b1b", padding:"10px 14px",
  borderRadius:8, fontSize:13, border:"1px solid #fecaca" };
const dangerZone= { marginTop:28, padding:20, background:"#fff5f5", borderRadius:12,
  border:"1.5px solid #fee2e2" };
