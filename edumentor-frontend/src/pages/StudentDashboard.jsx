import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import {
  getStudentCourses,
  getAssignments,
  getStudentAttendanceSummary,
  getTimetables
} from "../api/api";

const NOTIFS = [
  { id:1, icon:"📢", text:"Welcome to EduMentor!", time:"Just now", type:"info" }
];

const MENU = [
  { key:"home",          icon:"🏠", label:"Dashboard" },
  { key:"courses",       icon:"📘", label:"My Courses" },
  { key:"assignments",   icon:"📝", label:"Assignments" },
  { key:"attendance",    icon:"📊", label:"Attendance" },
  { key:"timetable",     icon:"📅", label:"Timetable" },
  { key:"notifications", icon:"🔔", label:"Notifications" },
];

function StudentDashboard() {
  const [active, setActive] = useState("home");
  const { user } = useSelector(s => s.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [timetable, setTimetable] = useState({});

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch enrolled courses
      const coursesRes = await getStudentCourses(user.id);
      setCourses(coursesRes.data || []);
      
      const enrolledCourseIds = coursesRes.data.map(c => c.courseId);

      // Fetch assignments and filter by enrolled courses
      const assignRes = await getAssignments();
      const myAssignments = (assignRes.data || []).filter(a => enrolledCourseIds.includes(a.courseId));
      setAssignments(myAssignments);

      // Fetch attendance summary
      const attRes = await getStudentAttendanceSummary(user.id);
      setAttendance(attRes.data || []);

      // Fetch timetable and filter
      const ttRes = await getTimetables();
      const myTt = (ttRes.data || []).filter(t => enrolledCourseIds.includes(t.courseId));
      
      // Group timetable by day
      const groupedTt = {};
      ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"].forEach(day => {
        const daySlots = myTt.filter(t => t.dayOfWeek === day).map(t => `${t.courseTitle} ${t.startTime.substring(0,5)}–${t.endTime.substring(0,5)}`);
        if (daySlots.length > 0) {
          groupedTt[day] = daySlots;
        }
      });
      setTimetable(groupedTt);

    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="em-layout">
      {/* ── Sidebar ── */}
      <aside className="em-sidebar">
        <div className="em-sidebar-logo">📚 EduMentor</div>
        <div className="em-sidebar-section">Student Menu</div>
        {MENU.map(m => (
          <div key={m.key}
            className={`em-sidebar-item ${active===m.key ? "active":""}`}
            onClick={() => setActive(m.key)}>
            <span className="icon">{m.icon}</span>
            <span>{m.label}</span>
          </div>
        ))}
        <div className="em-sidebar-footer">
          <div className="em-sidebar-item" onClick={handleLogout}
            style={{ color:"#f87171" }}>
            <span className="icon">🚪</span><span>Logout</span>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="em-main">

        {/* HOME */}
        {active==="home" && (
          <>
            <div style={banner}>
              <div>
                <h1 style={{ fontSize:26, fontWeight:800, color:"#fff", marginBottom:6 }}>
                  Welcome back, {user?.name || "Student"} 🎓
                </h1>
                <p style={{ color:"rgba(255,255,255,.8)", fontSize:14 }}>
                  Here's your academic overview for today
                </p>
              </div>
              <div style={{ fontSize:48 }}>🎓</div>
            </div>

            {/* Stat Cards */}
            <div style={statsGrid}>
              {[
                {num:courses.length, lbl:"Active Courses",  icon:"📘", color:"#1a56db"},
                {num:assignments.filter(a=>a.status==="PENDING").length, lbl:"Assignments Due", icon:"📝", color:"#f59e0b"},
                {num:attendance.length > 0 ? `${Math.round(attendance.reduce((acc, curr) => acc + curr.percentage, 0) / attendance.length)}%` : "N/A",lbl:"Attendance",   icon:"📊", color:"#10b981"},
                {num:"0", lbl:"Upcoming Exams",  icon:"📋", color:"#6366f1"},
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

            {/* Enrolled Courses */}
            <div className="em-card" style={{ marginBottom:24 }}>
              <div className="section-header">
                <h2>Enrolled Courses</h2>
                <button className="em-btn em-btn-ghost" style={{ fontSize:13 }}
                  onClick={() => setActive("courses")}>View All</button>
              </div>
              <div style={coursesGrid}>
                {courses.length === 0 ? <p>No enrolled courses yet.</p> : courses.map((c, i) => {
                  const colors = ["#1a56db", "#6366f1", "#10b981", "#f59e0b", "#ef4444"];
                  const color = colors[i % colors.length];
                  return (
                  <div key={c.id} style={courseCard}>
                    <div style={{ background:color, height:6, borderRadius:"8px 8px 0 0", margin:"-24px -24px 16px" }} />
                    <h3 style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>{c.courseTitle}</h3>
                    <p style={{ fontSize:12, color:"#64748b", marginBottom:12 }}>{c.instructor}</p>
                    <div style={{ marginBottom:8 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#64748b", marginBottom:4 }}>
                        <span>Progress</span><span style={{ fontWeight:700, color:color }}>{c.progress || 0}%</span>
                      </div>
                      <div className="em-progress-bar">
                        <div className="em-progress-fill" style={{ width:`${c.progress || 0}%`, background:color }} />
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>

            {/* Upcoming Assignments */}
            <div className="em-card">
              <div className="section-header"><h2>Upcoming Assignments</h2></div>
              <table className="em-table" style={{ width:"100%" }}>
                <thead><tr><th>Title</th><th>Course</th><th>Due Date</th><th>Status</th></tr></thead>
                <tbody>
                  {assignments.filter(a=>a.status==="PENDING").map(a=>(
                    <tr key={a.id}>
                      <td style={{ fontWeight:600 }}>{a.title}</td>
                      <td>{a.courseTitle}</td>
                      <td>{a.dueDate}</td>
                      <td><span className="em-badge em-badge-yellow">Pending</span></td>
                    </tr>
                  ))}
                  {assignments.filter(a=>a.status==="PENDING").length === 0 && (
                    <tr><td colSpan="4" style={{ textAlign: "center" }}>No pending assignments</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* COURSES */}
        {active==="courses" && (
          <>
            <h1 className="page-title">📘 My Courses</h1>
            <div style={coursesGrid}>
              {courses.map((c, i) => {
                const colors = ["#1a56db", "#6366f1", "#10b981", "#f59e0b", "#ef4444"];
                const color = colors[i % colors.length];
                return (
                <div key={c.id} style={{ ...courseCard, width:"100%" }}>
                  <div style={{ background:color, height:8, borderRadius:"8px 8px 0 0", margin:"-24px -24px 20px" }} />
                  <h3 style={{ fontSize:17, fontWeight:700, marginBottom:4 }}>{c.courseTitle}</h3>
                  <p style={{ fontSize:13, color:"#64748b", marginBottom:6 }}>👨‍🏫 {c.instructor}</p>
                  {c.description && <div style={{ fontSize:13, background:"#f8fafc", padding:10, borderRadius:6, marginBottom:12, color:"#475569" }}>
                    <strong>Course Updates:</strong><br/>{c.description}
                  </div>}
                  <div style={{ marginBottom:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}>
                      <span style={{ color:"#64748b" }}>Course Progress</span>
                      <span style={{ fontWeight:700, color:color }}>{c.progress || 0}%</span>
                    </div>
                    <div className="em-progress-bar">
                      <div className="em-progress-fill" style={{ width:`${c.progress || 0}%`, background:color }} />
                    </div>
                  </div>
                  <button className="em-btn em-btn-primary" style={{ width:"100%", justifyContent:"center" }}>
                    Continue Learning →
                  </button>
                </div>
              )})}
              {courses.length === 0 && <p>You are not enrolled in any courses.</p>}
            </div>
          </>
        )}

        {/* ASSIGNMENTS */}
        {active==="assignments" && (
          <>
            <h1 className="page-title">📝 Assignments</h1>
            <AssignmentTabs assignments={assignments} />
          </>
        )}

        {/* ATTENDANCE */}
        {active==="attendance" && (
          <>
            <h1 className="page-title">📊 Attendance Report</h1>
            <div className="em-card">
              <table className="em-table">
                <thead><tr><th>Subject</th><th>Attended</th><th>Total</th><th>Percentage</th><th>Progress</th><th>Status</th></tr></thead>
                <tbody>
                  {attendance.map(a => {
                    const pct = a.percentage || 0;
                    return (
                      <tr key={a.courseId}>
                        <td style={{ fontWeight:600 }}>{a.subject}</td>
                        <td>{a.present}</td>
                        <td>{a.total}</td>
                        <td style={{ fontWeight:700, color: pct>=75?"#10b981":"#ef4444" }}>{pct}%</td>
                        <td style={{ minWidth:120 }}>
                          <div className="em-progress-bar">
                            <div className="em-progress-fill"
                              style={{ width:`${pct}%`, background: pct>=75?"#10b981":"#ef4444" }} />
                          </div>
                        </td>
                        <td>
                          <span className={`em-badge ${pct>=75?"em-badge-green":"em-badge-red"}`}>
                            {pct>=75?"Good":"Low"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {attendance.length === 0 && <tr><td colSpan="6" style={{textAlign:"center"}}>No attendance data available.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* TIMETABLE */}
        {active==="timetable" && (
          <>
            <h1 className="page-title">📅 Weekly Timetable</h1>
            <div style={ttGrid}>
              {Object.keys(timetable).length === 0 ? <p>No timetable classes scheduled.</p> : Object.entries(timetable).map(([day, slots]) => (
                <div key={day} className="em-card" style={{ padding:20 }}>
                  <h3 style={{ fontWeight:700, color:"#1a56db", marginBottom:12, fontSize:15 }}>{day}</h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {slots.map((s,i) => (
                      <div key={i} style={ttSlot}>
                        <span style={{ fontSize:18 }}>📖</span>
                        <span style={{ fontSize:13 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* NOTIFICATIONS */}
        {active==="notifications" && (
          <>
            <h1 className="page-title">🔔 Notifications</h1>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {NOTIFS.map(n => (
                <div key={n.id} className="em-card" style={{ display:"flex", gap:14, alignItems:"flex-start", padding:18 }}>
                  <div style={{ fontSize:28 }}>{n.icon}</div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:14, fontWeight:500, marginBottom:4 }}>{n.text}</p>
                    <span style={{ fontSize:12, color:"#94a3b8" }}>{n.time}</span>
                  </div>
                  <span className={`em-badge ${
                    n.type==="warning"?"em-badge-yellow":
                    n.type==="success"?"em-badge-green":
                    n.type==="danger" ?"em-badge-red":"em-badge-blue"}`}>
                    {n.type}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}

function AssignmentTabs({ assignments }) {
  const [tab, setTab] = useState("PENDING");
  const filtered = assignments.filter(a => a.status === tab);
  return (
    <>
      <div style={{ display:"flex", gap:8, marginBottom:20 }}>
        {["PENDING","SUBMITTED"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding:"8px 20px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600,
              background: tab===t ? "#1a56db":"#e2e8f0", color: tab===t ? "#fff":"#64748b" }}>
            {t} {tab===t && `(${filtered.length})`}
          </button>
        ))}
      </div>
      <div className="em-card">
        <table className="em-table" style={{ width:"100%" }}>
          <thead><tr><th>Title</th><th>Course</th><th>Due Date</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td style={{ fontWeight:600 }}>{a.title}</td>
                <td>{a.courseTitle}</td>
                <td>{a.dueDate}</td>
                <td>
                  <span className={`em-badge ${a.status==="PENDING"?"em-badge-yellow":"em-badge-green"}`}>
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && <p style={{ padding:20, color:"#64748b", textAlign:"center" }}>No {tab.toLowerCase()} assignments.</p>}
      </div>
    </>
  );
}

export default StudentDashboard;

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const banner   = { background:"linear-gradient(135deg,#1a56db,#6366f1)", borderRadius:16,
  padding:"28px 32px", marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"center" };
const statsGrid= { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16, marginBottom:24 };
const coursesGrid={ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16, marginBottom:24 };
const courseCard = { background:"#fff", borderRadius:12, padding:24, boxShadow:"0 4px 16px rgba(0,0,0,.08)" };
const ttGrid   = { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 };
const ttSlot   = { background:"#f1f5f9", borderRadius:8, padding:"10px 12px",
  display:"flex", alignItems:"center", gap:8 };
