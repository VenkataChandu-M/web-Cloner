'use client';

import { useEffect, useRef, useState } from 'react';

const typingPhrases = [
  'Building your website...',
  'Optimizing your SEO...',
  'Launching your marketing...',
  'Analyzing your competitors...',
  'Training your AI support agent...',
  'Generating your analytics...',
];

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [typingText, setTypingText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Staggered entrance animation
  useEffect(() => {
    const elements = [headlineRef.current, subtextRef.current, ctaRef.current];
    elements.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 300 + i * 250);
      }
    });
  }, []);

  // Typing animation
  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];
    const speed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypingText(currentPhrase.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setTypingText(currentPhrase.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex <= 1) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
          setCharIndex(0);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex]);

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
      {/* Aurora background overlay */}
      <div className="aurora-bg" style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Badge */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 20px',
        background: 'rgba(139, 92, 246, 0.1)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#a78bfa',
        marginBottom: '32px',
        animation: 'fade-in-up 0.6s ease-out',
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          background: '#10b981',
          borderRadius: '50%',
          animation: 'pulse-glow 2s ease-in-out infinite',
          boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)',
        }} />
        🏆 #1 AI Business Platform for SMEs
      </div>

      {/* Main headline */}
      <h1
        ref={headlineRef}
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.05,
          maxWidth: '900px',
          marginBottom: '24px',
          letterSpacing: '-0.03em',
        }}
      >
        Your{' '}
        <span className="gradient-text" style={{ display: 'inline' }}>
          AI Employee
        </span>
        <br />
        for Digital Business
      </h1>

      {/* Subtext */}
      <p
        ref={subtextRef}
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          lineHeight: 1.7,
          marginBottom: '16px',
        }}
      >
        Tell our AI about your business. It builds your website, runs your marketing,
        handles customer support, and grows your revenue — all automatically.
      </p>

      {/* Typing animation */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        height: '32px',
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '15px',
          color: 'var(--accent-cyan-light)',
          background: 'rgba(6, 182, 212, 0.08)',
          padding: '6px 16px',
          borderRadius: '8px',
          border: '1px solid rgba(6, 182, 212, 0.15)',
        }}>
          <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>{'>'}</span>
          {typingText}
          <span style={{
            animation: 'blink-cursor 0.8s step-end infinite',
            color: 'var(--accent-cyan)',
            marginLeft: '1px',
          }}>|</span>
        </span>
      </div>

      {/* CTA Buttons */}
      <div
        ref={ctaRef}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <a href="/generate" className="glow-btn" style={{ padding: '16px 40px', fontSize: '16px' }}>
          <span>🚀</span> Digitize My Business
        </a>
        <a href="/dashboard" className="glow-btn-outline" style={{ padding: '16px 40px', fontSize: '16px' }}>
          View AI Dashboard →
        </a>
      </div>

      {/* Stats bar */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        gap: '40px',
        marginTop: '72px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {[
          { value: '10,000+', label: 'Businesses Digitized' },
          { value: '50M+', label: 'AI Actions Performed' },
          { value: '99.9%', label: 'Uptime Guarantee' },
          { value: '4.9/5', label: 'Customer Rating' },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            textAlign: 'center',
            animation: `fade-in-up 0.6s ease-out ${0.6 + i * 0.15}s both`,
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              background: 'var(--gradient-purple-cyan)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '4px',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              fontWeight: 500,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tech badges */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        gap: '12px',
        marginTop: '40px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        opacity: 0.5,
      }}>
        {['Gemini AI', 'SEO Engine', 'Marketing AI', '24/7 Support'].map((tech) => (
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
