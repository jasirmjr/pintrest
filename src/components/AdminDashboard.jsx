import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Existing Category States
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // 🎥 New Video Upload States
  const [videoFile, setVideoFile] = useState(null);
  const [videoMessage, setVideoMessage] = useState('');
  const [currentVideo, setCurrentVideo] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchCurrentVideo();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/categories');
      const data = await response.json();
      if (response.ok) setCategories(data);
    } catch (err) { console.error(err); }
  };

  const fetchCurrentVideo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/video');
      const data = await response.json();
      if (response.ok && data) setCurrentVideo(data.videoUrl);
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/admin');
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5000/api/admin/categories', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setMessage('Category uploaded successfully! 🎉');
        setTitle(''); setDuration(''); setImageFile(null);
        document.getElementById('file-input').value = '';
        fetchCategories();
      }
    } catch (err) { setMessage('Server connection failure.'); }
  };

  // 🎥 Handle Video Upload Submission
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    setVideoMessage('');
    if (!videoFile) return;

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://localhost:5000/api/admin/video', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setVideoMessage('Video uploaded and updated successfully! 🎬');
        setVideoFile(null);
        document.getElementById('video-input').value = '';
        setCurrentVideo(data.videoUrl);
      } else {
        setVideoMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setVideoMessage('Network failure uploading video asset.');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Section */}
      <aside className="dashboard-sidebar">
        <div>
          <div className="sidebar-brand">Skillex <span className="dot">.</span></div>
          <ul className="sidebar-menu">
            <li className={`menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>📊 Overview</li>
            <li className={`menu-item ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>📚 Course Categories</li>
            <li className={`menu-item ${activeTab === 'video' ? 'active' : ''}`} onClick={() => setActiveTab('video')}>🎥 Skills Video</li>
            <li className="menu-item">💬 Reviews Manager</li>
          </ul>
        </div>
        <button onClick={handleLogout} className="logout-btn">Log Out</button>
      </aside>

      {/* Main Focus Content Panels */}
      <main className="dashboard-content">
        <header className="content-header">
          <h2>
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'categories' && 'Manage Course Categories'}
            {activeTab === 'video' && 'Update Skills Video'}
          </h2>
          <div className="admin-profile-tag">Authorized Root Admin</div>
        </header>

        {activeTab === 'overview' && (
          <>
            <section className="overview-grid">
              <div className="metric-card"><h3>Active Categories</h3><div className="value">{categories.length}</div></div>
              <div className="metric-card"><h3>Total Reviews</h3><div className="value">6</div></div>
              <div className="metric-card"><h3>Server Status</h3><div className="value" style={{ color: '#84b47c', fontSize: '20px', marginTop: '12px' }}>● Online</div></div>
            </section>
            <section className="data-panel">
              <h4>System Workspace</h4>
              <p className="placeholder-text">Use the left navigation sidebar menu options to manage assets.</p>
            </section>
          </>
        )}

        {activeTab === 'categories' && (
          <div className="categories-management-wrapper">
            <section className="data-panel upload-form-box">
              <h4>Upload New Course Category</h4>
              {message && <div className="status-toast-alert">{message}</div>}
              <form onSubmit={handleCategorySubmit} className="dashboard-upload-form">
                <div className="form-group"><label>Category Headline/Title</label><input type="text" placeholder="e.g., Development" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                <div className="form-group"><label>Duration</label><input type="text" placeholder="e.g., 3 month" value={duration} onChange={(e) => setDuration(e.target.value)} required /></div>
                <div className="form-group"><label>Cover Image File</label><input id="file-input" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required /></div>
                <button type="submit" className="upload-submit-btn">Publish to Production App</button>
              </form>
            </section>
            <section className="data-panel database-live-view">
              <h4>Current Database Items ({categories.length})</h4>
              <div className="admin-items-grid">
                {categories.map((item) => (
                  <div key={item._id} className="admin-preview-item-card">
                    <img src={`http://localhost:5000${item.img}`} alt={item.title} />
                    <div className="card-details"><h5>{item.title}</h5><span>{item.duration}</span></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="categories-management-wrapper">
            <section className="data-panel upload-form-box">
              <h4>Upload Custom Video Asset</h4>
              {videoMessage && <div className="status-toast-alert">{videoMessage}</div>}
              <form onSubmit={handleVideoSubmit} className="dashboard-upload-form">
                <div className="form-group">
                  <label>Select Local Video File (.mp4, .mov, etc.)</label>
                  <input id="video-input" type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} required />
                </div>
                <button type="submit" className="upload-submit-btn">Upload and Replace Video</button>
              </form>
            </section>

            <section className="data-panel database-live-view">
              <h4>Active Live Application Video</h4>
              {currentVideo ? (
                <video src={`http://localhost:5000${currentVideo}`} controls style={{ width: '100%', borderRadius: '12px', marginTop: '10px' }} />
              ) : (
                <p className="placeholder-text" style={{ marginTop: '15px' }}>No video uploaded yet. Using fallback stock video.</p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}