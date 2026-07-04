'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useEditorStore } from '@/store/editorStore';

export default function EditorCanvas() {
  const { html, viewMode, zoom, showCode, setHtml } = useEditorStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reload iframe when html changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;
    doc.open();
    doc.write(html);
    doc.close();
  }, [html]);

  const iframeWidth =
    viewMode === 'desktop' ? '100%' :
    viewMode === 'tablet' ? '768px' : '375px';

  const scale = zoom / 100;

  const handleCodeChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtml(e.target.value);
  }, [setHtml]);

  // Handle tab key in textarea
  const handleTabKey = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newValue = ta.value.slice(0, start) + '  ' + ta.value.slice(end);
      setHtml(newValue);
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  }, [setHtml]);

  return (
    <div
      id="editor-canvas"
      style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        background: '#0d0d1e',
      }}
    >
      {/* Code Panel */}
      {showCode && (
        <div style={{
          width: '45%',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(255,255,255,0.06)',
        }}>
          {/* Code header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            background: '#0a0a18',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#4a4a7a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              HTML Source
            </span>
            <span style={{ fontSize: '11px', color: '#4a4a7a' }}>
              {html.length.toLocaleString()} chars
            </span>
          </div>

          {/* Code editor */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {/* Line numbers */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '40px',
              background: '#080816',
              borderRight: '1px solid rgba(255,255,255,0.04)',
              overflowY: 'hidden',
              padding: '16px 0',
              userSelect: 'none',
              zIndex: 1,
            }}>
              {html.split('\n').map((_, i) => (
                <div key={i} style={{
                  height: '22.1px',
                  lineHeight: '22.1px',
                  textAlign: 'right',
                  paddingRight: '8px',
                  fontSize: '12px',
                  color: '#3a3a5a',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {i + 1}
                </div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={html}
              onChange={handleCodeChange}
              onKeyDown={handleTabKey}
              spellCheck={false}
              style={{
                position: 'absolute',
                inset: 0,
                paddingLeft: '52px',
                paddingTop: '16px',
                paddingRight: '16px',
                paddingBottom: '16px',
                background: 'rgba(0,0,0,0.3)',
                color: '#c9d1d9',
                border: 'none',
                resize: 'none',
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                fontSize: '12.5px',
                lineHeight: '22.1px',
                outline: 'none',
                tabSize: 2,
                whiteSpace: 'pre',
                overflowWrap: 'normal',
                overflowX: 'auto',
              }}
            />
          </div>
        </div>
      )}

      {/* Preview Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: viewMode !== 'desktop' ? '#0a0a16' : '#0d0d1e',
      }}>
        {/* Preview header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 16px',
          background: '#0a0a18',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#4a4a7a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {viewMode === 'desktop' ? '🖥️ Desktop Preview' : viewMode === 'tablet' ? '📱 Tablet (768px)' : '📲 Mobile (375px)'}
          </span>
          {/* Browser chrome dots */}
          <div style={{ display: 'flex', gap: '5px' }}>
            {['#ef4444', '#f59e0b', '#10b981'].map((c) => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.6 }} />
            ))}
          </div>
        </div>

        {/* Canvas area */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: viewMode !== 'desktop' ? 'flex-start' : 'stretch',
          padding: viewMode !== 'desktop' ? '24px' : '0',
        }}>
          <div style={{
            width: iframeWidth,
            height: viewMode !== 'desktop' ? 'auto' : '100%',
            minHeight: viewMode !== 'desktop' ? '600px' : undefined,
            maxWidth: '100%',
            transition: 'width 0.3s ease',
            transformOrigin: 'top center',
            transform: zoom !== 100 ? `scale(${scale})` : undefined,
            borderRadius: viewMode !== 'desktop' ? '16px' : '0',
            overflow: 'hidden',
            boxShadow: viewMode !== 'desktop' ? '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' : 'none',
            position: 'relative',
          }}>
            {/* Device frame for non-desktop */}
            {viewMode !== 'desktop' && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '28px',
                background: '#1a1a2e',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                borderRadius: '16px 16px 0 0',
              }}>
                <div style={{
                  width: 60,
                  height: 6,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 3,
                }} />
              </div>
            )}
            <iframe
              ref={iframeRef}
              style={{
                width: '100%',
                height: viewMode !== 'desktop' ? '700px' : '100%',
                marginTop: viewMode !== 'desktop' ? '28px' : '0',
                border: 'none',
                background: '#ffffff',
                display: 'block',
              }}
              title="Website Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
