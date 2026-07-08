import React, { useEffect, useRef, useState } from 'react';
import './Categories.css';

export default function Categories() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Triggers animation going down
        } else {
          // If you scroll back UP above the section, hide cards instantly so they can re-animate
          if (window.scrollY < (sectionRef.current?.offsetTop || 0) - 150) {
            setIsVisible(false);
          }
        }
      },
      { 
        threshold: 0.05,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categoryData = [
    { id: 1, title: 'Sales Marketing', duration: '4 month', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500' },
    { id: 2, title: 'Data analytics', duration: '3 month', img: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=500' },
    { id: 3, title: 'Copywriting Pro', duration: '2 month', img: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?q=80&w=500' },
    { id: 4, title: 'Design art', duration: '4 month', img: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=500' }
  ];

  const categoryTabs = ['Entertainment', 'Lifestyle', 'Writing', 'Business', 'Food'];

  return (
    <section id="categories" className="categories-section" ref={sectionRef}>
      <h2 className="categories-headline">Unlimited access to 100+ instructors.</h2>
      
      <div className="categories-tabs">
        <span className="category-tab active">All categories</span>
        {categoryTabs.map((tab, index) => (
          <span key={index} className="category-tab">{tab}</span>
        ))}
      </div>

      <div className={`categories-grid ${isVisible ? 'is-visible' : ''}`}>
        {categoryData.map((item) => (
          <div key={item.id} className="category-card">
            <div className="card-image-box" style={{ backgroundImage: `url(${item.img})` }} />
            <div className="card-details">
              <h3>{item.title}</h3>
              <p>{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}