import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import {
  getCourses,
  getCourseStudents,
  getTeacherAssignments,
  createAssignment,
  getCourseAttendanceDate,
  markBulkAttendance,
  updateCourse,
  getTimetables
} from "../api/api";

const MESSAGES = [
  { id:1, from:"Admin",        text:"Please submit exam questions by Friday.",           time:"3 hrs ago" },
];

const MENU = [
  { key:"home",        icon:"🏠", label:"Dashboard" },
  { key:"courses",     icon:"📘", label:"My Courses" },
  { key:"assignments", icon:"📝", label:"Assignments" },
  { key:"attendance",  icon:"📊", label:"Attendance" },
  { key:"schedule",    icon:"📅", label:"Schedule" },
  { key:"messages",    icon:"💬", label:"Messages" },
];

function TeacherDashboard() {
  const [active, setActive] = useState("home");
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [aForm, setAForm] = useState({ title:"", course:"", due:"", desc:"" });
  const [editCourse, setEditCourse] = useState(null);
  const [cForm, setCForm] = useState({ title: "", description: "", duration: "" });
  const { user } = useSelector(s => s.auth);
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
        const allCourses = await getCourses();
        const myCourses = allCourses.data.filter(c => c.instructor === user.name);
        setCourses(myCourses);

        let myStudents = {};
        for(let c of myCourses) {
            const studs = await getCourseStudents(c.id);
            myStudents[c.id] = studs.data || [];
        }
        setStudents(myStudents);

        const assigns = await getTeacherAssignments(user.id);
        setAssignments(assigns.data || []);

        const allTt = await getTimetables();
        const myTt = allTt.data.filter(t => myCourses.map(mc => mc.id).includes(t.courseId));
        
        const groupedTt = {};
        ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"].forEach(day => {
          const daySlots = myTt.filter(t => t.dayOfWeek === day).map(t => `${t.courseTitle} ${t.startTime.substring(0,5)}–${t.endTime.substring(0,5)} Room ${t.roomNumber}`);
          if (daySlots.length > 0) groupedTt[day] = daySlots;
        });
        setSchedule(groupedTt);

    } catch (e) {
        console.error("Error fetching teacher data:", e);
    }
  };

  const handleLogout = () => { dispatch(logout()); localStorage.removeItem("token"); navigate("/login"); };
  const toggleAtt    = (courseId, stdId) => {
    const key = `${courseId}_${stdId}`;
    setAttendance(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const submitAssignment = async () => {
      try {
          await createAssignment({
              title: aForm.title,
              description: aForm.desc,
              type: "HOMEWORK",
              dueDate: aForm.due,
              courseId: Number(aForm.course),
              teacherId: user.id
          });
          setShowAssignForm(false);
          fetchData();
      } catch(e) {
          console.error("Failed creating assignment", e);
      }
  };

  const saveAttendance = async (courseId) => {
      const courseStudents = students[courseId] || [];
      const studentStatuses = courseStudents.map(s => {
          const key = `${courseId}_${s.studentId}`;
          return {
              studentId: s.studentId,
              status: attendance[key] ? "PRESENT" : "ABSENT"
          };
      });

      try {
          await markBulkAttendance({
              courseId: courseId,
              attendanceDate: new Date().toISOString().split('T')[0],
              markedBy: user.id,
              students: studentStatuses
          });
          alert("Attendance saved!");
      } catch (e) {
          console.error("Error saving attendance", e);
          alert("Failed saving attendance.");
      }
  };

  const openEditCourse = (c) => {
      setEditCourse(c);
      setCForm({ title: c.title, description: c.description || "", duration: c.duration || "" });
  };

  const handleUpdateCourse = async () => {
      try {
          await updateCourse(editCourse.id, {
              ...editCourse,
              title: cForm.title,
              description: cForm.description,
              duration: cForm.duration
          });
          setEditCourse(null);
          alert("Course updated successfully!");
          fetchData();
      } catch (e) {
          console.error("Error updating course", e);
          alert("Failed to update course.");
      }
  };

  const totalStudents = Object.values(students).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className="em-layout">
      {/* Sidebar */}
      <aside className="em-sidebar">
        <div className="em-sidebar-logo">📚 EduMentor</div>
        <div className="em-sidebar-section">Teacher Menu</div>
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
                  Welcome, {user?.name || "Teacher"} 👨‍🏫
                </h1>
                <p style={{ color:"rgba(255,255,255,.8)", fontSize:14 }}>Manage your classes and track student progress</p>
              </div>
              <div style={{ fontSize:48 }}>👨‍🏫</div>
            </div>

            <div style={statsGrid}>
              {[
                { num:courses.length,            lbl:"Courses Teaching", icon:"📘", color:"#1a56db" },
                { num:totalStudents,lbl:"Total Students",   icon:"👥", color:"#10b981" },
                { num:assignments.length,            lbl:"Assignments Given",  icon:"📝", color:"#f59e0b" },
                { num:Object.keys(schedule).length,            lbl:"Days with Classes",    icon:"🗓️", color:"#6366f1" },
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

            {/* Quick Course List */}
            <div className="em-card">
              <div className="section-header"><h2>Courses You Teach</h2></div>
              <div style={cGrid}>
                {courses.map(c => (
                  <div key={c.id} style={cCard}>
                    <div style={cTop}><span style={cBadge}>{c.category}</span></div>
                    <h3 style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{c.title}</h3>
                    <p style={{ fontSize:13 }}>👥 <strong>{(students[c.id] || []).length}</strong> Students</p>
                  </div>
                ))}
                {courses.length === 0 && <p>You have no courses assigned.</p>}
              </div>
            </div>
          </>
        )}

        {/* COURSES */}
        {active==="courses" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h1 className="page-title" style={{ margin:0 }}>📘 My Courses</h1>
            </div>

            {editCourse && (
              <div className="em-card" style={{ marginBottom:20 }}>
                <h3 style={{ fontWeight:700, marginBottom:16 }}>Update Course Content</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                  <div><label className="em-label">Description / Syllabus Updates</label>
                    <textarea className="em-input" style={{ minHeight:100 }} placeholder="Update course syllabus or notes..."
                      value={cForm.description} onChange={e => setCForm({...cForm,description:e.target.value})}/>
                  </div>
                </div>
                <div style={{ display:"flex", gap:10, marginTop:16 }}>
                  <button className="em-btn em-btn-primary" onClick={handleUpdateCourse}>Update Course</button>
                  <button className="em-btn em-btn-ghost" onClick={() => setEditCourse(null)}>Cancel</button>
                </div>
              </div>
            )}

            <div style={cGrid}>
              {courses.map(c => (
                <div key={c.id} style={{ ...cCard, padding:24 }}>
                  <span style={cBadge}>{c.category}</span>
                  <h3 style={{ fontWeight:700, fontSize:16, margin:"12px 0 6px" }}>{c.title}</h3>
                  <p style={{ fontSize:13, marginBottom:16 }}>👥 {(students[c.id] || []).length} enrolled students</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <button className="em-btn em-btn-ghost" style={{ fontSize:12, flex:1 }}>View Material</button>
                    <button className="em-btn em-btn-primary" style={{ fontSize:12, flex:1 }}
                      onClick={() => openEditCourse(c)}>Update Content</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ASSIGNMENTS */}
        {active==="assignments" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h1 className="page-title" style={{ margin:0 }}>📝 Assignments</h1>
              <button className="em-btn em-btn-primary" onClick={() => setShowAssignForm(!showAssignForm)}>
                {showAssignForm ? "✕ Close" : "+ Create Assignment"}
              </button>
            </div>

            {showAssignForm && (
              <div className="em-card" style={{ marginBottom:24 }}>
                <h3 style={{ fontWeight:700, marginBottom:16 }}>New Assignment</h3>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <label className="em-label">Title</label>
                    <input className="em-input" placeholder="Assignment title"
                      value={aForm.title} onChange={e => setAForm({...aForm,title:e.target.value})} />
                  </div>
                  <div>
                    <label className="em-label">Course</label>
                    <select className="em-input em-select"
                      value={aForm.course} onChange={e => setAForm({...aForm,course:e.target.value})}>
                      <option value="">Select course</option>
                      {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="em-label">Due Date</label>
                    <input className="em-input" type="date"
                      value={aForm.due} onChange={e => setAForm({...aForm,due:e.target.value})} />
                  </div>
                  <div>
                    <label className="em-label">Description</label>
                    <input className="em-input" placeholder="Brief description"
                      value={aForm.desc} onChange={e => setAForm({...aForm,desc:e.target.value})} />
                  </div>
                </div>
                <div style={{ marginTop:16, display:"flex", gap:10 }}>
                  <button className="em-btn em-btn-primary" onClick={submitAssignment}>Create Assignment</button>
                  <button className="em-btn em-btn-ghost" onClick={() => setShowAssignForm(false)}>Cancel</button>
                </div>
              </div>
            )}

            <div className="em-card">
              <div className="section-header"><h2>Assignments Given</h2></div>
              <table className="em-table" style={{ width:"100%" }}>
                <thead><tr><th>Title</th><th>Course</th><th>Due Date</th><th>Status</th></tr></thead>
                <tbody>
                  {assignments.map(s => (
                    <tr key={s.id}>
                      <td style={{ fontWeight:600 }}>{s.title}</td>
                      <td>{s.courseTitle}</td>
                      <td>{s.dueDate}</td>
                      <td><span className={`em-badge em-badge-yellow`}>{s.status}</span></td>
                    </tr>
                  ))}
                  {assignments.length===0 && <tr><td colSpan="4" style={{textAlign:"center"}}>No assignments created.</td></tr>}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ATTENDANCE */}
        {active==="attendance" && (
          <>
            <h1 className="page-title">📊 Mark Attendance</h1>
            {courses.map(c => {
              const myStuds = students[c.id] || [];
              if (myStuds.length === 0) return null;
              return (
              <div key={c.id} className="em-card" style={{ marginBottom:20 }}>
                <div className="section-header"><h2>{c.title}</h2>
                  <button className="em-btn em-btn-primary" style={{ fontSize:13 }} onClick={() => saveAttendance(c.id)}>Save Attendance</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {myStuds.map(std => {
                    const key = `${c.id}_${std.studentId}`;
                    return (
                      <div key={std.studentId} style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                        padding:"12px 16px", background:"#f8fafc", borderRadius:8 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:36, height:36, borderRadius:"50%", background:"#1a56db",
                            color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:14 }}>
                            {std.studentName.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <span style={{ fontWeight:500 }}>{std.studentName}</span>
                        </div>
                        <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                          <input type="checkbox" checked={!!attendance[key]} onChange={() => toggleAtt(c.id, std.studentId)} />
                          <span style={{ fontSize:13, fontWeight:600, color: attendance[key]?"#10b981":"#ef4444" }}>
                            {attendance[key] ? "Present":"Absent"}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )})}
            {courses.filter(c => (students[c.id]||[]).length>0).length === 0 && <p>You have no students.</p>}
          </>
        )}

        {/* SCHEDULE */}
        {active==="schedule" && (
          <>
            <h1 className="page-title">📅 Teaching Schedule</h1>
            <div style={ttGrid}>
              {Object.keys(schedule).length === 0 ? <p>No classes scheduled.</p> : Object.entries(schedule).map(([day, slots]) => (
                <div key={day} className="em-card" style={{ padding:20 }}>
                  <h3 style={{ fontWeight:700, color:"#1a56db", marginBottom:12 }}>{day}</h3>
                  {slots.length===0
                    ? <p style={{ color:"#94a3b8", fontSize:13 }}>No classes</p>
                    : slots.map((s,i) => (
                        <div key={i} style={{ background:"#eff6ff", borderRadius:8, padding:"10px 12px",
                          marginBottom:8, fontSize:13, color:"#1e40af", fontWeight:500 }}>📖 {s}</div>
                      ))
                  }
                </div>
              ))}
            </div>
          </>
        )}

        {/* MESSAGES */}
        {active==="messages" && (
          <>
            <h1 className="page-title">💬 Messages</h1>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {MESSAGES.map(m => (
                <div key={m.id} className="em-card" style={{ display:"flex", gap:14, alignItems:"flex-start", padding:18 }}>
                  <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#1a56db,#6366f1)",
                    color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, flexShrink:0 }}>
                    {m.from[0]}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontWeight:700, fontSize:14 }}>{m.from}</span>
                      <span style={{ fontSize:12, color:"#94a3b8" }}>{m.time}</span>
                    </div>
                    <p style={{ fontSize:14, color:"#475569" }}>{m.text}</p>
                  </div>
                  <button className="em-btn em-btn-ghost" style={{ fontSize:12 }}>Reply</button>
                </div>
              ))}
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default TeacherDashboard;

const banner   = { background:"linear-gradient(135deg,#10b981,#059669)", borderRadius:16,
  padding:"28px 32px", marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"center" };
const statsGrid= { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:24 };
const cGrid    = { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:16 };
const cCard    = { background:"#fff",borderRadius:12,padding:20,boxShadow:"0 4px 16px rgba(0,0,0,.08)" };
const cTop     = { marginBottom:10 };
const cBadge   = { background:"#eff6ff",color:"#1d4ed8",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:99 };
const ttGrid   = { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:16 };
