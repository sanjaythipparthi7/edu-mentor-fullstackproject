import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ALL_ASSIGNMENTS = [
  { id:1,  title:"Java OOP Assignment",       course:"Java Fullstack",       due:"2026-04-05", status:"Pending",   type:"Programming" },
  { id:2,  title:"React Hooks Project",       course:"React JS",             due:"2026-04-08", status:"Pending",   type:"Project" },
  { id:3,  title:"Array Programs Set 1",      course:"C Programming",        due:"2026-03-28", status:"Submitted", type:"Coding" },
  { id:4,  title:"Linked List Questions",     course:"Data Structures",      due:"2026-03-25", status:"Graded",    type:"Coding" },
  { id:5,  title:"SQL Queries Practice",      course:"DBMS",                 due:"2026-04-10", status:"Pending",   type:"Database" },
  { id:6,  title:"Normalization Exercise",    course:"DBMS",                 due:"2026-03-30", status:"Submitted", type:"Theory" },
  { id:7,  title:"Binary Tree Traversal",     course:"Data Structures",      due:"2026-04-12", status:"Pending",   type:"Coding" },
  { id:8,  title:"Component Lifecycle Quiz",  course:"React JS",             due:"2026-03-22", status:"Graded",    type:"Quiz" },
];

const STATUS_BADGE = {
  Pending:   "em-badge-yellow",
  Submitted: "em-badge-blue",
  Graded:    "em-badge-green",
};

function AssignmentsPage() {
  const [search, setSearch]     = useState("");
  const [statusF, setStatusF]   = useState("All");
  const [courseF, setCourseF]   = useState("All");

  const courses = ["All", ...new Set(ALL_ASSIGNMENTS.map(a => a.course))];
  const statuses= ["All","Pending","Submitted","Graded"];

  const filtered = ALL_ASSIGNMENTS.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
                        a.course.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusF==="All" || a.status === statusF;
    const matchCourse = courseF==="All" || a.course === courseF;
    return matchSearch && matchStatus && matchCourse;
  });

  const counts = { Pending:0, Submitted:0, Graded:0 };
  ALL_ASSIGNMENTS.forEach(a => counts[a.status]++);

  return (
    <>
      <Navbar />
      <div style={page}>
        <h1 className="page-title">📝 My Assignments</h1>

        {/* Summary Stat Cards */}
        <div style={statsRow}>
          {[
            { lbl:"Pending",   val:counts.Pending,   color:"#f59e0b", icon:"⏳" },
            { lbl:"Submitted", val:counts.Submitted, color:"#1a56db", icon:"📤" },
            { lbl:"Graded",    val:counts.Graded,    color:"#10b981", icon:"✅" },
            { lbl:"Total",     val:ALL_ASSIGNMENTS.length, color:"#6366f1", icon:"📋" },
          ].map(s => (
            <div key={s.lbl} className="stat-card" style={{ borderLeftColor:s.color }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                  <div className="stat-num" style={{ color:s.color }}>{s.val}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
                <div style={{ fontSize:28 }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={filterRow}>
          <input className="em-input" style={{ maxWidth:280 }} placeholder="🔍 Search assignments…"
            value={search} onChange={e => setSearch(e.target.value)} />
          <select className="em-input em-select" style={{ maxWidth:160 }}
            value={statusF} onChange={e => setStatusF(e.target.value)}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <select className="em-input em-select" style={{ maxWidth:200 }}
            value={courseF} onChange={e => setCourseF(e.target.value)}>
            {courses.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="em-card">
          <table className="em-table" style={{ width:"100%" }}>
            <thead>
              <tr>
                <th>#</th><th>Title</th><th>Course</th><th>Type</th><th>Due Date</th><th>Status</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a,i) => (
                <tr key={a.id}>
                  <td style={{ color:"#94a3b8" }}>{i+1}</td>
                  <td style={{ fontWeight:600 }}>{a.title}</td>
                  <td>{a.course}</td>
                  <td><span className="em-badge em-badge-purple">{a.type}</span></td>
                  <td style={{ color: new Date(a.due) < new Date() && a.status==="Pending" ? "#ef4444":"inherit" }}>
                    {a.due}
                  </td>
                  <td><span className={`em-badge ${STATUS_BADGE[a.status]}`}>{a.status}</span></td>
                  <td>
                    {a.status==="Pending" &&
                      <button className="em-btn em-btn-primary" style={{ fontSize:12, padding:"5px 12px" }}>
                        Submit
                      </button>
                    }
                    {a.status==="Graded" &&
                      <button className="em-btn em-btn-ghost" style={{ fontSize:12, padding:"5px 12px" }}>
                        View Grade
                      </button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 &&
            <p style={{ textAlign:"center", padding:30, color:"#94a3b8" }}>No assignments found.</p>
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AssignmentsPage;

const page      = { padding:"32px", background:"#f1f5f9", minHeight:"calc(100vh - 64px)" };
const statsRow  = { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:24 };
const filterRow = { display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 };
