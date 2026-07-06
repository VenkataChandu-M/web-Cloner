'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';

const seoCategories = [
  { id: 'meta', label: 'Meta Tags', icon: '🏷️' },
  { id: 'content', label: 'Content Quality', icon: '📝' },
  { id: 'speed', label: 'Page Speed', icon: '⚡' },
  { id: 'mobile', label: 'Mobile Friendly', icon: '📱' },
  { id: 'links', label: 'Links & Structure', icon: '🔗' },
  { id: 'security', label: 'Security', icon: '🔒' },
];

interface SeoResult {
  score: number;
  grade: string;
  gradeColor: string;
  items: { category: string; label: string; status: 'pass' | 'warning' | 'fail'; detail: string; fix?: string }[];
}

function generateMockResults(): SeoResult {
  const items = [
    { category: 'meta', label: 'Title Tag', status: 'pass' as const, detail: 'Title is 54 characters — within the optimal 50-60 range', fix: undefined },
    { category: 'meta', label: 'Meta Description', status: 'warning' as const, detail: 'Description is 180 characters — slightly above 160 limit', fix: 'Shorten to 155 characters for full SERP display' },
    { category: 'meta', label: 'Open Graph Tags', status: 'fail' as const, detail: 'No OG tags found — social sharing will lack rich previews', fix: 'Add og:title, og:description, og:image meta tags' },
    { category: 'content', label: 'H1 Tag', status: 'pass' as const, detail: 'Single H1 tag found with relevant keywords', fix: undefined },
    { category: 'content', label: 'Keyword Density', status: 'warning' as const, detail: 'Primary keyword appears 1.2% — slightly below 1.5% target', fix: 'Increase primary keyword usage in body content' },
    { category: 'content', label: 'Image Alt Tags', status: 'fail' as const, detail: '5 of 12 images missing alt attributes', fix: 'Add descriptive alt text to all images' },
    { category: 'speed', label: 'Page Load Time', status: 'pass' as const, detail: 'Estimated load time: 1.8 seconds — Good', fix: undefined },
    { category: 'speed', label: 'Image Optimization', status: 'warning' as const, detail: '3 images over 500KB could be compressed', fix: 'Compress images to WebP format to save 60% file size' },
    { category: 'mobile', label: 'Responsive Design', status: 'pass' as const, detail: 'Viewport meta tag present, responsive layout detected', fix: undefined },
    { category: 'mobile', label: 'Touch Targets', status: 'pass' as const, detail: 'All tap targets are ≥48px — accessible on mobile', fix: undefined },
    { category: 'links', label: 'Internal Links', status: 'pass' as const, detail: '14 internal links found — good site structure', fix: undefined },
    { category: 'links', label: 'Broken Links', status: 'fail' as const, detail: '2 broken links detected (404 responses)', fix: 'Fix or remove links to /old-pricing and /team-2023' },
    { category: 'security', label: 'HTTPS', status: 'pass' as const, detail: 'Site is served over HTTPS with valid certificate', fix: undefined },
    { category: 'security', label: 'Mixed Content', status: 'pass' as const, detail: 'No mixed HTTP/HTTPS content found', fix: undefined },
  ];

  const passCount = items.filter(i => i.status === 'pass').length;
  const score = Math.round((passCount / items.length) * 100) + 7;
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : 'D';
  const gradeColor = score >= 90 ? '#10b981' : score >= 75 ? '#f59e0b' : score >= 60 ? '#f97316' : '#ef4444';

  return { score, grade, gradeColor, items };
}

export default function SEOPage() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<SeoResult | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [animatedScore, setAnimatedScore] = useState(0);

  const handleAudit = () => {
    if (!url.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setAnimatedScore(0);

    setTimeout(() => {
      const mockResult = generateMockResults();
      setResult(mockResult);
      setIsAnalyzing(false);

      // Animate score
      let current = 0;
      const target = mockResult.score;
      const step = () => {
        current += 2;
        if (current >= target) {
          setAnimatedScore(target);
          return;
        }
        setAnimatedScore(current);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 2200);
  };

  const filteredItems = result?.items.filter(
    item => activeFilter === 'all' || item.category === activeFilter
  ) || [];

  const statusIcon = (s: string) => s === 'pass' ? '✅' : s === 'warning' ? '⚠️' : '❌';
  const statusColor = (s: string) => s === 'pass' ? '#10b981' : s === 'warning' ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 54;
  const offset = result ? circumference - (animatedScore / 100) * circumference : circumference;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '96px 24px 60px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px',
            background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.15)',
            borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: '#22d3ee', marginBottom: '16px',
          }}>
            AI-Powered SEO
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            SEO Audit & <span className="gradient-text">Optimizer</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Analyze any website and get AI-powered recommendations to improve your search rankings.
          </p>
        </div>

        {/* URL Input */}
        <div style={{
          display: 'flex', gap: '12px', marginBottom: '40px',
          animation: 'fade-in-up 0.5s ease-out',
        }}>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL (e.g., https://example.com)"
            className="input-glass"
            style={{ flex: 1 }}
            onKeyDown={(e) => e.key === 'Enter' && handleAudit()}
          />
          <button
            onClick={handleAudit}
            disabled={isAnalyzing}
            className="glow-btn"
            style={{ padding: '12px 28px', fontSize: '14px', opacity: isAnalyzing ? 0.7 : 1 }}
          >
            {isAnalyzing ? '⏳ Analyzing...' : '🔍 Audit Now'}
          </button>
        </div>

        {/* Loading State */}
        {isAnalyzing && (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            animation: 'fade-in-up 0.4s ease-out',
          }}>
            <div className="loading-bar" style={{ width: '300px', margin: '0 auto 24px' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              AI is analyzing your website&apos;s SEO performance...
            </p>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              {['Checking meta tags...', 'Analyzing content quality...', 'Testing page speed...'].map((step, i) => (
                <span key={i} style={{
                  fontSize: '13px', color: 'var(--text-muted)',
                  animation: `fade-in-up 0.4s ease-out ${0.5 + i * 0.4}s both`,
                }}>
                  {step}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div style={{ animation: 'fade-in-up 0.5s ease-out' }}>
            {/* Score Card */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '32px',
              padding: '32px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
              borderRadius: '20px', marginBottom: '24px',
            }}>
              <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
                <svg width="130" height="130" className="score-ring">
                  <circle cx="65" cy="65" r="54" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                  <circle cx="65" cy="65" r="54" stroke={result.gradeColor} strokeWidth="8" fill="none" strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={offset} />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800 }}>{animatedScore}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 100</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '1.5rem', fontWeight: 800, color: result.gradeColor,
                  }}>Grade {result.grade}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                  Your SEO score is <strong style={{ color: result.gradeColor }}>{result.score >= 80 ? 'Good' : result.score >= 60 ? 'Needs Work' : 'Poor'}</strong>.
                  AI found {result.items.filter(i => i.status === 'fail').length} critical issues and {result.items.filter(i => i.status === 'warning').length} warnings to fix.
                </p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#10b98115', color: '#10b981', border: '1px solid #10b98130' }}>
                    ✅ {result.items.filter(i => i.status === 'pass').length} Passed
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#f59e0b15', color: '#f59e0b', border: '1px solid #f59e0b30' }}>
                    ⚠️ {result.items.filter(i => i.status === 'warning').length} Warnings
                  </span>
                  <span style={{ padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 600, background: '#ef444415', color: '#ef4444', border: '1px solid #ef444430' }}>
                    ❌ {result.items.filter(i => i.status === 'fail').length} Failed
                  </span>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActiveFilter('all')}
                style={{
                  padding: '8px 16px', borderRadius: '10px', border: '1px solid',
                  borderColor: activeFilter === 'all' ? 'var(--accent-purple)' : 'var(--glass-border)',
                  background: activeFilter === 'all' ? 'rgba(139, 92, 246, 0.15)' : 'var(--glass-bg)',
                  color: activeFilter === 'all' ? 'var(--accent-purple-light)' : 'var(--text-secondary)',
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                }}>All</button>
              {seoCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', border: '1px solid',
                    borderColor: activeFilter === cat.id ? 'var(--accent-purple)' : 'var(--glass-border)',
                    background: activeFilter === cat.id ? 'rgba(139, 92, 246, 0.15)' : 'var(--glass-bg)',
                    color: activeFilter === cat.id ? 'var(--accent-purple-light)' : 'var(--text-secondary)',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>

            {/* Results List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredItems.map((item, i) => (
                <div key={i} style={{
                  padding: '16px 20px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)',
                  borderRadius: '12px', animation: `fade-in-up 0.3s ease-out ${i * 0.05}s both`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span>{statusIcon(item.status)}</span>
                    <span style={{ fontWeight: 700, fontSize: '14px' }}>{item.label}</span>
                    <span style={{
                      marginLeft: 'auto', fontSize: '11px', fontWeight: 600, padding: '2px 8px',
                      borderRadius: '4px', background: `${statusColor(item.status)}15`,
                      color: statusColor(item.status),
                    }}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.detail}</p>
                  {item.fix && (
                    <div style={{
                      marginTop: '10px', padding: '10px 14px', background: 'rgba(139, 92, 246, 0.05)',
                      border: '1px solid rgba(139, 92, 246, 0.1)', borderRadius: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                    }}>
                      <span style={{ fontSize: '12px', color: 'var(--accent-purple-light)' }}>
                        💡 <strong>AI Fix:</strong> {item.fix}
                      </span>
                      <button style={{
                        padding: '5px 14px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '6px', color: 'var(--accent-purple-light)', fontSize: '11px', fontWeight: 700,
                        cursor: 'pointer', whiteSpace: 'nowrap',
                      }}>
                        Auto-Fix
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
