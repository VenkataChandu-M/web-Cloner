'use client';

import { useState, useCallback } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { useUIStore } from '@/store/uiStore';

const GOOGLE_FONTS = [
  'Inter',
  'Outfit',
  'Plus Jakarta Sans',
  'Sora',
  'DM Sans',
  'Space Grotesk',
  'Manrope',
  'Nunito',
  'Raleway',
  'Poppins',
];

const PRESET_COLORS = [
  '#8b5cf6', '#06b6d4', '#ec4899', '#10b981', '#f59e0b', '#3b82f6',
  '#ef4444', '#14b8a6', '#f97316', '#a855f7', '#ffffff', '#f0f0ff',
];

const COLOR_SCHEMES = [
  { label: 'Purple Cyan', primary: '#8b5cf6', secondary: '#06b6d4', bg: '#050510' },
  { label: 'Pink Purple', primary: '#ec4899', secondary: '#8b5cf6', bg: '#0d0510' },
  { label: 'Cyan Green', primary: '#06b6d4', secondary: '#10b981', bg: '#050d0d' },
  { label: 'Warm Sunset', primary: '#f59e0b', secondary: '#ec4899', bg: '#100808' },
  { label: 'Blue Ocean', primary: '#3b82f6', secondary: '#06b6d4', bg: '#050a14' },
  { label: 'Neon Green', primary: '#10b981', secondary: '#3b82f6', bg: '#050d08' },
];

export default function PropertiesPanel() {
  const { html, setHtml } = useEditorStore();
  const addToast = useUIStore((s) => s.addToast);

  const [activeSection, setActiveSection] = useState<'theme' | 'typography' | 'sections' | 'ai'>('theme');
  const [selectedScheme, setSelectedScheme] = useState(0);
  const [selectedFont, setSelectedFont] = useState('Inter');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isApplyingAI, setIsApplyingAI] = useState(false);
  const [customColors, setCustomColors] = useState({ primary: '#8b5cf6', secondary: '#06b6d4', bg: '#050510' });

  const applyColorScheme = useCallback((scheme: typeof COLOR_SCHEMES[0], index: number) => {
    setSelectedScheme(index);
    setCustomColors({ primary: scheme.primary, secondary: scheme.secondary, bg: scheme.bg });

    // Replace accent colors throughout the HTML
    let newHtml = html;
    const scheme0 = COLOR_SCHEMES[0];
    newHtml = newHtml
      .replace(new RegExp(scheme0.primary.replace('#', '\\#'), 'g'), scheme.primary)
      .replace(new RegExp(scheme0.secondary.replace('#', '\\#'), 'g'), scheme.secondary)
      .replace(new RegExp(scheme0.bg.replace('#', '\\#'), 'g'), scheme.bg);

    setHtml(newHtml);
    addToast({ type: 'success', title: '🎨 Theme Applied', message: `Applied "${scheme.label}" color scheme.` });
  }, [html, setHtml, addToast]);

  const applyFont = useCallback((font: string) => {
    setSelectedFont(font);
    let newHtml = html;

    // Remove existing @import font
    newHtml = newHtml.replace(/@import url\([^)]+googleapis[^)]+\);?\n?/g, '');

    // Insert new font import after <style> or at top of <head>
    const fontImport = `@import url('https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900&display=swap');`;
    const fontFamily = `font-family: '${font}', system-ui, -apple-system, sans-serif;`;

    // Insert into existing <style> tag
    newHtml = newHtml.replace(/<style([^>]*)>/, `<style$1>\n${fontImport}`);

    // Replace body font-family if exists, else it naturally inherits
    if (newHtml.includes('font-family:')) {
      newHtml = newHtml.replace(/font-family:[^;]+;/g, fontFamily);
    }

    setHtml(newHtml);
    addToast({ type: 'success', title: '✍️ Font Changed', message: `Using "${font}" font.` });
  }, [html, setHtml, addToast]);

  const handleAITweak = async () => {
    if (!aiPrompt.trim()) return;
    setIsApplyingAI(true);

    try {
      const response = await fetch('/api/tweak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html, instruction: aiPrompt }),
      });

      if (!response.ok) throw new Error('AI tweak failed');
      const data = await response.json();
      setHtml(data.html);
      setAiPrompt('');
      addToast({ type: 'success', title: '🤖 AI Applied!', message: 'Your changes have been applied.' });
    } catch {
      addToast({ type: 'error', title: 'AI tweak failed', message: 'Could not apply AI changes. Try again.' });
    } finally {
      setIsApplyingAI(false);
    }
  };

  const sectionTabs = [
    { id: 'theme' as const, label: '🎨 Theme', icon: '🎨' },
    { id: 'typography' as const, label: '✍️ Font', icon: '✍️' },
    { id: 'ai' as const, label: '🤖 AI', icon: '🤖' },
  ];

  return (
    <div
      id="properties-panel"
      style={{
        width: '260px',
        flexShrink: 0,
        background: '#12121f',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Panel header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#4a4a7a', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          Design Properties
        </p>
      </div>

      {/* Sub-tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        {sectionTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveSection(t.id)}
            style={{
              flex: 1,
              padding: '9px 4px',
              border: 'none',
              background: 'transparent',
              color: activeSection === t.id ? '#a78bfa' : '#6a6a8a',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              borderBottom: activeSection === t.id ? '2px solid #8b5cf6' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>

        {/* Theme Panel */}
        {activeSection === 'theme' && (
          <div>
            <Section title="Color Schemes">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {COLOR_SCHEMES.map((scheme, i) => (
                  <button
                    key={scheme.label}
                    onClick={() => applyColorScheme(scheme, i)}
                    title={scheme.label}
                    style={{
                      padding: '10px 8px',
                      background: selectedScheme === i ? 'rgba(139,92,246,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${selectedScheme === i ? 'rgba(139,92,246,0.4)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '6px' }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: scheme.primary }} />
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: scheme.secondary }} />
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: scheme.bg, border: '1px solid rgba(255,255,255,0.2)' }} />
                    </div>
                    <div style={{ fontSize: '10px', color: '#a0a0c0', fontWeight: 600, textAlign: 'center' }}>{scheme.label}</div>
                  </button>
                ))}
              </div>
            </Section>

            <Section title="Custom Primary Color">
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      let newHtml = html.replace(new RegExp(customColors.primary.replace('#', '\\#'), 'g'), color);
                      setCustomColors(c => ({ ...c, primary: color }));
                      setHtml(newHtml);
                    }}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '6px',
                      background: color,
                      border: customColors.primary === color ? '2px solid white' : '2px solid transparent',
                      cursor: 'pointer',
                      transition: 'transform 0.1s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  />
                ))}
                <input
                  type="color"
                  value={customColors.primary}
                  onChange={(e) => {
                    const color = e.target.value;
                    let newHtml = html.replace(new RegExp(customColors.primary.replace('#', '\\#'), 'g'), color);
                    setCustomColors(c => ({ ...c, primary: color }));
                    setHtml(newHtml);
                  }}
                  style={{ width: 24, height: 24, borderRadius: '6px', border: 'none', cursor: 'pointer', padding: 0 }}
                  title="Custom color"
                />
              </div>
            </Section>

            <Section title="Background Color">
              <input
                type="color"
                value={customColors.bg}
                onChange={(e) => {
                  const color = e.target.value;
                  let newHtml = html.replace(new RegExp(customColors.bg.replace('#', '\\#'), 'g'), color);
                  setCustomColors(c => ({ ...c, bg: color }));
                  setHtml(newHtml);
                }}
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  padding: '2px',
                  background: 'transparent',
                }}
              />
            </Section>
          </div>
        )}

        {/* Typography Panel */}
        {activeSection === 'typography' && (
          <div>
            <Section title="Google Font">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {GOOGLE_FONTS.map((font) => (
                  <button
                    key={font}
                    onClick={() => applyFont(font)}
                    style={{
                      padding: '9px 12px',
                      background: selectedFont === font ? 'rgba(139,92,246,0.12)' : 'transparent',
                      border: selectedFont === font ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
                      borderRadius: '7px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: selectedFont === font ? '#a78bfa' : '#a0a0c0',
                      fontSize: '13px',
                      fontWeight: selectedFont === font ? 700 : 400,
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { if (selectedFont !== font) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={(e) => { if (selectedFont !== font) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {font}
                    {selectedFont === font && <span style={{ marginLeft: '8px', fontSize: '10px' }}>✓ Active</span>}
                  </button>
                ))}
              </div>
            </Section>
          </div>
        )}

        {/* AI Tweak Panel */}
        {activeSection === 'ai' && (
          <div>
            <Section title="AI Quick Edit">
              <p style={{ fontSize: '12px', color: '#6a6a8a', lineHeight: 1.6, marginBottom: '12px' }}>
                Describe a change and AI will apply it to your website instantly.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'Make the hero section darker',
                  'Add more rounded corners',
                  'Make all buttons larger',
                  'Add more padding to sections',
                  'Change the font to be bolder',
                  'Add a gradient to the background',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setAiPrompt(suggestion)}
                    style={{
                      padding: '7px 10px',
                      background: 'rgba(139,92,246,0.06)',
                      border: '1px solid rgba(139,92,246,0.12)',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      color: '#8a8aaa',
                      fontSize: '12px',
                      transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.12)'; e.currentTarget.style.color = '#a78bfa'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(139,92,246,0.06)'; e.currentTarget.style.color = '#8a8aaa'; }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Make the hero text larger and add a gradient background..."
                style={{
                  width: '100%',
                  minHeight: '80px',
                  marginTop: '12px',
                  padding: '10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  color: '#e0e0f0',
                  fontSize: '12px',
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'inherit',
                  lineHeight: 1.6,
                  boxSizing: 'border-box',
                }}
              />
              <button
                onClick={handleAITweak}
                disabled={!aiPrompt.trim() || isApplyingAI}
                style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '10px',
                  background: aiPrompt.trim() && !isApplyingAI
                    ? 'linear-gradient(135deg,#8b5cf6,#06b6d4)'
                    : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  borderRadius: '8px',
                  color: aiPrompt.trim() && !isApplyingAI ? 'white' : '#4a4a6a',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: aiPrompt.trim() && !isApplyingAI ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
              >
                {isApplyingAI ? '⏳ Applying...' : '✨ Apply with AI'}
              </button>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#4a4a7a',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '10px',
      }}>
        {title}
      </p>
      {children}
    </div>
  );
}
