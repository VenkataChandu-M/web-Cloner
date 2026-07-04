'use client';

import { useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useProjectStore } from '@/store/projectStore';
import { useEditorStore } from '@/store/editorStore';
import { useUIStore } from '@/store/uiStore';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CanvaToolbar from '@/components/editor/CanvaToolbar';
import SectionsPanel from '@/components/editor/SectionsPanel';
import PropertiesPanel from '@/components/editor/PropertiesPanel';
import EditorCanvas from '@/components/editor/EditorCanvas';

export default function EditorPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const projects = useProjectStore((s) => s.projects);
  const updateProject = useProjectStore((s) => s.updateProject);
  const addToast = useUIStore((s) => s.addToast);

  const {
    pushHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
    setIsSaved,
  } = useEditorStore();

  const project = projects.find((p) => p.id === projectId);

  // Initialize editor with project HTML
  useEffect(() => {
    if (project) {
      reset();
      // Set HTML without triggering history on init
      useEditorStore.setState({ html: project.html, isSaved: true });
      pushHistory(project.html);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleSave = useCallback(() => {
    const currentHtml = useEditorStore.getState().html;
    updateProject(projectId, { html: currentHtml });
    setIsSaved(true);
    addToast({ type: 'success', title: '✅ Saved!', message: 'Changes saved to project.' });
  }, [projectId, updateProject, setIsSaved, addToast]);

  // Insert section at end of <body>
  const handleInsertSection = useCallback((sectionHtml: string) => {
    const currentHtml = useEditorStore.getState().html;
    let newHtml: string;

    if (currentHtml.includes('</body>')) {
      newHtml = currentHtml.replace('</body>', `\n${sectionHtml}\n</body>`);
    } else if (currentHtml.includes('</html>')) {
      newHtml = currentHtml.replace('</html>', `\n${sectionHtml}\n</html>`);
    } else {
      newHtml = currentHtml + '\n' + sectionHtml;
    }
    useEditorStore.getState().setHtml(newHtml);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      if (mod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo()) undo();
      }
      if (mod && (e.key === 'y' || (e.shiftKey && e.key === 'z'))) {
        e.preventDefault();
        if (canRedo()) redo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, undo, redo, canUndo, canRedo]);

  // Not found
  if (!project && projects.length > 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050510',
        gap: '16px',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ fontSize: '3rem' }}>📭</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f0f0ff' }}>Project Not Found</h2>
        <p style={{ color: '#a0a0c0' }}>This project doesn&apos;t exist or has been deleted.</p>
        <a href="/dashboard" style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)',
          borderRadius: '10px',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 700,
          marginTop: '8px',
        }}>
          ← Back to Dashboard
        </a>
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050510',
      }}>
        <LoadingSpinner size={48} text="Loading project..." />
      </div>
    );
  }

  return (
    <div
      id="canva-editor"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#050510',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Top Toolbar */}
      <CanvaToolbar
        projectId={projectId}
        projectName={project.name}
      />

      {/* 3-Panel Layout */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Left: Sections Panel */}
        <SectionsPanel onInsertSection={handleInsertSection} />

        {/* Center: Editor Canvas */}
        <EditorCanvas />

        {/* Right: Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
}
