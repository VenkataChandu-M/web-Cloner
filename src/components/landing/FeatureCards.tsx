'use client';

import { useState } from 'react';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'AI Website Builder',
    description: 'Describe your business in plain English. AI generates a complete, production-ready website with 3D effects in 60 seconds.',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.02))',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    iconBg: 'rgba(139, 92, 246, 0.12)',
    link: '/generate',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'AI SEO Optimizer',
    description: 'Automatic keyword research, meta tags, structured data, and content optimization. Outrank your competitors with AI.',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(6, 182, 212, 0.02))',
    borderColor: 'rgba(6, 182, 212, 0.3)',
    iconBg: 'rgba(6, 182, 212, 0.12)',
    link: '/seo',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" /><path d="M12 10h.01" /><path d="M16 10h.01" />
      </svg>
    ),
    title: 'AI Customer Support',
    description: '24/7 intelligent chatbot trained on your business data. Handles inquiries, bookings, and FAQs automatically.',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.02))',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    iconBg: 'rgba(16, 185, 129, 0.12)',
    link: '/consultant',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    title: 'AI Analytics Dashboard',
    description: 'Real-time visitor tracking, conversion funnels, revenue insights — with AI-generated recommendations to grow faster.',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.02))',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    iconBg: 'rgba(245, 158, 11, 0.12)',
    link: '/analytics',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: 'AI Marketing Agent',
    description: 'Auto-generates blog posts, social media content, email campaigns, and WhatsApp messages tailored to your brand.',
    gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(236, 72, 153, 0.02))',
    borderColor: 'rgba(236, 72, 153, 0.3)',
    iconBg: 'rgba(236, 72, 153, 0.12)',
    link: '/marketing',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    title: 'AI Business Manager',
    description: 'Inventory tracking, order management, automated workflows, and competitor analysis — all powered by intelligent AI.',
    gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.02))',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    iconBg: 'rgba(59, 130, 246, 0.12)',
    link: '/dashboard',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={feature.link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '32px',
        background: hovered ? feature.gradient : 'var(--glass-bg)',
        border: `1px solid ${hovered ? feature.borderColor : 'var(--glass-border)'}`,
        borderRadius: '16px',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'pointer',
        animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both`,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '14px',
        background: feature.iconBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        transition: 'transform 0.3s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        {feature.icon}
      </div>
      <h3 style={{
        fontSize: '1.2rem',
        fontWeight: 700,
        marginBottom: '10px',
        letterSpacing: '-0.01em',
      }}>
        {feature.title}
      </h3>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.92rem',
        lineHeight: 1.7,
        marginBottom: '16px',
      }}>
        {feature.description}
      </p>
      <div style={{
        fontSize: '13px',
        fontWeight: 600,
        color: hovered ? 'var(--text-primary)' : 'var(--accent-purple-light)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.3s',
      }}>
        Explore
        <span style={{
          display: 'inline-block',
          transition: 'transform 0.3s',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
        }}>→</span>
      </div>
    </a>
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
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(236, 72, 153, 0.08)',
          border: '1px solid rgba(236, 72, 153, 0.15)',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 600,
          color: '#f472b6',
          marginBottom: '20px',
        }}>
          AI-Powered Platform
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          One AI Platform.{' '}
          <span className="gradient-text-pink">Complete Digital Transformation.</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '650px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Everything your business needs to succeed online — built, managed, and optimized by AI. No technical skills required.
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
