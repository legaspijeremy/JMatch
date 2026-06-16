import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Layouts
import AppLayout from "./components/layout/AppLayout";
import PublicLayout from "./components/layout/PublicLayout";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Protected pages
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import JobMatch from "./pages/JobMatch";
import ApplicationTracker from "./pages/ApplicationTracker";
import ProfileSettings from "./pages/ProfileSettings";

// Redirect to /login if not logged in
function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Redirect to /dashboard if already logged in
function GuestGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<GuestGuard><Login /></GuestGuard>} />
          <Route path="/register" element={<GuestGuard><Register /></GuestGuard>} />
        </Route>

        {/* Protected routes */}
        <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume/upload" element={<ResumeUpload />} />
          <Route path="/resume/analysis" element={<ResumeAnalysis />} />
          <Route path="/job-match" element={<JobMatch />} />
          <Route path="/applications" element={<ApplicationTracker />} />
          <Route path="/settings" element={<ProfileSettings />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;