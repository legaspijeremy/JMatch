import { cn } from '../../lib/utils';

export function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-surface-raised border border-brand-navy/60 rounded-lg shadow-card',
        hover && 'transition-all duration-200 hover:border-accent/30 hover:shadow-card-hover cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('px-5 py-4 border-b border-brand-navy/50', className)} {...props}>
      {children}
    </div>
  );
}

export function CardBody({ children, className, ...props }) {
  return (
    <div className={cn('px-5 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('px-5 py-3 border-t border-brand-navy/50', className)} {...props}>
      {children}
    </div>
  );
}