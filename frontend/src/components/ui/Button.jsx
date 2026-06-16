import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-accent hover:bg-accent-hover text-white shadow-sm active:scale-[0.98]',
  secondary: 'bg-surface-raised border border-brand-navy/70 text-slate-200 hover:border-accent/40 hover:text-white active:scale-[0.98]',
  ghost: 'text-slate-400 hover:text-slate-100 hover:bg-surface-raised active:scale-[0.98]',
  danger: 'border border-status-danger/40 text-status-danger hover:bg-status-danger/10 active:scale-[0.98]',
};

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
  md: 'h-9 px-4 text-sm rounded-md gap-2',
  lg: 'h-11 px-6 text-sm rounded-lg gap-2',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  icon,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-surface-base disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}