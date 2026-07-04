'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple staggered fade-in animation
    const elements = [headlineRef.current, subtextRef.current, ctaRef.current];
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 200 + i * 200);
      }
    });
  }, []);

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '120px 24px 80px',
      zIndex: 1,
    }}>
      {/* Decorative badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 20px',
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: 500,
        color: '#a78bfa',
        marginBottom: '32px',
        animation: 'fade-in-up 0.6s ease-out',
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          background: '#8b5cf6',
          borderRadius: '50%',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        AI-Powered Website Generation
      </div>

      {/* Main headline */}
      <h1
        ref={headlineRef}
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          maxWidth: '900px',
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}
      >
        Build{' '}
        <span className="gradient-text" style={{ display: 'inline' }}>
          Stunning Websites
        </span>
        <br />
        in Seconds with AI
      </h1>

      {/* Subtext */}
      <p
        ref={subtextRef}
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          lineHeight: 1.7,
          marginBottom: '40px',
        }}
      >
        Describe your vision, upload your documents, or clone any website.
        WebForge AI generates beautiful, 3D-enhanced, production-ready websites instantly.
      </p>

      {/* CTA Buttons */}
      <div
        ref={ctaRef}
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <a href="/generate" className="glow-btn" style={{ padding: '16px 40px', fontSize: '16px' }}>
          <span>✨</span> Start Creating
        </a>
        <a href="/dashboard" className="glow-btn-outline" style={{ padding: '16px 40px', fontSize: '16px' }}>
          View Dashboard →
        </a>
      </div>

      {/* Tech badges */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '64px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        opacity: 0.5,
      }}>
        {['Three.js', 'Gemini AI', 'GrapesJS', 'GSAP'].map((tech) => (
          <span key={tech} style={{
            padding: '6px 14px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--text-muted)',
            fontWeight: 500,
          }}>
            {tech}
          </span>
        ))}
      </div>

      {/* Gradient fade at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '200px',
        background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
