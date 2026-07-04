'use client';

import { useEditorStore } from '@/store/editorStore';
import { useProjectStore } from '@/store/projectStore';
import { useUIStore } from '@/store/uiStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface CanvaToolbarProps {
  projectId: string;
  projectName: string;
}

export default function CanvaToolbar({ projectId, projectName }: CanvaToolbarProps) {
  const router = useRouter();
  const { html, viewMode, setViewMode, zoom, setZoom, showCode, setShowCode, undo, redo, canUndo, canRedo, isSaved, setIsSaved } = useEditorStore();
  const updateProject = useProjectStore((s) => s.updateProject);
  const addToast = useUIStore((s) => s.addToast);

  const handleSave = useCallback(() => {
    updateProject(projectId, { html });
    setIsSaved(true);
    addToast({ type: 'success', title: '✅ Saved!', message: 'Changes saved successfully.' });
  }, [html, projectId, updateProject, setIsSaved, addToast]);

  const handleExport = useCallback(() => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName || 'website'}.html`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', title: '📥 Exported!', message: 'Website downloaded as HTML.' });
  }, [html, projectName, addToast]);

  const viewModes = [
    { id: 'desktop' as const, icon: '🖥️', label: 'Desktop', shortcut: '1' },
    { id: 'tablet' as const, icon: '📱', label: 'Tablet', shortcut: '2' },
    { id: 'mobile' as const, icon: '📲', label: 'Mobile', shortcut: '3' },
  ];

  return (
    <div
      id="canva-toolbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '52px',
        padding: '0 12px',
        background: '#1a1a2e',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
        gap: '8px',
        userSelect: 'none',
        zIndex: 100,
      }}
    >
      {/* Logo + Back */}
      <button
        onClick={() => router.push('/dashboard')}
        title="Back to Dashboard"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '8px',
          border: 'none',
          background: 'transparent',
          color: '#a0a0c0',
          cursor: 'pointer',
          fontSize: '13px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#f0f0ff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a0a0c0'; }}
      >
        <span style={{ fontSize: '16px' }}>←</span>
      </button>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

      {/* Undo / Redo */}
      <div style={{ display: 'flex', gap: '2px' }}>
        <ToolbarBtn
          onClick={undo}
          disabled={!canUndo()}
          title="Undo (Ctrl+Z)"
          icon="↩️"
        />
        <ToolbarBtn
          onClick={redo}
          disabled={!canRedo()}
          title="Redo (Ctrl+Y)"
          icon="↪️"
        />
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

      {/* Project name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{
          fontSize: '13px',
          fontWeight: 600,
          color: '#f0f0ff',
          maxWidth: '200px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {projectName}
        </span>
        {!isSaved && (
          <span style={{
            fontSize: '11px',
            color: '#f59e0b',
            background: 'rgba(245,158,11,0.12)',
            padding: '2px 7px',
            borderRadius: '4px',
            fontWeight: 600,
          }}>
            Unsaved
          </span>
        )}
      </div>

      {/* Flex spacer */}
      <div style={{ flex: 1 }} />

      {/* Device toggles */}
      <div style={{
        display: 'flex',
        gap: '2px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        padding: '2px',
      }}>
        {viewModes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            title={`${mode.label} (${mode.shortcut})`}
            style={{
              padding: '5px 12px',
              borderRadius: '6px',
              border: 'none',
              background: viewMode === mode.id ? 'rgba(139, 92, 246, 0.25)' : 'transparent',
              color: viewMode === mode.id ? '#a78bfa' : '#6a6a8a',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.15s',
              fontWeight: 500,
            }}
          >
            {mode.icon}
          </button>
        ))}
      </div>

      {/* Zoom */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ToolbarBtn onClick={() => setZoom(zoom - 10)} title="Zoom Out" icon="−" small />
        <span style={{
          fontSize: '12px',
          fontWeight: 600,
          color: '#a0a0c0',
          minWidth: '38px',
          textAlign: 'center',
        }}>
          {zoom}%
        </span>
        <ToolbarBtn onClick={() => setZoom(zoom + 10)} title="Zoom In" icon="+" small />
        <ToolbarBtn onClick={() => setZoom(100)} title="Reset Zoom" icon="⌂" small />
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.08)' }} />

      {/* Code toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        title="Toggle Code View"
        style={{
          padding: '6px 12px',
          borderRadius: '8px',
          border: `1px solid ${showCode ? '#8b5cf6' : 'rgba(255,255,255,0.08)'}`,
          background: showCode ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
          color: showCode ? '#a78bfa' : '#a0a0c0',
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 700,
          transition: 'all 0.2s',
          fontFamily: 'monospace',
        }}
      >
        {'</>'}
      </button>

      {/* Save */}
      <button
        onClick={handleSave}
        title="Save (Ctrl+S)"
        style={{
          padding: '7px 16px',
          borderRadius: '8px',
          border: 'none',
          background: isSaved
            ? 'rgba(16,185,129,0.12)'
            : 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          color: isSaved ? '#10b981' : 'white',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 700,
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
        onMouseEnter={(e) => { if (!isSaved) e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {isSaved ? '✓ Saved' : '💾 Save'}
      </button>

      {/* Export */}
      <button
        onClick={handleExport}
        title="Export HTML"
        style={{
          padding: '7px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'transparent',
          color: '#a0a0c0',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: 600,
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#8b5cf6'; e.currentTarget.style.color = '#f0f0ff'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#a0a0c0'; }}
      >
        📤 Export
      </button>
    </div>
  );
}

function ToolbarBtn({
  onClick,
  disabled = false,
  title,
  icon,
  small = false,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  icon: string;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        padding: small ? '4px 8px' : '5px 10px',
        borderRadius: '6px',
        border: 'none',
        background: 'transparent',
        color: disabled ? '#3a3a5a' : '#a0a0c0',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '13px',
        fontWeight: 700,
        transition: 'all 0.15s',
        lineHeight: 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.color = '#f0f0ff';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = disabled ? '#3a3a5a' : '#a0a0c0';
      }}
    >
      {icon}
    </button>
  );
}
