'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeatureCards from '@/components/landing/FeatureCards';

// Lazy load the 3D particle field to avoid SSR issues with Three.js
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <Navbar transparent />
      
      {/* 3D Background */}
      <ParticleField />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Feature Cards */}
      <FeatureCards />
      
      {/* How It Works Section */}
      <section style={{
        padding: '80px 24px 120px',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          How It <span className="gradient-text">Works</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '500px',
          margin: '0 auto 64px',
          lineHeight: 1.7,
        }}>
          Three simple steps to go from idea to live website.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {[
            {
              step: '01',
              title: 'Describe',
              desc: 'Tell AI what you want or upload your documentation. Choose your style and sections.',
              color: '#8b5cf6',
            },
            {
              step: '02',
              title: 'Generate',
              desc: 'AI creates a stunning, production-ready website with 3D effects and animations.',
              color: '#06b6d4',
            },
            {
              step: '03',
              title: 'Customize',
              desc: 'Fine-tune with the visual editor. Drag, drop, adjust, and export your final website.',
              color: '#ec4899',
            },
          ].map((item, index) => (
            <div
              key={item.step}
              style={{
                padding: '40px 28px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                transition: 'all 0.3s',
                animation: `fade-in-up 0.6s ease-out ${index * 0.15}s both`,
              }}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: item.color,
                opacity: 0.3,
                marginBottom: '16px',
                fontFamily: 'var(--font-mono)',
              }}>
                {item.step}
              </div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                marginBottom: '12px',
              }}>
                {item.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            Ready to <span className="gradient-text-warm">Build?</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            maxWidth: '500px',
            margin: '0 auto 40px',
          }}>
            Start creating your dream website today. No coding skills required.
          </p>
          <a href="/generate" className="glow-btn" style={{ padding: '18px 48px', fontSize: '17px' }}>
            ✨ Launch WebForge AI
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--glass-border)',
        padding: '40px 24px',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '14px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          marginBottom: '16px',
        }}>
          <a href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Dashboard</a>
          <a href="/generate" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Create</a>
          <a href="/clone" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Clone</a>
        </div>
        <p>© {new Date().getFullYear()} WebForge AI. Built with ❤️ and AI.</p>
      </footer>
    </main>
  );
}
