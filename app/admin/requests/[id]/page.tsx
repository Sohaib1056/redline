"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { StatusBadge } from "@/components/status-badge";
import type { AmbulanceRequest, RequestStatus } from "@/lib/types";
import { requestStatuses } from "@/lib/types";

export default function AdminRequestDetailPage({ params }: { params: { id: string } }) {
  const [request, setRequest] = useState<AmbulanceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<RequestStatus>("New");
  const [adminResponse, setAdminResponse] = useState("");
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/requests/${params.id}`)
      .then((r) => r.json())
      .then((payload) => {
        if (payload.request) {
          setRequest(payload.request);
          setStatus(payload.request.status);
          setAdminResponse(payload.request.admin_response || "");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching request details:", err);
        setLoading(false);
      });
  }, [params.id]);

  async function save() {
    setSaving(true);
    setNotice(null);
    try {
      const result = await fetch(`/api/requests/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, admin_response: adminResponse }),
      });
      const payload = await result.json();
      if (result.ok) {
        setRequest(payload.request);
        setNotice({ type: "success", text: "Request record updated successfully." });
      } else {
        setNotice({ type: "error", text: payload.error ?? "Unable to update request record." });
      }
    } catch {
      setNotice({ type: "error", text: "Network error occurred while saving changes." });
    } finally {
      setSaving(false);
    }
  }

  const quickTemplates = [
    "Dispatch unit assigned and en-route.",
    "Patient pickup confirmed with family.",
    "Transfer completed successfully.",
    "Patient cancelled request via phone.",
  ];

  if (loading) {
    return (
      <div className="admin-loading" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="3" style={{ animation: "spin 1s linear infinite", marginBottom: 12 }}>
          <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#64748B" }}>Loading request record...</span>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="empty-state" style={{ background: "#FFFFFF", borderRadius: 16, border: "1px solid #E2E8F0", padding: 64 }}>
        <strong style={{ fontSize: 18, color: "#0F172A" }}>Request record not found</strong>
        <p style={{ fontSize: 13, color: "#64748B", margin: "8px 0 20px" }}>
          The requested ambulance record may have been removed or does not exist.
        </p>
        <Link href="/admin" className="btn btn-primary" style={{ height: 42, borderRadius: 10 }}>
          ← Back to Requests Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-detail-container">
      <div className="admin-detail-header-card">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            className="action-btn-link"
            href="/admin/requests"
            style={{ padding: "8px 14px", background: "#F8FAFC" }}
          >
            ← All Requests
          </Link>
          <div style={{ width: 1, height: 24, background: "#E2E8F0" }} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="mono" style={{ fontSize: 16, fontWeight: 800, color: "#0F172A" }}>
                {request.request_number}
              </span>
              <StatusBadge status={request.status} />
            </div>
            <span style={{ fontSize: 11.5, color: "#64748B", marginTop: 2, display: "block" }}>
              Created on{" "}
              {new Date(request.created_at).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="admin-detail-grid">
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Route Card */}
          <div className="route-timeline-card">
            <h3 style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 18, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              📍 Transport Route Details
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="timeline-step">
                <div className="timeline-icon start">📍</div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#E50914", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Pickup Location
                  </span>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginTop: 2 }}>
                    {request.pickup_location}
                  </p>
                </div>
              </div>

              <div className="timeline-step">
                <div className="timeline-icon end">🏁</div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#166534", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Destination Hospital / Location
                  </span>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginTop: 2 }}>
                    {request.destination}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Info Panel */}
          <section className="detail-panel" style={{ borderRadius: 16 }}>
            <div className="detail-panel-heading">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div className="patient-avatar" style={{ width: 44, height: 44, fontSize: 16 }}>
                  {getInitials(request.patient_name)}
                </div>
                <div>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A" }}>{request.patient_name}</h2>
                  <p style={{ fontSize: 12.5, color: "#64748B", margin: 0 }}>
                    Phone: <strong style={{ color: "#0F172A" }}>{request.phone}</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="detail-fields">
              <DetailField label="Service Type" value={request.service} />
              <DetailField
                label="Preferred Date & Time"
                value={`${formatDate(request.preferred_date)} at ${request.preferred_time}`}
              />
              <DetailField label="Patient Condition" value={request.patient_condition} full />
              <DetailField
                label="Additional Information / Notes"
                value={request.additional_information || "No additional information provided by applicant."}
                full
              />
            </div>
          </section>
        </div>

        {/* Action Sidebar */}
        <aside className="detail-panel" style={{ borderRadius: 16, height: "fit-content" }}>
          <div className="detail-panel-heading">
            <h2 style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>Dispatch Actions</h2>
            <p>Update request status and record administrative response notes.</p>
          </div>

          <div className="admin-edit">
            {notice && (
              <div
                className="notice"
                style={{
                  borderRadius: 10,
                  marginBottom: 16,
                  background: notice.type === "error" ? "#FEF2F2" : "#F0FDF4",
                  color: notice.type === "error" ? "#DC2626" : "#166534",
                  border: notice.type === "error" ? "1px solid #FCA5A5" : "1px solid #86EFAC",
                  padding: "10px 14px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{notice.type === "error" ? "⚠️" : "✅"}</span>
                <span>{notice.text}</span>
              </div>
            )}

            <div className="field" style={{ marginBottom: 18 }}>
              <label htmlFor="status" style={{ fontSize: 12, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Update Request Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as RequestStatus)}
                style={{
                  height: 44,
                  borderRadius: 10,
                  border: "1px solid #CBD5E1",
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "#0F172A",
                  background: "#F8FAFC",
                }}
              >
                {requestStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="field" style={{ marginBottom: 18 }}>
              <label htmlFor="admin-response" style={{ fontSize: 12, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Admin / Dispatch Response Note
              </label>

              {/* Quick Template Chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                {quickTemplates.map((tmpl) => (
                  <button
                    key={tmpl}
                    type="button"
                    className="quick-template-chip"
                    onClick={() => setAdminResponse(tmpl)}
                  >
                    + {tmpl.slice(0, 22)}…
                  </button>
                ))}
              </div>

              <textarea
                id="admin-response"
                value={adminResponse}
                onChange={(e) => setAdminResponse(e.target.value)}
                placeholder="Write confirmation notes, driver details, or patient contact status..."
                style={{
                  borderRadius: 10,
                  border: "1px solid #CBD5E1",
                  fontSize: 13,
                  padding: "12px",
                  minHeight: 120,
                  background: "#F8FAFC",
                }}
              />
            </div>

            <button
              className="btn btn-primary"
              onClick={save}
              disabled={saving}
              style={{
                width: "100%",
                height: 44,
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(229, 9, 20, 0.2)",
              }}
            >
              {saving ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ animation: "spin 1s linear infinite" }}>
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  Saving record...
                </span>
              ) : (
                <>
                  Save Changes <span style={{ fontSize: 16 }}>→</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function DetailField({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={`detail-field ${full ? "full" : ""}`}>
      <span style={{ fontSize: 11, fontWeight: 800, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </span>
      <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", marginTop: 4, lineHeight: 1.5 }}>
        {value}
      </p>
    </div>
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
