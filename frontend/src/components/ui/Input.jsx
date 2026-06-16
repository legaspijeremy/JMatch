import { cn } from '../../lib/utils';

export function Input({ label, error, hint, className, id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full h-10 px-3 rounded-md bg-surface-raised border text-slate-100 text-sm placeholder:text-slate-600',
          'transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
          error
            ? 'border-status-danger/50 focus:ring-status-danger/30'
            : 'border-brand-navy/70 hover:border-brand-navy',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-status-danger">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export function Textarea({ label, error, hint, className, id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full px-3 py-2.5 rounded-md bg-surface-raised border text-slate-100 text-sm placeholder:text-slate-600',
          'transition-all duration-150 resize-none',
          'focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60',
          error
            ? 'border-status-danger/50 focus:ring-status-danger/30'
            : 'border-brand-navy/70 hover:border-brand-navy',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-status-danger">{error}</p>}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}