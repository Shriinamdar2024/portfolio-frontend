import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PortfolioHome from './pages/PortfolioHome'; 
import DeveloperConsole from './components/admin/DeveloperConsole';
import AdminLogin from './pages/AdminLogin';
import API from './services/api';

// Secure Guard - Strict verification
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const location = useLocation();
  
  // Strict check: fails if token is missing, or the literal string "undefined"/"null"
  const isAuthenticated = token && token !== "undefined" && token !== "null" && token.length > 20;

  if (!isAuthenticated) {
    // We send them to login and save the location they were trying to access
    // replace={true} ensures they can't 'Back-button' into the console
    return <Navigate to="/portal-access-secret" state={{ from: location }} replace />;
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
        // Fallback state
        setData({ experience: [], projects: [] });
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Main Portfolio Route */}
        <Route path="/" element={<PortfolioHome data={data} />} />

        {/* Admin Login Route */}
        <Route path="/portal-access-secret" element={<AdminLogin />} />

        {/* Private Control Center - Wrapped in strict Guard */}
        <Route 
          path="/dev" 
          element={
            <ProtectedRoute>
              <DeveloperConsole />
            </ProtectedRoute>
          } 
        />

        {/* Global Redirect: Any unknown route sends user to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;