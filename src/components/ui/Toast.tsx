'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';
import type { Toast as ToastType } from '@/store/uiStore';

function ToastItem({ toast }: { toast: ToastType }) {
  const removeToast = useUIStore((s) => s.removeToast);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  const icons: Record<string, string> = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  const colors: Record<string, string> = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
  };

  return (
    <div
      className="toast-enter"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '16px',
        background: 'rgba(17, 17, 40, 0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${colors[toast.type]}33`,
        borderRadius: '12px',
        minWidth: '320px',
        maxWidth: '420px',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${colors[toast.type]}22`,
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: `${colors[toast.type]}22`,
          color: colors[toast.type],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {icons[toast.type]}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>
          {toast.title}
        </div>
        {toast.message && (
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {toast.message}
          </div>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '2px',
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
