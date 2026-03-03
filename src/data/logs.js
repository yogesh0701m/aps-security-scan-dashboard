export const logsData = {
  1: [
    { time: "09:00:00", text: ["I'll begin a systematic penetration test on ", { link: "helpdesk.democorp.com" }, ". Let me start with reconnaissance and enumeration."] },
    { time: "09:01:00", text: ["Good! target is online. Now let me perform port scanning to identify running services."] },
    { time: "09:02:00", text: ["Excellent reconnaissance results:\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure."] },
    { time: "09:03:00", text: ["Great! I found a login page for a Help Desk Platform. I can see a useful comment: ", { yellow: '"TODO: Delete the testing account (test:test)"' }, ". Let me test this credential. The login redirects to ", { code: "/password/test" }, ". Let me follow that path and explore it."] },
    { time: "09:04:00", text: ['The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to \'#\' which means the current page. Let me try a different approach.'] },
    { time: "09:05:00", text: ["It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the ", { teal: "test:test" }, " password directly on other endpoints."] },
    { time: "09:06:00", text: ["Great! I can access the dashboard using the ", { highlight: "'X-UserId: 10032'" }, " header. The dashboard shows \"Welcome, John Doe\". This suggests an ", { bold: "**IDOR vulnerability**" }, " - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application..."] }
  ],
  2: [
    { time: "10:15:00", text: ["Starting API endpoint fuzzing on api.example.com"] },
    { time: "10:16:30", text: ["Found 23 unique endpoints. Analyzing response codes..."] },
    { time: "10:18:45", text: ["Discovering CSRF tokens are missing from state-changing requests"] },
    { time: "10:20:00", text: ["Testing authentication bypass techniques..."] },
    { time: "10:22:15", text: ["Successfully bypassed rate limiting with distributed requests"] }
  ],
  3: [
    { time: "11:30:00", text: ["Beginning mobile API security assessment"] },
    { time: "11:31:20", text: ["Intercepting API calls to reverse engineer token generation"]} ,
    { time: "11:33:45", text: ["API keys detected in client-side code. Now analyzing token validity..."] },
    { time: "11:35:10", text: ["Token reuse vulnerability confirmed - same token valid across multiple requests"] }
  ]
};

export const verificationLoopsData = {
  1: [
    { time: "10:45:00", text: ["Verifying SQL injection with time-based queries..."] },
    { time: "10:46:30", text: ["Confirming database type: PostgreSQL 12.3"] },
    { time: "10:48:00", text: ["Extracting user table structure..."] },
    { time: "10:50:15", text: ["Verification complete - Critical vulnerability confirmed"] }
  ],
  2: [
    { time: "11:00:00", text: ["Validating IDOR vulnerability with different user IDs"] },
    { time: "11:02:30", text: ["Confirming access to admin data with low-privilege account"] },
    { time: "11:04:00", text: ["Impact assessment: Can access all user records"] }
  ]
};
