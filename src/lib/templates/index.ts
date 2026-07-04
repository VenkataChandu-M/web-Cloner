/** Pre-built website template snippets */

export interface WebsiteTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  html: string;
}

export const templates: WebsiteTemplate[] = [
  {
    id: 'saas-landing',
    name: 'SaaS Landing Page',
    description: 'Modern SaaS product landing page with hero, features, pricing, and CTA sections',
    thumbnail: '🚀',
    category: 'Business',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>SaaS Pro</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0a0a1a;color:#f0f0ff;overflow-x:hidden}
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:2rem;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;width:600px;height:600px;background:radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%);top:-200px;right:-100px;border-radius:50%}
.hero::after{content:'';position:absolute;width:400px;height:400px;background:radial-gradient(circle,rgba(6,182,212,0.1),transparent 70%);bottom:-100px;left:-100px;border-radius:50%}
.hero-content{position:relative;z-index:1;max-width:800px}
.hero h1{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800;line-height:1.1;margin-bottom:1.5rem;background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.25rem;color:#a0a0c0;margin-bottom:2rem;max-width:600px;margin-inline:auto}
.btn{display:inline-flex;align-items:center;gap:0.5rem;padding:14px 36px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-weight:600;font-size:1rem;border:none;border-radius:12px;cursor:pointer;transition:all 0.3s;text-decoration:none}
.btn:hover{transform:translateY(-2px);box-shadow:0 0 30px rgba(139,92,246,0.4)}
.features{padding:6rem 2rem;max-width:1200px;margin:0 auto}
.features h2{text-align:center;font-size:2.5rem;margin-bottom:3rem;font-weight:700}
.feature-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem}
.feature-card{padding:2rem;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;transition:all 0.3s}
.feature-card:hover{border-color:rgba(139,92,246,0.3);transform:translateY(-4px)}
.feature-card .icon{font-size:2.5rem;margin-bottom:1rem}
.feature-card h3{font-size:1.25rem;margin-bottom:0.75rem}
.feature-card p{color:#a0a0c0;line-height:1.6}
</style>
</head>
<body>
<section class="hero">
<div class="hero-content">
<h1>Build Something Amazing Today</h1>
<p>The all-in-one platform to launch, scale, and manage your digital products with ease.</p>
<a href="#features" class="btn">Get Started Free →</a>
</div>
</section>
<section class="features" id="features">
<h2>Why Choose Us</h2>
<div class="feature-grid">
<div class="feature-card"><div class="icon">⚡</div><h3>Lightning Fast</h3><p>Optimized performance with sub-second load times across all devices.</p></div>
<div class="feature-card"><div class="icon">🛡️</div><h3>Secure by Default</h3><p>Enterprise-grade security with end-to-end encryption and compliance.</p></div>
<div class="feature-card"><div class="icon">📊</div><h3>Analytics Built In</h3><p>Real-time insights and dashboards to track your growth metrics.</p></div>
</div>
</section>
</body>
</html>`,
  },
  {
    id: 'portfolio-creative',
    name: 'Creative Portfolio',
    description: 'Stunning portfolio for designers and developers with animated sections',
    thumbnail: '🎨',
    category: 'Portfolio',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Creative Portfolio</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#050510;color:#f0f0ff}
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;position:relative}
.hero h1{font-size:clamp(3rem,8vw,6rem);font-weight:900;line-height:1;margin-bottom:1rem;background:linear-gradient(135deg,#ec4899,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% 200%;animation:gradient-shift 4s ease infinite}
@keyframes gradient-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.hero p{font-size:1.5rem;color:#a0a0c0;margin-bottom:2rem}
.tag{display:inline-block;padding:6px 16px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.2);border-radius:999px;color:#a78bfa;font-size:0.9rem;margin:0.25rem}
.work{padding:6rem 2rem;max-width:1200px;margin:0 auto}
.work h2{font-size:2rem;margin-bottom:3rem;text-align:center}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem}
.project{position:relative;aspect-ratio:16/10;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;cursor:pointer;transition:all 0.4s}
.project:hover{transform:scale(1.02);border-color:rgba(139,92,246,0.3)}
.project .overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,5,16,0.9),transparent);display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;opacity:0;transition:opacity 0.3s}
.project:hover .overlay{opacity:1}
.project h3{font-size:1.25rem;margin-bottom:0.25rem}
.project p{color:#a0a0c0;font-size:0.9rem}
</style>
</head>
<body>
<section class="hero">
<h1>Creative Developer</h1>
<p>Crafting digital experiences with code & design</p>
<div><span class="tag">React</span><span class="tag">Three.js</span><span class="tag">UI/UX</span><span class="tag">Motion</span></div>
</section>
<section class="work" id="work">
<h2>Selected Work</h2>
<div class="grid">
<div class="project" style="background:linear-gradient(135deg,rgba(139,92,246,0.2),rgba(6,182,212,0.1))"><div class="overlay"><h3>Project Alpha</h3><p>Interactive 3D web experience</p></div></div>
<div class="project" style="background:linear-gradient(135deg,rgba(236,72,153,0.2),rgba(139,92,246,0.1))"><div class="overlay"><h3>Project Beta</h3><p>E-commerce platform redesign</p></div></div>
<div class="project" style="background:linear-gradient(135deg,rgba(6,182,212,0.2),rgba(16,185,129,0.1))"><div class="overlay"><h3>Project Gamma</h3><p>Mobile app UI/UX design</p></div></div>
</div>
</section>
</body>
</html>`,
  },
  {
    id: 'startup-modern',
    name: 'Modern Startup',
    description: 'Clean startup landing page with stats, testimonials, and newsletter signup',
    thumbnail: '💼',
    category: 'Business',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>StartupPro</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0a0a1a;color:#f0f0ff}
nav{display:flex;justify-content:space-between;align-items:center;padding:1.5rem 3rem;position:fixed;top:0;width:100%;z-index:100;backdrop-filter:blur(20px);background:rgba(10,10,26,0.8);border-bottom:1px solid rgba(255,255,255,0.05)}
nav .logo{font-size:1.5rem;font-weight:800;background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
nav .links{display:flex;gap:2rem;list-style:none}
nav .links a{color:#a0a0c0;text-decoration:none;transition:color 0.3s}
nav .links a:hover{color:#f0f0ff}
.hero{min-height:100vh;display:flex;align-items:center;padding:0 3rem;max-width:1200px;margin:0 auto}
.hero-content{max-width:650px}
.hero h1{font-size:3.5rem;font-weight:800;line-height:1.1;margin-bottom:1.5rem}
.hero h1 span{background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.2rem;color:#a0a0c0;margin-bottom:2rem;line-height:1.7}
.stats{display:flex;gap:3rem;padding:4rem 3rem;max-width:1200px;margin:0 auto;border-top:1px solid rgba(255,255,255,0.05)}
.stat{text-align:center}
.stat .number{font-size:3rem;font-weight:800;background:linear-gradient(135deg,#8b5cf6,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.stat .label{color:#a0a0c0;margin-top:0.5rem}
</style>
</head>
<body>
<nav><div class="logo">StartupPro</div><ul class="links"><li><a href="#">Product</a></li><li><a href="#">Pricing</a></li><li><a href="#">About</a></li></ul></nav>
<section class="hero">
<div class="hero-content">
<h1>The Future of <span>Digital Innovation</span></h1>
<p>Empower your team with cutting-edge tools designed to accelerate growth and streamline operations.</p>
<button style="padding:14px 36px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-weight:600;font-size:1rem;border:none;border-radius:12px;cursor:pointer">Start Free Trial</button>
</div>
</section>
<section class="stats">
<div class="stat"><div class="number">10K+</div><div class="label">Active Users</div></div>
<div class="stat"><div class="number">98%</div><div class="label">Satisfaction</div></div>
<div class="stat"><div class="number">50+</div><div class="label">Countries</div></div>
<div class="stat"><div class="number">24/7</div><div class="label">Support</div></div>
</section>
</body>
</html>`,
  },
];

export function getTemplateById(id: string): WebsiteTemplate | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): WebsiteTemplate[] {
  return templates.filter((t) => t.category === category);
}
