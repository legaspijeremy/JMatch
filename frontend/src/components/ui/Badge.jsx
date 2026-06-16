import { cn } from '../../lib/utils';

const variants = {
  applied:   'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  interview: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  offer:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  rejected:  'bg-red-500/10 text-red-400 border border-red-500/20',
  saved:     'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  success:   'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  danger:    'bg-red-500/10 text-red-400 border border-red-500/20',
  info:      'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  default:   'bg-slate-500/10 text-slate-400 border border-slate-500/20',
};

export function Badge({ children, variant = 'default', className, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium',
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}