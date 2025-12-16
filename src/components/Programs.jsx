import React, { useState, useEffect } from 'react';
import './Programs.css';

const Programs = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/programs')
            .then(res => res.json())
            .then(data => setPrograms(data))
            .catch(err => console.error("Error fetching programs:", err));
    }, []);

    const filteredPrograms = activeCategory === 'all'
        ? programs
        : programs.filter(p => p.category?.toLowerCase() === activeCategory);

    return (
        <section id="programs" className="section programs-section">
            <div className="container">
                <h2 className="section-title">Our Programs</h2>

                <div className="tabs">
                    <button
                        className={`tab ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                    >
                        All Programs
                    </button>
                    <button
                        className={`tab ${activeCategory === 'offstage' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('offstage')}
                    >
                        Offstage
                    </button>
                    <button
                        className={`tab ${activeCategory === 'onstage' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('onstage')}
                    >
                        Onstage
                    </button>
                </div>

                <div className="programs-grid grid grid-3">
                    {filteredPrograms.map((program, index) => (
                        <div
                            key={program.id}
                            className="program-card glass-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="program-icon">{program.icon}</div>
                            <h3 className="program-name">{program.name}</h3>
                            <p className="program-description">{program.description}</p>

                            <div className="program-details">
                                <div className="detail-item">
                                    <span className="detail-label"> Date:</span>
                                    <span className="detail-value">{new Date(program.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label"> Time:</span>
                                    <span className="detail-value">{program.time}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label"> Venue:</span>
                                    <span className="detail-value">{program.venue}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label"> Type:</span>
                                    <span className="detail-value">{program.participants}</span>
                                </div>
                            </div>

                            <div className="program-category">
                                <span className={`badge ${program.category === 'offstage' ? 'badge-primary' : 'badge-secondary'}`}>
                                    {program.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Programs;
