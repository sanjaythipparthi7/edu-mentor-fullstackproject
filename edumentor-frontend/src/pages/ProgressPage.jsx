import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SUBJECTS = [
  { name:"Java Fullstack",  grade:"A",  gpa:9.0, progress:88, assignments:10, completed:9, color:"#1a56db" },
  { name:"React JS",        grade:"B+", gpa:8.2, progress:71, assignments:8,  completed:6, color:"#6366f1" },
  { name:"C Programming",   grade:"A+", gpa:9.8, progress:95, assignments:12, completed:12,color:"#10b981" },
  { name:"Data Structures", grade:"B",  gpa:7.5, progress:62, assignments:10, completed:7, color:"#f59e0b" },
  { name:"DBMS",            grade:"A",  gpa:8.8, progress:80, assignments:9,  completed:8, color:"#ef4444" },
];

const GRADE_COLOR = { "A+":"#10b981","A":"#1a56db","B+":"#6366f1","B":"#f59e0b","C":"#ef4444" };

function ProgressPage() {
  const avgGpa = (SUBJECTS.reduce((s,x)=>s+x.gpa,0)/SUBJECTS.length).toFixed(2);
  const avgProgress = Math.round(SUBJECTS.reduce((s,x)=>s+x.progress,0)/SUBJECTS.length);

  return (
    <>
      <Navbar />
      <div style={page}>
        <h1 className="page-title">📈 Academic Progress</h1>

        {/* GPA Banner */}
        <div style={gpaBanner}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:52, fontWeight:800, color:"#fff" }}>{avgGpa}</div>
            <div style={{ color:"rgba(255,255,255,.8)", fontSize:15 }}>Cumulative GPA (out of 10)</div>
          </div>
          <div style={gpaDivider}/>
          <div style={{ display:"flex", gap:40 }}>
            {[
              { lbl:"Overall Progress", val:`${avgProgress}%` },
              { lbl:"Rank in Batch",    val:"#12" },
              { lbl:"Credits Earned",   val:"28/30" },
            ].map(s => (
              <div key={s.lbl} style={{ textAlign:"center" }}>
                <div style={{ fontSize:28, fontWeight:800, color:"#fff" }}>{s.val}</div>
                <div style={{ color:"rgba(255,255,255,.75)", fontSize:13 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Cards */}
        <h2 style={{ fontWeight:700, marginBottom:16, fontSize:20 }}>Subject-wise Performance</h2>
        <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:28 }}>
          {SUBJECTS.map(s => (
            <div key={s.name} className="em-card" style={{ padding:24 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16 }}>
                {/* Left */}
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:s.color }} />
                    <h3 style={{ fontWeight:700, fontSize:16 }}>{s.name}</h3>
                  </div>
                  <div style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:6 }}>
                      <span style={{ color:"#64748b" }}>Progress</span>
                      <span style={{ fontWeight:700, color:s.color }}>{s.progress}%</span>
                    </div>
                    <div className="em-progress-bar">
                      <div className="em-progress-fill" style={{ width:`${s.progress}%`, background:s.color }} />
                    </div>
                  </div>
                  <div style={{ fontSize:13, color:"#64748b" }}>
                    ✅ {s.completed}/{s.assignments} Assignments Completed
                  </div>
                </div>

                {/* Right */}
                <div style={{ display:"flex", gap:20, alignItems:"center" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:36, fontWeight:800, color:GRADE_COLOR[s.grade]||"#1a56db" }}>{s.grade}</div>
                    <div style={{ fontSize:12, color:"#94a3b8" }}>Grade</div>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:32, fontWeight:800, color:"#0f172a" }}>{s.gpa}</div>
                    <div style={{ fontSize:12, color:"#94a3b8" }}>GPA</div>
                  </div>
                  <span className={`em-badge ${s.progress>=80?"em-badge-green":s.progress>=60?"em-badge-yellow":"em-badge-red"}`}
                    style={{ fontSize:12 }}>
                    {s.progress>=80?"Excellent":s.progress>=60?"Good":"Needs Work"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grade Table */}
        <div className="em-card">
          <div className="section-header"><h2>Grade Summary</h2></div>
          <table className="em-table" style={{ width:"100%" }}>
            <thead><tr><th>Subject</th><th>Grade</th><th>GPA</th><th>Status</th></tr></thead>
            <tbody>
              {SUBJECTS.map(s => (
                <tr key={s.name}>
                  <td style={{ fontWeight:600 }}>{s.name}</td>
                  <td><span style={{ fontWeight:800, color:GRADE_COLOR[s.grade]||"#1a56db", fontSize:16 }}>{s.grade}</span></td>
                  <td style={{ fontWeight:700 }}>{s.gpa}</td>
                  <td><span className={`em-badge ${s.gpa>=9?"em-badge-green":s.gpa>=7.5?"em-badge-blue":"em-badge-yellow"}`}>
                    {s.gpa>=9?"Distinction":s.gpa>=7.5?"First Class":"Second Class"}
                  </span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProgressPage;

const page      = { padding:"32px", background:"#f1f5f9", minHeight:"calc(100vh - 64px)" };
const gpaBanner = { background:"linear-gradient(135deg,#1a56db,#6366f1)", borderRadius:20,
  padding:"32px 40px", marginBottom:32, display:"flex", alignItems:"center", gap:40, flexWrap:"wrap" };
const gpaDivider= { width:1, height:60, background:"rgba(255,255,255,.3)", flexShrink:0 };
