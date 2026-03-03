import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scansData } from "../data/scans";
import { StatusChip } from "../components/ReusableComponents";
import { useTheme } from "../context/ThemeContext";

const teal = "#1de9b6";

const NAV = [
  { label: "Dashboard", icon: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="currentColor">
      <rect x="2" y="2" width="7" height="7" rx="1"/><rect x="11" y="2" width="7" height="7" rx="1"/>
      <rect x="2" y="11" width="7" height="7" rx="1"/><rect x="11" y="11" width="7" height="7" rx="1"/>
    </svg>
  )},
  { label: "Projects", icon: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="14" height="12" rx="2"/><path d="M7 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/>
    </svg>
  )},
  { label: "Scans", icon: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="9" cy="9" r="5"/><path d="M15 15l3 3"/>
    </svg>
  )},
  { label: "Schedule", icon: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="14" height="13" rx="2"/><path d="M7 2v3M13 2v3M3 9h14"/>
    </svg>
  )},
];

const NAV2 = [
  { label: "Notifications", icon: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 2a6 6 0 016 6v3l1.5 2.5H2.5L4 11V8a6 6 0 016-6z"/><path d="M8 16a2 2 0 004 0"/>
    </svg>
  )},
  { label: "Settings", icon: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="10" r="3"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.22 3.22l1.42 1.42M15.36 15.36l1.42 1.42M3.22 16.78l1.42-1.42M15.36 4.64l1.42-1.42"/>
    </svg>
  )},
  { label: "Support", icon: (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="10" r="8"/><path d="M10 14v-1M10 7a2 2 0 012 2c0 1.5-2 2-2 3"/>
    </svg>
  )},
];

const severities = [
  { label: "Critical Severity", value: 86, change: "+2% increase than yesterday", up: true,
    icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#e53e3e"><circle cx="10" cy="10" r="8"/><line x1="10" y1="6" x2="10" y2="11" stroke="white" strokeWidth="2"/><circle cx="10" cy="14" r="1" fill="white"/></svg> },
  { label: "High Severity", value: 16, change: "+0.9% increase than yesterday", up: true,
    icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#ed8936"><path d="M10 3L2 17h16L10 3z"/><line x1="10" y1="9" x2="10" y2="13" stroke="white" strokeWidth="1.5"/><circle cx="10" cy="15.5" r="0.8" fill="white"/></svg> },
  { label: "Medium Severity", value: 26, change: "+0.9% decrease than yesterday", up: false,
    icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#ecc94b"><path d="M10 3L2 17h16L10 3z"/><line x1="10" y1="9" x2="10" y2="13" stroke="white" strokeWidth="1.5"/><circle cx="10" cy="15.5" r="0.8" fill="white"/></svg> },
  { label: "Low Severity", value: 16, change: "+0.9% increase than yesterday", up: true,
    icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#63b3ed"><circle cx="10" cy="10" r="8"/><line x1="10" y1="7" x2="10" y2="13" stroke="white" strokeWidth="1.5"/></svg> },
];

const statusStyle = {
  Completed: "bg-green-100 text-green-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Failed:    "bg-red-100 text-red-600",
};

const vulnColors = ["bg-red-500","bg-orange-400","bg-yellow-400","bg-green-500"];

function ProgressBar({ value, status }) {
  const color = status === "Failed" ? "bg-red-400" : "bg-teal-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-gray-500">{value}%</span>
    </div>
  );
}

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const userEmail = localStorage.getItem("userEmail") || "admin@edu.com";

  const handleNavClick = (label) => {
    setActive(label);
    // Navigate to different routes based on label
    if (label === "Dashboard") navigate("/dashboard");
    else if (label === "Scans") navigate(`/scan/${id}`);
    
  };

  // Calculate severity totals from all scans
  const calculateSeverityCounts = () => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    scansData.forEach(scan => {
      if (scan.vulnerabilities.length >= 4) {
        counts.critical += scan.vulnerabilities[0] || 0;
        counts.high += scan.vulnerabilities[1] || 0;
        counts.medium += scan.vulnerabilities[2] || 0;
        counts.low += scan.vulnerabilities[3] || 0;
      }
    });
    return counts;
  };

  const severityCounts = calculateSeverityCounts();
  
  const severities = [
    { label: "Critical Severity", value: severityCounts.critical, change: "+2% increase than yesterday", up: true, icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#e53e3e"><circle cx="10" cy="10" r="8"/><line x1="10" y1="6" x2="10" y2="11" stroke="white" strokeWidth="2"/><circle cx="10" cy="14" r="1" fill="white"/></svg> },
    { label: "High Severity", value: severityCounts.high, change: "+0.9% increase than yesterday", up: true, icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#ed8936"><path d="M10 3L2 17h16L10 3z"/><line x1="10" y1="9" x2="10" y2="13" stroke="white" strokeWidth="1.5"/><circle cx="10" cy="15.5" r="0.8" fill="white"/></svg> },
    { label: "Medium Severity", value: severityCounts.medium, change: "+0.9% decrease than yesterday", up: false, icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#ecc94b"><path d="M10 3L2 17h16L10 3z"/><line x1="10" y1="9" x2="10" y2="13" stroke="white" strokeWidth="1.5"/><circle cx="10" cy="15.5" r="0.8" fill="white"/></svg> },
    { label: "Low Severity", value: severityCounts.low, change: "+0.9% increase than yesterday", up: true, icon: <svg viewBox="0 0 20 20" className="w-5 h-5" fill="#63b3ed"><circle cx="10" cy="10" r="8"/><line x1="10" y1="7" x2="10" y2="13" stroke="white" strokeWidth="1.5"/></svg> },
  ];

  const filtered = scansData.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`flex h-screen font-sans overflow-hidden ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
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
              <span className={`flex-shrink-0 ${active === n.label ? "text-teal-600" : "text-gray-500"}`}>{n.icon}</span>
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
        <header className={`border-b px-8 py-4 flex items-center justify-between flex-shrink-0 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex items-center gap-2 text-sm">
            <span className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>Scan</span>
            <span className={`mx-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>/</span>
            <svg viewBox="0 0 16 16" className={`w-4 h-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} fill="currentColor"><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM7 5h2v4H7V5zm0 5h2v2H7v-2z"/></svg>
            <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Private Assets</span>
            <span className={`mx-1 ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>/</span>
            <span style={{ color: teal }} className="font-semibold">New Scan</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} title="Toggle theme">
              {isDark ? '☀️' : '🌙'}
            </button>
            <button className={`px-4 py-2 border rounded-md text-xs font-medium transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              Export Report
            </button>
            <button className={`px-4 py-2 rounded-md text-xs font-semibold border transition-colors ${isDark ? 'text-red-400 border-red-500 hover:bg-gray-700' : 'text-red-600 border-red-300 hover:bg-red-50'}`}>
              Stop Scan
            </button>
          </div>
        </header>

        <div className={`flex-1 overflow-y-auto ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="p-8">
            {/* Meta row */}
            <div className={`flex items-center gap-8 text-xs mb-10 flex-wrap ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>Org: <strong className={isDark ? 'text-gray-100' : 'text-gray-900'}>Project X</strong></span>
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <span>Owner: <strong className={isDark ? 'text-gray-100' : 'text-gray-900'}>Nammagiri</strong></span>
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <span>Total Scans: <strong className={isDark ? 'text-gray-100' : 'text-gray-900'}>100</strong></span>
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <span>Scheduled: <strong className={isDark ? 'text-gray-100' : 'text-gray-900'}>1000</strong></span>
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <span>Rescans: <strong className={isDark ? 'text-gray-100' : 'text-gray-900'}>100</strong></span>
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <span>Failed Scans: <strong className={isDark ? 'text-gray-100' : 'text-gray-900'}>100</strong></span>
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>|</span>
              <span className="flex items-center gap-1 ml-auto">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke={teal} strokeWidth="2"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg>
                <span style={{ color: teal }}>10 mins ago</span>
              </span>
            </div>

            {/* Severity cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {severities.map((s, i) => (
                <div key={i} className={`rounded-lg p-6 border shadow-xs hover:shadow-sm transition-shadow ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.label}</span>
                    <div className="text-lg">{s.icon}</div>
                  </div>
                  <div className="mb-3">
                    <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{s.value}</div>
                  </div>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${s.up ? "text-red-600" : "text-green-600"}`}>
                    <span className="text-sm">{s.up ? "↑" : "↓"}</span>
                    <span>{s.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table card */}
            <div className={`rounded-lg border shadow-xs overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              {/* Table toolbar */}
              <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 px-8 py-5 border-b ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex-1 relative">
                  <svg viewBox="0 0 20 20" className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="9" r="5"/><path d="M15 15l3 3"/>
                  </svg>
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search scans by name or type..."
                    className={`w-full pl-9 pr-4 py-2.5 text-xs border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder-gray-500 transition-all ${isDark ? 'bg-gray-800 border-gray-600 text-gray-100' : 'border-gray-300 bg-white text-gray-800'}`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border rounded-md text-xs font-medium transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 4h12M4 8h8M6 12h4"/>
                    </svg>
                    Filter
                  </button>
                  <button className={`flex items-center justify-center gap-1.5 px-3 py-2.5 border rounded-md text-xs font-medium transition-colors ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-100'}`}>
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="1" y="1" width="6" height="6" rx="1"/><rect x="9" y="1" width="6" height="6" rx="1"/>
                      <rect x="1" y="9" width="6" height="6" rx="1"/><rect x="9" y="9" width="6" height="6" rx="1"/>
                    </svg>
                    Column
                  </button>
                  <button className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md text-xs font-semibold text-white transition-all hover:opacity-95 active:scale-95" style={{ background: "linear-gradient(135deg,#1de9b6,#00897b)" }}>
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5">
                      <path d="M8 3v10M3 8h10"/>
                    </svg>
                    New Scan
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
                      <th className={`text-left px-8 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Scan Name</th>
                      <th className={`text-left px-8 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Type</th>
                      <th className={`text-left px-8 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Status</th>
                      <th className={`text-left px-8 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Progress</th>
                      <th className={`text-left px-8 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Vulnerability</th>
                      <th className={`text-right px-8 py-4 font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Last Scan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((row) => (
                      <tr key={row.id} onClick={() => navigate(`/scan/${row.id}`)} className={`border-b transition-colors cursor-pointer ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'}`}>
                        <td className={`px-8 py-5 font-medium ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{row.name}</td>
                        <td className={`px-8 py-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{row.type}</td>
                        <td className="px-8 py-5">
                          <StatusChip status={row.status} />
                        </td>
                        <td className="px-8 py-5">
                          <ProgressBar value={row.progress} status={row.status} />
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex gap-2">
                            {row.vulnerabilities.map((v, j) => (
                              <span key={j} className={`${vulnColors[j % vulnColors.length]} text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-md`}>
                                {v}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className={`px-8 py-5 text-right ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{row.lastScan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
