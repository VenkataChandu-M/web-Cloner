'use client';

import { useState } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { useUIStore } from '@/store/uiStore';

type PanelTab = 'sections' | 'elements' | 'layers';

// Pre-built section HTML blocks
const SECTION_BLOCKS = [
  {
    category: 'Hero',
    color: '#8b5cf6',
    items: [
      {
        id: 'hero-centered',
        label: 'Centered Hero',
        icon: '🏠',
        desc: 'Title, subtitle, CTA button',
        html: `<section style="min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;background:linear-gradient(135deg,#050510 0%,#0d0d2e 100%);padding:80px 24px;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(139,92,246,0.15),transparent 70%);"></div>
  <div style="position:relative;max-width:800px;">
    <span style="display:inline-block;padding:6px 16px;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:999px;font-size:13px;color:#a78bfa;font-weight:600;margin-bottom:24px;letter-spacing:0.05em;">✨ INTRODUCING YOUR PRODUCT</span>
    <h1 style="font-size:clamp(2.5rem,6vw,5rem);font-weight:900;line-height:1.1;letter-spacing:-0.03em;color:#f0f0ff;margin-bottom:20px;">Build Faster.<br><span style="background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">Ship Better.</span></h1>
    <p style="font-size:1.15rem;color:#a0a0c0;line-height:1.7;max-width:560px;margin:0 auto 40px;">The modern platform for teams who want to move fast without breaking things. Beautiful by default, powerful under the hood.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button style="padding:14px 36px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:none;border-radius:12px;color:white;font-size:16px;font-weight:700;cursor:pointer;">Get Started Free →</button>
      <button style="padding:14px 36px;background:transparent;border:1px solid rgba(255,255,255,0.15);border-radius:12px;color:#f0f0ff;font-size:16px;cursor:pointer;">Watch Demo ▶</button>
    </div>
  </div>
</section>`,
      },
      {
        id: 'hero-split',
        label: 'Split Hero',
        icon: '📐',
        desc: 'Text left, visual right',
        html: `<section style="min-height:90vh;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:48px;padding:80px 60px;background:#050510;max-width:1400px;margin:0 auto;">
  <div>
    <span style="display:inline-block;padding:5px 14px;background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.25);border-radius:999px;font-size:12px;color:#22d3ee;font-weight:600;margin-bottom:20px;letter-spacing:0.1em;text-transform:uppercase;">New Feature</span>
    <h1 style="font-size:clamp(2rem,4.5vw,4rem);font-weight:900;color:#f0f0ff;line-height:1.15;letter-spacing:-0.02em;margin-bottom:20px;">Supercharge Your<br><span style="background:linear-gradient(135deg,#06b6d4,#10b981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Workflow Today</span></h1>
    <p style="color:#a0a0c0;font-size:1.05rem;line-height:1.75;margin-bottom:36px;">Stop wasting time on repetitive tasks. Our AI-powered platform automates the boring stuff so your team can focus on what matters.</p>
    <button style="padding:14px 32px;background:linear-gradient(135deg,#06b6d4,#8b5cf6);border:none;border-radius:10px;color:white;font-size:15px;font-weight:700;cursor:pointer;margin-right:12px;">Start Free Trial</button>
    <button style="padding:14px 32px;background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:10px;color:#a0a0c0;font-size:15px;cursor:pointer;">Learn More</button>
  </div>
  <div style="background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(6,182,212,0.08));border:1px solid rgba(255,255,255,0.08);border-radius:24px;height:420px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
    <div style="width:120px;height:120px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:48px;box-shadow:0 0 80px rgba(139,92,246,0.3);">🚀</div>
  </div>
</section>`,
      },
    ],
  },
  {
    category: 'Features',
    color: '#06b6d4',
    items: [
      {
        id: 'features-grid',
        label: 'Feature Grid',
        icon: '⭐',
        desc: '6 feature cards with icons',
        html: `<section style="padding:100px 24px;background:#08081a;">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:64px;">
      <h2 style="font-size:clamp(1.8rem,3.5vw,3rem);font-weight:900;color:#f0f0ff;letter-spacing:-0.02em;margin-bottom:12px;">Everything You <span style="background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Need</span></h2>
      <p style="color:#a0a0c0;font-size:1.05rem;max-width:480px;margin:0 auto;">Packed with powerful features to help your team succeed.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;">
      ${['⚡ Lightning Fast', '🔒 Secure by Default', '🎨 Beautiful UI', '📊 Analytics', '🤖 AI Powered', '🌍 Global CDN'].map((f, i) => `
      <div style="padding:28px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;transition:all 0.3s;">
        <div style="width:48px;height:48px;background:linear-gradient(135deg,${['#8b5cf6','#06b6d4','#ec4899','#10b981','#f59e0b','#3b82f6'][i]},${['#06b6d4','#10b981','#8b5cf6','#06b6d4','#ec4899','#8b5cf6'][i]});border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px;">${f.split(' ')[0]}</div>
        <h3 style="font-size:1.05rem;font-weight:700;color:#f0f0ff;margin-bottom:8px;">${f.slice(2)}</h3>
        <p style="color:#6a6a8a;font-size:0.9rem;line-height:1.6;">Powerful, reliable, and built for scale. Customize to fit your exact needs.</p>
      </div>`).join('')}
    </div>
  </div>
</section>`,
      },
    ],
  },
  {
    category: 'Statistics',
    color: '#10b981',
    items: [
      {
        id: 'stats-counters',
        label: 'Animated Stats',
        icon: '📊',
        desc: 'Animated number counters',
        html: `<section style="padding:80px 24px;background:linear-gradient(135deg,#050510,#0d0d2e);">
  <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;text-align:center;">
    ${[['10K+','Happy Customers','#8b5cf6'],['99.9%','Uptime SLA','#06b6d4'],['200ms','Avg. Response','#10b981'],['24/7','Support','#ec4899']].map(([num,label,color])=>`
    <div style="padding:32px 16px;">
      <div style="font-size:3rem;font-weight:900;background:linear-gradient(135deg,${color},${color}aa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:8px;">${num}</div>
      <div style="color:#a0a0c0;font-size:0.95rem;font-weight:500;">${label}</div>
    </div>`).join('')}
  </div>
</section>`,
      },
    ],
  },
  {
    category: 'Testimonials',
    color: '#ec4899',
    items: [
      {
        id: 'testimonials-cards',
        label: 'Testimonial Cards',
        icon: '💬',
        desc: 'Customer quotes grid',
        html: `<section style="padding:100px 24px;background:#08081a;">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:64px;">
      <h2 style="font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;color:#f0f0ff;margin-bottom:12px;">Loved by <span style="background:linear-gradient(135deg,#ec4899,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Thousands</span></h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;">
      ${[['Sarah K.','CEO, TechCorp','This product changed the way our team works. Absolutely incredible.','#8b5cf6'],['Marcus R.','Designer','The UI is stunning and the performance is unmatched. 10/10.','#06b6d4'],['Priya M.','Developer','Integration was seamless. Best decision we made this year.','#ec4899']].map(([name,role,quote,color])=>`
      <div style="padding:28px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;">
        <div style="color:#f59e0b;font-size:16px;margin-bottom:16px;">★★★★★</div>
        <p style="color:#c0c0e0;font-size:0.95rem;line-height:1.7;margin-bottom:24px;">"${quote}"</p>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,${color},${color}88);display:flex;align-items:center;justify-content:center;font-weight:700;color:white;font-size:14px;">${name[0]}</div>
          <div><div style="font-weight:700;color:#f0f0ff;font-size:14px;">${name}</div><div style="color:#6a6a8a;font-size:12px;">${role}</div></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>`,
      },
    ],
  },
  {
    category: 'Pricing',
    color: '#f59e0b',
    items: [
      {
        id: 'pricing-cards',
        label: 'Pricing Cards',
        icon: '💰',
        desc: '3-tier pricing table',
        html: `<section style="padding:100px 24px;background:#050510;">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:64px;">
      <h2 style="font-size:clamp(1.8rem,3vw,2.8rem);font-weight:900;color:#f0f0ff;margin-bottom:12px;">Simple <span style="background:linear-gradient(135deg,#f59e0b,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Pricing</span></h2>
      <p style="color:#a0a0c0;">No hidden fees. Cancel anytime.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;align-items:start;">
      ${[['Starter','$9','Basic access, 5 projects, community support',false],['Pro','$29','Unlimited projects, priority support, advanced features',true],['Enterprise','$99','Custom setup, SLA, dedicated account manager',false]].map(([plan,price,desc,featured])=>`
      <div style="padding:32px;background:${featured?'rgba(139,92,246,0.1)':'rgba(255,255,255,0.03)'};border:${featured?'2px solid rgba(139,92,246,0.5)':'1px solid rgba(255,255,255,0.07)'};border-radius:20px;position:relative;">
        ${featured?'<div style="position:absolute;top:-14px;left:50%;transform:translateX(-50%);padding:4px 16px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border-radius:999px;font-size:11px;font-weight:700;color:white;white-space:nowrap;">MOST POPULAR</div>':''}
        <h3 style="font-size:1.1rem;font-weight:700;color:#f0f0ff;margin-bottom:8px;">${plan}</h3>
        <div style="font-size:2.8rem;font-weight:900;color:#f0f0ff;margin-bottom:4px;">${price}<span style="font-size:1rem;font-weight:400;color:#a0a0c0;">/mo</span></div>
        <p style="color:#6a6a8a;font-size:0.9rem;margin-bottom:28px;line-height:1.6;">${desc}</p>
        <button style="width:100%;padding:12px;background:${featured?'linear-gradient(135deg,#8b5cf6,#06b6d4)':'transparent'};border:${featured?'none':'1px solid rgba(255,255,255,0.1)'};border-radius:10px;color:${featured?'white':'#a0a0c0'};font-weight:600;cursor:pointer;">Get Started</button>
      </div>`).join('')}
    </div>
  </div>
</section>`,
      },
    ],
  },
  {
    category: 'CTA',
    color: '#3b82f6',
    items: [
      {
        id: 'cta-centered',
        label: 'Centered CTA',
        icon: '📢',
        desc: 'Call-to-action banner',
        html: `<section style="padding:100px 24px;text-align:center;background:linear-gradient(135deg,#0d0d2e,#1a0a2e);position:relative;overflow:hidden;">
  <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:400px;background:radial-gradient(ellipse,rgba(139,92,246,0.2),transparent 70%);pointer-events:none;"></div>
  <div style="position:relative;max-width:700px;margin:0 auto;">
    <h2 style="font-size:clamp(2rem,4.5vw,3.5rem);font-weight:900;color:#f0f0ff;letter-spacing:-0.02em;margin-bottom:16px;">Ready to Get <span style="background:linear-gradient(135deg,#f59e0b,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Started?</span></h2>
    <p style="color:#a0a0c0;font-size:1.1rem;max-width:480px;margin:0 auto 40px;">Join thousands of teams already using our platform. Start your free trial today.</p>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
      <button style="padding:15px 40px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:none;border-radius:12px;color:white;font-size:16px;font-weight:700;cursor:pointer;">Start Free Trial</button>
      <button style="padding:15px 40px;background:transparent;border:1px solid rgba(255,255,255,0.15);border-radius:12px;color:#f0f0ff;font-size:16px;cursor:pointer;">Talk to Sales</button>
    </div>
  </div>
</section>`,
      },
    ],
  },
  {
    category: 'Footer',
    color: '#6a6a8a',
    items: [
      {
        id: 'footer-full',
        label: 'Full Footer',
        icon: '📋',
        desc: 'Links, social, copyright',
        html: `<footer style="border-top:1px solid rgba(255,255,255,0.06);padding:60px 24px 32px;background:#050510;">
  <div style="max-width:1100px;margin:0 auto;">
    <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px;">
      <div>
        <div style="font-size:1.3rem;font-weight:900;background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:12px;">YourBrand</div>
        <p style="color:#6a6a8a;font-size:0.9rem;line-height:1.7;max-width:280px;">Building the future of the web, one pixel at a time.</p>
      </div>
      ${[['Product',['Features','Pricing','Changelog','Roadmap']],['Company',['About','Blog','Careers','Press']],['Support',['Docs','Community','Status','Contact']]].map(([title,links])=>`
      <div>
        <h4 style="font-size:12px;font-weight:700;color:#f0f0ff;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">${title}</h4>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;">
          ${links.map(l=>`<li><a href="#" style="color:#6a6a8a;text-decoration:none;font-size:14px;transition:color 0.2s;">${l}</a></li>`).join('')}
        </ul>
      </div>`).join('')}
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <p style="color:#6a6a8a;font-size:13px;">© ${new Date().getFullYear()} YourBrand. All rights reserved.</p>
      <div style="display:flex;gap:16px;">
        ${['🐦','💼','📺','💻'].map(icon=>`<a href="#" style="color:#6a6a8a;font-size:18px;text-decoration:none;">${icon}</a>`).join('')}
      </div>
    </div>
  </div>
</footer>`,
      },
    ],
  },
];

interface SectionsPanelProps {
  onInsertSection: (html: string) => void;
}

export default function SectionsPanel({ onInsertSection }: SectionsPanelProps) {
  const [tab, setTab] = useState<PanelTab>('sections');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Hero');
  const addToast = useUIStore((s) => s.addToast);

  const handleInsert = (html: string, label: string) => {
    onInsertSection(html);
    addToast({ type: 'success', title: `✅ "${label}" added`, message: 'Section inserted at the end of your page.' });
  };

  return (
    <div
      id="sections-panel"
      style={{
        width: '260px',
        flexShrink: 0,
        background: '#12121f',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Panel Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        {([
          { id: 'sections' as PanelTab, label: '⊞ Sections' },
          { id: 'layers' as PanelTab, label: '◫ Layers' },
        ] as { id: PanelTab; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              padding: '11px 8px',
              border: 'none',
              background: 'transparent',
              color: tab === t.id ? '#a78bfa' : '#6a6a8a',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              borderBottom: tab === t.id ? '2px solid #8b5cf6' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sections Tab */}
      {tab === 'sections' && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          <p style={{ fontSize: '11px', color: '#4a4a6a', padding: '0 8px 12px', lineHeight: 1.5 }}>
            Click a section to insert it at the end of your page.
          </p>
          {SECTION_BLOCKS.map((cat) => (
            <div key={cat.category} style={{ marginBottom: '4px' }}>
              {/* Category header */}
              <button
                onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  background: expandedCategory === cat.category ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#a0a0c0',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: cat.color,
                    display: 'inline-block',
                    boxShadow: `0 0 6px ${cat.color}`,
                  }} />
                  {cat.category}
                </span>
                <span style={{ transform: expandedCategory === cat.category ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
              </button>

              {/* Items */}
              {expandedCategory === cat.category && (
                <div style={{ paddingLeft: '8px', paddingBottom: '4px' }}>
                  {cat.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleInsert(item.html, item.label)}
                      title={item.desc}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 10px',
                        background: 'transparent',
                        border: '1px solid transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.15s',
                        marginBottom: '2px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(139,92,246,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <span style={{
                        width: 36,
                        height: 36,
                        borderRadius: '8px',
                        background: `${cat.color}15`,
                        border: `1px solid ${cat.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        flexShrink: 0,
                      }}>
                        {item.icon}
                      </span>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#e0e0f0', marginBottom: '2px' }}>{item.label}</div>
                        <div style={{ fontSize: '11px', color: '#5a5a7a' }}>{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Layers Tab */}
      {tab === 'layers' && (
        <LayersPanel />
      )}
    </div>
  );
}

function LayersPanel() {
  const { html, selectedSectionId, setSelectedSection } = useEditorStore();

  // Parse section-like blocks from the HTML
  const sectionMatches = html.match(/<(section|header|footer|nav|main|div)[^>]*>/gi) || [];
  const layers = sectionMatches.slice(0, 20).map((tag, i) => {
    const tagName = tag.match(/<(\w+)/)?.[1] || 'div';
    const idMatch = tag.match(/id="([^"]+)"/);
    const classMatch = tag.match(/class="([^"]+)"/);
    const label = idMatch?.[1] || classMatch?.[1]?.split(' ')[0] || `${tagName} ${i + 1}`;
    const icons: Record<string, string> = {
      section: '▣',
      header: '▤',
      footer: '▥',
      nav: '☰',
      main: '▢',
      div: '◻',
    };
    return { id: `layer-${i}`, tag: tagName, label, icon: icons[tagName] || '▣' };
  });

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
      {layers.length === 0 ? (
        <div style={{ padding: '24px 12px', textAlign: 'center', color: '#4a4a6a', fontSize: '13px' }}>
          No sections detected yet. Start adding sections from the Sections tab.
        </div>
      ) : (
        layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setSelectedSection(selectedSectionId === layer.id ? null : layer.id)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 10px',
              background: selectedSectionId === layer.id ? 'rgba(139,92,246,0.12)' : 'transparent',
              border: selectedSectionId === layer.id ? '1px solid rgba(139,92,246,0.25)' : '1px solid transparent',
              borderRadius: '7px',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '2px',
              transition: 'all 0.15s',
            }}
          >
            <span style={{ fontSize: '14px', color: '#6a6a8a', width: '16px' }}>{layer.icon}</span>
            <span style={{
              fontSize: '12px',
              color: selectedSectionId === layer.id ? '#a78bfa' : '#a0a0c0',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {layer.label}
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '10px', color: '#4a4a6a', fontFamily: 'monospace' }}>
              &lt;{layer.tag}&gt;
            </span>
          </button>
        ))
      )}
    </div>
  );
}
