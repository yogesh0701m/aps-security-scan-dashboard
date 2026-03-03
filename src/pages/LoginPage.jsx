import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate first name
    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (form.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    // Validate last name
    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (form.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Validate password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Validate terms agreement
    if (!agreed) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Success
      setSuccessMessage("Account created successfully! Redirecting...");
      
      // Store email for later use
      localStorage.setItem("userEmail", form.email);
      
      // Clear form
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      setAgreed(false);
      setErrors({});

      // Redirect after a short delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: "#0a0e14",
        fontFamily: "'Sora', 'DM Sans', sans-serif",
      }}
    >
      {/* Gradient blobs background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* Top-left teal blob */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "50%",
            height: "60%",
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(0,160,140,0.38) 0%, rgba(0,120,110,0.18) 40%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
        {/* Bottom-right orange/red blob */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-5%",
            width: "55%",
            height: "65%",
            background:
              "radial-gradient(ellipse at 70% 70%, rgba(220,70,20,0.45) 0%, rgba(200,50,10,0.22) 35%, transparent 65%)",
            filter: "blur(6px)",
          }}
        />
        {/* Center subtle dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(10,14,20,0.55) 30%, transparent 100%)",
          }}
        />
        {/* Noise/grain texture overlay */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.045,
            pointerEvents: "none",
          }}
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .aps-input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #e2e5ea;
          border-radius: 10px;
          font-size: 14px;
          color: #1a1a2e;
          background: #fff;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }
        .aps-input::placeholder { color: #b0b8c1; }
        .aps-input:focus { border-color: #00b49a; box-shadow: 0 0 0 3px rgba(0,180,154,0.10); }

        .create-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(90deg, #00b49a 0%, #00c9aa 100%);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          font-family: inherit;
          letter-spacing: 0.01em;
        }
        .create-btn:hover { opacity: 0.92; transform: translateY(-1px); }
        .create-btn:active { transform: translateY(0); }

        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 0;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: opacity 0.18s, transform 0.1s;
          font-family: inherit;
        }
        .social-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        .check-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #d8f0ec;
          font-size: 14px;
          line-height: 1.5;
        }
      `}</style>

      {/* Logo — fixed top-left corner */}
      <div className="absolute top-6 left-8 z-20 flex items-center gap-2">
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #00c9aa, #00e5c8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#fff",
              opacity: 0.85,
            }}
          />
        </div>
        <span
          style={{
            color: "#fff",
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: "0.03em",
          }}
        >
          aps
        </span>
      </div>

      {/* Layout */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-12"
      >
        {/* Left: marketing copy */}
        <div className="flex-1 max-w-lg">
          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 28,
              letterSpacing: "-0.02em",
            }}
          >
            Expert level Cybersecurity
            <br />
            in{" "}
            <span style={{ color: "#00c9aa" }}>hours</span>{" "}
            not weeks.
          </h1>

          {/* What's included */}
          <p
            style={{
              color: "#b0d4d0",
              fontWeight: 600,
              fontSize: 13,
              marginBottom: 14,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            What's included
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              "Effortlessly spider and map targets to uncover hidden security flaws",
              "Deliver high-quality, validated findings in hours, not weeks.",
              "Generate professional, enterprise-grade security reports automatically.",
            ].map((item, i) => (
              <div key={i} className="check-item">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  style={{ marginTop: 1, flexShrink: 0 }}
                >
                  <path
                    d="M4 9.5L7.5 13L14 6"
                    stroke="#00c9aa"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Trustpilot */}
          <div style={{ marginTop: 48 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.2l-3.7 2.1.7-4.1L2 5.3l4.2-.7z"
                  fill="#00b67a"
                />
              </svg>
              <span style={{ color: "#9ab0aa", fontSize: 13, fontWeight: 500 }}>Trustpilot</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 17 }}>Rated 4.5/5.0</span>
              <span style={{ color: "#7a9490", fontSize: 13 }}>(100k+ reviews)</span>
            </div>
          </div>
        </div>

        {/* Right: Sign-up card */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "40px 36px 32px",
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: 26,
              fontWeight: 800,
              color: "#0f1923",
              marginBottom: 6,
              letterSpacing: "-0.02em",
            }}
          >
            Sign up
          </h2>
          <p style={{ textAlign: "center", fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
            Already have an account?{" "}
            <a href="#" style={{ color: "#00b49a", fontWeight: 600, textDecoration: "none" }}>
              Log in
            </a>
          </p>

          {/* Form fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Success message */}
            {successMessage && (
              <div style={{
                padding: "12px 14px",
                background: "#d1fae5",
                border: "1px solid #6ee7b7",
                borderRadius: 8,
                color: "#065f46",
                fontSize: 13,
                fontWeight: 500,
                textAlign: "center"
              }}>
                {successMessage}
              </div>
            )}

            {/* Error message */}
            {errors.submit && (
              <div style={{
                padding: "12px 14px",
                background: "#fee2e2",
                border: "1px solid #fca5a5",
                borderRadius: 8,
                color: "#991b1b",
                fontSize: 13,
                fontWeight: 500,
                textAlign: "center"
              }}>
                {errors.submit}
              </div>
            )}

            {/* First name */}
            <div>
              <input
                className="aps-input"
                type="text"
                name="firstName"
                placeholder="First name*"
                value={form.firstName}
                onChange={handleChange}
                disabled={loading}
                style={{
                  borderColor: errors.firstName ? "#ef4444" : "#e2e5ea",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "text"
                }}
              />
              {errors.firstName && (
                <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                  {errors.firstName}
                </span>
              )}
            </div>

            {/* Last name */}
            <div>
              <input
                className="aps-input"
                type="text"
                name="lastName"
                placeholder="Last name*"
                value={form.lastName}
                onChange={handleChange}
                disabled={loading}
                style={{
                  borderColor: errors.lastName ? "#ef4444" : "#e2e5ea",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "text"
                }}
              />
              {errors.lastName && (
                <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                  {errors.lastName}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                className="aps-input"
                type="email"
                name="email"
                placeholder="Email address*"
                value={form.email}
                onChange={handleChange}
                disabled={loading}
                style={{
                  borderColor: errors.email ? "#ef4444" : "#e2e5ea",
                  opacity: loading ? 0.6 : 1,
                  cursor: loading ? "not-allowed" : "text"
                }}
              />
              {errors.email && (
                <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div>
              <div style={{ position: "relative" }}>
                <input
                  className="aps-input"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password (8+ characters)*"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  style={{
                    paddingRight: 44,
                    borderColor: errors.password ? "#ef4444" : "#e2e5ea",
                    opacity: loading ? 0.6 : 1,
                    cursor: loading ? "not-allowed" : "text"
                  }}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    color: "#9ca3af",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span style={{ fontSize: 12, color: "#ef4444", marginTop: 4, display: "block" }}>
                  {errors.password}
                </span>
              )}
            </div>

            {/* Terms checkbox */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 2 }}>
              <div
                onClick={() => {
                  setAgreed(!agreed);
                  if (errors.terms) {
                    setErrors(prev => ({ ...prev, terms: "" }));
                  }
                }}
                role="checkbox"
                aria-checked={agreed}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setAgreed(!agreed);
                  }
                }}
                style={{
                  width: 17,
                  height: 17,
                  border: `1.8px solid ${errors.terms ? "#ef4444" : agreed ? "#00b49a" : "#d1d5db"}`,
                  borderRadius: 4,
                  background: agreed ? "#00b49a" : "#fff",
                  flexShrink: 0,
                  marginTop: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                {agreed && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>
                  I agree to Aps's{" "}
                  <a href="#" style={{ color: "#00b49a", textDecoration: "underline" }}>Terms & Conditions</a>
                  {" "}and acknowledge the{" "}
                  <a href="#" style={{ color: "#00b49a", textDecoration: "underline" }}>Privacy Policy</a>
                </span>
                {errors.terms && (
                  <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>
                    {errors.terms}
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <button 
              className="create-btn"
              onClick={handleSubmit}
              disabled={loading}
              style={{ 
                marginTop: 4,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
                position: "relative"
              }}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            {/* Social login */}
            <div style={{ display: "flex", gap: 10, marginTop: 2 }}>
              {/* Apple */}
              <button
                className="social-btn"
                disabled={loading}
                style={{ 
                  background: "#000", 
                  color: "#fff",
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </button>

              {/* Google */}
              <button
                className="social-btn"
                disabled={loading}
                style={{ 
                  background: "#fff", 
                  border: "1.5px solid #e5e7eb", 
                  color: "#374151",
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </button>

              {/* Meta */}
              <button
                className="social-btn"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #0866ff, #1877f2)",
                  color: "#fff",
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
