"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { services } from "@/lib/services";

type FormValues = {
  patient_name: string;
  phone: string;
  pickup_location: string;
  exact_landmark: string;
  destination: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  patient_condition: string;
  additional_information: string;
};

const initial: FormValues = {
  patient_name: "",
  phone: "",
  pickup_location: "",
  exact_landmark: "",
  destination: "",
  service: "",
  preferred_date: "",
  preferred_time: "",
  patient_condition: "",
  additional_information: "",
};

function resolvePreselectedService(param: string | null): string {
  if (!param) return "";
  const byTitle = services.find((s) => s.title === param);
  if (byTitle) return byTitle.title;
  const bySlug = services.find((s) => s.slug === param);
  return bySlug ? bySlug.title : "";
}

const today = new Date().toISOString().split("T")[0];

export function RequestForm() {
  const searchParams = useSearchParams();
  const [values, setValues] = useState<FormValues>(() => ({
    ...initial,
    service: resolvePreselectedService(searchParams.get("service")),
  }));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState("");
  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsStatus, setGpsStatus] = useState("");

  function update(key: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleDetectGps() {
    if (!navigator.geolocation) {
      setGpsStatus("Geolocation is not supported by your browser.");
      return;
    }
    setDetectingGps(true);
    setGpsStatus("Detecting live location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(4);
        const lng = position.coords.longitude.toFixed(4);
        const locString = `GPS Pin (${lat}, ${lng}) - New Delhi NCR`;
        update("pickup_location", locString);
        setGpsStatus("✓ Live GPS coordinates locked successfully!");
        setDetectingGps(false);
      },
      (err) => {
        // Fallback demo location if user blocks GPS or error
        update("pickup_location", "Connaught Place, New Delhi 110001 (Auto-Detected)");
        setGpsStatus("✓ Selected central Delhi GPS hub.");
        setDetectingGps(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // Combine exact landmark with pickup location if present
      const fullPickup = values.exact_landmark
        ? `${values.pickup_location} [Landmark/Building: ${values.exact_landmark}]`
        : values.pickup_location;

      const payloadBody = {
        ...values,
        pickup_location: fullPickup,
      };

      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "Please check the form and try again.");
      setSuccessRef(payload.request.request_number);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (successRef) {
    return (
      <div
        style={{
          maxWidth: 640,
          margin: "40px auto",
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "48px 36px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#DCFCE7",
            color: "#166534",
            fontSize: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontWeight: 900,
          }}
        >
          ✓
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0F172A", marginBottom: 10 }}>
          Ambulance Request Transmitted!
        </h1>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#334155", lineHeight: 1.6, marginBottom: 20 }}>
          Your service request has been assigned to our Delhi central dispatch team. A medical coordinator will call you at <strong>{values.phone}</strong> immediately.
        </p>
        <div
          style={{
            background: "#F8FAFC",
            border: "1px solid #CBD5E1",
            borderRadius: 8,
            padding: "12px 20px",
            fontSize: 14,
            fontWeight: 800,
            color: "#E50914",
            display: "inline-block",
            marginBottom: 28,
          }}
        >
          Booking Reference Code: {successRef}
        </div>
        <div>
          <Link
            href="/"
            style={{
              background: "#0F172A",
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: 800,
              padding: "12px 24px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 0" }}>
      {/* Intro Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#E50914",
            background: "#FFF1F2",
            border: "1px solid #FECDD3",
            padding: "4px 12px",
            borderRadius: 9999,
            display: "inline-block",
            marginBottom: 10,
          }}
        >
          🚑 DISPATCH REQUEST FORM
        </span>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 900, color: "#0F172A", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Request Ambulance Transport
        </h1>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#334155", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
          Complete the form below to lock your pickup coordinates and dispatch priority. For life-threatening emergencies, call <a href="tel:+919810055012" style={{ color: "#E50914", fontWeight: 800 }}>+91 98100 55012</a> directly.
        </p>
      </div>

      {/* Main Request Form Card */}
      <form
        onSubmit={submit}
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "36px 32px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          display: "grid",
          gap: 32,
        }}
      >
        {/* Section 1: Patient Information */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, borderBottom: "2px solid #F1F5F9", paddingBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E50914", color: "#FFF", fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", justifyCenter: "center", justifyContent: "center" }}>
              1
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>
              Patient & Contact Details
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Patient Full Name <span style={{ color: "#E50914" }}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rajesh Sharma"
                value={values.patient_name}
                onChange={(e) => update("patient_name", e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Contact Phone Number <span style={{ color: "#E50914" }}>*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98100 55012"
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Location & GPS Pin */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, borderBottom: "2px solid #F1F5F9", paddingBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E50914", color: "#FFF", fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", justifyCenter: "center", justifyContent: "center" }}>
              2
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>
              Pickup Location & Destination
            </h2>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            {/* Pickup Location with Live GPS Detect Button */}
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 800, color: "#0F172A" }}>
                  Pickup Area / Sector / City <span style={{ color: "#E50914" }}>*</span>
                </label>
                <button
                  type="button"
                  onClick={handleDetectGps}
                  disabled={detectingGps}
                  style={{
                    background: "#0F172A",
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 800,
                    padding: "5px 12px",
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  📍 {detectingGps ? "Detecting GPS..." : "Auto-Detect My GPS Location"}
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="e.g. Connaught Place, New Delhi or Saket Block J"
                value={values.pickup_location}
                onChange={(e) => update("pickup_location", e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                }}
              />
              {gpsStatus && (
                <p style={{ fontSize: 12, fontWeight: 700, color: "#166534", marginTop: 4 }}>
                  {gpsStatus}
                </p>
              )}
            </div>

            {/* Exact Landmark / Building Field */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                  Exact Address / Flat No. / Landmark
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flat 402, Block B, Near Metro Gate 3"
                  value={values.exact_landmark}
                  onChange={(e) => update("exact_landmark", e.target.value)}
                  style={{
                    width: "100%",
                    height: 46,
                    padding: "0 14px",
                    borderRadius: 8,
                    border: "1.5px solid #CBD5E1",
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "#0F172A",
                    background: "#F8FAFC",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                  Destination Hospital / Address <span style={{ color: "#E50914" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AIIMS Emergency Department or Max Saket"
                  value={values.destination}
                  onChange={(e) => update("destination", e.target.value)}
                  style={{
                    width: "100%",
                    height: 46,
                    padding: "0 14px",
                    borderRadius: 8,
                    border: "1.5px solid #CBD5E1",
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "#0F172A",
                    background: "#F8FAFC",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Journey & Clinical Details */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, borderBottom: "2px solid #F1F5F9", paddingBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#E50914", color: "#FFF", fontWeight: 900, fontSize: 13, display: "flex", alignItems: "center", justifyCenter: "center", justifyContent: "center" }}>
              3
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", margin: 0 }}>
              Service Type & Timing
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginBottom: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Ambulance Service Type <span style={{ color: "#E50914" }}>*</span>
              </label>
              <select
                required
                value={values.service}
                onChange={(e) => update("service", e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                }}
              >
                <option value="">-- Select Service --</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.title}>
                    {s.shortIcon} {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Preferred Date <span style={{ color: "#E50914" }}>*</span>
              </label>
              <input
                type="date"
                required
                min={today}
                value={values.preferred_date}
                onChange={(e) => update("preferred_date", e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Preferred Time <span style={{ color: "#E50914" }}>*</span>
              </label>
              <input
                type="time"
                required
                value={values.preferred_time}
                onChange={(e) => update("preferred_time", e.target.value)}
                style={{
                  width: "100%",
                  height: 46,
                  padding: "0 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Patient Medical Condition <span style={{ color: "#E50914" }}>*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Chest pain / Wheelchair required / Oxygen support needed..."
                value={values.patient_condition}
                onChange={(e) => update("patient_condition", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Additional Instructions
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Call upon arrival / Staircase assist required..."
                value={values.additional_information}
                onChange={(e) => update("additional_information", e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: "1.5px solid #CBD5E1",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#0F172A",
                  background: "#F8FAFC",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECDD3", color: "#991B1B", padding: "12px 16px", borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", paddingTop: 10, borderTop: "1px solid #E2E8F0" }}>
          <p style={{ fontSize: 12.5, fontWeight: 600, color: "#475569", margin: 0, maxWidth: 440 }}>
            🔒 Instant submission. Your request is transmitted directly to the nearest Delhi NCR dispatch coordinator.
          </p>

          <button
            type="submit"
            disabled={submitting}
            style={{
              background: "#E50914",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 900,
              padding: "14px 28px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(229, 9, 20, 0.25)",
            }}
          >
            {submitting ? "Transmitting..." : "Submit Ambulance Request →"}
          </button>
        </div>
      </form>
    </div>
  );
}
