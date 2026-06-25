import { Navigate, Route, Routes } from 'react-router-dom';
import { AccessPage } from './auth/AccessPage';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { NurtureRootsHomepage } from './features/home/NurtureRootsHomepage';
import { ParentDashboard } from './features/parent/ParentDashboard';
import { NurtureRootsOnboarding } from './features/signup/NurtureRootsOnboarding';
import { VolunteerDashboard } from './features/volunteer/VolunteerDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<NurtureRootsHomepage />} />
      <Route path="/signup/*" element={<NurtureRootsOnboarding />} />
      <Route path="/access" element={<AccessPage />} />

      <Route element={<ProtectedRoute roles={['volunteer']} />}>
        <Route path="/volunteer/*" element={<VolunteerDashboard />} />
      </Route>
      <Route element={<ProtectedRoute roles={['parent']} />}>
        <Route path="/parent/*" element={<ParentDashboard forcedMode="parent" />} />
      </Route>
      <Route element={<ProtectedRoute roles={['hub']} />}>
        <Route path="/hub/*" element={<ParentDashboard forcedMode="hub" />} />
      </Route>
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="/admin/*" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
