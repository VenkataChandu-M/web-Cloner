'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { useProjectStore } from '@/store/projectStore';

const actionCards = [
  {
    id: 'create',
    icon: '✨',
    title: 'Create with AI',
    description: 'Describe your website and let AI build it for you with stunning 3D effects.',
    href: '/generate',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    glow: 'rgba(139, 92, 246, 0.4)',
  },
  {
    id: 'clone',
    icon: '🔄',
    title: 'Clone a Website',
    description: 'Paste any URL to clone its structure and design as your starting point.',
    href: '/clone',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    glow: 'rgba(6, 182, 212, 0.4)',
  },
  {
    id: 'templates',
    icon: '📋',
    title: 'Start from Template',
    description: 'Choose from pre-built templates and customize them to match your brand.',
    href: '/generate?tab=templates',
    gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    glow: 'rgba(236, 72, 153, 0.4)',
  },
];

function ActionCard({ card }: { card: typeof actionCards[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={card.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        padding: '36px',
        background: hovered
          ? `${card.gradient.replace('135deg', '135deg')}`
          : 'var(--glass-bg)',
        border: '1px solid',
        borderColor: hovered ? 'transparent' : 'var(--glass-border)',
        borderRadius: '20px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered ? `0 20px 60px ${card.glow}` : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{
        fontSize: '3rem',
        marginBottom: '20px',
      }}>
        {card.icon}
      </div>
      <h3 style={{
        fontSize: '1.4rem',
        fontWeight: 700,
        marginBottom: '10px',
        letterSpacing: '-0.01em',
      }}>
        {card.title}
      </h3>
      <p style={{
        color: hovered ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)',
        fontSize: '0.95rem',
        lineHeight: 1.7,
        transition: 'color 0.3s',
      }}>
        {card.description}
      </p>
      <div style={{
        marginTop: '24px',
        fontSize: '14px',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: hovered ? 'rgba(255,255,255,0.9)' : 'var(--accent-purple-light)',
        transition: 'color 0.3s',
      }}>
        Get Started
        <span style={{
          transition: 'transform 0.3s',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          display: 'inline-block',
        }}>
          →
        </span>
      </div>
    </a>
  );
}

export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '104px 24px 60px',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '12px',
            letterSpacing: '-0.02em',
          }}>
            Welcome to <span className="gradient-text">WebForge AI</span>
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
          }}>
            What would you like to build today?
          </p>
        </div>

        {/* Action Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '64px',
        }}>
          {actionCards.map((card, index) => (
            <div
              key={card.id}
              style={{ animation: `fade-in-up 0.6s ease-out ${index * 0.1}s both` }}
            >
              <ActionCard card={card} />
            </div>
          ))}
        </div>

        {/* Recent Projects */}
        <div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span>📁</span> Recent Projects
          </h2>

          {projects.length === 0 ? (
            <div style={{
              padding: '60px 24px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.5 }}>📭</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>
                No projects yet
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                marginBottom: '24px',
              }}>
                Create your first website with AI or clone an existing one to get started.
              </p>
              <a href="/generate" className="glow-btn" style={{ padding: '12px 28px', fontSize: '14px' }}>
                ✨ Create Your First Website
              </a>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={`/editor/${project.id}`}
                  style={{
                    display: 'block',
                    padding: '20px',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    aspectRatio: '16/9',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                  }}>
                    {project.source === 'ai' ? '🤖' : project.source === 'clone' ? '🔄' : '📋'}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '4px' }}>
                    {project.name}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'var(--text-muted)',
                  }}>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
