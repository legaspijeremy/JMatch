import { cn } from '../../lib/utils';

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('skeleton rounded-md', className)}
      {...props}
    />
  );
}

export function SkeletonCard({ className }) {
  return (
    <div className={cn('card p-5 space-y-3', className)}>
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}