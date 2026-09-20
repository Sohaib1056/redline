"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleQuickFill() {
    setEmail("admin@redline.com");
    setPassword("RedlineDemo123!");
    setError("");
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || "Invalid credentials. Please verify email and password.");
        setLoading(false);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Network connection error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-split-page">
      {/* Left Visual Hero Sidebar (50% Width, Pure White Crisp Contrast Text) */}
      <div className="login-hero-sidebar">
        <div className="login-hero-brand">
          <div className="login-hero-brand-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.04em", color: "#FFFFFF" }}>
              RedLine
            </span>
            <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FFFFFF", opacity: 0.9, marginTop: 2 }}>
              Dispatch Command Center
            </span>
          </div>
        </div>

        <div className="login-hero-body">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              borderRadius: 9999,
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            <span className="pulse-dot" style={{ background: "#FFFFFF", boxShadow: "0 0 8px #FFFFFF" }} />
            24/7 Fleet Telemetry Active
          </div>

          <h1 style={{ color: "#FFFFFF" }}>Emergency Transport Dispatch Portal</h1>
          <p style={{ color: "#FFFFFF", opacity: 0.95 }}>
            Real-time ambulance fleet routing, patient transport requests, and rapid incident triage response.
          </p>
        </div>

        <div className="login-hero-stats">
          <div>
            <div className="login-stat-number" style={{ color: "#FFFFFF" }}>1,450+</div>
            <div className="login-stat-label" style={{ color: "#FFFFFF" }}>Transports Completed</div>
          </div>
          <div>
            <div className="login-stat-number" style={{ color: "#FFFFFF" }}>&lt; 8 min</div>
            <div className="login-stat-label" style={{ color: "#FFFFFF" }}>Avg Response Time</div>
          </div>
          <div>
            <div className="login-stat-number" style={{ color: "#FFFFFF" }}>24/7</div>
            <div className="login-stat-label" style={{ color: "#FFFFFF" }}>Dispatch Support</div>
          </div>
        </div>
      </div>

      {/* Right Login Form Sidebar (50% Width) */}
      <div className="login-form-sidebar">
        <div className="login-box-container">
          <div style={{ marginBottom: 28 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#E50914",
              }}
            >
              Restricted Portal Access
            </span>
            <h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A", marginTop: 4, marginBottom: 8 }}>
              Admin Sign In
            </h2>
            <p style={{ fontSize: 13.5, color: "#64748B", lineHeight: 1.5 }}>
              Enter your admin credentials to access the RedLine Dispatch Command Center.
            </p>
          </div>

          {/* Quick Credentials Box */}
          <div className="demo-credentials-box">
            <div className="demo-credentials-header">
              <span>🔐 Authorized Login Credentials</span>
              <button type="button" className="quick-fill-btn" onClick={handleQuickFill}>
                Fill Demo Auth
              </button>
            </div>
            <div style={{ fontSize: 12, color: "#99010A", lineHeight: 1.6 }}>
              <div>
                Email: <strong style={{ fontFamily: "monospace" }}>admin@redline.com</strong>
              </div>
              <div>
                Password: <strong style={{ fontFamily: "monospace" }}>RedlineDemo123!</strong>
              </div>
            </div>
          </div>

          <form onSubmit={submit}>
            {error && (
              <div
                className="form-error"
                role="alert"
                style={{
                  borderRadius: 10,
                  marginBottom: 20,
                  background: "#FEF2F2",
                  color: "#DC2626",
                  border: "1px solid #FCA5A5",
                  padding: "12px 14px",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="field" style={{ marginBottom: 18 }}>
              <label htmlFor="email" style={{ fontSize: 12.5, fontWeight: 700, color: "#334155", marginBottom: 6, display: "block" }}>
                Admin Email Address
              </label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@redline.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field" style={{ marginBottom: 24 }}>
              <label htmlFor="password" style={{ fontSize: 12.5, fontWeight: 700, color: "#334155", marginBottom: 6, display: "block" }}>
                Password
              </label>
              <div className="input-with-icon">
                <svg className="field-icon" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                height: 48,
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 800,
                boxShadow: "0 4px 14px rgba(229, 9, 20, 0.3)",
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  Verifying Authorization...
                </span>
              ) : (
                <>
                  Sign In to Dispatch Portal <span style={{ fontSize: 16 }}>→</span>
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/" className="login-footer-link">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12,19 5,12 12,5" />
              </svg>
              Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
