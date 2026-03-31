import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCourses, getStudentCourses, enrollCourse } from "../api/api";

function CoursesPage() {
  const { user } = useSelector(s => s.auth);
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [search, setSearch]   = useState("");
  const [catF,   setCatF]     = useState("All");

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const cRes = await getCourses();
      setCourses(cRes.data || []);
      
      if (user?.id && user?.role === "STUDENT") {
        const eRes = await getStudentCourses(user.id);
        const myCourseIds = (eRes.data || []).map(sc => sc.courseId);
        setEnrolledIds(myCourseIds);
      }
    } catch (e) {
      console.error("Failed to fetch courses data", e);
    }
  };

  const handleEnroll = async (courseId) => {
    if (!user) {
      alert("Please login as a student to enroll.");
      return;
    }
    if (user.role !== "STUDENT") {
      alert("Only students can enroll in courses.");
      return;
    }

    try {
      await enrollCourse({ studentId: user.id, courseId });
      setEnrolledIds(prev => [...prev, courseId]);
      alert("Enrolled successfully!");
    } catch (error) {
      console.error("Failed to enroll", error);
      alert("Failed to enroll. You might already be enrolled.");
    }
  };

  const CATEGORIES = ["All", ...new Set(courses.map(c => c.category))];

  const filtered = courses.filter(c => {
    const m = c.title.toLowerCase().includes(search.toLowerCase()) ||
              (c.instructor || "").toLowerCase().includes(search.toLowerCase());
    return m && (catF==="All" || c.category===catF);
  });

  return (
    <>
      <Navbar />
      <div style={page}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8, flexWrap:"wrap", gap:12 }}>
          <div>
            <h1 className="page-title" style={{ margin:0 }}>📚 Browse Courses</h1>
            {user?.role === "STUDENT" && <p style={{ color:"#64748b", fontSize:14, marginTop:4 }}>You are enrolled in <strong>{enrolledIds.length}</strong> course(s)</p>}
          </div>
        </div>

        {/* Filters */}
        <div style={filterRow}>
          <input className="em-input" style={{ maxWidth:300 }} placeholder="🔍 Search courses or instructors…"
            value={search} onChange={e=>setSearch(e.target.value)} />
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCatF(c)}
                style={{ padding:"7px 16px", borderRadius:8, fontSize:13, fontWeight:600,
                  border:"none", cursor:"pointer",
                  background: catF===c?"#1a56db":"#e2e8f0",
                  color:      catF===c?"#fff":"#64748b" }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div style={grid}>
          {filtered.map((c, i) => {
            const isEnrolled = enrolledIds.includes(c.id);
            const colors = ["#1a56db", "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#8b5cf6", "#06b6d4"];
            const color = colors[i % colors.length];

            return (
            <div key={c.id} style={card}>
              {/* Color top bar */}
              <div style={{ background:color, height:6, borderRadius:"12px 12px 0 0", margin:"-24px -24px 20px" }} />

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <span style={{ background:"#f1f5f9",color:"#475569",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:99 }}>
                  {c.category}
                </span>
                {isEnrolled && <span className="em-badge em-badge-green" style={{ fontSize:11 }}>✅ Enrolled</span>}
              </div>

              <h3 style={{ fontWeight:700, fontSize:16, marginBottom:6 }}>{c.title}</h3>
              <p style={{ fontSize:13, color:"#64748b", marginBottom:4 }}>👨‍🏫 {c.instructor || "Unassigned"}</p>
              <p style={{ fontSize:13, color:"#64748b", marginBottom:14 }}>⏱ {c.duration}</p>

              <button
                onClick={() => handleEnroll(c.id)}
                disabled={isEnrolled}
                className={`em-btn ${isEnrolled?"em-btn-ghost":"em-btn-primary"}`}
                style={{ width:"100%", justifyContent:"center" }}>
                {isEnrolled ? "✓ Enrolled" : "Enroll Now →"}
              </button>
            </div>
          )})}
          {filtered.length===0 &&
            <p style={{ gridColumn:"1/-1", textAlign:"center", color:"#94a3b8", padding:40 }}>
              No courses match your search.
            </p>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CoursesPage;

const page      = { padding:"32px", background:"#f1f5f9", minHeight:"calc(100vh - 64px)" };
const filterRow = { display:"flex", gap:16, flexWrap:"wrap", alignItems:"center", marginBottom:24 };
const grid      = { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 };
const card      = { background:"#fff", borderRadius:12, padding:24, boxShadow:"0 4px 16px rgba(0,0,0,.08)", transition:"transform .2s,box-shadow .2s" };
