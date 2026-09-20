import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Compact Top Emergency Red Banner Box */}
        <div className="footer-emergency-bar compact-emergency-bar">
          <div className="footer-emergency-info">
            <span className="emergency-pulse-dot" />
            <div>
              <strong>24/7 Rapid Emergency Hotline</strong>
              <p>Direct priority connection to Delhi Medical Dispatch Team</p>
            </div>
          </div>
          <div className="footer-emergency-actions">
            <a href="tel:+919810055012" className="footer-phone-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>+91 98100 55012</span>
            </a>
            <Link href="/request" className="footer-cta-btn">
              <span>Book Online</span>
            </Link>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-brand-header">
              <span className="footer-brand-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z" fill="#E50914" />
                  <path d="M4 12H8L9.5 9L12 15L14 10.5L15.5 12H20" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="footer-brand-name">
                Red<span>Line</span>
              </span>
            </div>
            <p className="footer-brand-tag">AMBULANCE SERVICES</p>
            <p className="footer-desc">
              Delhi's trusted 24/7 medical response and patient transport team.
              Built for speed, safety, and continuous clinical care.
            </p>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <Link href="/services/emergency-ambulance">Emergency Ambulance</Link>
            <Link href="/services/patient-transfer">Patient Transfer</Link>
            <Link href="/services/hospital-transfer">Hospital Transfer</Link>
            <Link href="/services/long-distance-transport">Long Distance Transport</Link>
            <Link href="/services/critical-care-ambulance">Critical Care Transport</Link>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/#services">Services</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Support</Link>
            <Link href="/request">Book Transport</Link>
          </div>

          <div className="footer-col footer-contact-col">
            <h4>Dispatch Center</h4>
            <div className="contact-item">
              <span className="contact-svg-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span>14 Ring Road, Connaught Place, New Delhi – 110001</span>
            </div>
            <div className="contact-item">
              <span className="contact-svg-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <a href="mailto:dispatch@redline.test">dispatch@redline.test</a>
            </div>
            <div className="contact-item">
              <span className="contact-svg-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </span>
              <span>24/7/365 Continuous Operation</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© 2026 RedLine Ambulance Services. All rights reserved.</span>
          <div className="footer-status-pill">
            <span className="status-dot" />
            <span>24/7 Live Dispatch Active</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

