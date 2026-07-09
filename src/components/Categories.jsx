import React, { useState, useEffect, useRef } from 'react';
import './Categories.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isGridVisible, setIsGridVisible] = useState(false);
  const gridRef = useRef(null);

  // Fetch from local Node server on page load
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Could not fetch categories from backend server:", err);
      }
    };
    loadCategories();
  }, []);

  // Intersection Observer to trigger entrance animation every time the section is reached
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsGridVisible(true);
        } else {
          // Resets the state when scrolling completely away back to the top
          if (window.scrollY < (gridRef.current?.offsetTop || 0) - window.innerHeight) {
            setIsGridVisible(false);
          }
        }
      },
      { threshold: 0.05 } // Triggers early as soon as the top of the grid pops up
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const displayItems = categories.length > 0 ? categories : [
    { _id: '1', title: 'Sales Marketing', duration: '4 month', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400' },
    { _id: '2', title: 'Data analytics', duration: '3 month', img: '' },
    { _id: '3', title: 'Copywriting Pro', duration: '2 month', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400' },
    { _id: '4', title: 'Design art', duration: '4 month', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=400' }
  ];

  return (
    <section id="categories" className="categories-section">
      <h2 className="section-title">Unlimited access to 100+ instructors.</h2>
      
      <div className="filter-tabs">
        <span className="tab active">All categories</span>
        <span className="tab">Entertainment</span>
        <span className="tab">Lifestyle</span>
        <span className="tab">Writing</span>
        <span className="tab">Business</span>
        <span className="tab">Food</span>
      </div>

      {/* Dynamic class wrapper linked to scroll trigger state */}
      <div 
        className={`categories-grid ${isGridVisible ? 'animate-visible' : ''}`} 
        ref={gridRef}
      >
        {displayItems.map((item, index) => {
          const imageSrc = item.img && item.img.startsWith('/uploads') 
            ? `http://localhost:5000${item.img}` 
            : item.img;

          return (
            <div 
              key={item._id} 
              className="category-card"
              style={{ '--card-index': index }} // Custom inline CSS variable to handle the sequential stagger delay
            >
              <div className="image-container">
                {imageSrc ? (
                  <img src={imageSrc} alt={item.title} className="category-img" />
                ) : (
                  <div className="fallback-empty-bg"></div>
                )}
              </div>
              <h3 className="category-card-title">{item.title}</h3>
              <p className="category-card-duration">{item.duration}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}