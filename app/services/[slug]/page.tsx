import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/public-shell";
import { getService, services } from "@/lib/services";
import {
  ServiceIcon,
  ClockIcon,
  UserCheckIcon,
  MapPinIcon,
  ShieldAlertIcon,
  StethoscopeIcon,
  PhoneIcon,
  AmbulanceIcon
} from "@/components/icons";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  return {
    title: service
      ? `${service.title} | RedLine Ambulance New Delhi`
      : "Service | RedLine Ambulance",
    description: service?.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== slug);

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
              <Link href="/#services" style={{ color: "#CBD5E1", textDecoration: "none" }}>
                Services
              </Link>
              <span>/</span>
              <span style={{ color: "#E50914", fontWeight: 700 }}>{service.title}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "#FFF1F2", border: "1px solid #FECDD3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ServiceIcon slug={service.slug} size={20} color="#E50914" />
                </div>
                <h1
                  style={{
                    fontSize: "clamp(22px, 3vw, 28px)",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {service.title}
                </h1>
              </div>
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
                24/7 Available
              </span>
            </div>

            <p style={{ fontSize: 14.5, fontWeight: 600, color: "#E2E8F0", maxWidth: 700, marginTop: 8, lineHeight: 1.5 }}>
              {service.shortDescription}
            </p>

            {/* Compact Specs Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: 12,
                marginTop: 18,
                paddingTop: 16,
                borderTop: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                  <ClockIcon size={13} color="#94A3B8" /> RESPONSE TIME
                </p>
                <p style={{ fontSize: 13.5, fontWeight: 800, color: "#FFFFFF", marginTop: 2, margin: 0 }}>
                  {service.responseTime}
                </p>
              </div>

              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                  <UserCheckIcon size={13} color="#94A3B8" /> STAFFING
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginTop: 2, margin: 0 }}>
                  {service.staffing}
                </p>
              </div>

              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPinIcon size={13} color="#94A3B8" /> LOCATION
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#FFFFFF", marginTop: 2, margin: 0 }}>
                  Delhi & NCR Hubs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ padding: "36px 0 48px" }}>
          <div
            className="container"
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 20px",
              display: "grid",
              gridTemplateColumns: "1fr minmax(280px, 320px)",
              gap: 28,
              alignItems: "start",
            }}
          >
            {/* Left Main Column */}
            <div>
              {/* Service Overview */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "24px 24px",
                  border: "1px solid #E2E8F0",
                  marginBottom: 20,
                }}
              >
                <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                  Service Overview
                </h2>
                <p style={{ fontSize: 14.5, fontWeight: 600, color: "#1E293B", lineHeight: 1.6, margin: 0 }}>
                  {service.description}
                </p>
              </div>

              {/* What This Includes */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "24px 24px",
                  border: "1px solid #E2E8F0",
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", marginBottom: 14 }}>
                  What This Service Includes
                </h3>
                <div style={{ display: "grid", gap: 10 }}>
                  {service.includes.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#E50914", fontWeight: 900, fontSize: 14 }}>✓</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Equipment */}
              {service.equipment && service.equipment.length > 0 && (
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    padding: "20px 24px",
                    border: "1px solid #E2E8F0",
                    marginBottom: 20,
                  }}
                >
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0F172A", marginBottom: 12 }}>
                    On-Board Medical Equipment
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {service.equipment.map((eq) => (
                      <span
                        key={eq}
                        style={{
                          background: "#F1F5F9",
                          border: "1px solid #CBD5E1",
                          color: "#1E293B",
                          fontSize: 12.5,
                          fontWeight: 700,
                          padding: "6px 12px",
                          borderRadius: 6,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <StethoscopeIcon size={14} color="#E50914" /> {eq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* When Recommended */}
              <div
                style={{
                  background: "#FFF1F2",
                  borderRadius: 12,
                  padding: "20px 20px",
                  border: "1px solid #FECDD3",
                }}
              >
                <h4 style={{ fontSize: 14.5, fontWeight: 800, color: "#991B1B", marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
                  <ShieldAlertIcon size={16} color="#991B1B" /> When is this service recommended?
                </h4>
                <p style={{ fontSize: 13.5, fontWeight: 600, color: "#7F1D1D", lineHeight: 1.5, margin: 0 }}>
                  {service.whenNeeded}
                </p>
              </div>
            </div>

            {/* Right Sticky Sidebar */}
            <div style={{ position: "sticky", top: 88, display: "grid", gap: 16 }}>
              {/* Direct Booking Widget */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "22px 20px",
                  border: "1px solid #E2E8F0",
                  borderTop: "4px solid #E50914",
                  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
                }}
              >
                <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                  Book {service.title}
                </h3>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: "#475569", marginBottom: 16 }}>
                  Request online or call our priority dispatch desk directly.
                </p>

                <div style={{ display: "grid", gap: 10 }}>
                  <Link
                    href={`/request?service=${encodeURIComponent(service.title)}`}
                    style={{
                      background: "#E50914",
                      color: "#FFFFFF",
                      fontSize: 13.5,
                      fontWeight: 800,
                      padding: "12px 16px",
                      borderRadius: 6,
                      textDecoration: "none",
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    Request This Service Online →
                  </Link>
                  <a
                    href="tel:+919810055012"
                    style={{
                      background: "#0F172A",
                      color: "#FFFFFF",
                      fontSize: 13.5,
                      fontWeight: 800,
                      padding: "12px 16px",
                      borderRadius: 6,
                      textDecoration: "none",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    <PhoneIcon size={14} color="#FFFFFF" /> Call +91 98100 55012
                  </a>
                </div>
              </div>

              {/* Other Services Navigation with Professional SVG Icons */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "18px 16px",
                  border: "1px solid #E2E8F0",
                }}
              >
                <h4 style={{ fontSize: 14, fontWeight: 800, color: "#0F172A", marginBottom: 10 }}>
                  Other Services
                </h4>
                <div style={{ display: "grid", gap: 6 }}>
                  {otherServices.map((o) => (
                    <Link
                      key={o.slug}
                      href={`/services/${o.slug}`}
                      style={{
                        padding: "10px 12px",
                        borderRadius: 8,
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#0F172A",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 26, height: 26, borderRadius: 6, background: "#FFF1F2", border: "1px solid #FECDD3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <ServiceIcon slug={o.slug} size={14} color="#E50914" />
                        </div>
                        {o.title}
                      </span>
                      <span style={{ color: "#E50914", fontWeight: 800 }}>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
