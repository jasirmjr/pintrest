import React, { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home'); // Default to home section

  useEffect(() => {
    // Target sections to observe on the landing page
    const sections = document.querySelectorAll('section, header, #categories');
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Triggers when a section crosses the middle of the viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If the entry section has an ID, set it as active activeSection
          if (entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">Skillex<span className="dot">.</span></div>
      <ul className="nav-links">
        {/* We map active classes conditionally based on scroll tracking states */}
        <li>
          <a href="#passion" className={activeSection === 'passion' || activeSection === 'home' ? 'active' : ''}>
            Find passion
          </a>
        </li>
        <li>
          <a href="#categories" className={activeSection === 'categories' ? 'active' : ''}>
            Categories
          </a>
        </li>
        <li>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>
            Skills
          </a>
        </li>
        <li>
          <a href="#customer" className={activeSection === 'customer' ? 'active' : ''}>
            Customer
          </a>
        </li>
      </ul>
      <div className="nav-auth">
        <a href="#login" className="login-btn">Login</a>
        <a href="#trial" className="trial-btn">Free Trial</a>
      </div>
    </nav>
  );
}