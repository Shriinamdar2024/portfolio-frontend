import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import PortfolioHome from './pages/PortfolioHome'; 
import DeveloperConsole from './components/admin/DeveloperConsole';
import AdminLogin from './pages/AdminLogin';
import API from './services/api';
// Secure Guard
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/" />;
};

function App() {
  const [data, setData] = useState(null);

  // FETCH DATA FOR THE HOME PAGE
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await API.get('/portfolio');
        setData(res.data);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        // Set empty state so it doesn't stay black forever on error
        setData({ experience: [], projects: [] });
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Pass the fetched data as a prop here */}
        <Route path="/" element={<PortfolioHome data={data} />} />

        {/* Admin Login */}
        <Route path="/portal-access-secret" element={<AdminLogin />} />

        {/* Private Control Center */}
        <Route 
          path="/dev" 
          element={
            <ProtectedRoute>
              <DeveloperConsole />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;