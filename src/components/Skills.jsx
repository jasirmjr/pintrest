import React, { useState, useEffect, useRef } from 'react';
import './Skills.css';

export default function Skills() {
  const [videoUrl, setVideoUrl] = useState('');
  const [headerVisible, setHeaderVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);

  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  // 1. Fetch the custom uploaded video asset on load
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/video');
        if (response.ok) {
          const data = await response.json();
          if (data && data.videoUrl) {
            setVideoUrl(`http://localhost:5000${data.videoUrl}`);
          }
        }
      } catch (err) {
        console.error("Could not fetch uploaded video from backend server:", err);
      }
    };
    fetchVideo();
  }, []);

  // 2. Scroll Intersection Observers for entrance animations
  useEffect(() => {
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
      { threshold: 0.05 }
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

  // Default fallback video URL if your database collection is brand new/empty
  const defaultVideo = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <section id="skills" className="skills-section">
      {/* Header Container with Horizontal Slide Animation */}
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

      {/* Main Grid Container with Vertical Dropdown Animation */}
      <div 
        className={`skills-body ${bodyVisible ? 'animate-drop' : ''}`} 
        ref={bodyRef}
      >
        {/* Left Side Column: Timeline Checklist */}
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

        {/* Right Side Column: Media Player Frame + Statistics Badge */}
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
              src={videoUrl || defaultVideo} 
              autoPlay
              muted
              loop
              playsInline
              controls
              className="skills-video"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Fixed: modern objectFit layout syntax
            />
          </div>
        </div>
      </div>
    </section>
  );
}