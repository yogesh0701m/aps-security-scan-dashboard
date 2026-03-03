export const findingsData = {
  1: [
    {
      id: "f1",
      severity: "Critical",
      title: "SQL Injection in Authentication Endpoint",
      path: "/api/users/profile",
      description: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
      time: "10:45:23"
    },
    {
      id: "f2",
      severity: "High",
      title: "Unauthorized Access to User Metadata",
      path: "/api/auth/login",
      description: "An authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.",
      time: "10:46:15"
    },
    {
      id: "f3",
      severity: "Medium",
      title: "Broken Authentication Rate Limiting",
      path: "/api/search",
      description: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.",
      time: "10:47:02"
    }
  ],
  2: [
    {
      id: "f4",
      severity: "High",
      title: "Missing CSRF Protection",
      path: "/api/update-profile",
      description: "Cross-Site Request Forgery vulnerability found. CSRF tokens not implemented in sensitive endpoints.",
      time: "11:20:45"
    },
    {
      id: "f5",
      severity: "Medium",
      title: "Weak Password Policy",
      path: "/api/auth/register",
      description: "Password requirements are too weak. Minimum 6 characters with no complexity requirements.",
      time: "11:21:30"
    }
  ],
  3: [
    {
      id: "f6",
      severity: "Critical",
      title: "Hardcoded API Keys",
      path: "/src/config/api.js",
      description: "API keys found hardcoded in source code and client-side JavaScript. Keys exposed in network requests.",
      time: "09:15:22"
    },
    {
      id: "f7",
      severity: "High",
      title: "Insecure Direct Object References",
      path: "/api/documents/:id",
      description: "Users can access other users' documents by manipulating the ID parameter without authorization.",
      time: "09:18:05"
    }
  ],
  4: [
    {
      id: "f8",
      severity: "Critical",
      title: "Default Credentials on Admin Panel",
      path: "http://admin.internal.io:8080",
      description: "Admin panel accessible with default username 'admin' and password 'admin123'. Requires immediate remediation.",
      time: "14:30:10"
    },
    {
      id: "f9",
      severity: "High",
      title: "Unencrypted Sensitive Data Transmission",
      path: "/api/user-data",
      description: "Sensitive data transmitted over HTTP instead of HTTPS. Clear text passwords and personal information exposed.",
      time: "14:32:45"
    },
    {
      id: "f10",
      severity: "High",
      title: "Directory Traversal Vulnerability",
      path: "/download?file=",
      description: "File parameter vulnerable to directory traversal attacks. Allows reading arbitrary files from server.",
      time: "14:35:20"
    }
  ],
  5: [
    {
      id: "f11",
      severity: "Critical",
      title: "Unvalidated Redirects",
      path: "/redirect",
      description: "Open redirect vulnerability allows attackers to redirect users to malicious sites for phishing attacks.",
      time: "12:45:30"
    }
  ]
};
