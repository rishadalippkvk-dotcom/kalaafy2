import React, { useState, useEffect } from 'react';
import './NoticeBoard.css';

const NoticeBoard = () => {
    const [expandedNotice, setExpandedNotice] = useState(null);
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/notices')
            .then(res => res.json())
            .then(data => setNotices(data))
            .catch(err => console.error("Error fetching notices:", err));
    }, []);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'urgent': return 'badge-warning';
            case 'important': return 'badge-secondary';
            case 'new': return 'badge-success';
            default: return 'badge-primary';
        }
    };

    const toggleNotice = (id) => {
        setExpandedNotice(expandedNotice === id ? null : id);
    };

    return (
        <section id="notices" className="section notices-section">
            <div className="container">
                <h2 className="section-title">Notice Board</h2>

                <div className="notices-grid grid grid-2">
                    {notices.map((notice, index) => (
                        <div
                            key={notice.id}
                            className={`notice-card glass-card ${expandedNotice === notice.id ? 'expanded' : ''}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onClick={() => toggleNotice(notice.id)}
                        >
                            <div className="notice-header">
                                <div className="notice-meta">
                                    <span className={`badge ${getPriorityColor(notice.priority)}`}>
                                        {notice.priority}
                                    </span>
                                    <span className="notice-category">{notice.category}</span>
                                </div>
                                <div className="notice-date">
                                    <span className="date-icon">📅</span>
                                    <span>{new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    <span className="time-icon">⏰</span>
                                    <span>{notice.time}</span>
                                </div>
                            </div>

                            <h3 className="notice-title">{notice.title}</h3>

                            <p className={`notice-content ${expandedNotice === notice.id ? 'show' : ''}`}>
                                {notice.content}
                            </p>

                            <button className="notice-toggle">
                                {expandedNotice === notice.id ? 'Show Less ▲' : 'Read More ▼'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NoticeBoard;
