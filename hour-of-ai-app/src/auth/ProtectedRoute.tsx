import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserRole, useAuth } from './AuthContext';

export function ProtectedRoute({ roles }: { roles: UserRole[] }) {
  const { role } = useAuth();
  const location = useLocation();

  if (!roles.includes(role)) {
    return <Navigate to="/access" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
