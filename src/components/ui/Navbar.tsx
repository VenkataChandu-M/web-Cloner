'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  transparent?: boolean;
}

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/generate', label: 'AI Builder' },
  { href: '/seo', label: 'SEO' },
  { href: '/marketing', label: 'Marketing' },
  { href: '/analytics', label: 'Analytics' },
];

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    fontSize: '1.4rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textDecoration: 'none',
    letterSpacing: '-0.02em',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const linkStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    padding: '8px 14px',
    borderRadius: '8px',
  };

  return (
    <>
      <nav style={navStyle}>
        <Link href="/" style={logoStyle}>
          <span style={{ fontSize: '1.2rem' }}>⚡</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span>WebForge AI</span>
            <span style={{
              fontSize: '9px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              background: 'none',
              WebkitBackgroundClip: 'unset',
              WebkitTextFillColor: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}>
              Business Platform
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={linkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/generate" className="glow-btn" style={{ padding: '10px 22px', fontSize: '13px', textDecoration: 'none' }}>
            Start Free
          </Link>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 5, 16, 0.95)',
          backdropFilter: 'blur(20px)',
          zIndex: 999,
          padding: '24px',
          animation: 'fade-in-up 0.3s ease-out',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
