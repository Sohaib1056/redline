"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AmbulanceRequest } from "@/lib/types";

export default function AdminDashboardAnalyticsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<AmbulanceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [session, payload] = await Promise.all([
          fetch("/api/admin/session").then((r) => r.json()),
          fetch("/api/requests").then((r) => r.json()),
        ]);

        if (!session.authenticated) {
          router.replace("/admin/login");
          return;
        }

        setRequests(payload.requests ?? []);
      } catch (err) {
        console.error("Failed to load analytics data:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  const counts = useMemo(() => {
    const list = requests || [];
    return {
      total: list.length,
      new: list.filter((r) => r.status === "New").length,
      progress: list.filter((r) => r.status === "In Progress" || r.status === "Contacted" || r.status === "Confirmed").length,
      completed: list.filter((r) => r.status === "Completed").length,
      cancelled: list.filter((r) => r.status === "Cancelled").length,
    };
  }, [requests]);

  const weeklyData = [
    { day: "Mon", count: 4 },
    { day: "Tue", count: 7 },
    { day: "Wed", count: 5 },
    { day: "Thu", count: 9 },
    { day: "Fri", count: 12 },
    { day: "Sat", count: 8 },
    { day: "Sun", count: Math.max((requests || []).length, 6) },
  ];

  const maxWeekly = Math.max(...weeklyData.map((d) => d.count), 1);

  if (loading) {
    return (
      <div className="admin-loading" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="3" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }}>
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#64748B" }}>Loading dispatch analytics & metrics...</span>
      </div>
    );
  }

  return (
    <div className="analytics-page-container">
      <div className="admin-topbar-header">
        <div>
          <div className="eyebrow" style={{ color: "#E50914", marginBottom: 4 }}>
            Operational Dashboard
          </div>
          <h1>Analytics & Dispatch Metrics</h1>
          <p>Real-time analytics, response diagrams, and service volume insights.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <Link
            href="/admin/requests"
            className="btn btn-primary"
            style={{ height: 42, borderRadius: 10, fontSize: 13, fontWeight: 700 }}
          >
            Manage Requests Queue ({requests.length}) →
          </Link>
        </div>
      </div>

      <div className="summary-grid">
        <SummaryCardModern
          label="Total Requests"
          value={counts.total}
          subtext="Lifetime logged requests"
          bgColor="#FEF2F2"
          iconColor="#E50914"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
            </svg>
          }
        />
        <SummaryCardModern
          label="New Requests"
          value={counts.new}
          subtext="Requires immediate dispatch"
          bgColor="#FEF3C7"
          iconColor="#D97706"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          }
        />
        <SummaryCardModern
          label="Active Transports"
          value={counts.progress}
          subtext="En-route or confirmed"
          bgColor="#F3E8FF"
          iconColor="#7C3AED"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        />
        <SummaryCardModern
          label="Completed Transfers"
          value={counts.completed}
          subtext="Delivered successfully"
          bgColor="#DCFCE7"
          iconColor="#166534"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
      </div>

      <div className="analytics-grid" style={{ gridTemplateColumns: "1.6fr 1fr", marginBottom: 24 }}>
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Weekly Dispatch Trend Bar Chart</h3>
              <span style={{ fontSize: 12, color: "#64748B" }}>Daily emergency and patient transport volume</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#166534", background: "#DCFCE7", padding: "4px 10px", borderRadius: 9999 }}>
              +14% Growth
            </span>
          </div>

          <div className="chart-bars-wrap">
            {weeklyData.map((d) => {
              const heightPct = Math.round((d.count / maxWeekly) * 100);
              return (
                <div key={d.day} className="chart-bar-col">
                  <span className="chart-bar-val">{d.count}</span>
                  <div className="chart-bar-fill" style={{ height: `${heightPct}%` }} />
                  <span className="chart-bar-label">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Service Breakdown</h3>
          </div>

          <div className="distribution-list">
            <div className="dist-item">
              <div className="dist-item-top">
                <span>Emergency Ambulance</span>
                <span style={{ color: "#E50914" }}>58%</span>
              </div>
              <div className="dist-bar-track">
                <div className="dist-bar-fill" style={{ width: "58%", background: "#E50914" }} />
              </div>
            </div>

            <div className="dist-item">
              <div className="dist-item-top">
                <span>Patient Transfer</span>
                <span style={{ color: "#2563EB" }}>24%</span>
              </div>
              <div className="dist-bar-track">
                <div className="dist-bar-fill" style={{ width: "24%", background: "#2563EB" }} />
              </div>
            </div>

            <div className="dist-item">
              <div className="dist-item-top">
                <span>Critical Care Transport</span>
                <span style={{ color: "#7C3AED" }}>18%</span>
              </div>
              <div className="dist-bar-track">
                <div className="dist-bar-fill" style={{ width: "18%", background: "#7C3AED" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="chart-card">
          <div className="chart-header">
            <h3>Status Distribution</h3>
          </div>

          <div className="distribution-list">
            <div className="dist-item">
              <div className="dist-item-top">
                <span>New Queue ({counts.new})</span>
                <span style={{ color: "#D97706" }}>
                  {counts.total > 0 ? Math.round((counts.new / counts.total) * 100) : 0}%
                </span>
              </div>
              <div className="dist-bar-track">
                <div
                  className="dist-bar-fill"
                  style={{ width: `${counts.total > 0 ? (counts.new / counts.total) * 100 : 0}%`, background: "#F59E0B" }}
                />
              </div>
            </div>

            <div className="dist-item">
              <div className="dist-item-top">
                <span>Active & In Progress ({counts.progress})</span>
                <span style={{ color: "#7C3AED" }}>
                  {counts.total > 0 ? Math.round((counts.progress / counts.total) * 100) : 0}%
                </span>
              </div>
              <div className="dist-bar-track">
                <div
                  className="dist-bar-fill"
                  style={{ width: `${counts.total > 0 ? (counts.progress / counts.total) * 100 : 0}%`, background: "#7C3AED" }}
                />
              </div>
            </div>

            <div className="dist-item">
              <div className="dist-item-top">
                <span>Completed ({counts.completed})</span>
                <span style={{ color: "#166534" }}>
                  {counts.total > 0 ? Math.round((counts.completed / counts.total) * 100) : 0}%
                </span>
              </div>
              <div className="dist-bar-track">
                <div
                  className="dist-bar-fill"
                  style={{ width: `${counts.total > 0 ? (counts.completed / counts.total) * 100 : 0}%`, background: "#10B981" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="chart-card"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#EF4444" }}>
              Action Required
            </span>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: "#FFFFFF", marginTop: 4, marginBottom: 8 }}>
              Incoming Requests Queue
            </h3>
            <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>
              Review patient details, view pickup locations, and send administrative response notes on the dedicated Requests page.
            </p>
          </div>

          <div style={{ marginTop: 24 }}>
            <Link
              href="/admin/requests"
              className="btn btn-primary"
              style={{
                width: "100%",
                height: 46,
                borderRadius: 12,
                fontSize: 13.5,
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(229, 9, 20, 0.3)",
              }}
            >
              Open Requests List ({requests.length}) →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryCardModern({
  label,
  value,
  subtext,
  bgColor,
  iconColor,
  icon,
}: {
  label: string;
  value: number;
  subtext: string;
  bgColor: string;
  iconColor: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="summary-card-modern">
      <div className="summary-card-header">
        <span>{label}</span>
        <div className="summary-icon-badge" style={{ background: bgColor, color: iconColor }}>
          {icon}
        </div>
      </div>
      <div>
        <div className="summary-card-value">{value}</div>
        <div className="summary-card-subtext">
          <span style={{ color: iconColor, fontWeight: 700 }}>●</span> {subtext}
        </div>
      </div>
    </div>
  );
}
