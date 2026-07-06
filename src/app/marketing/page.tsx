'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';

const tools = [
  { id: 'blog', label: '📝 Blog Generator', desc: 'AI writes SEO-optimized articles' },
  { id: 'social', label: '📱 Social Media', desc: 'Posts for all platforms' },
  { id: 'email', label: '📧 Email Campaign', desc: 'Sequence & newsletter drafts' },
  { id: 'whatsapp', label: '💬 WhatsApp', desc: 'Business message templates' },
];

const mockOutputs: Record<string, { title: string; content: string }> = {
  blog: {
    title: '5 Ways AI Is Transforming Small Business Marketing in 2026',
    content: `## Introduction

In today's digital-first economy, small businesses face an unprecedented challenge: competing with larger companies that have dedicated marketing teams and million-dollar budgets. But there's a game-changer on the horizon — **Artificial Intelligence**.

## 1. Automated Content Creation

AI tools can now generate blog posts, product descriptions, and social media content that matches your brand voice. What used to take hours now takes minutes.

> **Pro Tip:** Use AI-generated content as a starting point, then add your personal touch for authenticity.

## 2. Predictive Customer Analytics

AI analyzes customer behavior patterns to predict what they'll buy next, when they'll buy it, and how much they'll spend. This means you can:
- **Target the right audience** at the right time
- **Reduce ad spend** by 40% with better targeting
- **Increase conversions** with personalized offers

## 3. Intelligent Email Sequences

Gone are the days of one-size-fits-all newsletters. AI creates personalized email sequences based on customer segments, purchase history, and engagement patterns.

## 4. Smart Social Media Scheduling

AI determines the optimal posting times, hashtags, and content formats for each platform. Your Instagram strategy is different from your LinkedIn approach — AI knows that.

## 5. Automated Customer Support

AI chatbots handle 80% of customer inquiries instantly, freeing your team to focus on complex issues that require a human touch.

## Conclusion

The future of small business marketing is AI-powered. Start small, experiment, and scale what works. Your competitors are already doing it.

---
*Word count: 847 | Reading time: 4 min | SEO Score: 92/100*`,
  },
  social: {
    title: 'Social Media Content Pack',
    content: `### 📸 Instagram Post
"Your business deserves more than just a website. It deserves an AI employee that works 24/7 🤖✨

From building your site to running your marketing — our AI handles it all.

#SmallBusiness #AIMarketing #DigitalTransformation #Entrepreneur #GrowYourBusiness"

---

### 🐦 Twitter/X Thread
"🧵 Why every small business needs an AI employee in 2026:

1/ You're spending hours on tasks AI can do in seconds
2/ Your competitors are already using AI marketing
3/ 73% of customers expect 24/7 chat support
4/ SEO changes daily — AI keeps up automatically
5/ Content creation is now 10x faster with AI

The question isn't IF you'll adopt AI, it's WHEN. 🚀"

---

### 💼 LinkedIn Post
"I replaced 3 freelancers with one AI platform. Here's what happened:

✅ Website went live in 60 seconds (not 3 weeks)
✅ SEO score jumped from 45 to 89
✅ Customer support runs 24/7 without extra hires
✅ Blog posts published weekly — automatically
✅ Email campaigns personalized for each customer segment

The ROI? We saved $4,200/month while INCREASING our digital presence.

Small businesses don't need bigger teams. They need smarter tools.

#AI #SmallBusiness #DigitalTransformation"`,
  },
  email: {
    title: 'Welcome Email Sequence (3 Emails)',
    content: `### Email 1: Welcome (Day 0)
**Subject:** Welcome to [Business Name] — Here's a special gift 🎁

Hi [First Name],

Welcome to the [Business Name] family! We're thrilled to have you.

As a thank-you for joining us, here's an exclusive **15% discount** on your first purchase. Use code: **WELCOME15**

Here's what you can expect from us:
• Weekly tips on [your industry]
• Early access to new products
• Exclusive member-only deals

[SHOP NOW BUTTON]

Cheers,
The [Business Name] Team

---

### Email 2: Value (Day 3)
**Subject:** 3 tips that our best customers swear by

Hi [First Name],

Since you joined us 3 days ago, we wanted to share our top tips:

1. **[Tip relevant to your product]** — Most people miss this
2. **[Common mistake to avoid]** — Save time and money
3. **[Pro tip]** — Our top customers do this daily

Haven't used your welcome discount yet? It expires in 4 days!
Code: **WELCOME15**

[BROWSE PRODUCTS BUTTON]

---

### Email 3: Social Proof (Day 7)
**Subject:** See why 10,000+ people chose [Business Name]

Hi [First Name],

⭐⭐⭐⭐⭐ "Best decision I made for my business" — Sarah K.

Join thousands of happy customers who've transformed their [industry] with [Business Name].

📸 [Customer testimonial with photo]
📈 [Success metric or case study]

Your welcome discount expires tomorrow!
Code: **WELCOME15**

[CLAIM MY DISCOUNT BUTTON]`,
  },
  whatsapp: {
    title: 'WhatsApp Business Templates',
    content: `### 🟢 Order Confirmation
"Hi [Customer Name]! 👋

Your order #[ORDER_ID] has been confirmed! ✅

📦 Items: [Product List]
💰 Total: [Amount]
🚚 Expected Delivery: [Date]

Track your order: [Tracking Link]

Need help? Reply to this message!"

---

### 🟢 Appointment Reminder
"Hi [Name]! 📅

This is a friendly reminder about your appointment:

📍 [Business Name]
🕐 [Time], [Date]
📋 [Service Type]

Reply YES to confirm or RESCHEDULE to pick a new time.

See you soon! 😊"

---

### 🟢 Re-engagement
"Hi [Name]! We miss you! 💛

It's been a while since your last visit. Here's a special **20% off** just for you!

Use code: COMEBACK20
Valid until: [Date]

[Shop Now Link]

Reply STOP to unsubscribe."

---

### 🟢 Review Request
"Hi [Name]! 🌟

How was your recent experience with [Business Name]?

We'd love your honest feedback! It takes just 30 seconds:
[Review Link]

Your opinion helps us serve you better. Thank you! 🙏"`,
  },
};

export default function MarketingPage() {
  const [activeTool, setActiveTool] = useState('blog');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<{ title: string; content: string } | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setOutput(null);

    setTimeout(() => {
      setOutput(mockOutputs[activeTool]);
      setIsGenerating(false);
    }, 1800);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '96px 24px 60px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px',
            background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.15)',
            borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: '#f472b6', marginBottom: '16px',
          }}>
            AI Marketing Suite
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            AI Marketing <span className="gradient-text-pink">Hub</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Generate blog posts, social media content, email campaigns, and WhatsApp templates with AI.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
          {/* Left: Tool Selector */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {tools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => { setActiveTool(tool.id); setOutput(null); }}
                  style={{
                    padding: '14px 16px',
                    background: activeTool === tool.id ? 'rgba(236, 72, 153, 0.1)' : 'var(--glass-bg)',
                    border: '1px solid',
                    borderColor: activeTool === tool.id ? 'rgba(236, 72, 153, 0.3)' : 'var(--glass-border)',
                    borderRadius: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    color: 'inherit',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>{tool.label}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{tool.desc}</div>
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>
                {activeTool === 'blog' ? 'Blog Topic' : activeTool === 'social' ? 'Product/Service' : activeTool === 'email' ? 'Business Name' : 'Business Type'}
              </label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={activeTool === 'blog' ? 'e.g., AI marketing for restaurants' : 'e.g., My Coffee Shop'}
                className="input-glass"
              />
            </div>

            <button onClick={handleGenerate} disabled={isGenerating} className="glow-btn" style={{ width: '100%', padding: '12px', fontSize: '14px' }}>
              {isGenerating ? '⏳ Generating...' : '✨ Generate Content'}
            </button>
          </div>

          {/* Right: Output */}
          <div style={{
            padding: '28px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '16px',
            minHeight: '500px',
          }}>
            {isGenerating && (
              <div style={{ textAlign: 'center', paddingTop: '120px', animation: 'fade-in-up 0.4s ease-out' }}>
                <div className="loading-bar" style={{ width: '200px', margin: '0 auto 20px' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>AI is crafting your content...</p>
              </div>
            )}

            {!isGenerating && !output && (
              <div style={{ textAlign: 'center', paddingTop: '120px', color: 'var(--text-muted)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.3 }}>
                  {activeTool === 'blog' ? '📝' : activeTool === 'social' ? '📱' : activeTool === 'email' ? '📧' : '💬'}
                </div>
                <p style={{ fontSize: '15px' }}>Select a tool and generate AI content</p>
                <p style={{ fontSize: '13px', marginTop: '8px' }}>Your content will appear here</p>
              </div>
            )}

            {output && !isGenerating && (
              <div style={{ animation: 'fade-in-up 0.5s ease-out' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{output.title}</h2>
                  <button style={{
                    padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)',
                    borderRadius: '8px', color: '#10b981', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  }}>
                    📋 Copy All
                  </button>
                </div>
                <div style={{
                  fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8,
                  whiteSpace: 'pre-wrap', fontFamily: 'inherit',
                }}>
                  {output.content}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
