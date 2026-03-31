import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";

const ENROLLMENT = [
  { month:"Jan",students:30 },{ month:"Feb",students:45 },{ month:"Mar",students:38 },
  { month:"Apr",students:60 },{ month:"May",students:52 },{ month:"Jun",students:70 },
  { month:"Jul",students:65 },{ month:"Aug",students:80 },
];
const ATTENDANCE_TREND = [
  { month:"Jan",rate:88 },{ month:"Feb",rate:82 },{ month:"Mar",rate:91 },
  { month:"Apr",rate:87 },{ month:"May",rate:93 },{ month:"Jun",rate:89 },
];
const COURSE_DIST = [
  { name:"Programming", value:45, color:"#1a56db" },
  { name:"Web Dev",     value:30, color:"#6366f1" },
  { name:"Database",    value:15, color:"#10b981" },
  { name:"CS Core",     value:10, color:"#f59e0b" },
];

function ReportsPage() {
  const [range, setRange] = useState("6M");

  return (
    <>
      <Navbar />
      <div style={page}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <h1 className="page-title" style={{ margin:0 }}>📊 Platform Reports</h1>
          <div style={{ display:"flex", gap:8 }}>
            {["3M","6M","1Y"].map(r => (
              <button key={r} onClick={() => setRange(r)}
                style={{ padding:"6px 16px", borderRadius:8, fontSize:13, fontWeight:600, border:"none", cursor:"pointer",
                  background: range===r?"#1a56db":"#e2e8f0",
                  color:      range===r?"#fff":"#64748b" }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Summary Cards */}
        <div style={statsGrid}>
          {[
            { num:"250+", lbl:"Total Students", icon:"🎓", color:"#1a56db" },
            { num:"12",   lbl:"Active Courses", icon:"📚", color:"#10b981" },
            { num:"89%",  lbl:"Avg Attendance",  icon:"📊", color:"#f59e0b" },
            { num:"95%",  lbl:"Assignment Rate", icon:"📝", color:"#6366f1" },
          ].map(s => (
            <div key={s.lbl} className="stat-card" style={{ borderLeftColor:s.color }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                  <div className="stat-num" style={{ color:s.color }}>{s.num}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
                <div style={{ fontSize:28 }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={chartsRow}>
          <div className="em-card">
            <h3 style={chartTitle}>Monthly Enrollments</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ENROLLMENT}>
                <XAxis dataKey="month" tick={{ fontSize:12 }} />
                <YAxis tick={{ fontSize:12 }} />
                <Tooltip />
                <Bar dataKey="students" fill="#1a56db" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="em-card">
            <h3 style={chartTitle}>Attendance Trend (%)</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={ATTENDANCE_TREND}>
                <XAxis dataKey="month" tick={{ fontSize:12 }} />
                <YAxis domain={[70,100]} tick={{ fontSize:12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} dot={{ r:4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom row */}
        <div style={chartsRow}>
          <div className="em-card">
            <h3 style={chartTitle}>Course Category Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={COURSE_DIST} cx="50%" cy="50%" outerRadius={90} dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}>
                  {COURSE_DIST.map((e,i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="em-card">
            <h3 style={chartTitle}>Performance Summary</h3>
            <table className="em-table" style={{ width:"100%" }}>
              <thead><tr><th>Metric</th><th>Value</th><th>Trend</th></tr></thead>
              <tbody>
                {[
                  ["Total Enrollments","250", "📈 +12%"],
                  ["Avg Attendance",   "89%", "📈 +3%"],
                  ["Assignment Submit","95%", "📈 +5%"],
                  ["Pass Rate",        "87%", "📊 Stable"],
                  ["Dropout Rate",     "4%",  "📉 -1%"],
                ].map(([k,v,t]) => (
                  <tr key={k}>
                    <td style={{ fontWeight:600 }}>{k}</td>
                    <td style={{ fontWeight:700, color:"#1a56db" }}>{v}</td>
                    <td style={{ color:"#10b981", fontSize:13 }}>{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReportsPage;

const page       = { padding:"32px", background:"#f1f5f9", minHeight:"calc(100vh - 64px)" };
const statsGrid  = { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:24 };
const chartsRow  = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 };
const chartTitle = { fontSize:16, fontWeight:700, marginBottom:16 };
