import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { scansData } from "../data/scans";
import { findingsData } from "../data/findings";
import { logsData, verificationLoopsData } from "../data/logs";
import { SeverityBadge } from "../components/ReusableComponents";
import { useTheme } from "../context/ThemeContext";

const teal = "#1de9b6";

const NAV = [
  { label: "Dashboard", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor"><rect x="2" y="2" width="7" height="7" rx="1"/><rect x="11" y="2" width="7" height="7" rx="1"/><rect x="2" y="11" width="7" height="7" rx="1"/><rect x="11" y="11" width="7" height="7" rx="1"/></svg> },
  { label: "Projects", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="14" height="12" rx="2"/><path d="M7 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/></svg> },
  { label: "Scans", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="9" r="5"/><path d="M15 15l3 3"/></svg> },
  { label: "Schedule", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M7 2v3M13 2v3M3 9h14"/></svg> },
];
const NAV2 = [
  { label: "Notifications", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M10 2a6 6 0 016 6v3l1.5 2.5H2.5L4 11V8a6 6 0 016-6z"/><path d="M8 16a2 2 0 004 0"/></svg> },
  { label: "Settings", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="3"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.22 3.22l1.42 1.42M15.36 15.36l1.42 1.42M3.22 16.78l1.42-1.42M15.36 4.64l1.42-1.42"/></svg> },
  { label: "Support", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="8"/><path d="M10 14v-1M10 7a2 2 0 012 2c0 1.5-2 2-2 3"/></svg> },
];

const steps = [
  { label: "Spidering", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10" cy="10" r="3"/><path d="M10 2v3M10 15v3M2 10h3M15 10h3"/></svg> },
  { label: "Mapping", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="6" height="4" rx="1"/><rect x="12" y="5" width="6" height="4" rx="1"/><rect x="7" y="13" width="6" height="4" rx="1"/><path d="M5 9v2h10V9"/><path d="M10 11v2"/></svg> },
  { label: "Testing", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3h6l2 5-5 9-5-9 2-5z"/></svg> },
  { label: "Validating", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="2" width="14" height="17" rx="2"/><path d="M7 7h6M7 11h4"/></svg> },
  { label: "Reporting", icon: <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2" width="12" height="16" rx="2"/><path d="M8 6h4M8 10h4M8 14h2"/></svg> },
];

const logLines = [
  { time: "09:00:00", text: ["I'll begin a systematic penetration test on ", {link:"helpdesk.democorp.com"}, ". Let me start with reconnaissance and enumeration."] },
  { time: "09:01:00", text: ["Good! target is online. Now let me perform port scanning to identify running services."] },
  { time: "09:02:00", text: ["Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure."] },
  { time: "09:03:00", text: ["Great! I found a login page for a Help Desk Platform. I can see a useful comment: ", {yellow:'"TODO: Delete the testing account (test:test)"'}, ". Let me test this credential. The login redirects to ", {code:"/password/test"}, ". Let me follow that path and explore it."] },
  { time: "09:04:00", text: ['The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to \'#\' which means the current page. Let me try a different approach.'] },
  { time: "09:05:00", text: ["It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the ", {teal:"test:test"}, " password directly on other endpoints."] },
  { time: "09:06:00", text: ["Great! I can access the dashboard using the ", {highlight:"'X-UserId: 10032'"}, " header. The dashboard shows \"Welcome, John Doe\". This suggests an ", {bold:"**IDOR vulnerability**"}, " - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application..."] },
];

const findings = [
  {
    severity: "Critical", color: "bg-red-500",
    title: "SQL Injection in Authentication Endpoint",
    path: "/api/users/profile",
    desc: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
    time: "10:45:23",
  },
  {
    severity: "High", color: "bg-orange-400",
    title: "Unauthorized Access to User Metadata",
    path: "/api/auth/login",
    desc: "An authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.",
    time: "10:45:23",
  },
  {
    severity: "Medium", color: "bg-yellow-400",
    title: "Broken Authentication Rate Limiting",
    path: "/api/search",
    desc: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.",
    time: "10:45:23",
  },
];

function renderLine(parts) {
  if (typeof parts === "string") return <span>{parts}</span>;
  return parts.map((p, i) => {
    if (typeof p === "string") return <span key={i}>{p}</span>;
    if (p.link) return <span key={i} style={{color: teal}} className="underline cursor-pointer">{p.link}</span>;
    if (p.yellow) return <span key={i} className="text-yellow-400">{p.yellow}</span>;
    if (p.code) return <span key={i} className="bg-gray-700 text-teal-300 px-1 py-0.5 rounded font-mono text-xs">{p.code}</span>;
    if (p.teal) return <span key={i} style={{color:teal}}>{p.teal}</span>;
    if (p.highlight) return <span key={i} className="bg-yellow-900 text-yellow-200 px-1 rounded font-mono text-xs">{p.highlight}</span>;
    if (p.bold) return <span key={i} className="font-bold text-white">{p.bold.replace(/\*\*/g,"")}</span>;
    return null;
  });
}

export default function ScanDetailPage() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { id } = useParams();
  const [active, setActive] = useState("Scans");
  const [tab, setTab] = useState("Activity Log");
  const logRef = useRef(null);
  const userEmail = localStorage.getItem("userEmail") || "admin@edu.com";

  // Get scan data based on ID
  const scan = scansData.find(s => s.id === parseInt(id));
  const scanFindings = findingsData[parseInt(id)] || [];
  const activityLogs = logsData[parseInt(id)] || [];
  const verificationLogs = verificationLoopsData[parseInt(id)] || [];

  const handleNavClick = (label) => {
    setActive(label);
    // Navigate to different routes based on label
    if (label === "Dashboard") navigate("/dashboard");
    else if (label === "Scans") navigate(`/scan/${id}`);
    
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, []);

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50'}`} style={{fontFamily:"'Inter',sans-serif"}}>
      {/* Sidebar */}
      <aside className={`w-48 border-r flex flex-col py-6 flex-shrink-0 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 mb-8">
          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#1de9b6,#00897b)" }}>
            <div className="w-3 h-3 rounded-full bg-white opacity-95" />
          </div>
          <span className={`font-bold text-base tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>aps</span>
        </div>

        <nav className="px-4 space-y-1">
          {NAV.map(n => (
            <button key={n.label} onClick={() => handleNavClick(n.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-all ${
                active === n.label
                  ? isDark ? "text-teal-400 bg-gray-700 border border-teal-600" : "text-teal-600 bg-teal-50 border border-teal-100"
                  : isDark ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}>
              <span className={`flex-shrink-0 ${active === n.label ? isDark ? 'text-teal-400' : 'text-teal-600' : isDark ? 'text-gray-600' : 'text-gray-500'}`}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <nav className={`flex-1 px-4 space-y-1 mb-6 border-t pt-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {NAV2.map(n => (
            <button key={n.label} onClick={() => handleNavClick(n.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-all ${
                active === n.label 
                  ? isDark ? "text-teal-400 bg-gray-700 border border-teal-600" : "text-teal-600 bg-teal-50 border border-teal-100" 
                  : isDark ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}>
              <span className={`flex-shrink-0 ${active === n.label ? isDark ? 'text-teal-400' : 'text-teal-600' : isDark ? 'text-gray-600' : 'text-gray-500'}`}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        {/* User */}
        <div className={`px-4 py-3 border-t flex items-center gap-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-300 to-pink-400 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{userEmail}</p>
            <p className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Security Lead</p>
          </div>
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 4l4 4-4 4"/>
          </svg>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className={`border-b px-6 py-3 flex items-center justify-between flex-shrink-0 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className="flex items-center gap-1 text-sm">
            <span className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Scan</span>
            <span className={`mx-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>/</span>
            <svg viewBox="0 0 16 16" className={`w-3.5 h-3.5 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="currentColor"><path d="M8 2a6 6 0 100 12A6 6 0 008 2z"/></svg>
            <span className={isDark ? 'text-gray-400' : 'text-gray-400'}>Private Assets</span>
            <span className={`mx-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>/</span>
            <span style={{color:teal}} className="font-medium">New Scan</span>
          </div>
          <div className="flex items-center gap-2">
            <button className={`px-4 py-1.5 border rounded-lg text-xs font-medium transition ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>Export Report</button>
            <button className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${isDark ? 'text-red-400 border-red-500 hover:bg-gray-700' : 'text-red-500 border-red-200 hover:bg-red-50'}`}>Stop Scan</button>
          </div>
        </header>

        <div className={`flex-1 overflow-y-auto p-5 space-y-4 ${isDark ? 'bg-gray-900' : ''}`}>
          {/* Progress card */}
          <div className={`rounded-xl border shadow-sm p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            <div className="flex items-stretch gap-6">
              {/* Circle progress - centered vertically against all right content */}
              <div className="flex-shrink-0 flex items-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-sm" style={{background:"#1a2035", border:"3px solid #2a3350"}}>
                  <div className="text-center">
                    <div className="text-lg font-bold" style={{color: teal}}>0%</div>
                    <div className="text-xs text-gray-400 leading-tight mt-0.5">In Progress</div>
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className={`w-px self-stretch flex-shrink-0 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />

              {/* Right side: Steps on top, Meta below — stacked in parallel */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                {/* Steps */}
                <div className="flex items-start justify-between relative">
                  {/* connector line */}
                  <div className={`absolute top-5 h-px z-0 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} style={{left:"3%",right:"3%"}}/>
                  {steps.map((s, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        i === 0
                          ? "border-transparent text-white shadow-md"
                          : isDark
                            ? "border-gray-600 text-gray-500 bg-gray-800"
                            : "border-gray-200 text-gray-400 bg-white"
                      }`} style={i===0?{background:"linear-gradient(135deg,#1de9b6,#00897b)"}:{}}>
                        {s.icon}
                      </div>
                      <span className={`text-xs font-medium ${
                        i === 0
                          ? isDark ? "text-gray-200" : "text-gray-700"
                          : isDark ? "text-gray-500" : "text-gray-400"
                      }`}>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Horizontal divider */}
                <div className={`h-px w-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`} />

                {/* Meta info */}
                <div className={`flex items-center gap-8 justify-between text-xs`}>
                  {[
                    {label:"Scan Type", value: scan?.scanType || "N/A", tealVal: false},
                    {label:"Targets", value: scan?.targets || "N/A", tealVal: false},
                    {label:"Started At", value: scan?.startedAt ? new Date(scan.startedAt).toLocaleString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}) : "N/A", tealVal: false},
                    {label:"Credentials", value: scan?.credentials || "N/A", tealVal: false},
                    {label:"Files", value: scan?.files || "N/A", tealVal: false},
                    {label:"Checklists", value: scan?.checklists || "N/A", tealVal: true},
                  ].map((m,i) => (
                    <div key={i}>
                      <div className={`mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{m.label}</div>
                      <div className={`font-semibold ${m.tealVal ? '' : isDark ? 'text-gray-100' : 'text-gray-800'}`} style={m.tealVal ? {color: teal} : {}}>{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Scan Console */}
          <div className={`rounded-xl border shadow-sm overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
            {/* Console header */}
            <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                <span className={`text-xs font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Live Scan Console</span>
                <span className={`text-xs flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                  <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
                  Running...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className={`transition ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8h10"/></svg>
                </button>
                <button className={`transition ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                  <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l10 10M13 3L3 13"/></svg>
                </button>
              </div>
            </div>

            <div className="flex" style={{height:"auto", minHeight: "200px"}}>
              {/* Left: Activity Log */}
              <div className={`flex-1 flex flex-col border-r ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                {/* Tabs */}
                <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                  {["Activity Log","Verification Loops"].map(t => (
                    <button key={t} onClick={()=>setTab(t)}
                      className={`px-4 py-2.5 text-xs font-medium transition-colors ${tab===t?isDark?"text-teal-400 border-b-2 border-teal-600":"text-teal-600 border-b-2 border-teal-500":isDark?"text-gray-400 hover:text-gray-300":"text-gray-400 hover:text-gray-600"}`}>
                      {t}
                    </button>
                  ))}
                </div>

                {/* Log content */}
                <div ref={logRef} className={`flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3 ${isDark ? 'bg-gray-950 text-gray-300' : 'bg-gray-950 text-gray-300'}`}>
                  {(tab === "Activity Log" ? activityLogs : verificationLogs).map((line, i) => (
                    <div key={i} className="text-gray-300 leading-relaxed">
                      <span className="text-gray-500 mr-2">[{line.time}]</span>
                      <span className="whitespace-pre-wrap">{typeof line.text === 'string' ? line.text : renderLine(line.text)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Finding Log */}
              <div className={`w-72 flex flex-col flex-shrink-0 border-l ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <div className={`px-4 py-2.5 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                  <span className={`text-xs font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>Finding Log</span>
                </div>
                <div className={`flex-1 overflow-y-auto p-3 space-y-3 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  {scanFindings.map((f) => (
                    <div key={f.id} className={`rounded-lg p-3 border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <SeverityBadge severity={f.severity} />
                        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>{f.time}</span>
                      </div>
                      <div className={`text-xs font-semibold mb-0.5 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{f.title}</div>
                      <div className="text-xs mb-1.5" style={{color:teal}}>{f.path}</div>
                      <div className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{f.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom status bar */}
        {/* Bottom status bar */}
        <div className={`border-t px-6 py-2 flex items-center justify-between flex-shrink-0 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
          <div className={`flex items-center gap-5 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {[["Sub-Agents","0"],["Parallel Executions","2"],["Operations","1"]].map(([k,v])=>(
              <span key={k} className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gray-600' : 'bg-gray-300'}`}/>
                {k}: {v}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-red-500">Critical: 0</span>
            <span className="text-orange-400">High: 0</span>
            <span className="text-yellow-500">Medium: 0</span>
            <span className="text-green-500">Low: 0</span>
          </div>
        </div>
      </main>
    </div>
  );
}
