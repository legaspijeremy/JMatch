import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Topbar({ title }) {
  const { user } = useAuth();
  const initials = user?.full_name
    ? user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? 'U';

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-brand-navy/50 bg-surface-base/80 backdrop-blur-sm flex-shrink-0">
      <h1 className="text-sm font-semibold text-slate-200">{title}</h1>
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-md flex items-center justify-center text-slate-500 hover:text-slate-300 hover:bg-surface-raised transition-all duration-150 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
        </button>
        <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
          <span className="text-xs font-bold text-accent">{initials}</span>
        </div>
      </div>
    </header>
  );
}