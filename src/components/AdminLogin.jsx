import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save a simple token/flag in storage to remember the admin is logged in
        localStorage.setItem('isAdminLoggedIn', 'true');
        // Redirect smoothly to the admin panel dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Cannot connect to the server. Is your backend running?');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Skillex Admin <span className="dot">.</span></h2>
        <p>Please enter your administrative credentials</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@skillex.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-submit-btn">Login to Dashboard</button>
        </form>
      </div>
    </div>
  );
}