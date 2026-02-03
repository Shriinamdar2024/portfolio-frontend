import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PortfolioHome from './pages/PortfolioHome'; 
import DeveloperConsole from './components/admin/DeveloperConsole';
import AdminLogin from './pages/AdminLogin';
import API from './services/api';

// Secure Guard - Enhanced with state verification and history replacement
const ProtectedRoute = ({ children }) => {
  // We check for the token strictly
  const token = localStorage.getItem('adminToken');
  
  // If token is missing, or is the literal string "null"/"undefined" (common JS storage bugs)
  const isAuthenticated = token && token !== "undefined" && token !== "null";

  if (!isAuthenticated) {
    // We use replace to ensure they can't go "Back" into the dev console
    return <Navigate to="/portal-access-secret" replace />;
  }

  return children;
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

        {/* Catch-all redirect for broken links */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;