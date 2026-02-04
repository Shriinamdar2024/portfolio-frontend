import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/portal-access-secret" replace />;
  }
  return children;
};

export default ProtectedRoute;