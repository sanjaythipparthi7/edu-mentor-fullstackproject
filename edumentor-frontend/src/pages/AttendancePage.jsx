import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./AttendancePage.css";

const ATTENDANCE = [
  { subject:"Java Fullstack",  present:18, total:20, color:"#1a56db", records:["P","P","A","P","P","P","P","A","P","P","P","P","P","P","P","P","P","P","P","P"] },
  { subject:"React JS",        present:14, total:18, color:"#6366f1", records:["P","P","P","A","P","P","A","P","P","A","P","P","P","P","A","P","P","P"] },
  { subject:"C Programming",   present:20, total:20, color:"#10b981", records:["P","P","P","P","P","P","P","P","P","P","P","P","P","P","P","P","P","P","P","P"] },
  { subject:"Data Structures", present:12, total:16, color:"#f59e0b", records:["P","A","P","P","A","P","P","A","P","P","A","A","P","P","P","A"] },
  { subject:"DBMS",            present:15, total:18, color:"#ef4444", records:["P","P","A","P","P","P","A","P","P","P","P","A","P","P","P","P","P","P"] },
];

function AttendancePage() {
  const overall = Math.round(
    ATTENDANCE.reduce((s,a)=>s+a.present,0) /
    ATTENDANCE.reduce((s,a)=>s+a.total,0) * 100
  );

  return (
    <>
      <Navbar />
      <div style={page}>
        <h1 className="page-title">📊 Attendance Overview</h1>

        {/* Overall Badge */}
        <div style={overallCard}>
          <div>
            <div style={{ fontSize:52, fontWeight:800, color:"#fff" }}>{overall}%</div>
            <div style={{ color:"rgba(255,255,255,.8)", fontSize:15, marginTop:4 }}>Overall Attendance</div>
          </div>
          <div style={overallRight}>
            <div style={overallStat}>
              <span style={{ fontSize:24, fontWeight:800, color:"#fff" }}>
                {ATTENDANCE.reduce((s,a)=>s+a.present,0)}
              </span>
              <span style={{ color:"rgba(255,255,255,.7)", fontSize:13 }}>Classes Attended</span>
            </div>
            <div style={overallStat}>
              <span style={{ fontSize:24, fontWeight:800, color:"#fff" }}>
                {ATTENDANCE.reduce((s,a)=>s+a.total,0)}
              </span>
              <span style={{ color:"rgba(255,255,255,.7)", fontSize:13 }}>Total Classes</span>
            </div>
            <span style={{ background:"rgba(255,255,255,.2)", color:"#fff", padding:"5px 14px",
              borderRadius:99, fontSize:14, fontWeight:700 }}>
              {overall>=75?"✅ Eligible":"⚠️ Below Requirement"}
            </span>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="em-card" style={{ marginBottom:24 }}>
          <div className="section-header"><h2>Subject-wise Breakdown</h2></div>
          <table className="em-table" style={{ width:"100%" }}>
            <thead>
              <tr><th>Subject</th><th>Attended</th><th>Total</th><th>Percentage</th><th>Progress</th><th>Status</th></tr>
            </thead>
            <tbody>
              {ATTENDANCE.map(a => {
                const pct = Math.round((a.present/a.total)*100);
                return (
                  <tr key={a.subject}>
                    <td>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:8, height:8, borderRadius:"50%", background:a.color }} />
                        <span style={{ fontWeight:600 }}>{a.subject}</span>
                      </div>
                    </td>
                    <td style={{ fontWeight:600 }}>{a.present}</td>
                    <td>{a.total}</td>
                    <td style={{ fontWeight:700, color: pct>=75?a.color:"#ef4444" }}>{pct}%</td>
                    <td style={{ minWidth:140 }}>
                      <div className="em-progress-bar">
                        <div className="em-progress-fill"
                          style={{ width:`${pct}%`, background: pct>=75?a.color:"#ef4444" }}/>
                      </div>
                    </td>
                    <td>
                      <span className={`em-badge ${pct>=90?"em-badge-green":pct>=75?"em-badge-blue":"em-badge-red"}`}>
                        {pct>=90?"Excellent":pct>=75?"Good":"Low"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Daily Record Dots */}
        <div className="em-card">
          <div className="section-header"><h2>Session-wise Record</h2></div>
          {ATTENDANCE.map(a => (
            <div key={a.subject} style={{ marginBottom:20 }}>
              <div style={{ fontWeight:600, fontSize:14, marginBottom:8 }}>{a.subject}</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {a.records.map((r,i) => (
                  <div key={i} style={{
                    width:28, height:28, borderRadius:"50%",
                    background: r==="P"?a.color:"#fee2e2",
                    border: r==="P"?"none":"1.5px solid #fca5a5",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:10, fontWeight:700, color: r==="P"?"#fff":"#ef4444"
                  }}>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop:12, display:"flex", gap:20, fontSize:13, color:"#64748b" }}>
            <span><span style={{ display:"inline-block",width:12,height:12,borderRadius:"50%",background:"#1a56db",marginRight:4 }}/>Present</span>
            <span><span style={{ display:"inline-block",width:12,height:12,borderRadius:"50%",background:"#fee2e2",border:"1px solid #fca5a5",marginRight:4 }}/>Absent</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AttendancePage;

const page = { padding:"32px", background:"#f1f5f9", minHeight:"calc(100vh - 64px)" };
const overallCard  = { background:"linear-gradient(135deg,#1a56db,#6366f1)", borderRadius:20,
  padding:"32px 40px", marginBottom:28, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:20 };
const overallRight = { display:"flex", alignItems:"center", gap:32, flexWrap:"wrap" };
const overallStat  = { display:"flex", flexDirection:"column", alignItems:"center", gap:4 };
