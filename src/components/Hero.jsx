import React, {useState} from "react";
import './Hero.css';

function Hero() {
    // Array of your slider items
    const cards = [
        { id: 1, title: 'Writing Course', subtitle: '100 TOPICS', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600' },
        { id: 2, title: 'Creative Thinking', subtitle: '85 TOPICS', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600' },
        { id: 3, title: 'Business Strategy', subtitle: '120 TOPICS', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600' }
    ];

    return(
        <section id="passion" className="hero">
            <div className="hero-cotent">
                <h1 className="hero-title">Watch.<br />Learn.<br />Grow.</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Find your passion" />
                    <button className="go-btn">Go</button>
                </div>
            </div>

            <div className="hero-slider">
                {cards.map((card) => (
                <div 
                    key={card.id} 
                    className="slider-card"
                    style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%), url(${card.img})` }}
                >
                    <div className="card-info">
                    <div className="card-text">
                        <h3>{card.title}</h3>
                        <span className="topics">{card.subtitle}</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>

        </section>
    );
}

export default Hero;

