'use client';

export default function LoadingSpinner({ size = 48, text }: { size?: number; text?: string }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    }}>
      <div style={{
        width: size,
        height: size,
        position: 'relative',
      }}>
        {/* Outer ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '3px solid rgba(139, 92, 246, 0.1)',
          borderTopColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute',
          inset: '6px',
          border: '3px solid rgba(6, 182, 212, 0.1)',
          borderBottomColor: '#06b6d4',
          borderRadius: '50%',
          animation: 'spin 1.5s linear reverse infinite',
        }} />
        {/* Center dot */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '6px',
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          borderRadius: '50%',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
      </div>
      {text && (
        <div style={{
          color: 'var(--text-secondary)',
          fontSize: '14px',
          fontWeight: 500,
        }}>
          {text}
        </div>
      )}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.5); }
        }
      `}</style>
    </div>
  );
}
