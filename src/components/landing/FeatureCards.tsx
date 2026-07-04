'use client';

import { useState } from 'react';

const features = [
  {
    icon: '🤖',
    title: 'AI-Powered Generation',
    description: 'Describe your website in natural language and let Gemini AI build it for you — complete with 3D elements, animations, and responsive design.',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.02))',
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  {
    icon: '🔄',
    title: 'Website Cloning',
    description: 'Paste any URL to instantly clone its structure and styling. Use it as a starting point and customize it to make it yours.',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.02))',
    borderColor: 'rgba(6, 182, 212, 0.3)',
  },
  {
    icon: '🎨',
    title: 'Visual Editor',
    description: 'Full drag-and-drop editor powered by GrapesJS. Customize layouts, colors, typography, and add custom blocks with zero coding.',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.02))',
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: '🌐',
    title: '3D Components',
    description: 'Built-in Three.js components — particle backgrounds, 3D card effects, floating geometry, and animated scenes ready to drop in.',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.02))',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  {
    icon: '💡',
    title: 'Smart Inspiration',
    description: 'AI searches the web for cutting-edge design references and trends, then uses them to inform your website\'s style and layout.',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.02))',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  {
    icon: '📦',
    title: 'Export & Deploy',
    description: 'Download your complete website as clean HTML/CSS/JS files. Ready for deployment on any hosting platform.',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.02))',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '32px',
        background: hovered ? feature.gradient : 'var(--glass-bg)',
        border: `1px solid ${hovered ? feature.borderColor : 'var(--glass-border)'}`,
        borderRadius: '16px',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'default',
        animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div style={{
        fontSize: '2.5rem',
        marginBottom: '16px',
        display: 'block',
      }}>
        {feature.icon}
      </div>
      <h3 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '12px',
        letterSpacing: '-0.01em',
      }}>
        {feature.title}
      </h3>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
      }}>
        {feature.description}
      </p>
    </div>
  );
}

export default function FeatureCards() {
  return (
    <section style={{
      padding: '80px 24px 120px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          Everything You Need to{' '}
          <span className="gradient-text-pink">Build the Web</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          From AI generation to visual editing, WebForge AI gives you a complete toolkit for building stunning websites.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
      }}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
