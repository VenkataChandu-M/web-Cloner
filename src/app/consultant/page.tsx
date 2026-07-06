'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';

interface Message {
  role: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const quickPrompts = [
  '🍕 I run a pizza restaurant and want to go online',
  '💇 I have a salon business with no website',
  '🛒 I sell handmade products and need e-commerce',
  '💻 I\'m a freelancer wanting to build my portfolio',
];

const aiResponses: Record<string, string> = {
  restaurant: `Great choice! Here's my analysis for your restaurant business:

🎯 **Digital Transformation Roadmap**

**Phase 1: Online Presence (Week 1)**
• AI-generated website with menu, photos, and online ordering
• Google Business Profile optimization
• SEO setup for local search ("best pizza near me")

**Phase 2: Customer Engagement (Week 2-3)**
• WhatsApp ordering integration
• AI chatbot for table reservations and FAQs
• Email campaign for loyalty program launch

**Phase 3: Growth (Month 2+)**
• Social media content calendar (AI-generated)
• Online review management
• Competitor pricing analysis
• Seasonal promotion automation

📊 **Expected Impact:**
- +45% online orders within 3 months
- 2x Google Maps visibility
- 30% reduction in phone inquiries via chatbot

**Ready to start? I can generate your restaurant website right now!**`,

  salon: `Excellent! Here's my tailored plan for your salon business:

🎯 **Digital Transformation Roadmap**

**Phase 1: Professional Online Presence (Week 1)**
• Stunning portfolio website with service menu and pricing
• Online booking system integration
• Before/after gallery showcase
• Google Business Profile with reviews

**Phase 2: Client Retention (Week 2-3)**
• Automated appointment reminders (WhatsApp/SMS)
• AI chatbot for booking and inquiries
• Loyalty program with digital tracking
• Birthday/anniversary auto-messages

**Phase 3: Growth Engine (Month 2+)**
• Instagram content generator (trending styles, reels ideas)
• Email campaigns for new services
• Referral program automation
• Local SEO optimization

📊 **Expected Impact:**
- 60% reduction in no-shows with reminders
- 3x online bookings within 2 months
- 40% increase in repeat clients

**Shall I create your salon website now? I'll include a booking system!**`,

  default: `I'd love to help you digitize your business! Here's what I recommend:

🎯 **AI-Powered Digital Strategy**

**Step 1: Establish Online Presence**
• Professional website (AI-generated in 60 seconds)
• SEO optimization for your industry keywords
• Google Business Profile setup

**Step 2: Automate Customer Interactions**
• AI chatbot for 24/7 customer support
• Automated email sequences
• WhatsApp business integration

**Step 3: Marketing & Growth**
• AI content generation (blog, social media)
• Competitor analysis and market positioning
• Analytics dashboard for data-driven decisions

**Step 4: Operations**
• Inventory/service management
• Automated workflow builder
• Revenue tracking and forecasting

📊 **Our AI platform handles ALL of this — no technical skills needed.**

What specific aspect would you like to explore first?`,
};

function getAiResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('restaurant') || lower.includes('pizza') || lower.includes('food') || lower.includes('cafe')) {
    return aiResponses.restaurant;
  }
  if (lower.includes('salon') || lower.includes('beauty') || lower.includes('hair') || lower.includes('spa')) {
    return aiResponses.salon;
  }
  return aiResponses.default;
}

export default function ConsultantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: "👋 Hi! I'm your AI Business Consultant.\n\nTell me about your business — what you do, your challenges, and what you need. I'll create a personalized digital transformation roadmap for you.\n\nYou can also try one of the quick prompts below!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        role: 'ai',
        text: getAiResponse(text),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <div style={{
        flex: 1,
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        padding: '96px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px',
            background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.15)',
            borderRadius: '999px', fontSize: '13px', fontWeight: 600, color: '#34d399', marginBottom: '12px',
          }}>
            AI Business Advisor
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            AI Business <span className="gradient-text">Consultant</span>
          </h1>
        </div>

        {/* Chat Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px 20px 0 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: '400px',
          maxHeight: 'calc(100vh - 330px)',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              animation: 'fade-in-up 0.3s ease-out',
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '14px 18px',
                borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(6, 182, 212, 0.15))'
                  : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
              }}>
                <div style={{
                  fontSize: '14px',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  marginTop: '8px',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', animation: 'fade-in-up 0.3s ease-out' }}>
              <div style={{
                padding: '12px 18px',
                borderRadius: '16px 16px 16px 4px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
              }}>
                {[0, 1, 2].map((dot) => (
                  <div key={dot} style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--accent-purple-light)',
                    animation: `float 1.5s ease-in-out ${dot * 0.2}s infinite`,
                    opacity: 0.6,
                  }} />
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderLeft: '1px solid var(--glass-border)',
            borderRight: '1px solid var(--glass-border)',
            flexWrap: 'wrap',
          }}>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(prompt)}
                style={{
                  padding: '8px 14px',
                  background: 'rgba(139, 92, 246, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.15)',
                  borderRadius: '10px',
                  fontSize: '12px',
                  color: 'var(--accent-purple-light)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontWeight: 500,
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div style={{
          display: 'flex',
          gap: '10px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--glass-border)',
          borderTop: 'none',
          borderRadius: '0 0 20px 20px',
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Tell me about your business..."
            className="input-glass"
            style={{ flex: 1, borderRadius: '12px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isTyping || !input.trim()}
            className="glow-btn"
            style={{ padding: '12px 20px', fontSize: '14px', borderRadius: '12px' }}
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
