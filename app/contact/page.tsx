import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/public-shell";
import { ContactForm } from "@/components/contact-form";
import {
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  ClockIcon,
  ShieldAlertIcon
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact RedLine Ambulance | 24/7 Dispatch Desk New Delhi",
  description:
    "Contact our 24/7 emergency medical dispatch desk in New Delhi. Call +91 98100 55012 for immediate dispatch or submit an online service request.",
};

export default function ContactPage() {
  return (
    <PublicShell>
      <main style={{ background: "#F8FAFC" }}>
        {/* Compact Hero Section */}
        <section
          style={{
            background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
            color: "#FFFFFF",
            padding: "24px 0 28px",
            borderBottom: "3px solid #E50914",
          }}
        >
          <div className="container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#94A3B8",
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Link href="/" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                Home
              </Link>
              <span>/</span>
              <span style={{ color: "#E50914", fontWeight: 700 }}>Contact</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <h1
                style={{
                  fontSize: "clamp(22px, 3vw, 28px)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                Contact Dispatch Operations
              </h1>
              <span
                style={{
                  background: "rgba(229, 9, 20, 0.2)",
                  border: "1px solid rgba(229, 9, 20, 0.4)",
                  color: "#FF4D4D",
                  fontSize: 11,
                  fontWeight: 800,
                  padding: "3px 10px",
                  borderRadius: 9999,
                  textTransform: "uppercase",
                }}
              >
                24/7 Desk
              </span>
            </div>

            <p style={{ fontSize: 14.5, fontWeight: 600, color: "#E2E8F0", maxWidth: 680, marginTop: 6, lineHeight: 1.5, margin: "6px 0 0" }}>
              Reach our New Delhi dispatch desk directly for immediate emergency ambulance dispatch or planned transport inquiries.
            </p>
          </div>
        </section>

        {/* Contact Info + Clean Form */}
        <section style={{ padding: "36px 0 48px" }}>
          <div
            className="container"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 20px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
              alignItems: "start",
            }}
          >
            {/* Left Info Column */}
            <div>
              {/* Emergency Hotline Notice Card */}
              <div
                style={{
                  background: "#FFF1F2",
                  border: "1px solid #FECDD3",
                  borderLeft: "5px solid #E50914",
                  borderRadius: 10,
                  padding: "18px 20px",
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <ShieldAlertIcon size={18} color="#991B1B" />
                  <p style={{ fontSize: 12, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", color: "#991B1B", margin: 0 }}>
                    Immediate Emergency Hotline
                  </p>
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 600, color: "#7F1D1D", lineHeight: 1.5, marginBottom: 12 }}>
                  For urgent ambulance dispatch in Delhi NCR, call our 24/7 desk immediately:
                </p>
                <a
                  href="tel:+919810055012"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    background: "#E50914",
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: 800,
                    padding: "11px 16px",
                    borderRadius: 6,
                    textDecoration: "none",
                  }}
                >
                  <PhoneIcon size={16} color="#FFFFFF" /> CALL HOTLINE: +91 98100 55012
                </a>
              </div>

              {/* Operations HQ & Contact Cards */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "22px 20px",
                  border: "1px solid #E2E8F0",
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>
                  Central Operations & Dispatch
                </h3>

                <div style={{ display: "grid", gap: 14 }}>
                  {[
                    {
                      icon: <PhoneIcon size={18} color="#E50914" />,
                      label: "Emergency Hotline",
                      val: "+91 98100 55012",
                      href: "tel:+919810055012",
                    },
                    {
                      icon: <MapPinIcon size={18} color="#E50914" />,
                      label: "Central Operations HQ",
                      val: "Plot 14, Barakhamba Road, Connaught Place, New Delhi 110001",
                      href: null,
                    },
                    {
                      icon: <MailIcon size={18} color="#E50914" />,
                      label: "Dispatch Email",
                      val: "dispatch@redline.test",
                      href: "mailto:dispatch@redline.test",
                    },
                    {
                      icon: <ClockIcon size={18} color="#E50914" />,
                      label: "Availability",
                      val: "24 Hours / 7 Days a week",
                      href: null,
                    },
                  ].map((card, idx) => (
                    <div key={idx} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 6, background: "#FFF1F2", border: "1px solid #FECDD3", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {card.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "#64748B", margin: 0 }}>
                          {card.label}
                        </p>
                        {card.href ? (
                          <a href={card.href} style={{ fontSize: 14, fontWeight: 800, color: "#E50914", textDecoration: "none" }}>
                            {card.val}
                          </a>
                        ) : (
                          <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A", margin: 0 }}>
                            {card.val}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Sectors */}
              <div
                style={{
                  background: "#0F172A",
                  borderRadius: 12,
                  padding: "18px 20px",
                  color: "#FFFFFF",
                }}
              >
                <h4 style={{ fontSize: 14, fontWeight: 800, color: "#FFFFFF", marginBottom: 8, margin: "0 0 8px" }}>
                  Primary Dispatch Sectors
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {[
                    "Connaught Place",
                    "Saket & South Delhi",
                    "Vasant Kunj",
                    "Dwarka & Aerocity",
                    "Gurugram Cyber Hub",
                    "Noida Sector 62",
                    "Rohini / Pitampura",
                    "AIIMS Corridor",
                  ].map((sec) => (
                    <span
                      key={sec}
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "#CBD5E1",
                        fontSize: 11.5,
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: 4,
                      }}
                    >
                      {sec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
