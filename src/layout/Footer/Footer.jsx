import React from "react";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-section-container">
        <div className="footer-section">
          <div className="footer-section-title">About</div>
          <div className="footer-section-link">Our Mission</div>
          <div className="footer-section-link">Contact</div>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Quick Links</div>
          <div className="footer-section-link">FAQ</div>
          <div className="footer-section-link">Terms & Conditions</div>
          <div className="footer-section-link">Privacy Policy</div>
          <div className="footer-section-link">Legal Notice</div>
        </div>
        <div className="footer-section">
          <div className="footer-section-title">Join Us</div>

          <div className="footer-section-link">Jop Application</div>
        </div>
      </div>
      <div className="footer-section-line"></div>
      <div className="footer-section-logo">© 2025 - MediLabo Solutions</div>
    </div>
  );
}

export default Footer;
