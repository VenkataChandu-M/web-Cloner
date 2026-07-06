'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import { useProjectStore } from '@/store/projectStore';

/* ───── AI Insight Messages ───── */
const aiInsights = [
  { type: 'tip', icon: '💡', text: 'Adding an FAQ section could improve your SEO score by 12%', action: 'Add FAQ' },
  { type: 'alert', icon: '📈', text: 'Your website traffic increased 23% this week — keep up the content!', action: 'View Analytics' },
  { type: 'suggestion', icon: '🤖', text: 'Your competitor updated their pricing page yesterday', action: 'Analyze' },
  { type: 'tip', icon: '✍️', text: 'AI generated 3 new blog post ideas based on your industry trends', action: 'View Ideas' },
  { type: 'alert', icon: '⚡', text: 'Page speed optimization available — could improve load time by 40%', action: 'Optimize' },
];

/* ───── Quick Action Cards ───── */
const quickActions = [
  {
    id: 'build',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Build Website',
    desc: 'AI-powered site generation',
    href: '/generate',
    gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    glow: 'rgba(139, 92, 246, 0.4)',
    bg: 'rgba(139, 92, 246, 0.08)',
  },
  {
    id: 'seo',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'SEO Audit',
    desc: 'Instant website SEO score',
    href: '/seo',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    glow: 'rgba(6, 182, 212, 0.4)',
    bg: 'rgba(6, 182, 212, 0.08)',
  },
  {
    id: 'support',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'AI Support',
    desc: 'Deploy customer chatbot',
    href: '/consultant',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    glow: 'rgba(16, 185, 129, 0.4)',
    bg: 'rgba(16, 185, 129, 0.08)',
  },
  {
    id: 'analytics',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/>
      </svg>
    ),
    title: 'Analytics',
    desc: 'Real-time business metrics',
    href: '/analytics',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    glow: 'rgba(245, 158, 11, 0.4)',
    bg: 'rgba(245, 158, 11, 0.08)',
  },
  {
    id: 'marketing',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    title: 'Marketing',
    desc: 'AI content & campaigns',
    href: '/marketing',
    gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    glow: 'rgba(236, 72, 153, 0.4)',
    bg: 'rgba(236, 72, 153, 0.08)',
  },
  {
    id: 'clone',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      </svg>
    ),
    title: 'Clone Site',
    desc: 'Clone & redesign any URL',
    href: '/clone',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    glow: 'rgba(59, 130, 246, 0.4)',
    bg: 'rgba(59, 130, 246, 0.08)',
  },
];

/* ───── Business Health Score Ring ───── */
function HealthScore() {
  const [score, setScore] = useState(0);
  const targetScore = 78;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setScore(targetScore), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '32px',
      padding: '28px 32px',
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      borderRadius: '20px',
      animation: 'fade-in-up 0.5s ease-out',
    }}>
      <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
        <svg width="120" height="120" className="score-ring">
          <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
          <circle
            cx="60" cy="60" r="54"
            stroke="url(#scoreGrad)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(0deg)',
        }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{score}</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>/ 100</span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
          Business Health Score
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
          Your digital presence is <span style={{ color: '#f59e0b', fontWeight: 600 }}>good</span>, but can be improved.
          AI found 3 actionable optimizations.
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { label: 'SEO: 72', color: '#06b6d4' },
            { label: 'Speed: 91', color: '#10b981' },
            { label: 'Content: 65', color: '#f59e0b' },
          ].map((item) => (
            <span key={item.label} style={{
              padding: '4px 10px',
              background: `${item.color}15`,
              border: `1px solid ${item.color}30`,
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              color: item.color,
            }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───── Stat Card ───── */
function StatCard({ icon, label, value, change, color, delay }: {
  icon: React.ReactNode; label: string; value: string; change: string; color: string; delay: number;
}) {
  return (
    <div className="stat-card" style={{
      padding: '20px',
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-border)',
      borderRadius: '16px',
      animation: `fade-in-up 0.5s ease-out ${delay}s both`,
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: `${color}12`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
      }}>
        {icon}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>
        {value}
      </div>
      <div style={{
        fontSize: '12px',
        fontWeight: 600,
        color: change.startsWith('+') ? '#10b981' : '#ef4444',
      }}>
        {change} vs last week
      </div>
    </div>
  );
}

/* ───── Quick Action Card ───── */
function QuickActionCard({ card, index }: { card: typeof quickActions[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={card.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '20px',
        background: hovered ? card.bg : 'var(--glass-bg)',
        border: '1px solid',
        borderColor: hovered ? `${card.glow.replace('0.4', '0.3')}` : 'var(--glass-border)',
        borderRadius: '16px',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 12px 40px ${card.glow.replace('0.4', '0.1')}` : 'none',
        cursor: 'pointer',
        animation: `fade-in-up 0.5s ease-out ${0.2 + index * 0.08}s both`,
      }}
    >
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: card.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'transform 0.3s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        {card.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '2px' }}>{card.title}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{card.desc}</div>
      </div>
      <span style={{
        fontSize: '18px',
        color: 'var(--text-muted)',
        transition: 'all 0.3s',
        transform: hovered ? 'translateX(3px)' : 'translateX(0)',
        display: 'inline-block',
      }}>→</span>
    </a>
  );
}

/* ───── Main Dashboard Page ───── */
export default function DashboardPage() {
  const projects = useProjectStore((s) => s.projects);
  const [visibleInsights, setVisibleInsights] = useState(3);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '96px 24px 60px',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '8px',
            letterSpacing: '-0.02em',
          }}>
            AI Command Center
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
          }}>
            Your AI-powered business dashboard. Everything you need in one place.
          </p>
        </div>

        {/* Top Row: Health Score + Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '32px',
        }}>
          {/* Left: Health Score */}
          <HealthScore />

          {/* Right: Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
          }}>
            <StatCard
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
              label="Visitors Today"
              value="1,247"
              change="+18%"
              color="#8b5cf6"
              delay={0.1}
            />
            <StatCard
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
              label="Revenue"
              value="$3,420"
              change="+24%"
              color="#10b981"
              delay={0.15}
            />
            <StatCard
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
              label="Active Campaigns"
              value="5"
              change="+2"
              color="#06b6d4"
              delay={0.2}
            />
            <StatCard
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>}
              label="Support Tickets"
              value="12"
              change="-8%"
              color="#ec4899"
              delay={0.25}
            />
          </div>
        </div>

        {/* AI Quick Actions */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple-light)" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
          }}>
            {quickActions.map((card, index) => (
              <QuickActionCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>

        {/* Two-Column: AI Insights + Recent Projects */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
        }}>
          {/* AI Insights Feed */}
          <div>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              AI Insights
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {aiInsights.slice(0, visibleInsights).map((insight, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '12px',
                  animation: `fade-in-up 0.4s ease-out ${i * 0.1}s both`,
                }}>
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{insight.icon}</span>
                  <p style={{
                    flex: 1,
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                  }}>
                    {insight.text}
                  </p>
                  <button style={{
                    padding: '6px 14px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '8px',
                    color: 'var(--accent-purple-light)',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                  }}>
                    {insight.action}
                  </button>
                </div>
              ))}
              {visibleInsights < aiInsights.length && (
                <button
                  onClick={() => setVisibleInsights(aiInsights.length)}
                  style={{
                    padding: '10px',
                    background: 'transparent',
                    border: '1px dashed var(--glass-border)',
                    borderRadius: '12px',
                    color: 'var(--text-muted)',
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  Show {aiInsights.length - visibleInsights} more insights →
                </button>
              )}
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <h2 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              Recent Projects
            </h2>

            {projects.length === 0 ? (
              <div style={{
                padding: '48px 24px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }}>📭</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '6px' }}>
                  No projects yet
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '13px',
                  marginBottom: '20px',
                }}>
                  Create your first AI-powered website to get started.
                </p>
                <a href="/generate" className="glow-btn" style={{ padding: '10px 24px', fontSize: '13px' }}>
                  🚀 Create Website
                </a>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href={`/editor/${project.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '14px 16px',
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s',
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(139, 92, 246, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem',
                      flexShrink: 0,
                    }}>
                      {project.source === 'ai' ? '🤖' : project.source === 'clone' ? '🔄' : '📋'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
                        {project.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span style={{
                      padding: '3px 10px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#10b981',
                    }}>
                      Live
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
