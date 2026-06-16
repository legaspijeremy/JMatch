// src/router/index.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import AppLayout from '../components/layout/AppLayout';
import PublicLayout from '../components/layout/PublicLayout';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import ResumeUpload from '../pages/ResumeUpload';
import ResumeAnalysis from '../pages/ResumeAnalysis';
import JobMatch from '../pages/JobMatch';
import ApplicationTracker from '../pages/ApplicationTracker';
import ProfileSettings from '../pages/ProfileSettings';

// Guard component — redirects to /login if not authenticated
function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Redirect to dashboard if already logged in
function GuestGuard({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
}

export const router = createBrowserRouter([
  // Public routes
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Landing /> },
      {
        path: '/login',
        element: <GuestGuard><Login /></GuestGuard>,
      },
      {
        path: '/register',
        element: <GuestGuard><Register /></GuestGuard>,
      },
    ],
  },
  // Protected app routes
  {
    element: <AuthGuard><AppLayout /></AuthGuard>,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/resume/upload', element: <ResumeUpload /> },
      { path: '/resume/analysis', element: <ResumeAnalysis /> },
      { path: '/job-match', element: <JobMatch /> },
      { path: '/applications', element: <ApplicationTracker /> },
      { path: '/settings', element: <ProfileSettings /> },
    ],
  },
  // Catch-all
  { path: '*', element: <Navigate to="/" replace /> },
]);