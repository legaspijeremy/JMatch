import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/resume/upload': 'Resume Upload',
  '/resume/analysis': 'Resume Analysis',
  '/job-match': 'Job Match',
  '/applications': 'Applications',
  '/settings': 'Profile Settings',
};

export default function AppLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'JMatch';

  return (
    <div className="flex h-screen overflow-hidden bg-surface-base">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={title} />
        <main className="flex-1 overflow-y-auto p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}