'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeatureCards from '@/components/landing/FeatureCards';

const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), {
  ssr: false,
});

function ProblemSection() {
  return (
    <section style={{
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(236, 72, 153, 0.06), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          background: 'rgba(245, 158, 11, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
          borderRadius: '999px',
          fontSize: '13px',
          fontWeight: 600,
          color: '#fbbf24',
          marginBottom: '24px',
        }}>
          The Problem We Solve
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          fontWeight: 800,
          marginBottom: '20px',
          letterSpacing: '-0.02em',
          lineHeight: 1.15,
        }}>
          Millions of small businesses{' '}
          <span className="gradient-text-warm">can&apos;t afford</span>{' '}
          to go digital
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto 56px',
          lineHeight: 1.7,
        }}>
          Professional websites cost $5,000+. SEO experts charge $2,000/month. Marketing teams cost $8,000+/month.
          Most SMEs simply can&apos;t compete online. <strong style={{ color: 'var(--text-primary)' }}>Until now.</strong>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          {[
            { before: '$5,000+', after: '$0', label: 'Website Cost', color: '#8b5cf6' },
            { before: '$2,000/mo', after: 'Included', label: 'SEO Expert', color: '#06b6d4' },
            { before: '$8,000/mo', after: 'Included', label: 'Marketing Team', color: '#ec4899' },
            { before: '3-6 months', after: '60 seconds', label: 'Time to Launch', color: '#10b981' },
          ].map((item, i) => (
            <div key={item.label} style={{
              padding: '24px 16px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              animation: `fade-in-up 0.6s ease-out ${i * 0.1}s both`,
            }}>
              <div style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
                marginBottom: '4px',
              }}>
                {item.before}
              </div>
              <div style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                color: item.color,
                marginBottom: '6px',
              }}>
                {item.after}
              </div>
              <div style={{
                fontSize: '13px',
                color: 'var(--text-secondary)',
                fontWeight: 500,
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section style={{
      padding: '80px 24px 120px',
      maxWidth: '1000px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        background: 'rgba(6, 182, 212, 0.08)',
        border: '1px solid rgba(6, 182, 212, 0.15)',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#22d3ee',
        marginBottom: '24px',
      }}>
        Simple 3-Step Process
      </div>
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        marginBottom: '16px',
        letterSpacing: '-0.02em',
      }}>
        Go Digital in{' '}
        <span className="gradient-text">60 Seconds</span>
      </h2>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '1.1rem',
        maxWidth: '500px',
        margin: '0 auto 64px',
        lineHeight: 1.7,
      }}>
        Three simple steps to transform your business.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
      }}>
        {[
          {
            step: '01',
            title: 'Describe Your Business',
            desc: 'Tell AI what your business does, your target audience, and what you need — website, marketing, support, or all of the above.',
            color: '#8b5cf6',
            icon: '💬',
          },
          {
            step: '02',
            title: 'AI Builds Everything',
            desc: 'Our AI generates your website, configures SEO, sets up customer support chatbot, and creates your marketing strategy.',
            color: '#06b6d4',
            icon: '⚡',
          },
          {
            step: '03',
            title: 'Launch & Grow',
            desc: 'Go live instantly. AI continuously optimizes your SEO, generates content, handles support, and provides growth insights.',
            color: '#10b981',
            icon: '🚀',
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
              textAlign: 'left',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: `${item.color}15`,
                border: `1px solid ${item.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: '13px',
                fontWeight: 700,
                color: item.color,
                fontFamily: 'var(--font-mono)',
              }}>
                STEP {item.step}
              </span>
            </div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              marginBottom: '10px',
            }}>
              {item.title}
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.92rem',
              lineHeight: 1.7,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Owner, Spice Garden Restaurant',
      text: '"I went from no online presence to a fully operational website with online ordering in under 2 minutes. The AI even wrote my menu descriptions!"',
      color: '#8b5cf6',
    },
    {
      name: 'Rahul Verma',
      role: 'Founder, TechRepair Hub',
      text: '"The AI SEO tool helped me rank #1 for local repair services within a week. My bookings tripled. This platform is a game-changer."',
      color: '#06b6d4',
    },
    {
      name: 'Ananya Patel',
      role: 'Creative Director, Studio Bloom',
      text: '"I replaced 3 freelancers with this one platform. It handles my website, email campaigns, and customer support chatbot flawlessly."',
      color: '#ec4899',
    },
  ];

  return (
    <section style={{
      padding: '80px 24px',
      maxWidth: '700px',
      margin: '0 auto',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.15)',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#34d399',
        marginBottom: '24px',
      }}>
        Trusted by 10,000+ Businesses
      </div>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
        fontWeight: 800,
        marginBottom: '48px',
        letterSpacing: '-0.02em',
      }}>
        What Our Users Say
      </h2>

      <div style={{
        padding: '40px 32px',
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: '20px',
        marginBottom: '24px',
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <p style={{
          fontSize: '1.1rem',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          marginBottom: '24px',
        }}>
          {testimonials[active].text}
        </p>
        <div>
          <div style={{
            fontWeight: 700,
            fontSize: '1rem',
            color: testimonials[active].color,
          }}>
            {testimonials[active].name}
          </div>
          <div style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            marginTop: '4px',
          }}>
            {testimonials[active].role}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
      }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? '32px' : '10px',
              height: '10px',
              borderRadius: '5px',
              border: 'none',
              background: active === i ? 'var(--accent-purple)' : 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
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
          Ready to{' '}
          <span className="gradient-text-warm">Digitize Your Business?</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          maxWidth: '550px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          Join 10,000+ businesses that transformed their digital presence with AI. No credit card required. Free forever plan available.
        </p>
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <a href="/generate" className="glow-btn" style={{ padding: '18px 48px', fontSize: '17px' }}>
            🚀 Start Free — No Credit Card
          </a>
          <a href="/dashboard" className="glow-btn-outline" style={{ padding: '18px 36px', fontSize: '17px' }}>
            View Demo Dashboard
          </a>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <Navbar transparent />

      {/* 3D Background */}
      <ParticleField />

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Statement */}
      <ProblemSection />

      {/* Feature Cards */}
      <FeatureCards />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

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
          flexWrap: 'wrap',
        }}>
          <a href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Dashboard</a>
          <a href="/generate" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>AI Builder</a>
          <a href="/seo" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>SEO Tools</a>
          <a href="/marketing" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Marketing</a>
          <a href="/analytics" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Analytics</a>
          <a href="/consultant" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>AI Consultant</a>
        </div>
        <p>© {new Date().getFullYear()} WebForge AI — AI Business Digitalization Platform. Built with ❤️ and AI.</p>
      </footer>
    </main>
  );
}
