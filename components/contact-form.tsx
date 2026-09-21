"use client";

import React, { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Emergency Ambulance",
    location: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "40px 32px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "#DCFCE7",
            color: "#166534",
            fontSize: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontWeight: 900,
          }}
        >
          ✓
        </div>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
          Inquiry Received Successfully
        </h3>
        <p style={{ fontSize: 14.5, color: "#64748B", lineHeight: 1.6, maxWidth: 420, margin: "0 auto 24px" }}>
          Thank you, <strong>{formData.name}</strong>. Our Delhi medical dispatch coordinator will call you at <strong>{formData.phone}</strong> shortly to confirm details.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", phone: "", service: "Emergency Ambulance", location: "", message: "" });
          }}
          style={{
            background: "#F1F5F9",
            color: "#0F172A",
            border: "1px solid #CBD5E1",
            fontSize: 13.5,
            fontWeight: 700,
            padding: "10px 20px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        padding: "36px 32px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#E50914", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          ONLINE INQUIRY & BOOKING
        </span>
        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginTop: 4 }}>
          Send Us a Message
        </h3>
        <p style={{ fontSize: 13.5, color: "#64748B", marginTop: 4 }}>
          Fill out the form below for planned transfers, pricing quotes, or general inquiries.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
        <div>
          <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rajesh Kumar"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: "100%",
              height: 44,
              padding: "0 14px",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              fontSize: 14,
              color: "#0F172A",
              background: "#F8FAFC",
              outline: "none",
            }}
          />
        </div>

        <div className="contact-form-row">
          <div>
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98100 00000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                fontSize: 14,
                color: "#0F172A",
                background: "#F8FAFC",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
              Service Required
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              style={{
                width: "100%",
                height: 44,
                padding: "0 14px",
                borderRadius: 8,
                border: "1px solid #CBD5E1",
                fontSize: 13.5,
                color: "#0F172A",
                background: "#F8FAFC",
                outline: "none",
              }}
            >
              <option value="Emergency Ambulance">Emergency Ambulance</option>
              <option value="Patient Transfer">Patient Transfer</option>
              <option value="Hospital Transfer">Hospital Transfer</option>
              <option value="Long Distance Transport">Long Distance Transport</option>
              <option value="Critical Care Ambulance">Critical Care MICU</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
            Pickup Location / Hospital / Sector
          </label>
          <input
            type="text"
            placeholder="e.g. Saket, South Delhi or AIIMS Campus"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={{
              width: "100%",
              height: 44,
              padding: "0 14px",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              fontSize: 14,
              color: "#0F172A",
              background: "#F8FAFC",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
            Additional Details or Medical Notes
          </label>
          <textarea
            rows={3}
            placeholder="Provide any specific medical condition or transfer timing notes..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              fontSize: 14,
              color: "#0F172A",
              background: "#F8FAFC",
              outline: "none",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#E50914",
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: 800,
            height: 48,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(229, 9, 20, 0.2)",
            marginTop: 6,
          }}
        >
          {loading ? "Transmitting..." : "Send Service Inquiry →"}
        </button>
      </form>
    </div>
  );
}
