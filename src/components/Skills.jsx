import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

export default function Skills() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);

  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    // 1. Observer for the Header
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        } else {
          if (window.scrollY < (headerRef.current?.offsetTop || 0) - window.innerHeight) {
            setHeaderVisible(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    // 2. Observer for the Main Body layout
    const bodyObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBodyVisible(true);
        } else {
          if (window.scrollY < (bodyRef.current?.offsetTop || 0) - window.innerHeight) {
            setBodyVisible(false);
          }
        }
      },
      { threshold: 0.05 } // Sensitive trigger as soon as the body peeks from the bottom
    );

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (bodyRef.current) bodyObserver.observe(bodyRef.current);

    return () => {
      headerObserver.disconnect();
      bodyObserver.disconnect();
    };
  }, []);

  const steps = [
    { id: 1, title: 'Leadership', desc: 'Fully committed to the success company', icon: '💡' },
    { id: 2, title: 'Responsibility', desc: 'Employees will always be my top priority', icon: '🛡️' },
    { id: 3, title: 'Flexibility', desc: 'The ability to switch is an important skill', icon: '⚡' }
  ];

  return (
    <section id="skills" className="skills-section">
      <div 
        className={`skills-header ${headerVisible ? 'animate-in' : ''}`} 
        ref={headerRef}
      >
        <h2 className="skills-headline">
          Get the skills you<br />need for a job that<br />is in demand.
        </h2>
        <p className="skills-subtext">
          The modern labor market dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
        </p>
      </div>

      {/* Connected dynamic className mapping to the body visibility state */}
      <div 
        className={`skills-body ${bodyVisible ? 'animate-drop' : ''}`} 
        ref={bodyRef}
      >
        {/* Left Side: Staggered Timeline Row */}
        <div className="skills-timeline">
          {steps.map((step, index) => (
            <div key={step.id} className="timeline-item">
              <div className="icon-wrapper">
                <span className="step-icon">{step.icon}</span>
                {index !== steps.length - 1 && <div className="timeline-line"></div>}
              </div>
              <div className="timeline-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Embedded Video Player + Green Status Badge */}
        <div className="skills-media-wrapper">
          <div className="metrics-badge">
            <div className="metric-box">
              <span className="metric-num">10</span>
              <span className="metric-label">YEARS<br />EXPERIENCES</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <span className="metric-num">250</span>
              <span className="metric-label">TYPES OF<br />COURSES</span>
            </div>
          </div>

          <div className="video-container">
            <video 
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              controls
              poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
              className="skills-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}