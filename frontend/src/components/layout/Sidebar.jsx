import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Target, ClipboardList,
  UserCircle, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/resume/upload', label: 'Resume',      icon: FileText },
  { to: '/job-match',    label: 'Job Match',    icon: Target },
  { to: '/applications', label: 'Applications', icon: ClipboardList },
  { to: '/settings',     label: 'Profile',      icon: UserCircle },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'relative flex flex-col h-screen bg-surface-base border-r border-brand-navy/50',
        'transition-all duration-300 ease-in-out flex-shrink-0',
        collapsed ? 'w-[64px]' : 'w-[220px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-brand-navy/50">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 shadow-glow-accent">
          <span className="text-white font-bold text-sm">J</span>
        </div>
        {!collapsed && (
          <span className="font-bold text-slate-100 text-base tracking-tight">JMatch</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-2 overflow-hidden">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150',
                'group relative',
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-surface-raised'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('w-4 h-4 flex-shrink-0', isActive ? 'text-accent' : '')} />
                {!collapsed && <span className="truncate">{label}</span>}
                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-surface-overlay border border-brand-navy/60 rounded-md text-xs text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-modal">
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-2 py-3 border-t border-brand-navy/50 space-y-1">
        {!collapsed && user && (
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-slate-300 truncate">{user.full_name || user.email}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm text-slate-400 hover:text-status-danger hover:bg-status-danger/10 transition-all duration-150 group relative"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-surface-overlay border border-brand-navy/60 rounded-md text-xs text-slate-200 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-modal">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-surface-raised border border-brand-navy/70 flex items-center justify-center text-slate-500 hover:text-slate-300 hover:border-accent/40 transition-all duration-150 z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}