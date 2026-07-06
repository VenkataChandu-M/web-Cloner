'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';

/* ───── Mock Data ───── */
const trafficData = {
  '7d': [320, 450, 380, 520, 610, 480, 720],
  '30d': [280, 310, 340, 420, 380, 450, 520, 490, 560, 610, 580, 640, 720, 680, 750, 810, 780, 850, 920, 890, 960, 1020, 980, 1050, 1120, 1080, 1150, 1200, 1180, 1247],
  '24h': [45, 32, 28, 22, 18, 15, 25, 48, 72, 95, 110, 125, 118, 105, 98, 88, 92, 105, 115, 128, 135, 120, 95, 68],
};

const topPages = [
  { page: '/home', views: 3420, bounce: '32%', time: '2m 45s' },
  { page: '/products', views: 2180, bounce: '45%', time: '1m 52s' },
  { page: '/about', views: 1340, bounce: '58%', time: '1m 20s' },
  { page: '/contact', views: 890, bounce: '41%', time: '2m 10s' },
  { page: '/blog', views: 720, bounce: '35%', time: '3m 15s' },
];

const channels = [
  { name: 'Organic Search', value: 42, color: '#8b5cf6' },
  { name: 'Direct', value: 28, color: '#06b6d4' },
  { name: 'Social Media', value: 18, color: '#ec4899' },
  { name: 'Referral', value: 8, color: '#f59e0b' },
  { name: 'Email', value: 4, color: '#10b981' },
];

const aiInsights = [
  { icon: '📈', text: 'Traffic increased 23% after adding the FAQ section last week', type: 'positive' },
  { icon: '⚠️', text: 'Bounce rate on /products is high — consider adding product videos', type: 'warning' },
  { icon: '💡', text: 'Best posting time for your audience: Tuesday & Thursday 10am-12pm', type: 'tip' },
  { icon: '🎯', text: 'Adding a blog could increase organic traffic by an estimated 35%', type: 'tip' },
];

/* ───── SVG Line Chart ───── */
function LineChart({ data, width = 500, height = 200 }: { data: number[]; width?: number; height?: number }) {
  const [animated, setAnimated] = useState(false);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const padding = 20;
  const chartW = width - padding * 2;
  const chartH = height - padding * 2;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(t);
  }, [data]);

  const points = data.map((val, i) => {
    const x = padding + (i / (data.length - 1)) * chartW;
    const y = padding + chartH - ((val - min) / range) * chartH;
    return { x, y };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
        <line key={pct} x1={padding} x2={width - padding} y1={padding + chartH * pct} y2={padding + chartH * pct}
          stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
      ))}
      {/* Area */}
      <path d={areaD} fill="url(#areaGrad)" opacity={animated ? 0.3 : 0} style={{ transition: 'opacity 1s ease' }} />
      {/* Line */}
      <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={animated ? '0' : '2000'} strokeDashoffset={animated ? '0' : '2000'}
        style={{ transition: 'stroke-dasharray 1.5s ease, stroke-dashoffset 1.5s ease' }} />
      {/* End dot */}
      {animated && (
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="5"
          fill="#8b5cf6" stroke="#050510" strokeWidth="2">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" /><stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───── Bar Chart ───── */
function BarChart({ channels: data }: { channels: typeof channels }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 500); return () => clearTimeout(t); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {data.map((ch) => (
        <div key={ch.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)', width: '120px', flexShrink: 0, textAlign: 'right' }}>
            {ch.name}
          </span>
          <div style={{ flex: 1, height: '28px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: animated ? `${ch.value}%` : '0%',
              background: `linear-gradient(90deg, ${ch.color}, ${ch.color}88)`,
              borderRadius: '6px',
              transition: 'width 1.2s ease',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '10px',
            }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'white' }}>{ch.value}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───── Main ───── */
export default function AnalyticsPage() {
  const [range, setRange] = useState<'24h' | '7d' | '30d'>('7d');

  const kpis = [
    { label: 'Total Visitors', value: range === '24h' ? '1,247' : range === '7d' ? '3,480' : '12,450', change: '+18%', color: '#8b5cf6', icon: '👥' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', color: '#10b981', icon: '🎯' },
    { label: 'Avg. Session', value: '2m 34s', change: '+12s', color: '#06b6d4', icon: '⏱️' },
    { label: 'Revenue', value: range === '24h' ? '$420' : range === '7d' ? '$3,420' : '$14,800', change: '+24%', color: '#f59e0b', icon: '💰' },
  ];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '96px 24px 60px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px',
              background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)',
              borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: '#fbbf24', marginBottom: '12px',
            }}>
              Real-time Analytics
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Analytics <span className="gradient-text-warm">Dashboard</span>
            </h1>
          </div>
          {/* Range Filter */}
          <div style={{ display: 'flex', gap: '4px', background: 'var(--glass-bg)', borderRadius: '10px', padding: '4px', border: '1px solid var(--glass-border)' }}>
            {(['24h', '7d', '30d'] as const).map((r) => (
              <button key={r} onClick={() => setRange(r)} style={{
                padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: range === r ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                color: range === r ? 'var(--accent-purple-light)' : 'var(--text-muted)',
              }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {kpis.map((kpi, i) => (
            <div key={kpi.label} className="stat-card" style={{
              padding: '20px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: '16px', animation: `fade-in-up 0.5s ease-out ${i * 0.1}s both`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.3rem' }}>{kpi.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                  {kpi.change}
                </span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>{kpi.value}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px', marginBottom: '24px' }}>
          {/* Traffic Chart */}
          <div style={{
            padding: '24px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            borderRadius: '16px', animation: 'fade-in-up 0.5s ease-out 0.3s both',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              📊 Traffic Overview
            </h3>
            <LineChart data={trafficData[range]} />
          </div>

          {/* Channels */}
          <div style={{
            padding: '24px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            borderRadius: '16px', animation: 'fade-in-up 0.5s ease-out 0.4s both',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px' }}>
              📡 Traffic Sources
            </h3>
            <BarChart channels={channels} />
          </div>
        </div>

        {/* Bottom Row: Top Pages + AI Insights */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Top Pages */}
          <div style={{
            padding: '24px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            borderRadius: '16px', animation: 'fade-in-up 0.5s ease-out 0.5s both',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>📄 Top Pages</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  {['Page', 'Views', 'Bounce', 'Avg Time'].map((h) => (
                    <th key={h} style={{ padding: '8px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'left' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topPages.map((p) => (
                  <tr key={p.page} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px 0', fontSize: '13px', fontWeight: 600, color: 'var(--accent-purple-light)' }}>{p.page}</td>
                    <td style={{ padding: '10px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.views.toLocaleString()}</td>
                    <td style={{ padding: '10px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.bounce}</td>
                    <td style={{ padding: '10px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>{p.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI Insights */}
          <div style={{
            padding: '24px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
            borderRadius: '16px', animation: 'fade-in-up 0.5s ease-out 0.6s both',
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>🤖 AI Insights</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {aiInsights.map((insight, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px',
                  background: 'rgba(255,255,255,0.02)', borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{insight.icon}</span>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
