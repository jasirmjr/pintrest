import React, { useState, useEffect, useRef } from 'react';
import './Customer.css';

export default function Customer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset when user scrolls back above the section
          if (window.scrollY < (sectionRef.current?.offsetTop || 0) - 200) {
            setIsVisible(false);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const reviews = [
    {
      id: 1,
      text: "The explanations are clear, the teachers are responsible and friendly, and the homework is real practice.",
      name: "Rob Zuber",
      role: "CEO",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
    },
    {
      id: 2,
      text: "I learned a lot of new things. I immediately apply my knowledge in my work, found myself a new client.",
      name: "Melanie Pickett",
      role: "IT Manager",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150"
    },
    {
      id: 3,
      text: "I really like the speakers of the course and the quality of the lectures. There is always feedback.",
      name: "Regis Wilson",
      role: "Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150"
    },
    {
      id: 4,
      text: "A new profession is a lot of vivid impressions. Today I was at the presentation of the regional business award.",
      name: "Emma Watson",
      role: "Cook",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150"
    },
    {
      id: 5,
      text: "The community support is amazing. Whenever I got stuck, mentors and peers answered my questions instantly.",
      name: "Arjun Mehta",
      role: "Fullstack Dev",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150"
    },
    {
      id: 6,
      text: "This platform completely changed my career trajectory. The structured roadmap helped me land my dream job.",
      name: "Sophia Lin",
      role: "UI Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150"
    }
  ];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < reviews.length - 3) setCurrentIndex(currentIndex + 1);
  };

  return (
    <section 
      id="customer" 
      className={`customer-section ${isVisible ? 'is-visible' : ''}`} 
      ref={sectionRef}
    >
      <h2 className="customer-headline">What our customer say<span className="dot">.</span></h2>

      <div className="slider-container">
        <div 
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 330}px)` }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p className="review-text">"{review.text}"</p>
              <div className="user-profile">
                <img src={review.avatar} alt={review.name} className="user-avatar" />
                <div className="user-meta">
                  <h4>{review.name}</h4>
                  <span>{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="slider-controls">
        <button className={`control-btn ${currentIndex === 0 ? 'disabled' : ''}`} onClick={handlePrev}>←</button>
        <button className={`control-btn ${currentIndex >= reviews.length - 3 ? 'disabled' : ''}`} onClick={handleNext}>→</button>
      </div>
    </section>
  );
}