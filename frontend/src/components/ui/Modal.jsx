import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Modal({ open, onOpenChange, title, description, children, className }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in" />
        <Dialog.Content
          className={cn(
            'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'bg-surface-raised border border-brand-navy/70 rounded-xl shadow-modal',
            'w-full max-h-[90vh] overflow-y-auto animate-fade-in-up',
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-navy/50">
            <div>
              <Dialog.Title className="text-base font-semibold text-slate-100">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-sm text-slate-500 mt-0.5">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close className="p-1.5 rounded-md text-slate-500 hover:text-slate-300 hover:bg-surface-overlay transition-colors">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>
          {/* Body */}
          <div className="px-6 py-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}