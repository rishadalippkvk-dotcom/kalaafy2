import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
    const [groupScores, setGroupScores] = useState([]);

    useEffect(() => {
        fetchScoreboardData();
        const interval = setInterval(fetchScoreboardData, 5000); // Live update every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const fetchScoreboardData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/scoreboard');
            const data = await response.json();
            calculateScores(data);
        } catch (error) {
            console.error("Error fetching scoreboard data:", error);
        }
    };

    const calculateScores = (data) => {
        const groups = {
            'ASTRA': { name: 'ASTRA', total: 0 },
            'LOKHA': { name: 'LOKHA', total: 0 },
            'EAKHA': { name: 'EAKHA', total: 0 }
        };

        data.forEach(item => {
            const groupName = item.college;
            
            if (groups[groupName]) {
                // Normalize the rank to a number
                const rank = parseInt(item.rank);
                let points = 0;
                
                if (item.type === 'individual') {
                    if (rank === 1) points = 5;
                    else if (rank === 2) points = 3;
                    else if (rank === 3) points = 1;
                } else if (item.type === 'group') {
                    if (rank === 1) points = 10;
                    else if (rank === 2) points = 7;
                    else if (rank === 3) points = 4;
                }
                
                groups[groupName].total += points;
            }
        });

        const sortedGroups = Object.values(groups).sort((a, b) => b.total - a.total);
        setGroupScores(sortedGroups);
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-content animate-fadeInUp">
                <div className="hero-badge">
                    <span className="badge badge-primary">Arts Festival 2025</span>
                </div>

                <h1 className="hero-title">
                    Welcome to <span className="gradient-text">Kalaafy</span>
                </h1>

                <p className="hero-subtitle">
                    Celebrating creativity, talent, and artistic excellence across colleges.
                    Join us for an unforgettable journey of performances, competitions, and celebrations.
                </p>

                <div className="hero-stats">
                    {groupScores.length > 0 ? (
                        groupScores.map((group, index) => (
                            <div className="stat-item" key={group.name}>
                                <div className="stat-number">{group.total}</div>
                                <div className="stat-label">{group.name}</div>
                            </div>
                        ))
                    ) : (
                        // Fallback/Loading state
                        <>
                            <div className="stat-item"><div className="stat-number">-</div><div className="stat-label">ASTRA</div></div>
                            <div className="stat-item"><div className="stat-number">-</div><div className="stat-label">LOKHA</div></div>
                            <div className="stat-item"><div className="stat-number">-</div><div className="stat-label">EAKHA</div></div>
                        </>
                    )}
                </div>

                <div className="hero-actions">
                    <button className="btn btn-primary" onClick={() => scrollToSection('programs')}>
                        Explore Programs
                    </button>
                    <button className="btn btn-outline" onClick={() => scrollToSection('scoreboard')}>
                        View Scores
                    </button>
                </div>
            </div>

            <div className="hero-decoration">
                <div className="floating-icon icon-1">🎭</div>
                <div className="floating-icon icon-2">🎵</div>
                <div className="floating-icon icon-3">💃</div>
                <div className="floating-icon icon-4">🎨</div>
                <div className="floating-icon icon-5">📷</div>
            </div>
        </section>
    );
};

export default Hero;