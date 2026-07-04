'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useProjectStore } from '@/store/projectStore';
import { useUIStore } from '@/store/uiStore';

const REDESIGN_STYLES = [
  { id: 'glassmorphism', label: '💎 Glassmorphism', desc: 'Blurred glass, depth layers' },
  { id: '3d', label: '🌐 3D Immersive', desc: 'Depth, perspective, parallax' },
  { id: 'minimal', label: '✨ Minimal', desc: 'Clean, whitespace-first' },
  { id: 'bold', label: '🎨 Bold & Vibrant', desc: 'High contrast, dramatic' },
  { id: 'futuristic', label: '🚀 Futuristic', desc: 'Cyberpunk, neon, HUD' },
];

export default function ClonePage() {
  const router = useRouter();
  const addProject = useProjectStore((s) => s.addProject);
  const addToast = useUIStore((s) => s.addToast);

  const [url, setUrl] = useState('');
  const [isCloning, setIsCloning] = useState(false);
  const [isRedesigning, setIsRedesigning] = useState(false);
  const [clonedHtml, setClonedHtml] = useState('');
  const [redesignedHtml, setRedesignedHtml] = useState('');
  const [cloneInfo, setCloneInfo] = useState<{ title: string; images: number; links: number } | null>(null);
  const [aiRedesignEnabled, setAiRedesignEnabled] = useState(true);
  const [selectedStyle, setSelectedStyle] = useState('glassmorphism');
  const [previewMode, setPreviewMode] = useState<'original' | 'redesigned'>('redesigned');
  const [step, setStep] = useState<'input' | 'cloning' | 'result'>('input');

  const isValidUrl = (str: string) => {
    try {
      const u = new URL(str);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleClone = async () => {
    if (!isValidUrl(url)) {
      addToast({ type: 'warning', title: 'Invalid URL', message: 'Please enter a valid URL starting with http:// or https://' });
      return;
    }

    setIsCloning(true);
    setClonedHtml('');
    setRedesignedHtml('');
    setCloneInfo(null);
    setStep('cloning');

    try {
      const response = await fetch('/api/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Clone failed');
      }

      const data = await response.json();
      setClonedHtml(data.html);
      setCloneInfo({ title: data.title, images: data.images, links: data.links });
      setIsCloning(false);

      addToast({ type: 'success', title: '📥 Cloned!', message: `Fetched "${data.title}"` });

      // If AI redesign is enabled, kick it off automatically
      if (aiRedesignEnabled) {
        setIsRedesigning(true);
        try {
          const redesignRes = await fetch('/api/clone-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html: data.html, style: selectedStyle }),
          });

          if (!redesignRes.ok) throw new Error('AI redesign failed');
          const redesignData = await redesignRes.json();
          setRedesignedHtml(redesignData.html);
          setPreviewMode('redesigned');
          addToast({ type: 'success', title: '✨ AI Redesign Complete!', message: 'Your website has been beautifully redesigned.' });
        } catch (err) {
          addToast({ type: 'warning', title: 'AI Redesign Failed', message: 'Showing original clone instead.' });
          setPreviewMode('original');
        } finally {
          setIsRedesigning(false);
        }
      } else {
        setPreviewMode('original');
      }

      setStep('result');
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Clone failed',
        message: error instanceof Error ? error.message : 'Could not clone the website',
      });
      setIsCloning(false);
      setStep('input');
    }
  };

  const handleManualRedesign = async () => {
    if (!clonedHtml) return;
    setIsRedesigning(true);
    try {
      const res = await fetch('/api/clone-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: clonedHtml, style: selectedStyle }),
      });
      if (!res.ok) throw new Error('Redesign failed');
      const data = await res.json();
      setRedesignedHtml(data.html);
      setPreviewMode('redesigned');
      addToast({ type: 'success', title: '✨ Redesigned!', message: 'AI redesign applied successfully.' });
    } catch {
      addToast({ type: 'error', title: 'Redesign Failed', message: 'Could not apply AI redesign.' });
    } finally {
      setIsRedesigning(false);
    }
  };

  const handleOpenInEditor = (useRedesigned = true) => {
    const projectId = `proj-${Date.now()}`;
    const htmlToUse = (useRedesigned && redesignedHtml) ? redesignedHtml : clonedHtml;
    const project = {
      id: projectId,
      name: cloneInfo?.title || 'Cloned Website',
      description: `Cloned from ${url}`,
      html: htmlToUse,
      css: '',
      js: '',
      thumbnail: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'clone' as const,
    };
    addProject(project);
    router.push(`/editor/${projectId}`);
  };

  const displayedHtml = previewMode === 'redesigned' && redesignedHtml ? redesignedHtml : clonedHtml;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '104px 24px 60px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '12px' }}>
            <span className="gradient-text">Clone</span> + AI Redesign
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', lineHeight: 1.7 }}>
            Paste any website URL to clone its content, then let AI redesign it into a stunning modern website.
          </p>
        </div>

        {/* Input + Options */}
        {step === 'input' && (
          <div className="animate-fade-in-up">
            {/* URL Input */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '16px',
                }}>🔗</span>
                <input
                  type="url"
                  className="input-glass"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  style={{ paddingLeft: '44px' }}
                  onKeyDown={(e) => e.key === 'Enter' && handleClone()}
                />
              </div>
              <button
                className="glow-btn"
                onClick={handleClone}
                disabled={!url.trim()}
                style={{ opacity: url.trim() ? 1 : 0.5, whiteSpace: 'nowrap', padding: '12px 28px' }}
              >
                🔄 Clone
              </button>
            </div>

            {/* AI Redesign Toggle */}
            <div style={{
              padding: '24px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
                    🤖 AI Redesign
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    Automatically redesign the cloned website into a stunning modern layout
                  </p>
                </div>
                {/* Toggle switch */}
                <button
                  onClick={() => setAiRedesignEnabled(!aiRedesignEnabled)}
                  style={{
                    width: '52px',
                    height: '28px',
                    borderRadius: '14px',
                    border: 'none',
                    background: aiRedesignEnabled
                      ? 'linear-gradient(135deg,#8b5cf6,#06b6d4)'
                      : 'rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '3px',
                    left: aiRedesignEnabled ? '26px' : '3px',
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: 'white',
                    transition: 'left 0.2s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  }} />
                </button>
              </div>

              {/* Style Picker */}
              {aiRedesignEnabled && (
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Redesign Style
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {REDESIGN_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        style={{
                          padding: '8px 14px',
                          background: selectedStyle === style.id ? 'rgba(139,92,246,0.15)' : 'transparent',
                          border: `1px solid ${selectedStyle === style.id ? 'rgba(139,92,246,0.5)' : 'var(--glass-border)'}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: selectedStyle === style.id ? 'var(--accent-purple-light)' : 'var(--text-secondary)',
                          fontSize: '13px',
                          fontWeight: selectedStyle === style.id ? 700 : 400,
                          transition: 'all 0.2s',
                          textAlign: 'left',
                        }}
                        title={style.desc}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '14px 18px',
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: '10px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              ⚠️ <strong style={{ color: '#f59e0b' }}>Disclaimer:</strong> Website cloning is for learning and inspiration only. Ensure you have the right to use cloned content and significantly customize any cloned designs before publishing.
            </div>
          </div>
        )}

        {/* Loading State */}
        {step === 'cloning' && (
          <div className="animate-fade-in-up" style={{ textAlign: 'center', padding: '80px 0' }}>
            <LoadingSpinner size={56} text={
              isRedesigning
                ? '✨ AI is redesigning your website...'
                : isCloning
                  ? '🔄 Cloning website...'
                  : 'Processing...'
            } />
            <div className="loading-bar" style={{ maxWidth: '400px', margin: '24px auto 0' }} />
            <div style={{
              marginTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxWidth: '400px',
              margin: '24px auto 0',
            }}>
              {[
                { label: '📥 Fetching website HTML', done: !isCloning },
                { label: '🧹 Parsing content & structure', done: !isCloning },
                { label: '🤖 AI redesigning with ' + selectedStyle + ' style', done: !!redesignedHtml },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '13px',
                  color: item.done ? 'var(--accent-green)' : 'var(--text-muted)',
                }}>
                  <span>{item.done ? '✅' : '⏳'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Result State */}
        {step === 'result' && (
          <div className="animate-fade-in-up">
            {/* Stats */}
            {cloneInfo && (
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Page Title', value: cloneInfo.title, icon: '📄' },
                  { label: 'Images', value: cloneInfo.images, icon: '🖼️' },
                  { label: 'Links', value: cloneInfo.links, icon: '🔗' },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    padding: '14px 20px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    flex: 1,
                    minWidth: '140px',
                  }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {stat.icon} {stat.label}
                    </div>
                    <div style={{
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View toggle (Original vs Redesigned) */}
            {redesignedHtml && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '10px',
                  padding: '4px',
                }}>
                  <button
                    onClick={() => setPreviewMode('original')}
                    style={{
                      padding: '7px 18px',
                      borderRadius: '7px',
                      border: 'none',
                      background: previewMode === 'original' ? 'rgba(255,255,255,0.08)' : 'transparent',
                      color: previewMode === 'original' ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    📋 Original
                  </button>
                  <button
                    onClick={() => setPreviewMode('redesigned')}
                    style={{
                      padding: '7px 18px',
                      borderRadius: '7px',
                      border: 'none',
                      background: previewMode === 'redesigned' ? 'rgba(139,92,246,0.2)' : 'transparent',
                      color: previewMode === 'redesigned' ? 'var(--accent-purple-light)' : 'var(--text-muted)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    ✨ AI Redesigned
                  </button>
                </div>

                {/* Re-redesign */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {REDESIGN_STYLES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setSelectedStyle(s.id); }}
                        style={{
                          padding: '5px 10px',
                          background: selectedStyle === s.id ? 'rgba(139,92,246,0.12)' : 'transparent',
                          border: `1px solid ${selectedStyle === s.id ? 'rgba(139,92,246,0.4)' : 'var(--glass-border)'}`,
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: selectedStyle === s.id ? 'var(--accent-purple-light)' : 'var(--text-muted)',
                          fontSize: '12px',
                          transition: 'all 0.15s',
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleManualRedesign}
                    disabled={isRedesigning}
                    style={{
                      padding: '7px 16px',
                      background: 'linear-gradient(135deg,#8b5cf6,#06b6d4)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: isRedesigning ? 'not-allowed' : 'pointer',
                      opacity: isRedesigning ? 0.6 : 1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isRedesigning ? '⏳...' : '🔄 Re-design'}
                  </button>
                </div>
              </div>
            )}

            {/* Preview */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid var(--glass-border)',
              marginBottom: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}>
              {/* Browser chrome */}
              <div style={{
                padding: '10px 16px',
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {['#ef4444', '#f59e0b', '#10b981'].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div style={{
                  flex: 1,
                  padding: '5px 14px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  fontFamily: 'monospace',
                }}>
                  {previewMode === 'redesigned' ? '✨ AI Redesigned — ' : '📋 Original — '}{url}
                </div>
              </div>
              <iframe
                srcDoc={displayedHtml}
                style={{ width: '100%', height: '560px', border: 'none', background: '#fff' }}
                title="Website Preview"
                sandbox="allow-scripts"
              />
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="glow-btn"
                onClick={() => handleOpenInEditor(previewMode === 'redesigned' && !!redesignedHtml)}
              >
                🎨 Open in Editor
              </button>
              <button
                className="glow-btn-outline"
                onClick={() => {
                  const htmlToDownload = previewMode === 'redesigned' && redesignedHtml ? redesignedHtml : clonedHtml;
                  const blob = new Blob([htmlToDownload], { type: 'text/html' });
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(blob);
                  a.download = `${cloneInfo?.title || 'website'}.html`;
                  a.click();
                  addToast({ type: 'success', title: '📥 Downloaded!' });
                }}
              >
                📥 Download HTML
              </button>
              <button
                className="glow-btn-outline"
                onClick={() => { setStep('input'); setClonedHtml(''); setRedesignedHtml(''); setUrl(''); }}
              >
                ← Clone Another
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
