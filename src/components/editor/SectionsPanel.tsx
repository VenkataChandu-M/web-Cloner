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
      ${([['Product',['Features','Pricing','Changelog','Roadmap']],['Company',['About','Blog','Careers','Press']],['Support',['Docs','Community','Status','Contact']]] as [string, string[]][]).map(([title,links])=>`
      <div>
        <h4 style="font-size:12px;font-weight:700;color:#f0f0ff;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;">${title}</h4>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:10px;">
          ${(links as string[]).map((l: string)=>`<li><a href="#" style="color:#6a6a8a;text-decoration:none;font-size:14px;transition:color 0.2s;">${l}</a></li>`).join('')}
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

  {
    category: 'AI & Business',
    color: '#d946ef',
    items: [
      {
        id: 'ai-analytics-dashboard',
        label: 'Analytics Dashboard',
        icon: '📊',
        desc: 'Interactive KPI cards & dynamic SVG telemetry charts',
        html: `<section id="analytics" style="padding:100px 24px;background:#050510;color:#f3f4f6;font-family:'Plus Jakarta Sans',sans-serif;position:relative;overflow:hidden;">
  <!-- Google Fonts & FontAwesome -->
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:60px;">
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;margin-bottom:16px;background:linear-gradient(135deg,#fff,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Business Analytics Dashboard</h2>
      <p style="color:#8b8ba8;font-size:1.1rem;max-width:600px;margin:0 auto;">Real-time analytics pipelines displaying conversion, engagement rates, and live operational stats.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:24px;">
      <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;">
        <div style="font-size:0.85rem;color:#8b8ba8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Monthly Revenue</div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:700;margin-bottom:8px;" id="kpi-rev-block">$128,492</div>
        <span style="font-size:0.8rem;display:inline-flex;align-items:center;gap:4px;padding:4px 8px;border-radius:99px;font-weight:600;background:rgba(16,185,129,0.1);color:#10b981;"><i class="fa-solid fa-arrow-trend-up"></i> +12.4%</span>
      </div>
      <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;">
        <div style="font-size:0.85rem;color:#8b8ba8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Active Customers</div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:700;margin-bottom:8px;" id="kpi-users-block">4,892</div>
        <span style="font-size:0.8rem;display:inline-flex;align-items:center;gap:4px;padding:4px 8px;border-radius:99px;font-weight:600;background:rgba(16,185,129,0.1);color:#10b981;"><i class="fa-solid fa-arrow-trend-up"></i> +4.8%</span>
      </div>
      <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;">
        <div style="font-size:0.85rem;color:#8b8ba8;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:12px;">Conversion Rate</div>
        <div style="font-family:'Space Grotesk',sans-serif;font-size:2.2rem;font-weight:700;margin-bottom:8px;" id="kpi-conv-block">3.2%</div>
        <span style="font-size:0.8rem;display:inline-flex;align-items:center;gap:4px;padding:4px 8px;border-radius:99px;font-weight:600;background:rgba(16,185,129,0.1);color:#10b981;"><i class="fa-solid fa-arrow-trend-up"></i> +1.1%</span>
      </div>
    </div>

    <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.2rem;">Visitor Traffic vs Conversions</h3>
        <div>
          <button class="btn btn-primary" onclick="simulateNewSaleBlock()" style="padding:6px 14px;font-size:0.8rem;border-radius:6px;margin-right:12px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;cursor:pointer;font-weight:600;">
            <i class="fa-solid fa-circle-plus"></i> Simulate Order
          </button>
          <select style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);color:#f3f4f6;padding:6px 12px;border-radius:8px;outline:none;font-size:0.85rem;cursor:pointer;" id="timeframe-block" onchange="updateChartBlock()">
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;">
        <div style="height:260px;position:relative;">
          <svg id="svg-line-chart-block" viewBox="0 0 600 240" style="width:100%;height:100%;overflow:visible;">
            <defs>
              <linearGradient id="chart-grad-block" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3"></stop>
                <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
            <path id="chart-line-path-block" d="M 0,200 Q 100,120 200,150 T 400,80 T 600,120 L 600,240 L 0,240 Z" fill="url(#chart-grad-block)"></path>
            <path id="chart-stroke-path-block" d="M 0,200 Q 100,120 200,150 T 400,80 T 600,120" fill="none" stroke="#8b5cf6" stroke-width="3" stroke-linecap="round"></path>
          </svg>
        </div>
        
        <div style="height:260px;display:flex;align-items:flex-end;justify-content:space-around;padding-bottom:20px;border-left:1px solid rgba(255,255,255,0.06);">
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div id="bar-organic-block" style="width:24px;height:160px;background:linear-gradient(to top,#06b6d4,#8b5cf6);border-radius:6px;transition:height 0.4s ease;"></div>
            <span style="font-size:0.75rem;color:#8b8ba8;margin-top:8px;">Organic</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div id="bar-referral-block" style="width:24px;height:80px;background:linear-gradient(to top,#06b6d4,#8b5cf6);border-radius:6px;transition:height 0.4s ease;"></div>
            <span style="font-size:0.75rem;color:#8b8ba8;margin-top:8px;">Direct</span>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;">
            <div id="bar-social-block" style="width:24px;height:110px;background:linear-gradient(to top,#06b6d4,#8b5cf6);border-radius:6px;transition:height 0.4s ease;"></div>
            <span style="font-size:0.75rem;color:#8b8ba8;margin-top:8px;">Social</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
    function updateChartBlock() {
      const select = document.getElementById('timeframe-block');
      const chartPeriod = select.value;
      
      const linePath = document.getElementById('chart-line-path-block');
      const strokePath = document.getElementById('chart-stroke-path-block');
      
      if (chartPeriod === '24h') {
        linePath.setAttribute('d', 'M 0,200 Q 100,120 200,150 T 400,80 T 600,120 L 600,240 L 0,240 Z');
        strokePath.setAttribute('d', 'M 0,200 Q 100,120 200,150 T 400,80 T 600,120');
        document.getElementById('bar-organic-block').style.height = '160px';
        document.getElementById('bar-referral-block').style.height = '80px';
        document.getElementById('bar-social-block').style.height = '110px';
      } else if (chartPeriod === '7d') {
        linePath.setAttribute('d', 'M 0,160 Q 120,60 220,180 T 440,110 T 600,60 L 600,240 L 0,240 Z');
        strokePath.setAttribute('d', 'M 0,160 Q 120,60 220,180 T 440,110 T 600,60');
        document.getElementById('bar-organic-block').style.height = '120px';
        document.getElementById('bar-referral-block').style.height = '150px';
        document.getElementById('bar-social-block').style.height = '90px';
      } else {
        linePath.setAttribute('d', 'M 0,100 Q 80,180 200,90 T 380,140 T 600,70 L 600,240 L 0,240 Z');
        strokePath.setAttribute('d', 'M 0,100 Q 80,180 200,90 T 380,140 T 600,70');
        document.getElementById('bar-organic-block').style.height = '90px';
        document.getElementById('bar-referral-block').style.height = '110px';
        document.getElementById('bar-social-block').style.height = '170px';
      }
    }

    let revenueValBlock = 128492;
    let salesCountBlock = 4892;
    function simulateNewSaleBlock() {
      revenueValBlock += Math.floor(Math.random() * 400) + 100;
      salesCountBlock += 1;
      
      document.getElementById('kpi-rev-block').innerText = '$' + revenueValBlock.toLocaleString();
      document.getElementById('kpi-users-block').innerText = salesCountBlock.toLocaleString();
      
      const rate = (3.2 + (Math.random() * 0.2)).toFixed(1);
      document.getElementById('kpi-conv-block').innerText = rate + '%';
    }
  </script>
</section>`,
      },
      {
        id: 'ai-recommendations',
        label: 'Product Recommendations',
        icon: '🪄',
        desc: 'Interactive recommendations showcase with laser scan overlay animations',
        html: `<section id="recommendations" style="padding:100px 24px;background:#050512;color:#f3f4f6;font-family:'Plus Jakarta Sans',sans-serif;">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:60px;">
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;margin-bottom:16px;background:linear-gradient(135deg,#fff,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">AI Recommendations Engine</h2>
      <p style="color:#8b8ba8;font-size:1.1rem;max-width:600px;margin:0 auto;">Tailored solution blueprints and product configurations matching customer criteria in real time.</p>
    </div>

    <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;">
      <div style="display:flex;gap:16px;margin-bottom:32px;align-items:center;flex-wrap:wrap;">
        <div style="display:flex;gap:8px;background:rgba(0,0,0,0.2);padding:4px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);">
          <button class="persona-tab-block active" onclick="selectPersonaBlock('dev', this)" style="padding:8px 16px;border:none;background:transparent;color:#8b8ba8;font-size:0.85rem;font-weight:600;cursor:pointer;border-radius:8px;transition:all 0.2s;">💻 Developer</button>
          <button class="persona-tab-block" onclick="selectPersonaBlock('creative', this)" style="padding:8px 16px;border:none;background:transparent;color:#8b8ba8;font-size:0.85rem;font-weight:600;cursor:pointer;border-radius:8px;transition:all 0.2s;">🎨 Creator</button>
          <button class="persona-tab-block" onclick="selectPersonaBlock('marketer', this)" style="padding:8px 16px;border:none;background:transparent;color:#8b8ba8;font-size:0.85rem;font-weight:600;cursor:pointer;border-radius:8px;transition:all 0.2s;">📈 Marketer</button>
          <button class="persona-tab-block" onclick="selectPersonaBlock('business', this)" style="padding:8px 16px;border:none;background:transparent;color:#8b8ba8;font-size:0.85rem;font-weight:600;cursor:pointer;border-radius:8px;transition:all 0.2s;">🚀 Founder</button>
        </div>
        <div style="display:flex;flex:1;gap:8px;min-width:280px;">
          <input type="text" id="rec-search-block" placeholder="Describe your stack requirements..." style="flex:1;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;color:white;outline:none;font-size:0.9rem;transition:border-color 0.2s;">
          <button onclick="triggerRecommendationAnalysisBlock()" style="padding:10px 20px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;border-radius:10px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Recommend
          </button>
        </div>
      </div>

      <div style="position:relative;min-height:280px;">
        <!-- Laser Scan Line -->
        <div id="rec-scan-block" style="position:absolute;top:0;left:0;width:100%;height:4px;background:linear-gradient(90deg,transparent,#06b6d4,transparent);z-index:10;opacity:0;box-shadow:0 0 12px #06b6d4;"></div>
        
        <div id="rec-grid-block" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;transition:opacity 0.3s;">
          <div style="background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;text-align:left;display:flex;flex-direction:column;height:100%;">
            <span style="align-self:flex-start;font-size:0.75rem;font-weight:700;color:#10b981;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:99px;margin-bottom:16px;border:1px solid rgba(16,185,129,0.2);">99.2% MATCH</span>
            <h4 style="font-size:1.15rem;margin-bottom:8px;color:white;">Serverless Compute Core</h4>
            <p style="color:#8b8ba8;font-size:0.85rem;line-height:1.6;margin-bottom:16px;">Scale from zero to millions of active tasks instantly. Optimized latency configurations.</p>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;">
              <span style="font-weight:700;color:white;">$0.0002 / run</span>
              <a href="#" style="padding:6px 12px;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.2));border:1px solid rgba(255,255,255,0.08);color:white;border-radius:99px;font-weight:600;font-size:0.8rem;text-decoration:none;">Add</a>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;text-align:left;display:flex;flex-direction:column;height:100%;">
            <span style="align-self:flex-start;font-size:0.75rem;font-weight:700;color:#10b981;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:99px;margin-bottom:16px;border:1px solid rgba(16,185,129,0.2);">97.8% MATCH</span>
            <h4 style="font-size:1.15rem;margin-bottom:8px;color:white;">Edge Telemetry Agent</h4>
            <p style="color:#8b8ba8;font-size:0.85rem;line-height:1.6;margin-bottom:16px;">Real-time logs collection and automated filtering directly at the edge locations.</p>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;">
              <span style="font-weight:700;color:white;">$19 / mo</span>
              <a href="#" style="padding:6px 12px;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.2));border:1px solid rgba(255,255,255,0.08);color:white;border-radius:99px;font-weight:600;font-size:0.8rem;text-decoration:none;">Add</a>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;text-align:left;display:flex;flex-direction:column;height:100%;">
            <span style="align-self:flex-start;font-size:0.75rem;font-weight:700;color:#10b981;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:99px;margin-bottom:16px;border:1px solid rgba(16,185,129,0.2);">95.4% MATCH</span>
            <h4 style="font-size:1.15rem;margin-bottom:8px;color:white;">CognitiveDB Graph</h4>
            <p style="color:#8b8ba8;font-size:0.85rem;line-height:1.6;margin-bottom:16px;">Graph database for neural-network relationships with microsecond query times.</p>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;">
              <span style="font-weight:700;color:white;">$49 / mo</span>
              <a href="#" style="padding:6px 12px;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.2));border:1px solid rgba(255,255,255,0.08);color:white;border-radius:99px;font-weight:600;font-size:0.8rem;text-decoration:none;">Add</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <style>
    .persona-tab-block.active {
      background: #8b5cf6 !important;
      color: white !important;
    }
  </style>

  <script>
    function selectPersonaBlock(personaId, element) {
      document.querySelectorAll('.persona-tab-block').forEach(t => t.classList.remove('active'));
      element.classList.add('active');
      triggerRecommendationAnalysisBlock();
    }

    function triggerRecommendationAnalysisBlock() {
      const scanner = document.getElementById('rec-scan-block');
      const grid = document.getElementById('rec-grid-block');
      
      scanner.style.opacity = '1';
      scanner.style.top = '0%';
      grid.style.opacity = '0.3';
      
      let pos = 0;
      const id = setInterval(() => {
        if (pos >= 100) {
          clearInterval(id);
          scanner.style.opacity = '0';
          grid.style.opacity = '1';
          loadNewRecommendationsBlock();
        } else {
          pos += 4;
          scanner.style.top = pos + '%';
        }
      }, 15);
    }

    const mockPoolBlock = [
      { name: "AuthSecure Shield", desc: "Enterprise-grade authorization and authentication adapter configured for federated login.", price: "$39/mo", rate: "99.1% MATCH" },
      { name: "Node Telemetry Broker", desc: "Data streaming and mapping middleware with automated queue balancing.", price: "$29/mo", rate: "98.4% MATCH" },
      { name: "Cognitive Vector Search", desc: "Semantic retrieval vector database supporting 1536-dimensional embeddings.", price: "$89/mo", rate: "96.5% MATCH" },
      { name: "Media Assets Optimizer", desc: "Real-time images compression, conversion and edge delivery proxy.", price: "$12/mo", rate: "95.1% MATCH" },
      { name: "Serverless Cache Node", desc: "Low latency key-value store cache network deployable in 30+ regions.", price: "$8/mo", rate: "93.2% MATCH" }
    ];

    function loadNewRecommendationsBlock() {
      const shuffled = [...mockPoolBlock].sort(() => 0.5 - Math.random()).slice(0, 3);
      const grid = document.getElementById('rec-grid-block');
      grid.innerHTML = '';
      
      shuffled.forEach(item => {
        grid.innerHTML += '<div style="background:rgba(255,255,255,0.01);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;text-align:left;display:flex;flex-direction:column;height:100%;">' +
            '<span style="align-self:flex-start;font-size:0.75rem;font-weight:700;color:#10b981;background:rgba(16,185,129,0.1);padding:4px 10px;border-radius:99px;margin-bottom:16px;border:1px solid rgba(16,185,129,0.2);">' + item.rate + '</span>' +
            '<h4 style="font-size:1.15rem;margin-bottom:8px;color:white;">' + item.name + '</h4>' +
            '<p style="color:#8b8ba8;font-size:0.85rem;line-height:1.6;margin-bottom:16px;">' + item.desc + '</p>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;">' +
              '<span style="font-weight:700;color:white;">' + item.price + '</span>' +
              '<a href="#" style="padding:6px 12px;background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.2));border:1px solid rgba(255,255,255,0.08);color:white;border-radius:99px;font-weight:600;font-size:0.8rem;text-decoration:none;">Add</a>' +
            '</div>' +
          '</div>';
      });
    }
  </script>
</section>`,
      },
      {
        id: 'ai-business-management',
        label: 'Business Management',
        icon: '💼',
        desc: 'Product inventory list, addition modal & live telemetry operations logging feed',
        html: `<section id="management" style="padding:100px 24px;background:#08081a;color:#f3f4f6;font-family:'Plus Jakarta Sans',sans-serif;">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:60px;">
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;margin-bottom:16px;background:linear-gradient(135deg,#fff,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Digital Business Console</h2>
      <p style="color:#8b8ba8;font-size:1.1rem;max-width:600px;margin:0 auto;">Manage product inventories, operations statuses, and review live workflow hooks outputs.</p>
    </div>

    <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;">
      <!-- Inventory -->
      <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.25rem;">Active Inventory</h3>
          <button onclick="toggleModalConsole(true)" style="padding:8px 16px;font-size:0.85rem;border-radius:8px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;cursor:pointer;font-weight:600;">
            <i class="fa-solid fa-plus"></i> Add Product
          </button>
        </div>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;text-align:left;">
            <thead>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.06);">
                <th style="padding:16px;color:#8b8ba8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;">Product Name</th>
                <th style="padding:16px;color:#8b8ba8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;">SKU</th>
                <th style="padding:16px;color:#8b8ba8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;">Price</th>
                <th style="padding:16px;color:#8b8ba8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;">Status</th>
                <th style="padding:16px;color:#8b8ba8;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;">Actions</th>
              </tr>
            </thead>
            <tbody id="inventory-tbody-console">
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                <td style="padding:16px;font-weight:600;font-size:0.9rem;">Cognitive Flow Pro</td>
                <td style="padding:16px;font-family:monospace;font-size:0.9rem;">CF-PRO-01</td>
                <td style="padding:16px;font-size:0.9rem;">$99.00</td>
                <td style="padding:16px;font-size:0.9rem;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background-color:#10b981;"></span>Active</td>
                <td style="padding:16px;"><button onclick="simulateRestockConsole(this)" style="padding:4px 10px;font-size:0.75rem;border-radius:4px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:white;cursor:pointer;">Restock</button></td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                <td style="padding:16px;font-weight:600;font-size:0.9rem;">Serverless API Agent</td>
                <td style="padding:16px;font-family:monospace;font-size:0.9rem;">API-AGT-02</td>
                <td style="padding:16px;font-size:0.9rem;">$29.00</td>
                <td style="padding:16px;font-size:0.9rem;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background-color:#10b981;"></span>Active</td>
                <td style="padding:16px;"><button onclick="simulateRestockConsole(this)" style="padding:4px 10px;font-size:0.75rem;border-radius:4px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:white;cursor:pointer;">Restock</button></td>
              </tr>
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                <td style="padding:16px;font-weight:600;font-size:0.9rem;">Edge CDN Connector</td>
                <td style="padding:16px;font-family:monospace;font-size:0.9rem;">EDG-CDN-03</td>
                <td style="padding:16px;font-size:0.9rem;">$15.00</td>
                <td style="padding:16px;font-size:0.9rem;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background-color:#f59e0b;"></span>Low Stock</td>
                <td style="padding:16px;"><button onclick="simulateRestockConsole(this)" style="padding:4px 10px;font-size:0.75rem;border-radius:4px;background:rgba(255,255,255,0.03);border:1px solid rgba(245,158,11,0.2);color:#f59e0b;cursor:pointer;">Restock</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Logs -->
      <div style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;display:flex;flex-direction:column;max-height:380px;">
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.2rem;margin-bottom:16px;text-align:left;">Live Operations Feed</h3>
        <div id="log-feed-console" style="flex:1;overflow-y:auto;font-family:monospace;font-size:0.8rem;display:flex;flex-direction:column;gap:12px;text-align:left;max-height:280px;">
          <div style="color:#a0a0c0;line-height:1.4;"><span style="color:#06b6d4;">[15:32:00]</span> Operations pipeline initialized.</div>
          <div style="color:#a0a0c0;line-height:1.4;"><span style="color:#06b6d4;">[15:32:05]</span> Analytics data synchronizing...</div>
          <div style="color:#a0a0c0;line-height:1.4;"><span style="color:#06b6d4;">[15:32:06]</span> Active database clusters status: 100% OK</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Form Modal -->
  <div id="product-modal-console" style="position:fixed;inset:0;background:rgba(5,5,15,0.85);backdrop-filter:blur(8px);z-index:10000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.3s;">
    <div style="background:#090916;border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:36px;max-width:450px;width:90%;">
      <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.4rem;margin-bottom:24px;text-align:left;color:white;">Add New Product</h3>
      <form onsubmit="addNewProductConsole(event)">
        <div style="margin-bottom:20px;text-align:left;">
          <label style="display:block;font-size:0.8rem;color:#8b8ba8;font-weight:600;margin-bottom:8px;text-transform:uppercase;">Product Name</label>
          <input type="text" id="p-name-console" style="width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;color:white;outline:none;" placeholder="e.g. AuthSecure Shield" required>
        </div>
        <div style="margin-bottom:20px;text-align:left;">
          <label style="display:block;font-size:0.8rem;color:#8b8ba8;font-weight:600;margin-bottom:8px;text-transform:uppercase;">SKU Code</label>
          <input type="text" id="p-sku-console" style="width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;color:white;outline:none;" placeholder="e.g. AUTH-SEC-09" required>
        </div>
        <div style="margin-bottom:20px;text-align:left;">
          <label style="display:block;font-size:0.8rem;color:#8b8ba8;font-weight:600;margin-bottom:8px;text-transform:uppercase;">Price ($)</label>
          <input type="number" step="0.01" id="p-price-console" style="width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;color:white;outline:none;" placeholder="e.g. 49.00" required>
        </div>
        <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:24px;">
          <button type="button" onclick="toggleModalConsole(false)" style="padding:10px 20px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:white;border-radius:10px;cursor:pointer;">Cancel</button>
          <button type="submit" style="padding:10px 20px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:600;">Add Item</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    function toggleModalConsole(show) {
      const modal = document.getElementById('product-modal-console');
      if (show) {
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'auto';
      } else {
        modal.style.opacity = '0';
        modal.style.pointerEvents = 'none';
      }
    }

    function logEventConsole(text) {
      const feed = document.getElementById('log-feed-console');
      if (!feed) return;
      const now = new Date();
      const timeStr = '[' + now.toTimeString().split(' ')[0] + ']';
      const div = document.createElement('div');
      div.style.color = '#a0a0c0';
      div.style.lineHeight = '1.4';
      div.innerHTML = '<span style="color:#06b6d4;">' + timeStr + '</span> ' + text;
      feed.appendChild(div);
      feed.scrollTop = feed.scrollHeight;
    }

    function addNewProductConsole(e) {
      e.preventDefault();
      const name = document.getElementById('p-name-console').value;
      const sku = document.getElementById('p-sku-console').value;
      const price = parseFloat(document.getElementById('p-price-console').value).toFixed(2);
      
      const tbody = document.getElementById('inventory-tbody-console');
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
      tr.style.opacity = '0';
      tr.style.transform = 'translateY(10px)';
      tr.style.transition = 'all 0.3s';
      tr.innerHTML = '<td style="padding:16px;font-weight:600;font-size:0.9rem;">' + name + '</td>' +
        '<td style="padding:16px;font-family:monospace;font-size:0.9rem;">' + sku + '</td>' +
        '<td style="padding:16px;font-size:0.9rem;">$' + price + '</td>' +
        '<td style="padding:16px;font-size:0.9rem;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background-color:#10b981;"></span>Active</td>' +
        '<td style="padding:16px;"><button onclick="simulateRestockConsole(this)" style="padding:4px 10px;font-size:0.75rem;border-radius:4px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:white;cursor:pointer;">Restock</button></td>';
      
      tbody.appendChild(tr);
      
      setTimeout(() => {
        tr.style.opacity = '1';
        tr.style.transform = 'translateY(0)';
      }, 50);

      toggleModalConsole(false);
      logEventConsole('New inventory item added: ' + name + ' (SKU: ' + sku + ')');
      
      document.getElementById('p-name-console').value = '';
      document.getElementById('p-sku-console').value = '';
      document.getElementById('p-price-console').value = '';
    }

    function simulateRestockConsole(btn) {
      const tr = btn.closest('tr');
      const name = tr.querySelector('td').innerText;
      const statusCell = tr.querySelectorAll('td')[3];
      statusCell.innerHTML = '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background-color:#10b981;"></span>Active';
      btn.style.color = 'white';
      btn.style.borderColor = 'rgba(255,255,255,0.08)';
      
      logEventConsole('Restocked item: ' + name + ' (Replenished warehouse levels to 100%)');
      alert('Inventory levels replenished for: ' + name);
    }
  </script>
</section>`,
      },
      {
        id: 'ai-workflows',
        label: 'Automated Workflows',
        icon: '⚡',
        desc: 'Interactive pipeline nodes diagram showing triggered signal animations',
        html: `<section id="workflows" style="padding:100px 24px;background:#09091b;color:#f3f4f6;font-family:'Plus Jakarta Sans',sans-serif;position:relative;">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:60px;">
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;margin-bottom:16px;background:linear-gradient(135deg,#fff,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Automated Workflows</h2>
      <p style="color:#8b8ba8;font-size:1.1rem;max-width:600px;margin:0 auto;">Design and visually check automation sequences linking events, branches, and outcomes.</p>
    </div>

    <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;position:relative;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;">
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.25rem;">Visual Pipeline Canvas</h3>
        <div style="display:flex;gap:12px;">
          <button onclick="addNewWorkflowStepConsole()" style="padding:8px 16px;font-size:0.85rem;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:white;cursor:pointer;font-weight:600;">
            <i class="fa-solid fa-plus-circle"></i> Add custom node
          </button>
          <button onclick="simulateWorkflowTriggerConsole()" style="padding:8px 16px;font-size:0.85rem;border-radius:8px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;cursor:pointer;font-weight:600;">
            <i class="fa-solid fa-play"></i> Test Workflow
          </button>
        </div>
      </div>

      <div id="workflow-canvas-container-console" style="position:relative;background:radial-gradient(rgba(255,255,255,0.05) 1px,transparent 1px);background-size:20px 20px;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:48px;min-height:380px;display:flex;justify-content:space-between;align-items:center;gap:32px;overflow:hidden;">
        <!-- Connections SVG -->
        <svg id="workflow-svg-block" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;">
          <path d="M 230 190 H 330" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none" id="line-1-c"></path>
          <path d="M 550 190 H 650" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none" id="line-2-c"></path>
          <path d="M 870 190 H 970" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none" id="line-3-c"></path>
        </svg>

        <div id="pulse-dot-console" style="width:10px;height:10px;background:#d946ef;border-radius:50%;position:absolute;box-shadow:0 0 12px #d946ef;opacity:0;z-index:2;"></div>

        <!-- Node 1 -->
        <div class="node-card-console" id="node-1-c" style="width:200px;background:rgba(9,9,24,0.8);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;position:relative;z-index:2;transition:all 0.3s ease;text-align:center;">
          <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.2rem;background:rgba(139,92,246,0.15);color:#8b5cf6;">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:700;margin-bottom:4px;">Stripe Webhook</div>
          <div style="font-size:0.75rem;color:#8b8ba8;">Trigger: Order Placed</div>
        </div>

        <!-- Node 2 -->
        <div class="node-card-console" id="node-2-c" style="width:200px;background:rgba(9,9,24,0.8);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;position:relative;z-index:2;transition:all 0.3s ease;text-align:center;">
          <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.2rem;background:rgba(6,182,212,0.15);color:#06b6d4;">
            <i class="fa-solid fa-filter"></i>
          </div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:700;margin-bottom:4px;">Rule Engine</div>
          <div style="font-size:0.75rem;color:#8b8ba8;">Condition: Price > $50</div>
        </div>

        <!-- Node 3 -->
        <div class="node-card-console" id="node-3-c" style="width:200px;background:rgba(9,9,24,0.8);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;position:relative;z-index:2;transition:all 0.3s ease;text-align:center;">
          <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.2rem;background:rgba(236,72,153,0.15);color:#d946ef;">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:0.9rem;font-weight:700;margin-bottom:4px;">CRM Dispatcher</div>
          <div style="font-size:0.75rem;color:#8b8ba8;">Action: Sync Profile</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    function simulateWorkflowTriggerConsole() {
      const dot = document.getElementById('pulse-dot-console');
      const node1 = document.getElementById('node-1-c');
      const node2 = document.getElementById('node-2-c');
      const node3 = document.getElementById('node-3-c');

      document.querySelectorAll('.node-card-console').forEach(n => {
        n.style.borderColor = 'rgba(255,255,255,0.08)';
        n.style.boxShadow = 'none';
      });
      
      // Node 1 active
      node1.style.borderColor = '#8b5cf6';
      node1.style.boxShadow = '0 0 20px rgba(139,92,246,0.3)';
      
      dot.style.opacity = '1';
      dot.style.left = '150px';
      dot.style.top = '185px';
      
      // Node 1 -> Node 2
      setTimeout(() => {
        dot.style.left = '450px';
        node1.style.borderColor = '#10b981';
        node1.style.boxShadow = '0 0 20px rgba(16,185,129,0.3)';
        node2.style.borderColor = '#06b6d4';
        node2.style.boxShadow = '0 0 20px rgba(6,182,212,0.3)';
      }, 1000);
      
      // Node 2 -> Node 3
      setTimeout(() => {
        dot.style.left = '750px';
        node2.style.borderColor = '#10b981';
        node2.style.boxShadow = '0 0 20px rgba(16,185,129,0.3)';
        node3.style.borderColor = '#d946ef';
        node3.style.boxShadow = '0 0 20px rgba(217,70,239,0.3)';
      }, 2000);

      // Complete
      setTimeout(() => {
        dot.style.left = '1000px';
        dot.style.opacity = '0';
        node3.style.borderColor = '#10b981';
        node3.style.boxShadow = '0 0 20px rgba(16,185,129,0.3)';
        alert('Automation workflow executed with success!');
      }, 3000);
    }

    function addNewWorkflowStepConsole() {
      const name = prompt("Enter workflow step name (e.g. Slack Dispatch, SMTP Mailer):", "Mailer Node");
      if(!name) return;
      
      const container = document.getElementById('workflow-canvas-container-console');
      const node = document.createElement('div');
      node.className = 'node-card-console';
      node.id = 'node-' + (document.querySelectorAll('.node-card-console').length + 1) + '-c';
      node.style.width = '200px';
      node.style.background = 'rgba(9,9,24,0.8)';
      node.style.border = '1px solid rgba(255,255,255,0.08)';
      node.style.borderRadius = '12px';
      node.style.padding = '16px';
      node.style.position = 'relative';
      node.style.zIndex = '2';
      node.style.transition = 'all 0.3s ease';
      node.style.textAlign = 'center';
      
      node.innerHTML = '<div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:1.2rem;background:rgba(16,185,129,0.15);color:#10b981;">' +
          '<i class="fa-solid fa-server"></i>' +
        '</div>' +
        '<div style="font-family:\'Space Grotesk\',sans-serif;font-size:0.9rem;font-weight:700;margin-bottom:4px;">' + name + '</div>' +
        '<div style="font-size:0.75rem;color:#8b8ba8;">Action: Custom Webhook</div>';
      
      const svg = document.getElementById('workflow-svg-block');
      const startX = 230 + (220 * (document.querySelectorAll('.node-card-console').length - 1));
      const endX = startX + 100;
      
      svg.innerHTML += '<path d="M ' + startX + ' 190 H ' + endX + '" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none"></path>';
      container.appendChild(node);
    }
  </script>
</section>`,
      },
      {
        id: 'ai-customer-portal',
        label: 'Customer Portal',
        icon: '🔐',
        desc: 'Shipment timelines, blurred API credentials generator & profile editor settings panel',
        html: `<section id="portal" style="padding:100px 24px;background:#050512;color:#f3f4f6;font-family:'Plus Jakarta Sans',sans-serif;">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <div style="max-width:1200px;margin:0 auto;">
    <div style="text-align:center;margin-bottom:60px;">
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:2.5rem;font-weight:700;margin-bottom:16px;background:linear-gradient(135deg,#fff,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Secure Customer Portal</h2>
      <p style="color:#8b8ba8;font-size:1.1rem;max-width:600px;margin:0 auto;">Secure client-facing space to check past order states, profile settings, and manage API integrations.</p>
    </div>

    <div style="background:rgba(18,18,38,0.4);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;display:grid;grid-template-columns:260px 1fr;gap:32px;">
      <!-- Menu -->
      <div style="display:flex;flex-direction:column;gap:8px;text-align:left;">
        <button class="portal-menu-btn-block active" onclick="switchPortalTabBlock('tracking', this)" style="padding:12px 18px;background:transparent;border:1px solid transparent;border-radius:10px;color:#8b8ba8;font-weight:600;font-size:0.9rem;cursor:pointer;text-align:left;transition:all 0.2s;display:flex;align-items:center;gap:12px;">
          <i class="fa-solid fa-truck"></i> Order Tracker
        </button>
        <button class="portal-menu-btn-block" onclick="switchPortalTabBlock('apikeys', this)" style="padding:12px 18px;background:transparent;border:1px solid transparent;border-radius:10px;color:#8b8ba8;font-weight:600;font-size:0.9rem;cursor:pointer;text-align:left;transition:all 0.2s;display:flex;align-items:center;gap:12px;">
          <i class="fa-solid fa-key"></i> Developer Keys
        </button>
        <button class="portal-menu-btn-block" onclick="switchPortalTabBlock('profile', this)" style="padding:12px 18px;background:transparent;border:1px solid transparent;border-radius:10px;color:#8b8ba8;font-weight:600;font-size:0.9rem;cursor:pointer;text-align:left;transition:all 0.2s;display:flex;align-items:center;gap:12px;">
          <i class="fa-solid fa-user-gear"></i> Account Settings
        </button>
      </div>

      <!-- Tab Content -->
      <div>
        <!-- Order Tracker -->
        <div class="portal-pane-block active" id="portal-tab-tracking-block">
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.3rem;margin-bottom:24px;">Shipment Tracking</h3>
          
          <div style="display:flex;justify-content:space-between;position:relative;margin-bottom:40px;padding:0 20px;">
            <div style="position:absolute;top:20px;left:40px;right:40px;height:2px;background:rgba(255,255,255,0.06);z-index:1;"></div>
            <div id="step-prog-bar-block" style="position:absolute;top:20px;left:40px;width:33%;height:2px;background:#10b981;z-index:2;transition:width 0.4s ease;box-shadow:0 0 10px #10b981;"></div>
            
            <div class="step-block completed" id="s-0" style="display:flex;flex-direction:column;align-items:center;z-index:3;">
              <div class="sc" style="width:40px;height:40px;border-radius:50%;background:#10b981;border:2px solid #10b981;display:flex;align-items:center;justify-content:center;font-size:0.95rem;font-weight:700;color:white;box-shadow:0 0 15px rgba(16,185,129,0.4);"><i class="fa-solid fa-receipt"></i></div>
              <div style="margin-top:12px;font-size:0.8rem;font-weight:600;color:white;">Created</div>
            </div>
            <div class="step-block active" id="s-1" style="display:flex;flex-direction:column;align-items:center;z-index:3;">
              <div class="sc" style="width:40px;height:40px;border-radius:50%;background:#0f0f20;border:2px solid #06b6d4;display:flex;align-items:center;justify-content:center;font-size:0.95rem;font-weight:700;color:#06b6d4;box-shadow:0 0 15px rgba(6, 182, 212, 0.4);"><i class="fa-solid fa-gears"></i></div>
              <div style="margin-top:12px;font-size:0.8rem;font-weight:600;color:white;">Processing</div>
            </div>
            <div class="step-block" id="s-2" style="display:flex;flex-direction:column;align-items:center;z-index:3;">
              <div class="sc" style="width:40px;height:40px;border-radius:50%;background:#0f0f20;border:2px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:0.95rem;font-weight:700;color:#8b8ba8;"><i class="fa-solid fa-truck-ramp-box"></i></div>
              <div style="margin-top:12px;font-size:0.8rem;font-weight:600;color:#8b8ba8;">Shipped</div>
            </div>
            <div class="step-block" id="s-3" style="display:flex;flex-direction:column;align-items:center;z-index:3;">
              <div class="sc" style="width:40px;height:40px;border-radius:50%;background:#0f0f20;border:2px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:0.95rem;font-weight:700;color:#8b8ba8;"><i class="fa-solid fa-house-chimney-user"></i></div>
              <div style="margin-top:12px;font-size:0.8rem;font-weight:600;color:#8b8ba8;">Delivered</div>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.02);padding:20px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
            <div>
              <h4 style="font-size:0.95rem;font-weight:700;">Order ID: #WF-2026-98A</h4>
              <p style="font-size:0.8rem;color:#8b8ba8;margin-top:4px;">Tracking: USPS Priority #9205590111244</p>
            </div>
            <button onclick="advanceShipmentStateBlock()" style="padding:10px 18px;font-size:0.85rem;border-radius:8px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;cursor:pointer;font-weight:600;">
              Advance State
            </button>
          </div>
        </div>

        <!-- API Keys -->
        <div class="portal-pane-block" id="portal-tab-apikeys-block" style="display:none;">
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.3rem;margin-bottom:8px;">Developer Credentials</h3>
          <p style="color:#8b8ba8;font-size:0.85rem;margin-bottom:24px;">Use API credentials to integrate CognitiveFlow automation actions into exterior webhooks endpoints.</p>
          
          <div style="text-align:left;">
            <label style="font-size:0.75rem;font-weight:700;color:#8b8ba8;text-transform:uppercase;">API Secret Key</label>
            <div style="display:flex;align-items:center;background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.08);padding:12px 18px;border-radius:10px;font-family:monospace;font-size:0.95rem;gap:16px;justify-content:space-between;margin-top:12px;">
              <span id="api-key-value-block" style="filter:blur(5px);transition:filter 0.2s;">mock_sk_51Nc9FpL23K9G874XzP1m9K087Fp41NzLp</span>
              <div style="display:flex;gap:12px;">
                <button onclick="toggleApiKeyRevealBlock()" style="background:transparent;border:none;color:#8b8ba8;cursor:pointer;font-size:1.1rem;"><i class="fa-solid fa-eye" id="eye-icon-block"></i></button>
                <button onclick="copyApiKeyBlock()" style="background:transparent;border:none;color:#8b8ba8;cursor:pointer;font-size:1.1rem;"><i class="fa-solid fa-copy"></i></button>
              </div>
            </div>
            <button onclick="regenerateApiKeyBlock()" style="margin-top:16px;padding:8px 16px;font-size:0.8rem;border-radius:6px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);color:white;cursor:pointer;">
              Regenerate credentials
            </button>
          </div>
        </div>

        <!-- Account Profile -->
        <div class="portal-pane-block" id="portal-tab-profile-block" style="display:none;">
          <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.3rem;margin-bottom:24px;">Profile Configurations</h3>
          
          <div style="display:flex;gap:24px;align-items:center;margin-bottom:24px;">
            <div id="user-avatar-block" style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:2.2rem;font-weight:700;color:white;border:2px solid rgba(255,255,255,0.08);">
              JD
            </div>
            <div>
              <h4 id="username-display-block" style="font-size:1.1rem;font-weight:700;color:white;">John Doe</h4>
              <p style="font-size:0.8rem;color:#8b8ba8;">Role: Account Owner • Enterprise Tier</p>
            </div>
          </div>

          <form onsubmit="event.preventDefault(); saveProfileSettingsBlock();">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">
              <div style="margin-bottom:20px;text-align:left;">
                <label style="display:block;font-size:0.8rem;color:#8b8ba8;font-weight:600;margin-bottom:8px;text-transform:uppercase;">Full Name</label>
                <input type="text" id="prof-name-block" value="John Doe" style="width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;color:white;outline:none;">
              </div>
              <div style="margin-bottom:20px;text-align:left;">
                <label style="display:block;font-size:0.8rem;color:#8b8ba8;font-weight:600;margin-bottom:8px;text-transform:uppercase;">Billing Email</label>
                <input type="email" value="john.doe@enterprise.com" style="width:100%;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;color:white;outline:none;">
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <label style="font-size:0.8rem;color:#8b8ba8;display:flex;align-items:center;gap:8px;">
                  Avatar color: 
                  <input type="color" onchange="changeAvatarColorBlock(this.value)" value="#8b5cf6" style="border:none;cursor:pointer;width:24px;height:24px;border-radius:4px;background:none;">
                </label>
              </div>
              <button type="submit" style="padding:10px 20px;font-size:0.85rem;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;border-radius:10px;cursor:pointer;font-weight:600;">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <style>
    .portal-menu-btn-block.active {
      color: #8b5cf6 !important;
      background: rgba(139,92,246,0.08) !important;
      border-color: rgba(139,92,246,0.15) !important;
    }
  </style>

  <script>
    function switchPortalTabBlock(tabName, btn) {
      document.querySelectorAll('.portal-menu-btn-block').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.portal-pane-block').forEach(p => p.style.display = 'none');
      
      btn.classList.add('active');
      const targetPane = document.getElementById('portal-tab-' + tabName + '-block');
      targetPane.style.display = 'block';
    }

    let currentShipmentStepBlock = 1;
    function advanceShipmentStateBlock() {
      const pBar = document.getElementById('step-prog-bar-block');
      
      if (currentShipmentStepBlock >= 3) {
        currentShipmentStepBlock = 0;
        document.querySelectorAll('.step-block').forEach((s, idx) => {
          const circle = s.querySelector('.sc');
          if (idx === 0) {
            s.style.color = 'white';
            circle.style.backgroundColor = '#10b981';
            circle.style.borderColor = '#10b981';
            circle.style.color = 'white';
          } else if (idx === 1) {
            s.style.color = 'white';
            circle.style.backgroundColor = '#0f0f20';
            circle.style.borderColor = '#06b6d4';
            circle.style.color = '#06b6d4';
          } else {
            s.style.color = '#8b8ba8';
            circle.style.backgroundColor = '#0f0f20';
            circle.style.borderColor = 'rgba(255,255,255,0.08)';
            circle.style.color = '#8b8ba8';
          }
        });
        pBar.style.width = '0%';
        return;
      }
      
      const prevCircle = document.getElementById('s-' + currentShipmentStepBlock).querySelector('.sc');
      prevCircle.style.backgroundColor = '#10b981';
      prevCircle.style.borderColor = '#10b981';
      prevCircle.style.color = 'white';
      
      currentShipmentStepBlock++;
      
      const activeCircle = document.getElementById('s-' + currentShipmentStepBlock).querySelector('.sc');
      activeCircle.style.borderColor = '#06b6d4';
      activeCircle.style.color = '#06b6d4';
      
      const progWidth = (currentShipmentStepBlock / 3) * 100;
      pBar.style.width = progWidth + '%';
    }

    let keysRevealedBlock = false;
    function toggleApiKeyRevealBlock() {
      keysRevealedBlock = !keysRevealedBlock;
      const keySpan = document.getElementById('api-key-value-block');
      const eyeIcon = document.getElementById('eye-icon-block');
      
      if (keysRevealedBlock) {
        keySpan.style.filter = 'blur(0)';
        eyeIcon.className = 'fa-solid fa-eye-slash';
      } else {
        keySpan.style.filter = 'blur(5px)';
        eyeIcon.className = 'fa-solid fa-eye';
      }
    }

    function copyApiKeyBlock() {
      const key = document.getElementById('api-key-value-block').innerText;
      navigator.clipboard.writeText(key);
      alert('API credentials copied to clipboard!');
    }

    function regenerateApiKeyBlock() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let key = "mock_sk_";
      for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      document.getElementById('api-key-value-block').innerText = key;
      alert('New API secret key generated successfully.');
    }

    function changeAvatarColorBlock(val) {
      document.getElementById('user-avatar-block').style.background = val;
    }

    function saveProfileSettingsBlock() {
      const name = document.getElementById('prof-name-block').value;
      document.getElementById('username-display-block').innerText = name;
      document.getElementById('user-avatar-block').innerText = name.split(' ').map(n=>n[0]).join('');
      alert('Profile configurations saved successfully!');
    }
  </script>
</section>`,
      },
      {
        id: 'ai-chat-support',
        label: 'AI Chat Support Widget',
        icon: '💬',
        desc: 'Self-contained fixed circular chat trigger & premium AI chatbot modal popup',
        html: `<div class="support-widget-block" style="position:fixed;bottom:30px;right:30px;z-index:9999;font-family:'Plus Jakarta Sans',sans-serif;">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  
  <button onclick="toggleSupportChatBlock()" style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:none;color:white;font-size:1.6rem;cursor:pointer;box-shadow:0 10px 25px rgba(139,92,246,0.5);display:flex;align-items:center;justify-content:center;position:relative;">
    <i class="fa-solid fa-comment-dots" id="support-trigger-icon-block"></i>
    <span style="position:absolute;top:2px;right:2px;width:14px;height:14px;background:#10b981;border:2px solid #050512;border-radius:50%;"></span>
  </button>

  <div id="chat-box-block" style="position:absolute;bottom:76px;right:0;width:360px;height:480px;border:1px solid rgba(255,255,255,0.12);border-radius:20px;box-shadow:0 12px 40px rgba(0,0,0,0.6);display:flex;flex-direction:column;overflow:hidden;opacity:0;transform:translateY(20px) scale(0.95);pointer-events:none;transition:all 0.3s cubic-bezier(0.16,1,0.3,1);background:#090916;">
    <!-- Chat Header -->
    <div style="background:rgba(18,18,38,0.8);border-bottom:1px solid rgba(255,255,255,0.08);padding:16px;display:flex;align-items:center;gap:12px;">
      <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:700;">🤖</div>
      <div style="text-align:left;">
        <h4 style="font-size:0.9rem;font-weight:700;color:white;margin:0;">Cognitive AI Assistant</h4>
        <span style="font-size:0.75rem;color:#10b981;display:flex;align-items:center;gap:4px;"><i class="fa-solid fa-circle" style="font-size:0.5rem;"></i> Active now</span>
      </div>
    </div>
    
    <!-- Messages -->
    <div id="chat-messages-container-block" style="flex:1;padding:16px;overflow-y:auto;background:rgba(10,10,26,0.6);display:flex;flex-direction:column;gap:12px;">
      <div style="max-width:80%;padding:10px 14px;border-radius:12px;font-size:0.85rem;line-height:1.4;text-align:left;align-self:flex-start;background:rgba(255,255,255,0.04);color:#f3f4f6;border:1px solid rgba(255,255,255,0.08);border-top-left-radius:2px;">
        Hi! I am your AI Operations assistant. I can help you test workflows, search recommendations, inspect analytics, or track shipments. What can I do for you today?
      </div>
    </div>

    <!-- Quick Replies -->
    <div style="padding:8px 12px;display:flex;gap:8px;overflow-x:auto;background:rgba(10,10,26,0.6);border-top:1px solid rgba(255,255,255,0.03);">
      <button onclick="submitQuickReplyBlock('How do I run a workflow simulation?')" style="padding:6px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:99px;color:#8b8ba8;font-size:0.75rem;font-weight:500;cursor:pointer;white-space:nowrap;">Run Workflow</button>
      <button onclick="submitQuickReplyBlock('Show me analytics info')" style="padding:6px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:99px;color:#8b8ba8;font-size:0.75rem;font-weight:500;cursor:pointer;white-space:nowrap;">Get Analytics</button>
      <button onclick="submitQuickReplyBlock('How to generate API credentials?')" style="padding:6px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:99px;color:#8b8ba8;font-size:0.75rem;font-weight:500;cursor:pointer;white-space:nowrap;">API Access</button>
    </div>

    <!-- Input -->
    <div style="background:rgba(18,18,38,0.8);border-top:1px solid rgba(255,255,255,0.08);padding:12px;display:flex;gap:8px;">
      <input type="text" id="chat-input-block" placeholder="Type a message..." onkeydown="if(event.key==='Enter') sendChatMessageBlock()" style="flex:1;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:10px 16px;color:white;outline:none;font-size:0.9rem;">
      <button onclick="sendChatMessageBlock()" style="padding:10px 14px;border-radius:10px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:white;border:none;cursor:pointer;">
        <i class="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  </div>

  <script>
    let chatOpenBlock = false;
    function toggleSupportChatBlock() {
      chatOpenBlock = !chatOpenBlock;
      const box = document.getElementById('chat-box-block');
      const triggerIcon = document.getElementById('support-trigger-icon-block');
      
      if (chatOpenBlock) {
        box.style.opacity = '1';
        box.style.pointerEvents = 'auto';
        box.style.transform = 'translateY(0) scale(1)';
        triggerIcon.className = 'fa-solid fa-xmark';
        setTimeout(() => document.getElementById('chat-input-block').focus(), 150);
      } else {
        box.style.opacity = '0';
        box.style.pointerEvents = 'none';
        box.style.transform = 'translateY(20px) scale(0.95)';
        triggerIcon.className = 'fa-solid fa-comment-dots';
      }
    }

    function sendChatMessageBlock() {
      const input = document.getElementById('chat-input-block');
      const text = input.value.trim();
      if (!text) return;
      
      appendMessageBlock(text, 'user');
      input.value = '';
      
      showTypingIndicatorBlock(true);
      
      setTimeout(() => {
        showTypingIndicatorBlock(false);
        const reply = getAIResponseBlock(text);
        appendMessageBlock(reply, 'bot');
      }, 1000);
    }

    function submitQuickReplyBlock(text) {
      appendMessageBlock(text, 'user');
      showTypingIndicatorBlock(true);
      
      setTimeout(() => {
        showTypingIndicatorBlock(false);
        const reply = getAIResponseBlock(text);
        appendMessageBlock(reply, 'bot');
      }, 1000);
    }

    function appendMessageBlock(text, sender) {
      const chatContainer = document.getElementById('chat-messages-container-block');
      const msg = document.createElement('div');
      msg.style.maxWidth = '80%';
      msg.style.padding = '10px 14px';
      msg.style.borderRadius = '12px';
      msg.style.fontSize = '0.85rem';
      msg.style.lineHeight = '1.4';
      msg.style.textAlign = 'left';
      msg.innerText = text;
      
      if (sender === 'user') {
        msg.style.alignSelf = 'flex-end';
        msg.style.background = '#8b5cf6';
        msg.style.color = 'white';
        msg.style.borderTopRightRadius = '2px';
      } else {
        msg.style.alignSelf = 'flex-start';
        msg.style.background = 'rgba(255, 255, 255, 0.04)';
        msg.style.color = '#f3f4f6';
        msg.style.border = '1px solid rgba(255,255,255,0.08)';
        msg.style.borderTopLeftRadius = '2px';
      }
      
      const ind = document.getElementById('typing-indicator-block');
      if (ind) {
        chatContainer.insertBefore(msg, ind);
      } else {
        chatContainer.appendChild(msg);
      }
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showTypingIndicatorBlock(show) {
      const chatContainer = document.getElementById('chat-messages-container-block');
      const existing = document.getElementById('typing-indicator-block');
      
      if (show && !existing) {
        const div = document.createElement('div');
        div.id = 'typing-indicator-block';
        div.style.alignSelf = 'flex-start';
        div.style.background = 'rgba(255, 255, 255, 0.04)';
        div.style.border = '1px solid rgba(255,255,255,0.08)';
        div.style.padding = '10px 14px';
        div.style.borderRadius = '12px';
        div.innerHTML = '<span style="color:#8b8ba8;">Writing...</span>';
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      } else if (!show && existing) {
        existing.remove();
      }
    }

    function getAIResponseBlock(query) {
      const q = query.toLowerCase();
      if (q.includes('workflow') || q.includes('run')) {
        return "You can trigger and check workflows in the 'Automated Workflows' block. Click 'Test Workflow' to see node traversal pulses.";
      }
      if (q.includes('analytics') || q.includes('stat') || q.includes('traffic')) {
        return "The Analytics dashboard compiles organic, direct, and social metrics. Toggle between 24h, 7d, and 30d views via the dropdown filters.";
      }
      if (q.includes('api') || q.includes('credential') || q.includes('key')) {
        return "Credentials are located under Customer Portal -> Developer Keys. Copy your key, and you can regenerate it securely if needed.";
      }
      if (q.includes('pricing') || q.includes('price')) {
        return "CognitiveFlow is free to start. Developer features start at $29/mo, and Enterprise instances start at $99/mo.";
      }
      return "Hello! I am your AI co-pilot. I am here to help you test the platform functions. Feel free to explore other dashboard sections!";
    }
  </script>
</div>`,
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
