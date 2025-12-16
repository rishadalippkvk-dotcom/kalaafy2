import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../components/Navigation.css';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('programs');
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // Initial load check
    useEffect(() => {
        if (!user) navigate('/admin/login');
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/${activeTab}`);
            const data = await res.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data and reset form state when tab changes
    useEffect(() => {
        fetchData();
        setFormData({});
        setSelectedFile(null);
        setIsEditing(false);
        setEditId(null);
    }, [activeTab]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await fetch(`http://localhost:5000/api/${activeTab}/${id}`, { method: 'DELETE' });
            fetchData();
        } catch (error) {
            console.error("Error deleting:", error);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setIsEditing(true);
        setEditId(item.id);
        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing
            ? `http://localhost:5000/api/${activeTab}/${editId}`
            : `http://localhost:5000/api/${activeTab}`;

        try {
            if (activeTab === 'gallery') {
                const formDataObj = new FormData();
                // Append text fields
                for (const key in formData) {
                    formDataObj.append(key, formData[key]);
                }
                // Append file if selected
                if (selectedFile) {
                    formDataObj.append('image', selectedFile);
                }

                // Do not set Content-Type header manually for FormData
                const res = await fetch(url, {
                    method: method,
                    body: formDataObj
                });

                if (res.ok) {
                    fetchData();
                    setFormData({});
                    setSelectedFile(null);
                    setIsEditing(false);
                    setEditId(null);
                    alert(isEditing ? 'Updated successfully!' : 'Added successfully!');
                }
            } else {
                const res = await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                if (res.ok) {
                    fetchData();
                    setFormData({});
                    setIsEditing(false);
                    setEditId(null);
                    alert(isEditing ? 'Updated successfully!' : 'Added successfully!');
                }
            }
        } catch (error) {
            console.error("Error submitting:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Auto-select Group based on Department
            if (name === 'department') {
                const astraDepts = ['1 Year Economics', '2 Year Economics', '3 Year Economics', '1 Year BBA'];
                const lokhaDepts = ['1 Year GDA', '2 Year GDA', '3 Year GDA', '1 Year BCA', '1 Year B.Com Finance'];
                const eakhaDepts = ['1 Year B.Com Co-operation', '2 Year B.Com Co-operation', '3 Year B.Com Co-operation'];

                if (astraDepts.includes(value)) newData.college = 'ASTRA';
                else if (lokhaDepts.includes(value)) newData.college = 'LOKHA';
                else if (eakhaDepts.includes(value)) newData.college = 'EAKHA';
            }
            return newData;
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // --- Form Fields Generators ---

    const renderProgramInputs = () => (
        <>
            <input name="title" placeholder="Title (e.g., Classical Dance)" value={formData.title || ''} onChange={handleInputChange} required />
            <input name="description" placeholder="Description" value={formData.description || ''} onChange={handleInputChange} />
            <select name="category" value={formData.category || ''} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="onstage">Onstage</option>
                <option value="offstage">Offstage</option>
            </select>
            <input name="time" placeholder="Time (e.g., 10:00 AM)" value={formData.time || ''} onChange={handleInputChange} required />
            <input name="venue" placeholder="Venue" value={formData.venue || ''} onChange={handleInputChange} />
            <input name="date" type="date" value={formData.date || ''} onChange={handleInputChange} required />
            <input name="icon" placeholder="Icon" value={formData.icon || ''} onChange={handleInputChange} />
            <input name="participants" placeholder="Participants info" value={formData.participants || ''} onChange={handleInputChange} />
        </>
    );

    const renderNoticeInputs = () => (
        <>
            <input name="title" placeholder="Title" value={formData.title || ''} onChange={handleInputChange} required />
            <textarea name="content" placeholder="Content" value={formData.content || ''} onChange={handleInputChange} required rows="4" />
            <select name="priority" value={formData.priority || ''} onChange={handleInputChange} required>
                <option value="">Select Priority</option>
                <option value="urgent">Urgent</option>
                <option value="important">Important</option>
                <option value="new">New</option>
                <option value="normal">Normal</option>
            </select>
            <input name="category" placeholder="Category (e.g., General)" value={formData.category || ''} onChange={handleInputChange} />
            <input name="date" type="date" value={formData.date || ''} onChange={handleInputChange} required />
            <input name="time" type="time" value={formData.time || ''} onChange={handleInputChange} />
        </>
    );

    const renderScoreboardInputs = () => (
        <>
            <select name="type" value={formData.type || ''} onChange={handleInputChange} required>
                <option value="">Select Type</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
            </select>
            <select name="category" value={formData.category || ''} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="onstage">Onstage</option>
                <option value="offstage">Offstage</option>
            </select>
            <input name="program" placeholder="Program Name" value={formData.program || ''} onChange={handleInputChange} required />
            <div style={{ display: 'flex', gap: '10px' }}>
                <input name="chestNumber" placeholder="Chest No" value={formData.chestNumber || ''} onChange={handleInputChange} style={{ flex: 1 }} />
                <select name="department" value={formData.department || ''} onChange={handleInputChange} style={{ flex: 1 }} >
                    <option value="">Select Department</option>
                    <option value="1 Year Economics">1 Year Economics</option>
                    <option value="2 Year Economics">2 Year Economics</option>
                    <option value="3 Year Economics">3 Year Economics</option>
                    <option value="1 Year BBA">1 Year BBA</option>
                    <option value="1 Year GDA">1 Year GDA</option>
                    <option value="2 Year GDA">2 Year GDA</option>
                    <option value="3 Year GDA">3 Year GDA</option>
                    <option value="1 Year BCA">1 Year BCA</option>
                    <option value="1 Year B.Com Finance">1 Year B.Com Finance</option>
                    <option value="1 Year B.Com Co-operation">1 Year B.Com Co-operation</option>
                    <option value="2 Year B.Com Co-operation">2 Year B.Com Co-operation</option>
                    <option value="3 Year B.Com Co-operation">3 Year B.Com Co-operation</option>
                </select>
            </div>
            <input name="rank" type="number" placeholder="Rank (1, 2, 3)" value={formData.rank || ''} onChange={handleInputChange} required />
            <input name="score" type="number" placeholder="Score" value={formData.score || ''} onChange={handleInputChange} required />

            {/* Group/College Selection */}
            <select name="college" value={formData.college || ''} onChange={handleInputChange} required>
                <option value="">Select Group (House)</option>
                <option value="ASTRA">ASTRA</option>
                <option value="LOKHA">LOKHA</option>
                <option value="EAKHA">EAKHA</option>
            </select>

            <select name="grade" value={formData.grade || ''} onChange={handleInputChange}>
                <option value="">Select Grade</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </select>

            {formData.type === 'group' ? (
                <>
                    <input name="teamName" placeholder="Group Name" value={formData.teamName || ''} onChange={handleInputChange} required />
                    <textarea name="members" placeholder="Group Members (comma separated)" value={formData.members || ''} onChange={handleInputChange} />
                </>
            ) : (
                <input name="name" placeholder="Participant Name" value={formData.name || ''} onChange={handleInputChange} required />
            )}
        </>
    );

    const renderGalleryInputs = () => (
        <>
            <div className="file-input-group">
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Upload Image (Optional if using URL)</label>
                <input type="file" onChange={handleFileChange} accept="image/*" style={{ marginBottom: '10px' }} />
            </div>
            <input name="url" placeholder="Or enter Image URL" value={formData.url || ''} onChange={handleInputChange} />
            <input name="title" placeholder="Image Title" value={formData.title || ''} onChange={handleInputChange} required />
            <select name="category" value={formData.category || ''} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                <option value="onstage">Onstage</option>
                <option value="offstage">Offstage</option>
            </select>
            <input name="event" placeholder="Event Name" value={formData.event || ''} onChange={handleInputChange} required />
            <textarea name="description" placeholder="Description" value={formData.description || ''} onChange={handleInputChange} />
        </>
    );

    return (
        <div className="admin-dashboard-container">
            <header className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <button onClick={logout} className="btn btn-secondary">Logout</button>
            </header>

            <div className="dashboard-tabs">
                {['programs', 'notices', 'scoreboard', 'gallery'].map(tab => (
                    <button
                        key={tab}
                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <div className="dashboard-content-layout">
                {/* Left Side: Form */}
                <aside className="editor-panel">
                    <h3>{isEditing ? 'Edit Item' : 'Add New Item'}</h3>
                    <form onSubmit={handleSubmit} className="admin-form">
                        {activeTab === 'programs' && renderProgramInputs()}
                        {activeTab === 'notices' && renderNoticeInputs()}
                        {activeTab === 'scoreboard' && renderScoreboardInputs()}
                        {activeTab === 'gallery' && renderGalleryInputs()}

                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
                            {isEditing && (
                                <button type="button" className="btn btn-outline" onClick={() => { setIsEditing(false); setFormData({}); setSelectedFile(null); setEditId(null); }}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </aside>

                {/* Right Side: Grid List */}
                <main className="items-grid-container">
                    <h3>Existing {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
                    <div className="items-grid">
                        {items.map(item => (
                            <div key={item.id} className="admin-card">
                                <div className="card-header">
                                    <span className="card-id">#{item.id}</span>
                                    <div className="card-actions">
                                        <button onClick={() => handleEdit(item)} className="icon-btn edit-btn">✏️</button>
                                        <button onClick={() => handleDelete(item.id)} className="icon-btn delete-btn">🗑️</button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {activeTab === 'programs' && (
                                        <>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                            <small>{item.date} | {item.time}</small>
                                        </>
                                    )}
                                    {activeTab === 'notices' && (
                                        <>
                                            <h4>{item.title}</h4>
                                            <p className="summary">{item.content}</p>
                                            <span className={`badge badge-${item.priority}`}>{item.priority}</span>
                                        </>
                                    )}
                                    {activeTab === 'scoreboard' && (
                                        <>
                                            <h4>{item.type === 'individual' ? item.name : (item.teamName || item.groupName)}</h4>
                                            <p>{item.program}</p>
                                            <small>{item.college} | Score: {item.score} | Grade: {item.grade}</small>
                                            <small className="rank-badge">Rank: {item.rank}</small>
                                        </>
                                    )}
                                    {activeTab === 'gallery' && (
                                        <>
                                            <div style={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', marginBottom: '10px' }}>
                                                <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#eee'; }} />
                                            </div>
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                            <small className={`badge ${item.category === 'onstage' ? 'badge-primary' : 'badge-secondary'}`}>{item.category}</small>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Inline CSS for Dashboard Layout */}
            <style>{`
                .admin-dashboard-container {
                    padding: 20px;
                    background: linear-gradient(135deg, #fffdf2 0%, #ffe082 100%);
                    min-height: 100vh;
                }
                .dashboard-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    background: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                .dashboard-tabs {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 20px;
                }
                .tab-btn {
                    padding: 10px 25px;
                    border: none;
                    background: #e0e0e0;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s;
                }
                .tab-btn.active {
                    background: #6c5ce7;
                    color: white;
                }
                .dashboard-content-layout {
                    display: grid;
                    grid-template-columns: 350px 1fr;
                    gap: 20px;
                }
                .editor-panel {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    height: fit-content;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    position: sticky;
                    top: 20px;
                }
                .admin-form {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 15px;
                }
                .admin-form input, .admin-form textarea, .admin-form select {
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    font-size: 14px;
                }
                .form-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 10px;
                }
                .items-grid-container h3 {
                    margin-bottom: 15px;
                }
                .items-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                }
                .admin-card {
                    background: white;
                    border-radius: 12px;
                    padding: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    transition: transform 0.2s;
                    border: 1px solid #eee;
                }
                .admin-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
                }
                .card-header {
                    display: flex;
                    justify-content: space-between;
                    color: #888;
                    font-size: 0.8rem;
                    margin-bottom: 10px;
                }
                .card-actions {
                    display: flex;
                    gap: 8px;
                }
                .icon-btn {
                    border: none;
                    background: none;
                    cursor: pointer;
                    font-size: 1.1rem;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                .icon-btn:hover {
                    opacity: 1;
                }
                .card-body h4 {
                    margin: 0 0 5px 0;
                    color: #2c3e50;
                }
                .card-body p {
                    font-size: 0.9rem;
                    color: #666;
                    margin: 0 0 10px 0;
                    line-height: 1.4;
                }
                .summary {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .badge {
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    background: #eee;
                }
                @media (max-width: 900px) {
                    .dashboard-content-layout {
                        grid-template-columns: 1fr;
                    }
                    .editor-panel {
                        position: static;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
