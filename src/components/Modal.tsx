import { useEffect, type ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function Modal({ open, onClose, title, children, footer }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          <button
            type="button"
            className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="px-4 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
