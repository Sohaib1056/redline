import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/public-shell";
import {
  AmbulanceIcon,
  StethoscopeIcon,
  HospitalIcon,
  UserCheckIcon,
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  ActivityIcon
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About RedLine Ambulance | Emergency & Patient Transport New Delhi",
  description:
    "RedLine Ambulance provides premier emergency dispatch, mobile ICU, and planned patient transport across New Delhi and NCR.",
};

export default function AboutPage() {
  return (
    <PublicShell>
      <main style={{ background: "#FAFAFA" }}>
        {/* Sleek Hero Header */}
        <section
          style={{
            background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
            color: "#FFFFFF",
            padding: "32px 0 36px",
            borderBottom: "3px solid #E50914",
          }}
        >
          <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#CBD5E1",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Link href="/" style={{ color: "#E2E8F0", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: "#E50914", fontWeight: 800 }}>About Us</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h1
                style={{
                  fontSize: "clamp(24px, 3.5vw, 32px)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                About RedLine Ambulance Services
              </h1>
              <span
                style={{
                  background: "rgba(229, 9, 20, 0.25)",
                  border: "1px solid rgba(229, 9, 20, 0.5)",
                  color: "#FF6B6B",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "4px 12px",
                  borderRadius: 9999,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Delhi NCR Network
              </span>
            </div>

            <p style={{ fontSize: 15, fontWeight: 600, color: "#E2E8F0", maxWidth: 740, marginTop: 10, lineHeight: 1.6 }}>
              24/7 priority emergency dispatch and planned patient transportation across New Delhi, Gurugram, Noida, and surrounding NCR medical hubs.
            </p>

            {/* Quick Stats Pills */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 12,
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {[
                { icon: <ClockIcon size={16} color="#E50914" />, stat: "24/7 / 365", label: "Central Dispatch Desk" },
                { icon: <ActivityIcon size={16} color="#E50914" />, stat: "< 15 Mins", label: "Avg Delhi Response" },
                { icon: <AmbulanceIcon size={16} color="#E50914" />, stat: "10,000+", label: "Safe Patient Journeys" },
                { icon: <UserCheckIcon size={16} color="#E50914" />, stat: "100% Certified", label: "Paramedics & Drivers" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "rgba(255, 255, 255, 0.07)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 8,
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: "rgba(229, 9, 20, 0.2)", border: "1px solid rgba(229, 9, 20, 0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 900, color: "#E50914", margin: 0, lineHeight: 1 }}>
                      {item.stat}
                    </p>
                    <p style={{ fontSize: 11.5, color: "#FFFFFF", fontWeight: 700, marginTop: 3, margin: 0 }}>
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacious & Uncluttered "OUR MISSION" Section */}
        <section style={{ padding: "56px 0", background: "#FFFFFF" }}>
          <div
            className="container"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 20px",
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 48,
              alignItems: "center",
            }}
          >
            {/* Left Column */}
            <div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#E50914",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                  display: "block",
                }}
              >
                OUR MISSION
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 32px)",
                  fontWeight: 900,
                  color: "#0F172A",
                  lineHeight: 1.25,
                  marginBottom: 16,
                  letterSpacing: "-0.02em",
                }}
              >
                Safe, reliable & dignified patient transport.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#334155",
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                RedLine Ambulance connects homes, diagnostic centers, and premier hospital networks across New Delhi NCR with rapid emergency response, certified clinical staff, and respectful care.
              </p>

              {/* Clean 2x2 SVG Feature Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 32,
                }}
              >
                {[
                  { icon: <AmbulanceIcon size={18} color="#E50914" />, title: "24/7 GPS Dispatch", desc: "Real-time route optimization" },
                  { icon: <StethoscopeIcon size={18} color="#E50914" />, title: "Certified Paramedics", desc: "Trauma & cardiac support" },
                  { icon: <HospitalIcon size={18} color="#E50914" />, title: "Hospital Pre-Alerts", desc: "Direct ER telemetry notice" },
                  { icon: <UserCheckIcon size={18} color="#E50914" />, title: "Bed-to-Bed Care", desc: "Wheelchair & stretcher assist" },
                ].map((ft) => (
                  <div
                    key={ft.title}
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: 10,
                      padding: "14px 16px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: "#FFF1F2", border: "1px solid #FECDD3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {ft.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                        {ft.title}
                      </p>
                      <p style={{ fontSize: 12, fontWeight: 600, color: "#64748B", marginTop: 2, margin: 0 }}>
                        {ft.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clean Action Row */}
              <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <Link
                  href="/request"
                  style={{
                    background: "#E50914",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "12px 24px",
                    borderRadius: 8,
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(229, 9, 20, 0.2)",
                  }}
                >
                  Book Ambulance Online →
                </Link>
                <a
                  href="tel:+919810055012"
                  style={{
                    background: "#F1F5F9",
                    color: "#0F172A",
                    border: "1px solid #CBD5E1",
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "12px 20px",
                    borderRadius: 8,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <PhoneIcon size={15} color="#E50914" /> Dispatch: +91 98100 55012
                </a>
              </div>
            </div>

            {/* Right Column (Clean Spacious Vehicle Card) */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid #E2E8F0",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
                overflow: "hidden",
                padding: 12,
              }}
            >
              <div style={{ borderRadius: 12, overflow: "hidden", position: "relative" }}>
                <img
                  src="/hero section.png"
                  alt="RedLine Emergency Fleet Vehicle"
                  style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "16px 12px 6px" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#E50914", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  DELHI NCR FLEET
                </span>
                <p style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", marginTop: 2, margin: 0 }}>
                  Mobile ICU & Advanced Transport Units
                </p>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: "#475569", marginTop: 4, margin: 0 }}>
                  Equipped with medical oxygen reserves, cardiac monitors, AEDs, and hydraulic stretchers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Clean Core Standards Grid */}
        <section style={{ padding: "48px 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
          <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div style={{ marginBottom: 28, textAlign: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#E50914", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                CORE STANDARDS
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0F172A", marginTop: 4 }}>
                Built for safety, speed & clarity.
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
              {[
                { icon: <MapPinIcon size={18} color="#E50914" />, title: "1. Rapid GPS Routing", text: "Instant routing through Delhi traffic corridors to ensure fast pickup." },
                { icon: <UserCheckIcon size={18} color="#E50914" />, title: "2. Certified Crew", text: "Trained paramedics equipped for cardiac support, trauma care, and gentle movement." },
                { icon: <HospitalIcon size={18} color="#E50914" />, title: "3. Hospital Pre-Alert", text: "Direct telemetry notification to destination emergency rooms prior to arrival." },
                { icon: <AmbulanceIcon size={18} color="#E50914" />, title: "4. Family Accompaniment", text: "Clean, air-conditioned seating for family caregivers throughout the journey." },
              ].map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    padding: "22px 20px",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)",
                  }}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#FFF1F2", border: "1px solid #FECDD3", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                    {p.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, fontWeight: 600, color: "#334155", lineHeight: 1.5, margin: 0 }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Clean CTA Banner */}
        <section style={{ padding: "36px 0 48px" }}>
          <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #E50914 0%, #C50812 100%)",
                borderRadius: 14,
                padding: "24px 32px",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 20,
                flexWrap: "wrap",
                boxShadow: "0 8px 24px rgba(229, 9, 20, 0.18)",
              }}
            >
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0, color: "#FFFFFF" }}>
                  Need an ambulance right now?
                </h3>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", marginTop: 4, margin: 0 }}>
                  Our 24/7 central dispatch desk is ready to assist immediately.
                </p>
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href="tel:+919810055012"
                  style={{
                    background: "#FFFFFF",
                    color: "#E50914",
                    fontSize: 13.5,
                    fontWeight: 900,
                    padding: "10px 20px",
                    borderRadius: 6,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <PhoneIcon size={14} color="#E50914" /> Call +91 98100 55012
                </a>
                <Link
                  href="/request"
                  style={{
                    background: "#0F172A",
                    color: "#FFFFFF",
                    fontSize: 13.5,
                    fontWeight: 800,
                    padding: "10px 20px",
                    borderRadius: 6,
                    textDecoration: "none",
                  }}
                >
                  Request Online
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
