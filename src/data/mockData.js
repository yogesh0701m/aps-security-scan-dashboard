export const mockScans = [
  {
    id: 1,
    name: 'Web App Servers',
    type: 'Greybox',
    status: 'Completed',
    progress: 100,
    vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
    lastScan: '4d ago',
    scanType: 'Web Application',
    targets: '192.168.1.0/24',
    startedAt: new Date().toISOString(),
    credentials: '2',
    files: '15',
    checklists: 'OWASP Top 10',
  },
];

export const mockFindings = [
  {
    id: 1,
    title: 'SQL Injection Vulnerability',
    severity: 'red',
    endpoint: 'POST /api/users/login',
    description: 'Found SQL injection vulnerability in login endpoint',
    timestamp: '2 mins ago',
  },
  {
    id: 2,
    title: 'Missing Security Headers',
    severity: 'orange',
    endpoint: 'GET /*',
    description: 'Missing Content-Security-Policy header',
    timestamp: '5 mins ago',
  },
];

export const scanSteps = [
  { name: 'Reconnaissance', active: true },
  { name: 'Enumeration', active: false },
  { name: 'Scanning', active: false },
  { name: 'Analysis', active: false },
];

export const activityLogs = [
  '[10:23:45] Starting reconnaissance phase...',
  '[10:23:47] Scanning target: 192.168.1.10',
  '[10:23:52] Enumeration complete. Found 45 endpoints',
  '[10:24:01] Testing for common vulnerabilities...',
  '[10:24:15] SQL injection vulnerability detected',
  '[10:24:18] Analyzing findings...',
];

export const dashboardStats = {
  critical: 86,
  high: 16,
  medium: 26,
  low: 16,
};
