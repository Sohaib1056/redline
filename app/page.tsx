import type { Metadata } from "next";
import Link from "next/link";
import { PublicShell } from "@/components/public-shell";
import { HeroSlider } from "@/components/hero-slider";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "RedLine Ambulance Services – Emergency & Patient Transport, New Delhi",
  description:
    "Professional emergency ambulance and patient transportation across New Delhi and surrounding areas. Available 24/7 with trained crews.",
};

export default function HomePage() {
  return (
    <PublicShell>
      <main>
        <HeroSlider />
        <Services />
        <Process />
        <Company />
        <Cta />
      </main>
    </PublicShell>
  );
}


function Services() {
  const topServices = services.slice(0, 3);
  const bottomServices = services.slice(3, 5);

  return (
    <section className="services-section" id="services">
      <div className="container">
        <div className="services-header centered">
          <span className="label">Our Services</span>
          <h2>24/7 Medical & Emergency Transport</h2>
        </div>

        <div className="services-cards-grid top-row">
          {topServices.map((service, index) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="service-card">
              <div className="service-card-top">
                <span className="service-card-num">0{index + 1}</span>
                <span className="service-card-badge">24/7 Available</span>
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.shortDescription}</p>

              <ul className="service-card-highlights">
                {service.includes.slice(0, 2).map((item, i) => (
                  <li key={i}>
                    <span className="check-dot">✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="service-card-link">
                <span>View details</span>
                <span className="service-card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="services-cards-grid bottom-row-centered">
          {bottomServices.map((service, index) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="service-card">
              <div className="service-card-top">
                <span className="service-card-num">0{index + 4}</span>
                <span className="service-card-badge">24/7 Available</span>
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.shortDescription}</p>

              <ul className="service-card-highlights">
                {service.includes.slice(0, 2).map((item, i) => (
                  <li key={i}>
                    <span className="check-dot">✓</span> {item}
                  </li>
                ))}
              </ul>

              <div className="service-card-link">
                <span>View details</span>
                <span className="service-card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      num: "01",
      stepText: "Step 1 of 3",
      title: "Request",
      subtitle: "Instant Dispatch",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      body: "Tell us pickup location and destination. Our 24/7 dispatch team responds immediately.",
    },
    {
      num: "02",
      stepText: "Step 2 of 3",
      title: "Coordinate",
      subtitle: "Medical Prep",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
          <path d="M9 14h6"/>
          <path d="M12 11v6"/>
        </svg>
      ),
      body: "We assign trained medical crew, verify specialized equipment, and optimize the fastest route.",
    },
    {
      num: "03",
      stepText: "Step 3 of 3",
      title: "Transport",
      subtitle: "Safe Handover",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" rx="2"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      body: "The patient is continuously monitored and transported with direct clinical handover.",
    },
  ];

  return (
    <section className="process-section">
      <div className="container">
        <div className="process-header centered">
          <span className="label">How It Works</span>
          <h2>3 Steps To Safe & Fast Response</h2>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <div className="process-step-card" key={step.num}>
              <div className="process-step-top">
                <div className="process-step-badges">
                  <span className="process-num-badge">{step.num}</span>
                  <span className="process-icon-box">{step.icon}</span>
                </div>
                <span className="process-step-tag">{step.subtitle}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <div className="process-card-footer">
                <span className="process-step-count">{step.stepText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Company() {
  return (
    <section className="company-section">
      <div className="container">
        <div className="company-card-wrapper">
          <div className="company-text">
            <span className="label">About RedLine</span>
            <h2>Dependable transport for moments that matter most.</h2>
            <p>
              RedLine Ambulance provides premier emergency and planned patient transportation across New Delhi and
              surrounding regions. Engineered with high-standard life support vehicles, certified EMT personnel, and rapid dispatch protocol.
            </p>
            <div className="company-highlights-grid">
              {[
                { title: "24/7 Availability", desc: "Always on standby with zero downtime." },
                { title: "Certified Crews", desc: "Trained paramedics & trauma technicians." },
                { title: "Advanced Equipment", desc: "Oxygen, monitors, and modern ICU units." },
                { title: "GPS Live Tracking", desc: "Real-time updates to families & hospitals." },
              ].map((item) => (
                <div key={item.title} className="highlight-box">
                  <span className="highlight-icon">✓</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "32px" }}>
              <Link href="/about" className="btn btn-primary">
                Learn more about RedLine
              </Link>
            </div>
          </div>

          <div className="company-image-card">
            <img
              src="/about.png"
              alt="About RedLine Ambulance"
              className="company-about-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-text">
            <span className="cta-eyebrow">Emergency &amp; Scheduled Inquiries</span>
            <h2>Need an ambulance right now?</h2>
            <p>
              Tell us where the patient needs to go. Our team is standing by 24 hours a day to coordinate immediate dispatch.
            </p>
          </div>
          <div className="cta-actions">
            <Link href="/request" className="btn btn-dark btn-large">
              Request an Ambulance
            </Link>
            <a href="tel:+919810055012" className="btn btn-outline-white btn-large">
              Call +91 98100 55012
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
