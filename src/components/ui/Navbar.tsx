'use client';

import { useEffect, useRef, useState } from 'react';

interface NavbarProps {
  transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: '72px',
    transition: 'all 0.3s ease',
    background: scrolled || !transparent
      ? 'rgba(5, 5, 16, 0.85)'
      : 'transparent',
    backdropFilter: scrolled || !transparent ? 'blur(20px)' : 'none',
    borderBottom: scrolled || !transparent
      ? '1px solid rgba(255, 255, 255, 0.05)'
      : '1px solid transparent',
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
  };

  const linkStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    padding: '8px 16px',
    borderRadius: '8px',
  };

  return (
    <nav ref={navRef} style={navStyle}>
      <a href="/" style={logoStyle}>
        ⚡ WebForge AI
      </a>

      {/* Desktop Nav */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}>
        <a href="/dashboard" style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Dashboard
        </a>
        <a href="/generate" style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Create
        </a>
        <a href="/clone" style={linkStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Clone
        </a>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <a href="/generate" className="glow-btn" style={{ padding: '10px 24px', fontSize: '14px' }}>
          Start Building
        </a>
      </div>
    </nav>
  );
}
