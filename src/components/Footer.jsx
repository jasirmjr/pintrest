import React from 'react';
import './Footer.css';

export default function MainFooter() {
  return (
    <footer className="main-footer">
      {/* Upper Layout Row */}
      <div className="footer-top">
        {/* Column 1: Logo */}
        <div className="footer-col brand-col">
          <h2 className="footer-logo">Skillex<span className="dot">.</span></h2>
        </div>

        {/* Column 2: Two-column Nav links list arrangement */}
        <div className="footer-col links-col">
          <ul className="footer-links-grid">
            <li><a href="#passion">Find passion</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#customer">Customer</a></li>
          </ul>
        </div>

        {/* Column 3: Newsletter Subscribe box */}
        <div className="footer-col newsletter-col">
          <h3>Join our community</h3>
          <div className="newsletter-box">
            <input type="email" placeholder="Enter your email" />
            <button className="newsletter-go">Go</button>
          </div>
        </div>
      </div>

      <hr className="footer-divider" />

      {/* Lower Copyright Row */}
      <div className="footer-bottom">
        <div className="copyright-info">
          <span className="copyright-icon">©</span> 2026 Skillex. All rights reserved
        </div>
        
        {/* Social Icons Container */}
        <div className="footer-socials">
          <a href="#facebook" className="social-circle">f</a>
          <a href="#behance" className="social-circle bē">Bē</a>
          <a href="#linkedin" className="social-circle">in</a>
          <a href="#instagram" className="social-circle">📷</a>
          <a href="#dribbble" className="social-circle">🌐</a>
        </div>
      </div>
    </footer>
  );
}