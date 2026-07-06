'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/ui/Navbar';
import { useProjectStore } from '@/store/projectStore';
import { templates } from '@/lib/templates';

const industries = [
  { id: 'restaurant', label: '🍕 Restaurant & Food', templateId: 'startup-modern' },
  { id: 'ecommerce', label: '🛍️ Retail & E-commerce', templateId: 'saas-landing' },
  { id: 'salon', label: '💇 Salon & Beauty', templateId: 'portfolio-3d-glass' },
  { id: 'saas', label: '💻 Tech & SaaS', templateId: 'saas-landing' },
  { id: 'services', label: '🛠️ Professional Services', templateId: 'startup-modern' },
  { id: 'creative', label: '🎨 Creative & Portfolio', templateId: 'portfolio-creative' },
  { id: 'other', label: '🚀 Other Business', templateId: 'saas-landing' },
];

const capabilities = [
  {
    id: 'website',
    icon: '🌐',
    title: 'AI Website Builder',
    desc: 'Generate a production-ready website with 3D animations and responsive design.',
    defaultChecked: true,
  },
  {
    id: 'seo',
    icon: '🏷️',
    title: 'AI SEO Optimizer',
    desc: 'Automatic keyword research, meta tags, and structured data configuration.',
    defaultChecked: true,
  },
  {
    id: 'support',
    icon: '💬',
    title: '24/7 AI Support Chatbot',
    desc: 'Intelligent assistant trained on your business data to handle inquiries & bookings.',
    defaultChecked: true,
  },
  {
    id: 'marketing',
    icon: '📢',
    title: 'AI Marketing Agent',
    desc: 'Auto-generates blog posts, social media campaigns, and email sequences.',
    defaultChecked: true,
  },
  {
    id: 'analytics',
    icon: '📊',
    title: 'AI Analytics & Insights',
    desc: 'Real-time visitor tracking and proactive AI growth recommendations.',
    defaultChecked: true,
  },
];

const generationSteps = [
  'Analyzing industry trends & target audience...',
  'Architecting website structure and layout...',
  'Generating SEO target keywords and meta descriptions...',
  'Training 24/7 AI customer support assistant...',
  'Configuring automated marketing content calendar...',
  'Setting up real-time analytics tracking...',
  'Finalizing AI Business Command Center...',
];

export default function OnboardingPage() {
  const router = useRouter();
  const addProject = useProjectStore((s) => s.addProject);

  // Form State
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('saas');
  const [description, setDescription] = useState('');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(
    capabilities.map((c) => c.id)
  );

  // Generation State
  const [currentGenStep, setCurrentGenStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  const toggleCapability = (id: string) => {
    setSelectedCapabilities((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStartGeneration = () => {
    if (!businessName.trim()) return;
    setStep(3);
    setCurrentGenStep(0);
    setProgress(0);
    setIsDone(false);

    // Create customized project from selected template
    const selectedInd = industries.find((i) => i.id === industry) || industries[3];
    const baseTemplate = templates.find((t) => t.id === selectedInd.templateId) || templates[0];
    const newId = `proj-${Date.now()}`;

    // Replace generic titles in HTML with user's business name
    let customHtml = baseTemplate?.html || '';
    if (customHtml) {
      customHtml = customHtml.replace(/<title>.*?<\/title>/i, `<title>${businessName} — Official Website</title>`);
      customHtml = customHtml.replace(/<h1>.*?<\/h1>/i, `<h1>Welcome to <span>${businessName}</span></h1>`);
      if (description) {
        customHtml = customHtml.replace(/<p>.*?<\/p>/i, `<p>${description}</p>`);
      }
    }

    const newProject = {
      id: newId,
      name: businessName,
      description: description || `AI-generated digital platform for ${businessName}`,
      html: customHtml,
      css: '',
      js: '',
      thumbnail: selectedInd.label.split(' ')[0] || '⚡',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'ai' as const,
    };

    addProject(newProject);
    setCreatedProjectId(newId);

    // Simulate progress
    const totalTime = 4500;
    const stepTime = totalTime / generationSteps.length;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, totalTime / 50);

    generationSteps.forEach((_, idx) => {
      setTimeout(() => {
        setCurrentGenStep(idx);
        if (idx === generationSteps.length - 1) {
          setTimeout(() => {
            setIsDone(true);
            setProgress(100);
          }, 800);
        }
      }, idx * stepTime);
    });
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{
        flex: 1,
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        padding: '96px 24px 60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Step Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px',
        }}>
          {[1, 2, 3].map((num) => (
            <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: step === num
                  ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)'
                  : step > num
                  ? '#10b981'
                  : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${step === num ? 'transparent' : step > num ? '#10b981' : 'var(--glass-border)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: step >= num ? 'white' : 'var(--text-muted)',
                transition: 'all 0.3s',
              }}>
                {step > num ? '✓' : num}
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: step === num ? 'var(--text-primary)' : 'var(--text-muted)',
                display: num === 3 && step !== 3 ? 'none' : 'inline',
              }}>
                {num === 1 ? 'Business Profile' : num === 2 ? 'AI Capabilities' : 'AI Deployment'}
              </span>
              {num < 3 && <div style={{ width: '40px', height: '1px', background: 'var(--glass-border)' }} />}
            </div>
          ))}
        </div>

        {/* STEP 1: Business Profile */}
        {step === 1 && (
          <div style={{
            padding: '40px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            animation: 'fade-in-up 0.4s ease-out',
          }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Tell us about your <span className="gradient-text">business</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>
              Our AI will use this information to build your website, configure SEO, and train your digital employees.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                  Business Name *
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g., Apex Studio, Spice Garden, FlowSaaS"
                  className="input-glass"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                  Industry / Category
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '10px',
                }}>
                  {industries.map((ind) => (
                    <button
                      key={ind.id}
                      type="button"
                      onClick={() => setIndustry(ind.id)}
                      style={{
                        padding: '12px 14px',
                        background: industry === ind.id ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid',
                        borderColor: industry === ind.id ? 'var(--accent-purple)' : 'var(--glass-border)',
                        borderRadius: '12px',
                        textAlign: 'left',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: industry === ind.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                  What does your business do? (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your products, services, target audience, or what makes you unique..."
                  className="input-glass"
                  style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!businessName.trim()}
                  className="glow-btn"
                  style={{ padding: '14px 36px', fontSize: '15px', opacity: !businessName.trim() ? 0.5 : 1 }}
                >
                  Next: Select AI Capabilities →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Select AI Capabilities */}
        {step === 2 && (
          <div style={{
            padding: '40px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            animation: 'fade-in-up 0.4s ease-out',
          }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
              Deploy your <span className="gradient-text-pink">AI employees</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '28px' }}>
              Select which digital capabilities you want AI to build and automate for <strong>{businessName}</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {capabilities.map((cap) => {
                const isSelected = selectedCapabilities.includes(cap.id);
                return (
                  <div
                    key={cap.id}
                    onClick={() => toggleCapability(cap.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '18px 20px',
                      background: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid',
                      borderColor: isSelected ? 'rgba(139, 92, 246, 0.4)' : 'var(--glass-border)',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <span style={{ fontSize: '1.8rem' }}>{cap.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px' }}>{cap.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{cap.desc}</div>
                    </div>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: isSelected ? 'var(--accent-purple)' : 'transparent',
                      border: `2px solid ${isSelected ? 'var(--accent-purple)' : 'rgba(255,255,255,0.2)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 700,
                    }}>
                      {isSelected && '✓'}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  padding: '12px 24px',
                  background: 'transparent',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleStartGeneration}
                disabled={selectedCapabilities.length === 0}
                className="glow-btn"
                style={{ padding: '14px 36px', fontSize: '15px' }}
              >
                ⚡ Generate Digital Platform ({selectedCapabilities.length})
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Generation & Success */}
        {step === 3 && (
          <div style={{
            padding: '48px 40px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            textAlign: 'center',
            animation: 'fade-in-up 0.4s ease-out',
          }}>
            {!isDone ? (
              <>
                <div style={{
                  width: '80px',
                  height: '80px',
                  margin: '0 auto 24px',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="80" height="80" className="score-ring">
                    <circle cx="40" cy="40" r="36" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                    <circle
                      cx="40" cy="40" r="36"
                      stroke="url(#genGrad)" strokeWidth="6" fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 36}
                      strokeDashoffset={(2 * Math.PI * 36) * (1 - progress / 100)}
                      style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                    />
                    <defs>
                      <linearGradient id="genGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#06b6d4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span style={{ position: 'absolute', fontSize: '14px', fontWeight: 800 }}>{progress}%</span>
                </div>

                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
                  AI is building <span className="gradient-text">{businessName}</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>
                  Please wait while your digital employee sets up your complete business platform...
                </p>

                <div style={{
                  maxWidth: '500px',
                  margin: '0 auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textAlign: 'left',
                }}>
                  {generationSteps.map((stepText, idx) => {
                    const isPassed = idx < currentGenStep;
                    const isCurrent = idx === currentGenStep;
                    return (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '10px 14px',
                          background: isCurrent ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                          borderRadius: '10px',
                          border: isCurrent ? '1px solid rgba(139, 92, 246, 0.2)' : '1px solid transparent',
                          opacity: idx > currentGenStep ? 0.3 : 1,
                          transition: 'all 0.3s',
                        }}
                      >
                        <span style={{ fontSize: '16px' }}>
                          {isPassed ? '✅' : isCurrent ? '⏳' : '⚪'}
                        </span>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: isCurrent ? 700 : 500,
                          color: isCurrent ? 'var(--text-primary)' : 'var(--text-secondary)',
                        }}>
                          {stepText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div style={{ animation: 'fade-in-up 0.5s ease-out' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '12px' }}>
                  <span className="gradient-text-warm">{businessName}</span> is ready!
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto 36px', lineHeight: 1.6 }}>
                  Your website has been generated, SEO target keywords configured, 24/7 chatbot trained, and analytics tracking initialized.
                </p>

                <div style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="glow-btn"
                    style={{ padding: '16px 36px', fontSize: '16px' }}
                  >
                    🚀 Launch Command Center
                  </button>
                  {createdProjectId && (
                    <button
                      onClick={() => router.push(`/editor/${createdProjectId}`)}
                      className="glow-btn-outline"
                      style={{ padding: '16px 32px', fontSize: '16px' }}
                    >
                      🎨 Customize Website
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
