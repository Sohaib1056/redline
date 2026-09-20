"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  // If on the login page, render without header/sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      <header className="admin-layout-header">
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/admin" className="admin-brand-group">
            <div className="admin-brand-icon-box">R</div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontSize: 16, fontWeight: 900, letterSpacing: "-0.03em", color: "#0F172A" }}>
                Red<span style={{ color: "#E50914" }}>Line</span>
              </span>
              <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#64748B", marginTop: 2 }}>
                Dispatch Command Center
              </span>
            </div>
          </Link>

          <div className="live-status-chip">
            <span className="pulse-dot" />
            Live Network Operational
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "#64748B",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "6px 12px",
              borderRadius: 8,
              transition: "all 0.15s ease",
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12,19 5,12 12,5" />
            </svg>
            Public Website
          </Link>

          <div style={{ width: 1, height: 20, background: "#E2E8F0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="header-user-avatar">AD</div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0F172A" }}>Administrator</span>
              <span style={{ fontSize: 10, color: "#64748B" }}>Dispatch Duty</span>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
              background: "#F8FAFC",
              border: "1px solid #CBD5E1",
              fontSize: 12,
              fontWeight: 700,
              color: "#334155",
              cursor: "pointer",
              transition: "all 0.15s ease",
              marginLeft: 4,
            }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sign out
          </button>
        </div>
      </header>

      <div className="admin-layout-body">
        <aside className="admin-sidebar">
          <div>
            <span className="admin-sidebar-section-title">Navigation Menu</span>
            <nav>
              <Link
                href="/admin"
                className={`admin-nav-item ${pathname === "/admin" ? "active" : ""}`}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                Analytics Dashboard
              </Link>

              <Link
                href="/admin/requests"
                className={`admin-nav-item ${pathname.startsWith("/admin/requests") ? "active" : ""}`}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
                </svg>
                Incoming Requests
              </Link>
            </nav>
          </div>

          <div>
            <div className="sidebar-system-card">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E" }} />
                <strong>RedLine Server v2.4</strong>
              </div>
              <span>Encrypted SSL · Live Monitoring</span>
            </div>

            <button
              onClick={logout}
              className="admin-nav-item"
              style={{ marginTop: 16, color: "#DC2626" }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Sign out session
            </button>
          </div>
        </aside>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
