import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import {
  getAllUsers, deleteUser,
  getCourses, createCourse, updateCourse as apiUpdateCourse, deleteCourse as apiDeleteCourse
} from "../api/api";

const ENROLL_DATA = [
  { month:"Jan", students:30 },{ month:"Feb", students:45 },
  { month:"Mar", students:38 },{ month:"Apr", students:60 },
  { month:"May", students:52 },{ month:"Jun", students:70 },
];

const MENU = [
  { key:"home",    icon:"🏠", label:"Dashboard" },
  { key:"users",   icon:"👥", label:"Manage Users" },
  { key:"courses", icon:"📚", label:"Manage Courses" },
  { key:"reports", icon:"📊", label:"Reports" },
  { key:"settings",icon:"⚙️", label:"Settings" },
];

function AdminDashboard() {
  const [active, setActive]       = useState("home");
  const [users, setUsers]         = useState([]);
  const [courses, setCourses]     = useState([]);
  const [search, setSearch]       = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [cForm, setCForm] = useState({ title:"", category:"", duration:"", price:"", instructor:"" });
  const [settings, setSettings] = useState({ platformName:"EduMentor", contactEmail:"admin@edumentor.com", maintenance:false });

  const { user } = useSelector(s => s.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  useEffect(() => {
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const uRes = await getAllUsers();
          setUsers(uRes.data || []);
          const cRes = await getCourses();
          setCourses(cRes.data || []);
      } catch(e) {
          console.error("Error fetching admin data", e);
      }
  };

  const handleLogout = () => { dispatch(logout()); localStorage.removeItem("token"); navigate("/login"); };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Delete this user?")) {
        try {
            await deleteUser(id);
            fetchData();
        } catch(e) { console.error("Error deleting user", e); }
    }
  };

  const openCreateCourse = () => { setEditCourse(null); setCForm({ title:"",category:"",duration:"",price:"",instructor:"" }); setShowCourseForm(true); };
  const openEditCourse   = (c)  => { setEditCourse(c);  setCForm({ title:c.title,category:c.category,duration:c.duration,price:c.price,instructor:c.instructor }); setShowCourseForm(true); };
  
  const handleDeleteCourse = async (id) => { 
      if (window.confirm("Delete course?")) {
          try {
              await apiDeleteCourse(id);
              fetchData();
          } catch(e) { console.error("Error deleting course", e); }
      } 
  };
  
  const saveCourse = async () => {
    try {
        if (editCourse) await apiUpdateCourse(editCourse.id, cForm);
        else            await createCourse(cForm);
        fetchData();
        setShowCourseForm(false);
    } catch(e) { console.error("Error saving course", e); }
  };

  const filteredUsers = users.filter(u => {
    const m = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    return m && (roleFilter==="ALL" || u.role===roleFilter);
  });

  const studentsCount = users.filter(u => u.role === "STUDENT").length;
  const teachersCount = users.filter(u => u.role === "TEACHER").length;
  const adminsCount = users.filter(u => u.role === "ADMIN").length;

  const ROLE_DATA = [
    { name:"Students", value:studentsCount, color:"#1a56db" },
    { name:"Teachers", value:teachersCount,  color:"#10b981" },
    { name:"Admins",   value:adminsCount,  color:"#6366f1" },
  ];

  return (
    <div className="em-layout">
      {/* Sidebar */}
      <aside className="em-sidebar">
        <div className="em-sidebar-logo">📚 EduMentor</div>
        <div className="em-sidebar-section">Admin Menu</div>
        {MENU.map(m => (
          <div key={m.key} className={`em-sidebar-item ${active===m.key?"active":""}`}
            onClick={() => setActive(m.key)}>
            <span className="icon">{m.icon}</span><span>{m.label}</span>
          </div>
        ))}
        <div className="em-sidebar-footer">
          <div className="em-sidebar-item" style={{ color:"#f87171" }} onClick={handleLogout}>
            <span className="icon">🚪</span><span>Logout</span>
          </div>
        </div>
      </aside>

      <main className="em-main">

        {/* HOME */}
        {active==="home" && (
          <>
            <div style={banner}>
              <div>
                <h1 style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:6 }}>
                  Welcome, {user?.name || "Admin"} 🛡️
                </h1>
                <p style={{ color:"rgba(255,255,255,.8)", fontSize:14 }}>Platform control & analytics overview</p>
              </div>
              <div style={{ fontSize:48 }}>🛡️</div>
            </div>

            <div style={statsGrid}>
              {[
                { num:users.length,   lbl:"Total Users",    icon:"👥", color:"#1a56db" },
                { num:courses.length, lbl:"Active Courses", icon:"📚", color:"#10b981" },
                { num:studentsCount,  lbl:"Students",  icon:"🎓", color:"#10b981" },
                { num:teachersCount,  lbl:"Teachers",  icon:"👨‍🏫", color:"#f59e0b" },
              ].map(s => (
                <div key={s.lbl} className="stat-card" style={{ borderLeftColor:s.color }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div className="stat-num" style={{ color:s.color }}>{s.num}</div>
                      <div className="stat-lbl">{s.lbl}</div>
                    </div>
                    <div className="stat-icon">{s.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="em-card" style={{ marginBottom:24 }}>
              <div className="section-header"><h2>Quick Actions</h2></div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {[
                  { label:"Manage Users",   icon:"👥", tab:"users" },
                  { label:"Manage Courses", icon:"📚", tab:"courses" },
                  { label:"View Reports",   icon:"📊", tab:"reports" },
                  { label:"Settings",       icon:"⚙️",  tab:"settings" },
                ].map(a => (
                  <button key={a.label} className="em-btn em-btn-primary"
                    onClick={() => setActive(a.tab)}>
                    {a.icon} {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Users table */}
            <div className="em-card">
              <div className="section-header"><h2>Recent Users</h2>
                <button className="em-btn em-btn-ghost" style={{ fontSize:13 }} onClick={() => setActive("users")}>View All</button>
              </div>
              <table className="em-table" style={{ width:"100%" }}>
                <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
                <tbody>
                  {users.slice(0,5).map(u => (
                    <tr key={u.id}>
                      <td style={{ fontWeight:600 }}>{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className={`em-badge ${u.role==="ADMIN"?"em-badge-red":u.role==="TEACHER"?"em-badge-blue":"em-badge-green"}`}>{u.role}</span></td>
                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan="3" style={{ textAlign:"center" }}>No users.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* MANAGE USERS */}
        {active==="users" && (
          <>
            <h1 className="page-title">👥 Manage Users</h1>
            <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
              <input className="em-input" style={{ maxWidth:280 }} placeholder="Search name or email…"
                value={search} onChange={e => setSearch(e.target.value)} />
              <select className="em-input em-select" style={{ maxWidth:160 }}
                value={roleFilter} onChange={e => setRoleFilter(e.target.value)}>
                <option value="ALL">All Roles</option>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="em-card">
              <table className="em-table" style={{ width:"100%" }}>
                <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                <tbody>
                  {filteredUsers.map((u,i) => (
                    <tr key={u.id}>
                      <td style={{ color:"#94a3b8" }}>{i+1}</td>
                      <td style={{ fontWeight:600 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:"50%", background:"#1a56db",
                            color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:13, fontWeight:700 }}>{u.name[0]}</div>
                          {u.name}
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td><span className={`em-badge ${u.role==="ADMIN"?"em-badge-red":u.role==="TEACHER"?"em-badge-blue":"em-badge-green"}`}>{u.role}</span></td>
                      <td>
                        <button className="em-btn em-btn-danger" style={{ fontSize:12, padding:"5px 12px" }}
                          onClick={() => handleDeleteUser(u.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length===0 && <p style={{ padding:20, textAlign:"center", color:"#94a3b8" }}>No users found.</p>}
            </div>
          </>
        )}

        {/* MANAGE COURSES */}
        {active==="courses" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h1 className="page-title" style={{ margin:0 }}>📚 Manage Courses</h1>
              <button className="em-btn em-btn-primary" onClick={openCreateCourse}>+ Add Course</button>
            </div>

            {showCourseForm && (
              <div className="em-card" style={{ marginBottom:20 }}>
                <h3 style={{ fontWeight:700, marginBottom:16 }}>{editCourse ? "Edit Course":"New Course"}</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <div><label className="em-label">Title</label>
                    <input className="em-input" placeholder="Course title"
                      value={cForm.title} onChange={e => setCForm({...cForm,title:e.target.value})}/>
                  </div>
                  <div><label className="em-label">Category</label>
                    <input className="em-input" placeholder="e.g. Programming"
                      value={cForm.category} onChange={e => setCForm({...cForm,category:e.target.value})}/>
                  </div>
                  <div><label className="em-label">Duration</label>
                    <input className="em-input" placeholder="e.g. 8 weeks"
                      value={cForm.duration} onChange={e => setCForm({...cForm,duration:e.target.value})}/>
                  </div>
                  <div><label className="em-label">Price (₹)</label>
                    <input className="em-input" type="number" placeholder="0"
                      value={cForm.price} onChange={e => setCForm({...cForm,price:Number(e.target.value)})}/>
                  </div>
                  <div><label className="em-label">Instructor (Exact Teacher Name)</label>
                    <input className="em-input" placeholder="e.g. John Doe"
                      value={cForm.instructor} onChange={e => setCForm({...cForm,instructor:e.target.value})}/>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10, marginTop:16 }}>
                  <button className="em-btn em-btn-primary" onClick={saveCourse}>{editCourse?"Update":"Create"}</button>
                  <button className="em-btn em-btn-ghost" onClick={() => setShowCourseForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
              {courses.map(c => (
                <div key={c.id} className="em-card" style={{ padding:20 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <span style={{ background:"#eff6ff",color:"#1d4ed8",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:99 }}>
                      {c.category}
                    </span>
                    <span style={{ fontSize:13, fontWeight:700, color:"#10b981" }}>₹{c.price || 0}</span>
                  </div>
                  <h3 style={{ fontWeight:700, marginBottom:6 }}>{c.title}</h3>
                  <p style={{ fontSize:13, color:"#64748b", marginBottom:14 }}>⏱ {c.duration}</p>
                  <p style={{ fontSize:13, color:"#64748b", marginBottom:14 }}>👨‍🏫 {c.instructor || "Unassigned"}</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="em-btn em-btn-ghost" style={{ flex:1, fontSize:12, justifyContent:"center" }}
                      onClick={() => openEditCourse(c)}>Edit</button>
                    <button className="em-btn em-btn-danger" style={{ flex:1, fontSize:12, justifyContent:"center" }}
                      onClick={() => handleDeleteCourse(c.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {courses.length===0 && <p>No courses found.</p>}
            </div>
          </>
        )}

        {/* REPORTS */}
        {active==="reports" && (
          <>
            <h1 className="page-title">📊 Platform Reports</h1>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
              {/* Bar Chart */}
              <div className="em-card">
                <h3 style={{ fontWeight:700, marginBottom:16 }}>Monthly Enrollments</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={ENROLL_DATA}>
                    <XAxis dataKey="month" tick={{ fontSize:12 }} />
                    <YAxis tick={{ fontSize:12 }} />
                    <Tooltip />
                    <Bar dataKey="students" fill="#1a56db" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Pie Chart */}
              <div className="em-card">
                <h3 style={{ fontWeight:700, marginBottom:16 }}>User Role Distribution</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={ROLE_DATA} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`}>
                      {ROLE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip /><Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Summary Table */}
            <div className="em-card">
              <div className="section-header"><h2>Summary</h2></div>
              <table className="em-table" style={{ width:"100%" }}>
                <thead><tr><th>Metric</th><th>Value</th></tr></thead>
                <tbody>
                  {[["Total Users",users.length],["Total Courses",courses.length],
                    ["Avg Monthly Enrollments","49"],["Platform Uptime","98%"],
                    ["Support Tickets","0"]].map(([k,v])=>(
                    <tr key={k}><td style={{ fontWeight:600 }}>{k}</td><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* SETTINGS */}
        {active==="settings" && (
          <>
            <h1 className="page-title">⚙️ System Settings</h1>
            <div className="em-card" style={{ maxWidth:560 }}>
              <h3 style={{ fontWeight:700, marginBottom:20 }}>Platform Configuration</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label className="em-label">Platform Name</label>
                  <input className="em-input" value={settings.platformName}
                    onChange={e => setSettings({...settings, platformName:e.target.value})} />
                </div>
                <div>
                  <label className="em-label">Contact Email</label>
                  <input className="em-input" type="email" value={settings.contactEmail}
                    onChange={e => setSettings({...settings, contactEmail:e.target.value})} />
                </div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"14px 16px", background:"#f8fafc", borderRadius:8, border:"1.5px solid #e2e8f0" }}>
                  <div>
                    <div style={{ fontWeight:600, fontSize:14 }}>Maintenance Mode</div>
                    <div style={{ fontSize:12, color:"#64748b" }}>Temporarily disable public access</div>
                  </div>
                  <label style={{ cursor:"pointer", display:"flex", alignItems:"center", gap:8 }}>
                    <input type="checkbox" checked={settings.maintenance}
                      onChange={e => setSettings({...settings, maintenance:e.target.checked})} />
                    <span style={{ fontWeight:600, color:settings.maintenance?"#ef4444":"#10b981" }}>
                      {settings.maintenance ? "ON":"OFF"}
                    </span>
                  </label>
                </div>
                <button className="em-btn em-btn-primary" style={{ alignSelf:"flex-start" }}>Save Settings</button>
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;

const banner    = { background:"linear-gradient(135deg,#6366f1,#1a56db)", borderRadius:16,
  padding:"28px 32px", marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"center" };
const statsGrid = { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:24 };
