import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Skills from './components/Skills';
import Customer from './components/Customer';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Custom Wrapper Component to assemble the public landing view components
function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <Skills />
      <Customer />
      <Footer />
    </div>
  );
}

// Protected Route Shield to prevent typing URL to skip login
function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Visitor Path */}
        <Route path="/" element={<LandingPage />} />

        {/* Administration Gateway Paths */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Fallback Catch-all reroute to main page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}