"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/status-badge";
import type { AmbulanceRequest } from "@/lib/types";

export default function AdminRequestsListPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<AmbulanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

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
        console.error("Failed to load requests list:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [router]);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Active"
          ? req.status === "New" || req.status === "Contacted" || req.status === "Confirmed" || req.status === "In Progress"
          : req.status === selectedStatus);

      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        req.patient_name.toLowerCase().includes(q) ||
        req.request_number.toLowerCase().includes(q) ||
        req.phone.toLowerCase().includes(q) ||
        req.pickup_location.toLowerCase().includes(q) ||
        req.destination.toLowerCase().includes(q) ||
        req.service.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [requests, selectedStatus, searchTerm]);

  if (loading) {
    return (
      <div className="admin-loading" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="3" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }}>
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#64748B" }}>Loading incoming requests queue...</span>
      </div>
    );
  }

  return (
    <>
      <div className="admin-topbar-header">
        <div>
          <div className="eyebrow" style={{ color: "#E50914", marginBottom: 4 }}>
            Patient Dispatch Queue
          </div>
          <h1>Incoming Requests List</h1>
          <p>Click any request row or action button to view complete details, route map timeline, and send a response note.</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <Link
            href="/admin"
            style={{
              fontSize: 12.5,
              fontWeight: 700,
              color: "#64748B",
              padding: "8px 14px",
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            ← Back to Analytics
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search Controls */}
      <div className="dash-controls-bar">
        <div className="dash-tabs">
          {["All", "Active", "New", "Contacted", "Confirmed", "In Progress", "Completed"].map((tab) => (
            <button
              key={tab}
              className={`dash-tab-btn ${selectedStatus === tab ? "active" : ""}`}
              onClick={() => setSelectedStatus(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="dash-search-input">
          <svg width="16" height="16" fill="none" stroke="#94A3B8" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search patient, phone, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{ background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 12 }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Dedicated Requests Table */}
      <section className="admin-table-card">
        <div className="admin-table-header">
          <div>
            <h2>Request Queue Records</h2>
            <span style={{ fontSize: 12, color: "#64748B" }}>
              Showing {filteredRequests.length} of {requests.length} total patient request records
            </span>
          </div>
          {searchTerm && (
            <span style={{ fontSize: 12, color: "#E50914", fontWeight: 600 }}>
              Filtered: &ldquo;{searchTerm}&rdquo;
            </span>
          )}
        </div>

        {filteredRequests.length === 0 ? (
          <div className="empty-state" style={{ padding: "64px 20px" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "#F1F5F9",
                color: "#64748B",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <strong style={{ fontSize: 16, color: "#0F172A" }}>No matching requests found</strong>
            <span style={{ fontSize: 13, color: "#64748B" }}>
              Try adjusting your search query or switching status tabs.
            </span>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="request-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Patient Info</th>
                  <th>Service Type</th>
                  <th>Pickup → Destination</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <span className="mono" style={{ fontSize: 12.5, fontWeight: 800, color: "#0F172A" }}>
                        {request.request_number}
                      </span>
                      <span className="table-secondary">{formatDate(request.created_at)}</span>
                    </td>
                    <td>
                      <div className="patient-cell">
                        <div className="patient-avatar">
                          {getInitials(request.patient_name)}
                        </div>
                        <div>
                          <span className="table-primary">{request.patient_name}</span>
                          <span className="table-secondary">{request.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 10px",
                          background: "#F8FAFC",
                          border: "1px solid #E2E8F0",
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#334155",
                        }}
                      >
                        {request.service}
                      </span>
                    </td>
                    <td>
                      <div className="route-pill-badge">
                        <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#E50914", fontSize: 11.5, fontWeight: 700 }}>
                          <span>📍</span>{request.pickup_location}
                        </span>
                        <span style={{ color: "#94A3B8", fontSize: 11, fontWeight: 600, paddingLeft: 2 }}>↓ to</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#0F172A", fontSize: 11.5, fontWeight: 700 }}>
                          <span>🏁</span>{request.destination}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="table-primary">{formatDate(request.preferred_date)}</span>
                      <span className="table-secondary">{request.preferred_time}</span>
                    </td>
                    <td>
                      <StatusBadge status={request.status} />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Link className="action-btn-link" href={`/admin/requests/${request.id}`}>
                        View & Reply <span>→</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function formatDate(value: string) {
  if (!value) return "N/A";
  const dateObj = new Date(`${value}${value.length === 10 ? "T00:00:00" : ""}`);
  if (isNaN(dateObj.getTime())) return value;
  return dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getInitials(name: string) {
  if (!name) return "P";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}
