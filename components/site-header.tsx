"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "");
    const onHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  const isServices = hash === "#services" || pathname.startsWith("/services");
  const isAbout = pathname === "/about";
  const isContact = pathname === "/contact";
  const isHome = pathname === "/" && !isServices;

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-pill">
          <Link href="/" className="nav-brand" onClick={() => { setHash(""); setOpen(false); }}>
            <span className="brand-badge-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" fill="#E50914" />
                <path d="M4 12H8L9.5 9L12 15L14 10.5L15.5 12H20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="brand-label">
              <strong className="brand-name">Red<span>Line</span></strong>
              <small className="brand-sub">AMBULANCE</small>
            </div>
          </Link>

          <nav className="nav-capsule" aria-label="Main navigation">
            <Link
              href="/"
              className={`capsule-link${isHome ? " active" : ""}`}
              onClick={() => setHash("")}
            >
              Home
            </Link>
            <Link
              href="/#services"
              className={`capsule-link${isServices ? " active" : ""}`}
              onClick={() => setHash("#services")}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`capsule-link${isAbout ? " active" : ""}`}
              onClick={() => setHash("")}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`capsule-link${isContact ? " active" : ""}`}
              onClick={() => setHash("")}
            >
              Contact
            </Link>
          </nav>

          <div className="header-actions">
            <a href="tel:+919810055012" className="phone-badge">
              <span className="phone-icon-dot">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </span>
              <span>+91 98100 55012</span>
            </a>
            <Link href="/request" className="btn-emergency-pill">
              Request Ambulance
              <span className="btn-arrow">→</span>
            </Link>
            <button
              className="mobile-menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Mobile navigation">
        <Link href="/" className={isHome ? "active" : ""} onClick={() => { setHash(""); setOpen(false); }}>Home</Link>
        <Link href="/#services" className={isServices ? "active" : ""} onClick={() => { setHash("#services"); setOpen(false); }}>Services</Link>
        <Link href="/about" className={isAbout ? "active" : ""} onClick={() => { setHash(""); setOpen(false); }}>About</Link>
        <Link href="/contact" className={isContact ? "active" : ""} onClick={() => { setHash(""); setOpen(false); }}>Contact</Link>
        <Link
          href="/request"
          className="btn btn-primary mobile-cta"
          onClick={() => setOpen(false)}
        >
          Request an Ambulance
        </Link>
      </nav>
    </header>
  );
}
