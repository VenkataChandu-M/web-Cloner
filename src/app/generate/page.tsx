'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useProjectStore } from '@/store/projectStore';
import { useUIStore } from '@/store/uiStore';
import { templates } from '@/lib/templates';

const styles = [
  { id: '3d', label: '3D / Immersive', icon: '🌐', color: '#8b5cf6' },
  { id: 'glassmorphism', label: 'Glassmorphism', icon: '💎', color: '#06b6d4' },
  { id: 'minimal', label: 'Minimal', icon: '✨', color: '#f0f0ff' },
  { id: 'bold', label: 'Bold & Vibrant', icon: '🎨', color: '#ec4899' },
  { id: 'futuristic', label: 'Futuristic', icon: '🚀', color: '#3b82f6' },
  { id: 'neomorphism', label: 'Neomorphism', icon: '🔮', color: '#10b981' },
];

const sectionOptions = [
  { id: 'hero', label: 'Hero Section', icon: '🏠' },
  { id: 'features', label: 'Features', icon: '⭐' },
  { id: 'ai-support', label: 'AI Customer Support', icon: '🤖' },
  { id: 'product-recommendations', label: 'AI Recommendations', icon: '🛍️' },
  { id: 'business-management', label: 'Business Dashboard', icon: '🏢' },
  { id: 'analytics-dashboard', label: 'Analytics Dashboard', icon: '📈' },
  { id: 'customer-portal', label: 'Customer Portal', icon: '👤' },
  { id: 'automated-workflows', label: 'Automated Workflows', icon: '⚙️' },
  { id: 'pricing', label: 'Pricing', icon: '💰' },
  { id: 'testimonials', label: 'Testimonials', icon: '💬' },
  { id: 'contact', label: 'Contact Form', icon: '📧' },
  { id: 'about', label: 'About', icon: 'ℹ️' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'stats', label: 'Statistics', icon: '📊' },
  { id: 'faq', label: 'FAQ', icon: '❓' },
  { id: 'footer', label: 'Footer', icon: '📋' },
  { id: 'cta', label: 'Call to Action', icon: '📢' },
  { id: 'timeline', label: 'Timeline', icon: '⏱️' },
];

const examplePrompts = [
  'A modern SaaS landing page for a project management tool with dark theme',
  'Portfolio website for a creative photographer with image gallery',
  'Landing page for an AI startup with 3D particle effects and glassmorphism',
  'E-commerce product page for premium headphones with bold typography',
];

function createProjectObject(
  name: string,
  description: string,
  html: string,
  source: 'ai' | 'template'
) {
  const projectId = 'proj-' + Date.now();
  return {
    id: projectId,
    name: name || 'Untitled Project',
    description: description,
    html: html,
    css: '',
    js: '',
    thumbnail: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: source,
  };
}

export default function GeneratePage() {
  const router = useRouter();
  const addProject = useProjectStore((s) => s.addProject);
  const addToast = useUIStore((s) => s.addToast);

  const [step, setStep] = useState(0);
  const [description, setDescription] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('3d');
  const [selectedSections, setSelectedSections] = useState<string[]>(['hero', 'features', 'footer']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState('');
  const [activeTab, setActiveTab] = useState<'create' | 'templates'>('create');
  const [quotaError, setQuotaError] = useState(false);

  // Check URL param for templates tab
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'templates') {
        const timer = setTimeout(() => {
          setActiveTab('templates');
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const toggleSection = (id: string) => {
    setSelectedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenerateMock = () => {
    setIsGenerating(true);
    setStep(3);
    
    // Simulate generation delay
    setTimeout(() => {
      let mockHtml = templates[0].html; // default SaaS Pro
      const hasAdvancedSections = selectedSections.some(s => 
        ['ai-support', 'product-recommendations', 'business-management', 'analytics-dashboard', 'customer-portal', 'automated-workflows'].includes(s)
      );

      if (hasAdvancedSections) {
        mockHtml = templates.find(t => t.id === 'ai-business-suite')?.html || templates[0].html;
      } else if (selectedStyle === '3d' || selectedStyle === 'glassmorphism') {
        mockHtml = templates.find(t => t.id === 'portfolio-3d-glass')?.html || templates[1].html;
      } else if (selectedStyle === 'minimal') {
        mockHtml = templates[1].html; // Creative Portfolio
      } else if (selectedStyle === 'futuristic') {
        mockHtml = templates[2].html; // StartupPro
      }
      
      setGeneratedHtml(mockHtml);
      setStep(4);
      setIsGenerating(false);
      setQuotaError(false);
      addToast({
        type: 'success',
        title: 'Demo Website Loaded!',
        message: 'Loaded mock sandbox website due to API quota limits.'
      });
    }, 1500);
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      addToast({ type: 'warning', title: 'Please enter a description' });
      return;
    }

    setIsGenerating(true);
    setQuotaError(false);
    setStep(3);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          style: selectedStyle,
          sections: selectedSections,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Generation failed');
      }

      const data = await response.json();
      setGeneratedHtml(data.html);
      setStep(4);
      addToast({ type: 'success', title: 'Website generated!', message: 'Your website is ready for preview.' });
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : 'Something went wrong';
      const isQuota = errMsg.toLowerCase().includes('quota') || 
                      errMsg.toLowerCase().includes('rate limit') || 
                      errMsg.toLowerCase().includes('too many requests') || 
                      errMsg.toLowerCase().includes('429') ||
                      errMsg.toLowerCase().includes('api key') ||
                      errMsg.toLowerCase().includes('not configured');
      
      if (isQuota) {
        setQuotaError(true);
      }

      addToast({
        type: 'error',
        title: 'Generation failed',
        message: errMsg,
      });
      setStep(2);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveAndEdit = () => {
    const name = description.slice(0, 50) || 'Untitled Project';
    const project = createProjectObject(name, description, generatedHtml, 'ai');
    addProject(project);
    router.push(`/editor/${project.id}`);
  };

  const handleTemplateSelect = (template: typeof templates[0]) => {
    const project = createProjectObject(template.name, template.description, template.html, 'template');
    addProject(project);
    router.push(`/editor/${project.id}`);
  };

  const stepLabels = ['Describe', 'Style', 'Sections', 'Generate', 'Preview'];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '104px 24px 60px',
      }}>
        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '40px',
          background: 'var(--glass-bg)',
          borderRadius: '12px',
          padding: '4px',
          border: '1px solid var(--glass-border)',
          width: 'fit-content',
        }}>
          {[
            { id: 'create' as const, label: '✨ Create with AI' },
            { id: 'templates' as const, label: '📋 Templates' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                color: activeTab === tab.id ? 'var(--accent-purple-light)' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
              Choose a <span className="gradient-text">Template</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Start with a pre-built template and customize it in the visual editor.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  style={{
                    padding: '24px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: 'inherit',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                    {template.thumbnail}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                    {template.name}
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    marginBottom: '12px',
                  }}>
                    {template.description}
                  </p>
                  <span className="chip">{template.category}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Create Tab */}
        {activeTab === 'create' && (
          <>
            {/* Step Indicator */}
            <div className="step-indicator" style={{ marginBottom: '48px' }}>
              {stepLabels.map((label, index) => (
                <div key={label} style={{ display: 'contents' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div
                      className={`step-dot ${index === step ? 'active' : index < step ? 'completed' : ''}`}
                    >
                      {index < step ? '✓' : index + 1}
                    </div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: index === step ? 'var(--accent-purple-light)' : 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {label}
                    </span>
                  </div>
                  {index < stepLabels.length - 1 && (
                    <div className={`step-line ${index < step ? 'completed' : ''}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 0: Description */}
            {step === 0 && (
              <div className="animate-fade-in-up">
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                  Describe Your <span className="gradient-text">Website</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Tell us what you want to build. Be as detailed as you&apos;d like.
                </p>

                <textarea
                  className="input-glass"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your website in detail... e.g., A modern SaaS landing page for a project management tool with a dark theme, animated hero section, feature grid, pricing table, and contact form."
                  style={{ minHeight: '160px', marginBottom: '20px' }}
                />

                <div style={{ marginBottom: '32px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '10px' }}>
                    Try an example:
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {examplePrompts.map((prompt) => (
                      <button
                        key={prompt}
                        className="chip"
                        onClick={() => setDescription(prompt)}
                      >
                        {prompt.slice(0, 60)}...
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="glow-btn"
                  onClick={() => description.trim() && setStep(1)}
                  style={{ opacity: description.trim() ? 1 : 0.5 }}
                >
                  Continue →
                </button>
              </div>
            )}

            {/* Step 1: Style Selection */}
            {step === 1 && (
              <div className="animate-fade-in-up">
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                  Choose a <span className="gradient-text-pink">Style</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Select the visual style for your website.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '12px',
                  marginBottom: '32px',
                }}>
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      style={{
                        padding: '20px',
                        background: selectedStyle === style.id
                          ? `rgba(${style.color === '#f0f0ff' ? '240,240,255' : style.color === '#8b5cf6' ? '139,92,246' : style.color === '#06b6d4' ? '6,182,212' : style.color === '#ec4899' ? '236,72,153' : style.color === '#3b82f6' ? '59,130,246' : '16,185,129'}, 0.15)`
                          : 'var(--glass-bg)',
                        border: `2px solid ${selectedStyle === style.id ? style.color : 'var(--glass-border)'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        color: 'inherit',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{style.icon}</div>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>{style.label}</div>
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="glow-btn-outline" onClick={() => setStep(0)}>
                    ← Back
                  </button>
                  <button className="glow-btn" onClick={() => setStep(2)}>
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Section Selection */}
            {step === 2 && (
              <div className="animate-fade-in-up">
                <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                  Select <span className="gradient-text">Sections</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Choose which sections to include in your website.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '10px',
                  marginBottom: '32px',
                }}>
                  {sectionOptions.map((section) => {
                    const isSelected = selectedSections.includes(section.id);
                    return (
                      <button
                        key={section.id}
                        onClick={() => toggleSection(section.id)}
                        style={{
                          padding: '16px',
                          background: isSelected ? 'rgba(139, 92, 246, 0.15)' : 'var(--glass-bg)',
                          border: `1px solid ${isSelected ? 'var(--accent-purple)' : 'var(--glass-border)'}`,
                          borderRadius: '10px',
                          cursor: 'pointer',
                          color: 'inherit',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <span style={{ fontSize: '1.2rem' }}>{section.icon}</span>
                        <span style={{ fontWeight: 500, fontSize: '14px' }}>{section.label}</span>
                        {isSelected && (
                          <span style={{
                            marginLeft: 'auto',
                            color: 'var(--accent-green)',
                            fontSize: '14px',
                          }}>
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="glow-btn-outline" onClick={() => setStep(1)}>
                      ← Back
                    </button>
                    <button className="glow-btn" onClick={handleGenerate}>
                      🚀 Generate Website
                    </button>
                  </div>

                  {quotaError && (
                    <div style={{
                      padding: '20px',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '12px',
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      lineHeight: 1.6,
                      textAlign: 'left'
                    }}>
                      <span style={{ fontWeight: 700, color: '#ef4444' }}>⚠️ API Credentials Missing or Exceeded:</span> Your Gemini API key is either not configured, out of tokens, or rate-limited. You can run in Sandbox Mode to load the premium 3D Liquid Glass Portfolio demo website.
                      <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                        <button
                          className="glow-btn"
                          style={{
                            background: 'var(--gradient-cyan-green)',
                            padding: '10px 20px',
                            fontSize: '13px'
                          }}
                          onClick={handleGenerateMock}
                        >
                          🛠️ Sandbox Mode: Use Demo Mockup Template
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Generating */}
            {step === 3 && isGenerating && (
              <div className="animate-fade-in-up" style={{ textAlign: 'center', padding: '80px 0' }}>
                <LoadingSpinner size={64} text="Generating your website..." />
                <div style={{
                  marginTop: '32px',
                  padding: '20px',
                  background: 'var(--glass-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  maxWidth: '500px',
                  margin: '32px auto 0',
                }}>
                  <div className="loading-bar" style={{ marginBottom: '16px' }} />
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                  }}>
                    AI is crafting your website with <strong>{styles.find(s => s.id === selectedStyle)?.label}</strong> style
                    and {selectedSections.length} sections...
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {step === 4 && generatedHtml && (
              <div className="animate-fade-in-up">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
                    <span className="gradient-text">Preview</span>
                  </h1>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="glow-btn-outline" onClick={() => { setStep(0); setGeneratedHtml(''); }}>
                      ← Start Over
                    </button>
                    <button className="glow-btn" onClick={handleSaveAndEdit}>
                      🎨 Open in Editor
                    </button>
                  </div>
                </div>

                <div style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--glass-border)',
                  background: '#fff',
                }}>
                  <div style={{
                    padding: '12px 16px',
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
                    </div>
                    <div style={{
                      flex: 1,
                      padding: '6px 16px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: 'var(--text-muted)',
                      fontFamily: 'monospace',
                    }}>
                      your-website.webforge.ai
                    </div>
                  </div>
                  <iframe
                    srcDoc={generatedHtml}
                    style={{
                      width: '100%',
                      height: '600px',
                      border: 'none',
                    }}
                    title="Generated Website Preview"
                    sandbox="allow-scripts"
                  />
                </div>

                {/* Download button */}
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  <button
                    className="glow-btn-outline"
                    onClick={() => {
                      const blob = new Blob([generatedHtml], { type: 'text/html' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'website.html';
                      a.click();
                      URL.revokeObjectURL(url);
                      addToast({ type: 'success', title: 'Downloaded!', message: 'Website HTML file downloaded.' });
                    }}
                  >
                    📥 Download HTML
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
