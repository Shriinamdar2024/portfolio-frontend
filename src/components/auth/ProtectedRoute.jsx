import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  // Ensure the 'to' path matches your App.js route exactly
  if (!token) {
    return <Navigate to="/portal-access-secret" replace />;
  }

  return children;
};

export default ProtectedRoute;