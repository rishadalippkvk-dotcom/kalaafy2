import React, { useState, useEffect, useMemo } from 'react';
import './Scoreboard.css';

const Scoreboard = () => {
    const [scores, setScores] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [activeTab, setActiveTab] = useState('overall'); // 'overall', 'individual', 'group'

    useEffect(() => {
        fetch('http://localhost:5000/api/scoreboard')
            .then(res => res.json())
            .then(data => {
                setScores(data);
                setLastUpdated(new Date());
            })
            .catch(err => console.error("Error fetching scores:", err));
    }, []);

    // Core Calculation Logic
    const groupStats = useMemo(() => {
        // Initialize specific groups
        const stats = {
            ASTRA: { individual: 0, group: 0, total: 0, events: [] },
            LOKHA: { individual: 0, group: 0, total: 0, events: [] },
            EAKHA: { individual: 0, group: 0, total: 0, events: [] }
        };

        // Helper to normalize group names
        const normalize = (name) => {
            if (!name) return 'UNKNOWN';
            return name.toUpperCase();
        };

        scores.forEach(entry => {
            const groupName = normalize(entry.college);
            if (!stats[groupName]) {
                stats[groupName] = { individual: 0, group: 0, total: 0, events: [] };
            }

            const rank = parseInt(entry.rank);
            let points = 0;

            if (entry.type === 'individual') {
                if (rank === 1) points = 5;
                else if (rank === 2) points = 3;
                else if (rank === 3) points = 1;

                if (points > 0) {
                    stats[groupName].individual += points;
                    stats[groupName].events.push({ ...entry, points });
                }
            } else if (entry.type === 'group') {
                if (rank === 1) points = 10;
                else if (rank === 2) points = 7;
                else if (rank === 3) points = 4;

                if (points > 0) {
                    stats[groupName].group += points;
                    stats[groupName].events.push({ ...entry, points });
                }
            }

            stats[groupName].total = stats[groupName].individual + stats[groupName].group;
        });

        // Convert to array and sort based on activeTab
        const statsArray = Object.entries(stats).map(([name, data]) => ({
            name,
            ...data
        }));

        statsArray.sort((a, b) => {
            if (activeTab === 'individual') {
                if (b.individual !== a.individual) return b.individual - a.individual;
                return b.total - a.total; // Tie-breaker
            } else if (activeTab === 'group') {
                if (b.group !== a.group) return b.group - a.group;
                return b.total - a.total; // Tie-breaker
            } else {
                // Overall
                if (b.total !== a.total) return b.total - a.total;
                if (b.group !== a.group) return b.group - a.group;
                return b.individual - a.individual;
            }
        });

        return statsArray;
    }, [scores, activeTab]);

    const handleGroupClick = (group) => {
        setSelectedGroup(group);
    };

    const closeModal = () => {
        setSelectedGroup(null);
    };

    return (
        <section id="scoreboard" className="section scoreboard-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Official Scoreboard</h2>
                    <p className="last-updated">
                        Last updated: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>

                <div className="scoreboard-tabs">
                    <button
                        className={`scoreboard-tab ${activeTab === 'overall' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overall')}
                    >
                        Overall
                    </button>
                    <button
                        className={`scoreboard-tab ${activeTab === 'individual' ? 'active' : ''}`}
                        onClick={() => setActiveTab('individual')}
                    >
                        👤 Individual
                    </button>
                    <button
                        className={`scoreboard-tab ${activeTab === 'group' ? 'active' : ''}`}
                        onClick={() => setActiveTab('group')}
                    >
                        👥 Group
                    </button>
                </div>

                <div className="scoreboard-table-wrapper">
                    <table className="scoreboard-table">
                        <thead>
                            <tr>
                                <th>Group Name</th>
                                {(activeTab === 'overall' || activeTab === 'individual') && <th>Individual Points</th>}
                                {(activeTab === 'overall' || activeTab === 'group') && <th>Group Points</th>}
                                <th>{activeTab === 'overall' ? 'Total Points' : activeTab === 'individual' ? 'Indiv. Total' : 'Group Total'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupStats.map((group, index) => (
                                <tr
                                    key={group.name}
                                    onClick={() => handleGroupClick(group)}
                                    className={index === 0 ? 'leader-row' : ''}
                                    title="Click for details"
                                >
                                    <td>
                                        <strong>{group.name}</strong>
                                        {index === 0 && <span className="leader-badge"> Leader</span>}
                                    </td>
                                    {(activeTab === 'overall' || activeTab === 'individual') && <td>{group.individual}</td>}
                                    {(activeTab === 'overall' || activeTab === 'group') && <td>{group.group}</td>}
                                    <td className="total-points">
                                        {activeTab === 'overall' ? group.total : activeTab === 'individual' ? group.individual : group.group}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Separate Participants Table */}
                <div className="participants-section">
                    <h3 className="section-subtitle">All Participants & Results</h3>
                    <div className="scoreboard-table-wrapper">
                        <table className="scoreboard-table participants-table">
                            <thead>
                                <tr>
                                    <th>Chest No</th>
                                    <th>Name</th>
                                    <th>Program</th>
                                    <th>Department</th>
                                    <th>Group</th>
                                    <th>Grade</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.length > 0 ? (
                                    scores.map((score, index) => (
                                        <tr key={score.id || index}>
                                            <td><span className="badge badge-secondary">{score.chestNumber || '-'}</span></td>
                                            <td>
                                                {/* Medal removed */}
                                                {score.type === 'individual' ? score.name : score.teamName}
                                            </td>
                                            <td>{score.program}</td>
                                            <td>{score.department || '-'}</td>
                                            <td><strong>{score.college}</strong></td>
                                            <td><span className={`grade-badge grade-${score.grade}`}>{score.grade}</span></td>
                                            <td><strong>{score.score}</strong></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No participants found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="ranking-rules" style={{ textAlign: 'center' }}>
                    <small><br />
                        Ranking based on Total Points. Tie-breakers: Higher Group Points &rarr; Higher Individual Points.
                        <br />
                        Individual: 1st(5), 2nd(3), 3rd(1) <br />Group: 1st(10), 2nd(7), 3rd(4)
                    </small>
                </div>

                {/* Detailed Breakdown Modal */}
                {selectedGroup && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <button className="modal-close" onClick={closeModal}>&times;</button>

                            <div className="modal-header">
                                <h3>{selectedGroup.name}</h3>
                                <p>Score Breakdown</p>
                            </div>

                            <div className="modal-stats">
                                <div className="stat-box">
                                    <div className="stat-label">Individual</div>
                                    <div className="stat-value">{selectedGroup.individual}</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-label">Group</div>
                                    <div className="stat-value">{selectedGroup.group}</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-label">Total</div>
                                    <div className="stat-value" style={{ color: '#d35400' }}>{selectedGroup.total}</div>
                                </div>
                            </div>

                            <div className="modal-body">
                                <div className="breakdown-section">
                                    <h4 className="breakdown-title">👥 Group Competitions</h4>
                                    <ul className="event-list">
                                        {selectedGroup.events.filter(e => e.type === 'group').length > 0 ? (
                                            selectedGroup.events.filter(e => e.type === 'group').map((e, i) => (
                                                <li key={i} className="event-item">
                                                    <span className="event-name">
                                                        {e.medal} {e.program} ({e.rank}{getOrdinal(e.rank)})
                                                    </span>
                                                    <span className="event-points">+{e.points}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-muted">No group points yet.</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="breakdown-section">
                                    <h4 className="breakdown-title">👤 Individual Competitions</h4>
                                    <ul className="event-list">
                                        {selectedGroup.events.filter(e => e.type === 'individual').length > 0 ? (
                                            selectedGroup.events.filter(e => e.type === 'individual').map((e, i) => (
                                                <li key={i} className="event-item">
                                                    <span className="event-name">
                                                        {e.medal} {e.program} - {e.name} ({e.rank}{getOrdinal(e.rank)})
                                                    </span>
                                                    <span className="event-points">+{e.points}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-muted">No individual points yet.</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

// Helper for ordinal suffix (1st, 2nd, 3rd)
function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
}

export default Scoreboard;
