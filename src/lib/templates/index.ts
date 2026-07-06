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
  {
    id: 'portfolio-3d-glass',
    name: '3D Liquid Glass Portfolio',
    description: 'Immersive portfolio featuring an interactive Three.js 3D backdrop and liquid glass cards with 3D tilt effects.',
    thumbnail: '🔮',
    category: 'Portfolio',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Aura — 3D Immersive Liquid Portfolio</title>
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<!-- FontAwesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
  :root {
    --bg-dark: #03030b;
    --text-light: #f3f4f6;
    --text-muted: #9ca3af;
    --purple: #8b5cf6;
    --pink: #d946ef;
    --cyan: #06b6d4;
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.07);
    --glass-glow: rgba(139, 92, 246, 0.15);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    overflow-x: hidden;
    min-height: 100vh;
    position: relative;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 999px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  /* 3D Canvas Background */
  #canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  /* Global Liquid Glass Utility */
  .glass-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 24px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 32px 0 rgba(255, 255, 255, 0.01);
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    overflow: hidden;
  }

  .glass-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
  }

  /* Content Wrapper */
  .content-wrapper {
    position: relative;
    z-index: 1;
  }

  /* Floating Navbar */
  header {
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 1000px;
    z-index: 1000;
  }

  .nav-pill {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 28px;
    background: rgba(10, 10, 20, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 999px;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    box-shadow: 0 10px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1);
  }

  .logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: -0.05em;
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .nav-links {
    display: flex;
    gap: 32px;
    list-style: none;
  }

  .nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .nav-links a:hover {
    color: var(--text-light);
  }

  .nav-btn {
    padding: 8px 20px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2));
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-light);
    border-radius: 999px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .nav-btn:hover {
    transform: translateY(-2px);
    border-color: var(--cyan);
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
  }

  /* Hero Section */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 140px 24px 80px;
    position: relative;
  }

  .hero-container {
    max-width: 900px;
    width: 100%;
    padding: 60px 40px;
    text-align: center;
  }

  .tag-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    color: #a78bfa;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 999px;
    margin-bottom: 24px;
    letter-spacing: 0.05em;
  }

  .hero h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 7vw, 4.5rem);
    font-weight: 700;
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #fff 20%, #a78bfa 50%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero p {
    color: var(--text-muted);
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    line-height: 1.6;
    max-width: 650px;
    margin: 0 auto 36px;
  }

  .btn-group {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  .primary-btn {
    padding: 16px 36px;
    background: linear-gradient(135deg, var(--purple), var(--pink));
    border: none;
    border-radius: 14px;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.4);
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .primary-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px -5px rgba(217, 70, 239, 0.5);
  }

  .secondary-btn {
    padding: 16px 36px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
    color: var(--text-light);
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .secondary-btn:hover {
    background: rgba(255,255,255,0.08);
    transform: translateY(-3px);
  }

  /* Services / Skills */
  .services {
    padding: 100px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-header h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    background: linear-gradient(135deg, #fff, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-header p {
    color: var(--text-muted);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 24px;
  }

  .service-card {
    padding: 40px 32px;
  }

  .service-card:hover {
    transform: translateY(-8px);
    border-color: rgba(139, 92, 246, 0.4);
    box-shadow: 0 12px 40px 0 rgba(139, 92, 246, 0.15);
  }

  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: var(--cyan);
    margin-bottom: 24px;
    transition: all 0.3s ease;
  }

  .service-card:hover .icon-box {
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    color: white;
    transform: scale(1.1) rotate(5deg);
  }

  .service-card h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .service-card p {
    color: var(--text-muted);
    line-height: 1.7;
    font-size: 0.95rem;
  }

  /* Projects Section */
  .work {
    padding: 100px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .work-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    cursor: pointer;
    perspective: 1000px;
  }

  .project-inner {
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
    transform-style: preserve-3d;
    transition: border-color 0.3s ease;
  }

  .project-img {
    width: 100%;
    aspect-ratio: 16/10;
    border-radius: 16px;
    margin-bottom: 24px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1));
    border: 1px solid rgba(255,255,255,0.05);
    transform: translateZ(20px);
  }

  .project-img::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(3,3,11,0.85), transparent);
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .project-img::after {
    opacity: 0.9;
  }

  .project-visuals {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .project-inner h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.35rem;
    font-weight: 600;
    margin-bottom: 8px;
    transform: translateZ(30px);
  }

  .project-inner p {
    color: var(--text-muted);
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
    transform: translateZ(25px);
  }

  .project-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    transform: translateZ(20px);
  }

  .project-tag {
    padding: 4px 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--glass-border);
    border-radius: 99px;
    font-size: 0.8rem;
    color: var(--cyan);
    font-weight: 500;
  }

  /* Contact Section */
  .contact {
    padding: 100px 24px 160px;
    max-width: 800px;
    margin: 0 auto;
  }

  .contact-card {
    padding: 48px;
  }

  .form-group {
    margin-bottom: 24px;
    position: relative;
  }

  .form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-muted);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .form-control {
    width: 100%;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-control:focus {
    outline: none;
    border-color: var(--purple);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 10px rgba(139, 92, 246, 0.05);
  }

  textarea.form-control {
    min-height: 120px;
    resize: vertical;
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 25px rgba(6, 182, 212, 0.4);
  }

  /* Footer */
  footer {
    padding: 40px 24px;
    text-align: center;
    border-top: 1px solid var(--glass-border);
    position: relative;
    z-index: 1;
    backdrop-filter: blur(10px);
    background: rgba(3,3,11,0.8);
  }

  footer p {
    color: var(--text-muted);
    font-size: 0.9rem;
  }

  /* Media Queries */
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    .hero-container {
      padding: 40px 20px;
    }
    .contact-card {
      padding: 32px 20px;
    }
  }
</style>
</head>
<body>

  <!-- WebGL Background container -->
  <div id="canvas-container"></div>

  <div class="content-wrapper">
    <!-- Navbar -->
    <header>
      <nav class="nav-pill">
        <a href="#" class="logo">
          <i class="fa-solid fa-wand-magic-sparkles"></i> Aura
        </a>
        <ul class="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#work">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" class="nav-btn">Hire Me</a>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-container glass-card">
        <div class="tag-badge">
          <i class="fa-solid fa-sparkles"></i> Glassmorphic 3D Space
        </div>
        <h1>Next-Gen Immersive <br><span style="background: linear-gradient(135deg, var(--cyan) 0%, var(--purple) 50%, var(--pink) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Web Experiences</span></h1>
        <p>Designing interfaces that blend physical depth with modern digital art. Dynamic 3D backdrops reacting to your movement with highly refined glass components.</p>
        <div class="btn-group">
          <a href="#work" class="primary-btn">
            Explore Projects <i class="fa-solid fa-arrow-right"></i>
          </a>
          <a href="#contact" class="secondary-btn">
            Get in touch
          </a>
        </div>
      </div>
    </section>

    <!-- Services / Skills -->
    <section class="services" id="services">
      <div class="section-header">
        <h2>Expertise & Capabilities</h2>
        <p>Combining design principles and bleeding-edge front-end technologies to deliver outstanding interfaces.</p>
      </div>
      <div class="services-grid">
        <div class="service-card glass-card">
          <div class="icon-box">
            <i class="fa-solid fa-code"></i>
          </div>
          <h3>Creative Coding</h3>
          <p>Using CSS/JS libraries like GSAP, Framer Motion, and Three.js to breathe life into layouts with dynamic micro-animations.</p>
        </div>
        <div class="service-card glass-card">
          <div class="icon-box">
            <i class="fa-solid fa-cubes"></i>
          </div>
          <h3>3D Visuals</h3>
          <p>Integrating WebGL canvases, interactive model viewers, particle configurations, and camera movement into normal web page flow.</p>
        </div>
        <div class="service-card glass-card">
          <div class="icon-box">
            <i class="fa-solid fa-compass-drafting"></i>
          </div>
          <h3>Liquid UI Design</h3>
          <p>Crafting high-fidelity glassmorphism designs featuring backdrop filters, colored light reflection points, and premium dark palettes.</p>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="work" id="work">
      <div class="section-header">
        <h2>Featured Work</h2>
        <p>A selection of projects exploring depth, light, and mathematical simulations.</p>
      </div>
      <div class="work-grid">
        <!-- Project 1 -->
        <div class="project-card">
          <div class="project-inner glass-card">
            <div class="project-img">
              <div class="project-visuals" style="color: var(--purple);">
                <i class="fa-solid fa-circle-nodes"></i>
              </div>
            </div>
            <h3>Quantum Mesh</h3>
            <p>A reactive node particle system showing data nodes connecting based on distance formulas. Built with custom Canvas rendering.</p>
            <div class="project-tags">
              <span class="project-tag">Canvas API</span>
              <span class="project-tag">GSAP</span>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card">
          <div class="project-inner glass-card">
            <div class="project-img">
              <div class="project-visuals" style="color: var(--cyan);">
                <i class="fa-solid fa-arrows-spin"></i>
              </div>
            </div>
            <h3>Glass Orbs 3D</h3>
            <p>Raycasted glass spheres showing refraction, reflection, and environmental mapping. Fully optimized to run at 60 FPS.</p>
            <div class="project-tags">
              <span class="project-tag">Three.js</span>
              <span class="project-tag">GLSL Shaders</span>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <div class="project-card">
          <div class="project-inner glass-card">
            <div class="project-img">
              <div class="project-visuals" style="color: var(--pink);">
                <i class="fa-solid fa-bezier-curve"></i>
              </div>
            </div>
            <h3>Liquid Typography</h3>
            <p>Interactive typography stretching, liquid-morphing, and breaking when the mouse glides across the characters.</p>
            <div class="project-tags">
              <span class="project-tag">WebGL</span>
              <span class="project-tag">Shaders</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
      <div class="contact-card glass-card">
        <div class="section-header" style="margin-bottom: 40px;">
          <h2>Start a Project</h2>
          <p>Let's collaborate to build an immersive digital experience that stands out.</p>
        </div>
        <form id="contact-form" onsubmit="event.preventDefault(); alert('Message sent successfully!');">
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" class="form-control" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" class="form-control" placeholder="john@example.com" required>
          </div>
          <div class="form-group">
            <label for="message">Project Description</label>
            <textarea id="message" class="form-control" placeholder="Tell me about your idea..." required></textarea>
          </div>
          <button type="submit" class="submit-btn">
            Send Message <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>&copy; 2026 Aura Design. All rights reserved. Created with WebForge AI.</p>
    </footer>
  </div>

  <!-- Three.js Setup -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script>
    // 3D Canvas Scene
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0f0c1b, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x8b5cf6, 1.5);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.5);
    dirLight2.position.set(-5, -10, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xd946ef, 3, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // Particle Background
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 400;
    const starPositions = new Float32Array(starsCount * 3);
    const starSpeeds = [];

    for (let i = 0; i < starsCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 50;
      starPositions[i + 1] = (Math.random() - 0.5) * 50;
      starPositions[i + 2] = (Math.random() - 0.5) * 40 - 10;
      starSpeeds.push((Math.random() + 0.2) * 0.02);
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    // Simple Circular Point Texture via Canvas
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 16;
    starCanvas.height = 16;
    const ctx = starCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    
    const starTex = new THREE.CanvasTexture(starCanvas);

    const starsMat = new THREE.PointsMaterial({
      size: 0.25,
      map: starTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Geometries
    // Large central morphing glass sphere
    const sphereGeo = new THREE.SphereGeometry(3, 64, 64);
    
    const originalPositions = sphereGeo.attributes.position.clone();

    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      thickness: 1.5,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    const glassSphere = new THREE.Mesh(sphereGeo, sphereMat);
    glassSphere.position.set(0, 0, 0);
    scene.add(glassSphere);

    // Dynamic Small Floating Orbs
    const orbs = [];
    const orbCount = 3;
    const orbColors = [0x8b5cf6, 0x06b6d4, 0xd946ef];

    for (let i = 0; i < orbCount; i++) {
      const orbGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const orbMat = new THREE.MeshPhysicalMaterial({
        color: orbColors[i],
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.8,
        ior: 1.3,
        thickness: 0.8,
        transparent: true,
        opacity: 0.4
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8 - 2
      );
      orb.userData = {
        speedX: (Math.random() - 0.5) * 0.01,
        speedY: (Math.random() - 0.5) * 0.01,
        speedZ: (Math.random() - 0.5) * 0.01,
        orbitRadius: 4 + Math.random() * 4,
        orbitSpeed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2
      };
      scene.add(orb);
      orbs.push(orb);
    }

    // Interactive mouse positioning
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 80;
      mouseY = (event.clientY - window.innerHeight / 2) / 80;
    });

    // Scroll Reaction
    let scrollY = 0;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });

    // Render loop
    const tempPos = new THREE.Vector3();
    let time = 0;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      // Displacement logic for morphing sphere
      const positions = sphereGeo.attributes.position;
      const count = positions.count;
      
      for (let i = 0; i < count; i++) {
        tempPos.fromBufferAttribute(originalPositions, i);
        
        const wave = Math.sin(tempPos.x * 1.5 + time * 2) * 
                     Math.cos(tempPos.y * 1.5 + time * 2) * 
                     Math.sin(tempPos.z * 1.5 + time * 2) * 0.15;
                     
        tempPos.addScaledVector(tempPos.clone().normalize(), wave);
        positions.setXYZ(i, tempPos.x, tempPos.y, tempPos.z);
      }
      positions.needsUpdate = true;
      sphereGeo.computeVertexNormals();

      // Rotate Main Sphere
      glassSphere.rotation.y += 0.005;
      glassSphere.rotation.x += 0.002;

      // Animate small orbs orbiting
      orbs.forEach((orb, index) => {
        const data = orb.userData;
        const angle = time * data.orbitSpeed + data.phase;
        
        orb.position.x = Math.cos(angle) * data.orbitRadius + (mouseX * 0.2);
        orb.position.y = Math.sin(angle * 1.5) * (data.orbitRadius * 0.6) - (mouseY * 0.2);
        orb.position.z = Math.sin(angle) * 3 - 2;
        
        orb.rotation.x += 0.01;
        orb.rotation.y += 0.01;
      });

      // Camera mouse lag follow
      targetX = mouseX * 0.3;
      targetY = mouseY * 0.3;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;

      // Scroll response
      starField.rotation.y += 0.0005;
      starField.rotation.x = scrollY * 0.0008;
      
      glassSphere.position.y = -scrollY * 0.005;
      
      pointLight.position.x = Math.sin(time) * 5;
      pointLight.position.y = Math.cos(time * 1.3) * 5;

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // 3D Card Tilt Effect
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      const inner = card.querySelector('.project-inner');
      
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((centerY - y) / centerY) * 12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        inner.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
        inner.style.borderColor = 'rgba(6, 182, 212, 0.4)';
        inner.style.boxShadow = '0 20px 40px rgba(6, 182, 212, 0.25)';
      });
      
      card.addEventListener('mouseleave', () => {
        inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        inner.style.borderColor = 'var(--glass-border)';
        inner.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
      });
    });
  </script>
</body>
</html>`,
  },

  {
    id: 'ai-business-suite',
    name: 'AI Enterprise Suite',
    description: 'Unified Business Hub featuring interactive Customer Portal, Analytics, Workflows, Recommendations, Chatbot support, and Management controls.',
    thumbnail: '🏢',
    category: 'Business',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>CognitiveFlow AI Enterprise Suite</title>
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<!-- FontAwesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
  :root {
    --bg-dark: #050512;
    --bg-card: rgba(18, 18, 38, 0.4);
    --text-light: #f3f4f6;
    --text-muted: #8b8ba8;
    --purple: #8b5cf6;
    --pink: #d946ef;
    --cyan: #06b6d4;
    --green: #10b981;
    --orange: #f59e0b;
    --glass-bg: rgba(255, 255, 255, 0.02);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-glow: rgba(139, 92, 246, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-light);
    overflow-x: hidden;
    min-height: 100vh;
    background-image: 
      radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.06) 0%, transparent 40%);
  }

  /* Sticky Navbar */
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: all 0.3s ease;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    background: rgba(5, 5, 18, 0.7);
  }

  .navbar {
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 24px;
  }

  .logo {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.4rem;
    font-weight: 700;
    text-decoration: none;
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .nav-links {
    display: flex;
    gap: 28px;
    list-style: none;
  }

  .nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .nav-links a:hover, .nav-links a.active {
    color: var(--text-light);
  }

  .nav-cta {
    padding: 10px 24px;
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2));
    border: 1px solid var(--glass-border);
    color: var(--text-light);
    border-radius: 99px;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .nav-cta:hover {
    border-color: var(--purple);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
    transform: translateY(-1px);
  }

  /* Utility Styles */
  .section-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 100px 24px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .section-header h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
    background: linear-gradient(135deg, #fff, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .section-header p {
    color: var(--text-muted);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .glass-card {
    background: var(--bg-card);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
  }

  /* Hero Section */
  .hero {
    padding-top: 180px;
    padding-bottom: 80px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    line-height: 1.15;
    margin-bottom: 24px;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, #fff 30%, #c084fc 70%, #06b6d4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero p {
    color: var(--text-muted);
    font-size: 1.25rem;
    max-width: 700px;
    margin: 0 auto 40px;
    line-height: 1.6;
  }

  .hero-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .btn {
    padding: 14px 32px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    color: white;
    border: none;
    box-shadow: 0 10px 25px -5px rgba(139, 92, 246, 0.4);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px -5px rgba(139, 92, 246, 0.6);
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    color: var(--text-light);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
  }

  /* Feature 1: Analytics Dashboard */
  .analytics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 24px;
  }

  .kpi-card {
    padding: 24px;
    text-align: left;
  }

  .kpi-title {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .kpi-value {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .kpi-trend {
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 99px;
    font-weight: 600;
  }

  .trend-up {
    background: rgba(16, 185, 129, 0.1);
    color: var(--green);
  }

  .analytics-charts {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .chart-header h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1.2rem;
  }

  .chart-selector {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--glass-border);
    color: var(--text-light);
    padding: 6px 12px;
    border-radius: 8px;
    outline: none;
    font-size: 0.85rem;
    cursor: pointer;
  }

  /* Feature 2: Product Recommendations */
  .rec-controls {
    display: flex;
    gap: 16px;
    margin-bottom: 32px;
    align-items: center;
    flex-wrap: wrap;
  }

  .persona-tabs {
    display: flex;
    gap: 8px;
    background: rgba(0,0,0,0.2);
    padding: 4px;
    border-radius: 10px;
    border: 1px solid var(--glass-border);
  }

  .persona-tab {
    padding: 8px 16px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .persona-tab.active {
    background: var(--purple);
    color: white;
  }

  .search-input-group {
    display: flex;
    flex: 1;
    gap: 8px;
    min-width: 280px;
  }

  .input-text {
    flex: 1;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    padding: 10px 16px;
    color: white;
    outline: none;
    font-size: 0.9rem;
    transition: border-color 0.2s;
  }

  .input-text:focus {
    border-color: var(--cyan);
  }

  .rec-showcase {
    position: relative;
    min-height: 280px;
  }

  .rec-scan-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    z-index: 10;
    opacity: 0;
    box-shadow: 0 0 12px var(--cyan);
  }

  .rec-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    transition: opacity 0.3s;
  }

  .rec-card {
    background: rgba(255,255,255,0.01);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 24px;
    text-align: left;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .match-badge {
    align-self: flex-start;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--green);
    background: rgba(16, 185, 129, 0.1);
    padding: 4px 10px;
    border-radius: 99px;
    margin-bottom: 16px;
    border: 1px solid rgba(16,185,129,0.2);
  }

  /* Feature 3: Business Management */
  .management-panel {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }

  .table-container {
    overflow-x: auto;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .custom-table th {
    padding: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    color: var(--text-muted);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
  }

  .custom-table td {
    padding: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 0.9rem;
  }

  .status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
  }

  .status-active { background-color: var(--green); }
  .status-low { background-color: var(--orange); }

  .log-panel {
    background: rgba(0,0,0,0.2);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    max-height: 380px;
  }

  .log-feed {
    flex: 1;
    overflow-y: auto;
    font-family: monospace;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
    text-align: left;
  }

  .log-item {
    color: #a0a0c0;
    line-height: 1.4;
  }

  .log-time {
    color: var(--cyan);
  }

  /* Modal Form styling */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,5,15,0.85);
    backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  .modal-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .modal-box {
    max-width: 450px;
    width: 90%;
    padding: 36px;
    border: 1px solid rgba(255,255,255,0.15);
    background: #090916;
  }

  .form-group {
    margin-bottom: 20px;
    text-align: left;
  }

  .form-group label {
    display: block;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
  }

  /* Feature 4: Workflows Builder */
  .workflow-canvas {
    position: relative;
    background: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 48px;
    min-height: 380px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    overflow: hidden;
  }

  .node-card {
    width: 200px;
    background: rgba(9, 9, 24, 0.8);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 16px;
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
    text-align: center;
  }

  .node-card.active-node {
    border-color: var(--purple);
    box-shadow: 0 0 20px rgba(139,92,246,0.3);
  }

  .node-card.success-node {
    border-color: var(--green);
    box-shadow: 0 0 20px rgba(16,185,129,0.3);
  }

  .node-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
    font-size: 1.2rem;
  }

  .node-header {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .node-body {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .workflow-connections {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
  }

  .workflow-pulse-dot {
    offset-path: path("M 150 190 L 450 190 L 750 190 L 1050 190");
    width: 10px;
    height: 10px;
    background: var(--pink);
    border-radius: 50%;
    position: absolute;
    box-shadow: 0 0 12px var(--pink);
    opacity: 0;
  }

  /* Feature 5: Customer Portal */
  .portal-container {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 32px;
  }

  .portal-menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
  }

  .portal-menu-btn {
    padding: 12px 18px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    color: var(--text-muted);
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .portal-menu-btn:hover {
    color: var(--text-light);
    background: rgba(255,255,255,0.02);
  }

  .portal-menu-btn.active {
    color: var(--purple);
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.15);
  }

  .portal-content-pane {
    display: none;
    text-align: left;
  }

  .portal-content-pane.active {
    display: block;
    animation: fade-in 0.3s ease-out;
  }

  /* Stepper timeline */
  .stepper {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 40px;
    padding: 0 20px;
  }

  .stepper::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 40px;
    right: 40px;
    height: 2px;
    background: rgba(255,255,255,0.06);
    z-index: 1;
  }

  .stepper-progress {
    position: absolute;
    top: 20px;
    left: 40px;
    width: 0%;
    height: 2px;
    background: var(--green);
    z-index: 2;
    transition: width 0.4s ease;
    box-shadow: 0 0 10px var(--green);
  }

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
  }

  .step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #0f0f20;
    border: 2px solid rgba(255,255,255,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: 700;
    color: var(--text-muted);
    transition: all 0.3s;
  }

  .step.active .step-circle {
    border-color: var(--cyan);
    color: var(--cyan);
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
  }

  .step.completed .step-circle {
    border-color: var(--green);
    background: var(--green);
    color: white;
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.4);
  }

  .step-label {
    margin-top: 12px;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
  }

  .step.active .step-label {
    color: var(--text-light);
  }

  /* API Key blur */
  .api-key-box {
    display: flex;
    align-items: center;
    background: rgba(0,0,0,0.3);
    border: 1px solid var(--glass-border);
    padding: 12px 18px;
    border-radius: 10px;
    font-family: monospace;
    font-size: 0.95rem;
    gap: 16px;
    justify-content: space-between;
    margin-top: 12px;
  }

  .api-key-text {
    filter: blur(5px);
    transition: filter 0.2s;
  }

  .api-key-text.revealed {
    filter: blur(0);
  }

  .btn-icon {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 1.1rem;
    transition: color 0.2s;
  }

  .btn-icon:hover {
    color: var(--text-light);
  }

  /* Feature 6: Support Widget */
  .support-widget {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
  }

  .support-trigger {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    border: none;
    color: white;
    font-size: 1.6rem;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(139, 92, 246, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: transform 0.3s;
  }

  .support-trigger:hover {
    transform: scale(1.08);
  }

  .support-status {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 14px;
    height: 14px;
    background: var(--green);
    border: 2px solid var(--bg-dark);
    border-radius: 50%;
  }

  .support-chat-box {
    position: absolute;
    bottom: 76px;
    right: 0;
    width: 360px;
    height: 480px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 20px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .support-chat-box.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .chat-header {
    background: rgba(18, 18, 38, 0.8);
    border-bottom: 1px solid var(--glass-border);
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .chat-avatar {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--purple), var(--cyan));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    font-weight: 700;
  }

  .chat-title {
    text-align: left;
  }

  .chat-title h4 {
    font-size: 0.9rem;
    font-weight: 700;
  }

  .chat-title span {
    font-size: 0.75rem;
    color: var(--green);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .chat-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background: rgba(10, 10, 26, 0.6);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .message {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 0.85rem;
    line-height: 1.4;
    text-align: left;
  }

  .message-bot {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.04);
    color: var(--text-light);
    border: 1px solid var(--glass-border);
    border-top-left-radius: 2px;
  }

  .message-user {
    align-self: flex-end;
    background: var(--purple);
    color: white;
    border-top-right-radius: 2px;
  }

  .chat-typing-dots {
    display: inline-flex;
    gap: 4px;
    align-items: center;
    padding: 10px 14px;
  }

  .chat-quick-replies {
    padding: 8px 12px;
    display: flex;
    gap: 8px;
    overflow-x: auto;
    background: rgba(10, 10, 26, 0.6);
    border-top: 1px solid rgba(255,255,255,0.03);
  }

  .chat-reply-chip {
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--glass-border);
    border-radius: 99px;
    color: var(--text-muted);
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .chat-reply-chip:hover {
    border-color: var(--cyan);
    color: var(--text-light);
  }

  .chat-input-group {
    background: rgba(18, 18, 38, 0.8);
    border-top: 1px solid var(--glass-border);
    padding: 12px;
    display: flex;
    gap: 8px;
  }

  /* Animations */
  @keyframes typing {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
</head>
<body>

  <!-- Header -->
  <header>
    <div class="navbar">
      <a href="#" class="logo">
        <i class="fa-solid fa-brain"></i> CognitiveFlow AI
      </a>
      <ul class="nav-links">
        <li><a href="#analytics" class="nav-item">Analytics</a></li>
        <li><a href="#recommendations" class="nav-item">Recommendations</a></li>
        <li><a href="#management" class="nav-item">Dashboard</a></li>
        <li><a href="#workflows" class="nav-item">Workflows</a></li>
        <li><a href="#portal" class="nav-item">Customer Portal</a></li>
      </ul>
      <a href="#portal" class="nav-cta">Client Hub</a>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="section-container">
      <span class="btn-secondary" style="display:inline-flex; padding: 6px 14px; border-radius: 99px; font-size: 0.8rem; margin-bottom: 24px; pointer-events: none;">
        ⚡ Enterprise Intelligence Dashboard
      </span>
      <h1>Autonomous Operations & <br><span style="background: linear-gradient(135deg, var(--cyan), var(--purple), var(--pink)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">AI-Driven Automation</span></h1>
      <p>Synchronize workflows, recommendations, customer experiences, and live business processes from a single dashboard. Leverage real-time telemetry pipelines to optimize operations.</p>
      <div class="hero-buttons">
        <a href="#analytics" class="btn btn-primary">Open Analytics</a>
        <a href="#workflows" class="btn btn-secondary">Configure Workflows</a>
      </div>
    </div>
  </section>

  <!-- Section 1: Analytics Dashboard -->
  <section id="analytics" class="section-container">
    <div class="section-header">
      <h2>Business Analytics Dashboard</h2>
      <p>Real-time analytics pipelines displaying conversion, engagement rates, and live operational stats.</p>
    </div>

    <div class="analytics-grid">
      <div class="glass-card kpi-card">
        <div class="kpi-title">Monthly Revenue</div>
        <div class="kpi-value" id="kpi-rev">$128,492</div>
        <span class="kpi-trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +12.4%</span>
      </div>
      <div class="glass-card kpi-card">
        <div class="kpi-title">Active Customers</div>
        <div class="kpi-value" id="kpi-users">4,892</div>
        <span class="kpi-trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +4.8%</span>
      </div>
      <div class="glass-card kpi-card">
        <div class="kpi-title">Conversion Rate</div>
        <div class="kpi-value" id="kpi-conv">3.2%</div>
        <span class="kpi-trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +1.1%</span>
      </div>
    </div>

    <div class="glass-card" style="margin-bottom: 24px;">
      <div class="chart-header">
        <h3>Visitor Traffic vs Conversions</h3>
        <div>
          <button class="btn btn-primary" onclick="simulateNewSale()" style="padding: 6px 14px; font-size: 0.8rem; border-radius: 6px; margin-right: 12px;">
            <i class="fa-solid fa-circle-plus"></i> Simulate Order
          </button>
          <select class="chart-selector" id="timeframe" onchange="updateChart()">
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      <div class="analytics-charts">
        <!-- SVG Line Chart -->
        <div style="height: 260px; position: relative;">
          <svg id="svg-line-chart" viewBox="0 0 600 240" style="width: 100%; height: 100%; overflow: visible;">
            <defs>
              <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--purple)" stop-opacity="0.3"></stop>
                <stop offset="100%" stop-color="var(--purple)" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
            <path id="chart-line-path" d="M 0,200 Q 100,120 200,150 T 400,80 T 600,120 L 600,240 L 0,240 Z" fill="url(#chart-grad)"></path>
            <path id="chart-stroke-path" d="M 0,200 Q 100,120 200,150 T 400,80 T 600,120" fill="none" stroke="var(--purple)" stroke-width="3" stroke-linecap="round"></path>
          </svg>
        </div>
        
        <!-- SVG Bar Chart -->
        <div style="height: 260px; display: flex; align-items: flex-end; justify-content: space-around; padding-bottom: 20px; border-left: 1px solid rgba(255,255,255,0.06);">
          <div style="display:flex; flex-direction:column; align-items:center;">
            <div id="bar-organic" style="width: 24px; height: 160px; background: linear-gradient(to top, var(--cyan), var(--purple)); border-radius: 6px; transition: height 0.4s ease;"></div>
            <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">Organic</span>
          </div>
          <div style="display:flex; flex-direction:column; align-items:center;">
            <div id="bar-referral" style="width: 24px; height: 80px; background: linear-gradient(to top, var(--cyan), var(--purple)); border-radius: 6px; transition: height 0.4s ease;"></div>
            <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">Direct</span>
          </div>
          <div style="display:flex; flex-direction:column; align-items:center;">
            <div id="bar-social" style="width: 24px; height: 110px; background: linear-gradient(to top, var(--cyan), var(--purple)); border-radius: 6px; transition: height 0.4s ease;"></div>
            <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">Social</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 2: AI Product Recommendations -->
  <section id="recommendations" class="section-container">
    <div class="section-header">
      <h2>AI Recommendations Engine</h2>
      <p>Tailored solution blueprints and product configurations matching customer criteria in real time.</p>
    </div>

    <div class="glass-card">
      <div class="rec-controls">
        <div class="persona-tabs">
          <button class="persona-tab active" onclick="selectPersona('dev', this)">💻 Developer</button>
          <button class="persona-tab" onclick="selectPersona('creative', this)">🎨 Creator</button>
          <button class="persona-tab" onclick="selectPersona('marketer', this)">📈 Marketer</button>
          <button class="persona-tab" onclick="selectPersona('business', this)">🚀 Founder</button>
        </div>
        <div class="search-input-group">
          <input type="text" class="input-text" id="rec-search" placeholder="Describe your stack requirements...">
          <button class="btn btn-primary" onclick="triggerRecommendationAnalysis()" style="padding: 10px 20px;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Recommend
          </button>
        </div>
      </div>

      <div class="rec-showcase">
        <div class="rec-scan-line" id="rec-scan"></div>
        <div class="rec-grid" id="rec-grid">
          <!-- Card 1 -->
          <div class="rec-card">
            <span class="match-badge">99.2% MATCH</span>
            <h4 style="font-size: 1.15rem; margin-bottom: 8px;">Serverless Compute Core</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 16px;">Scale from zero to millions of active tasks instantly. Optimized latency configurations.</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
              <span style="font-weight:700; color:white;">$0.0002 / run</span>
              <a href="#" class="nav-cta" style="padding:6px 12px; font-size:0.8rem;">Add</a>
            </div>
          </div>
          <!-- Card 2 -->
          <div class="rec-card">
            <span class="match-badge">97.8% MATCH</span>
            <h4 style="font-size: 1.15rem; margin-bottom: 8px;">Edge Telemetry Agent</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 16px;">Real-time logs collection and automated filtering directly at the edge locations.</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
              <span style="font-weight:700; color:white;">$19 / mo</span>
              <a href="#" class="nav-cta" style="padding:6px 12px; font-size:0.8rem;">Add</a>
            </div>
          </div>
          <!-- Card 3 -->
          <div class="rec-card">
            <span class="match-badge">95.4% MATCH</span>
            <h4 style="font-size: 1.15rem; margin-bottom: 8px;">CognitiveDB Graph</h4>
            <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 16px;">Graph database for neural-network relationships with microsecond query times.</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">
              <span style="font-weight:700; color:white;">$49 / mo</span>
              <a href="#" class="nav-cta" style="padding:6px 12px; font-size:0.8rem;">Add</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 3: Digital Business Management Console -->
  <section id="management" class="section-container">
    <div class="section-header">
      <h2>Digital Business Console</h2>
      <p>Manage product inventories, operations statuses, and review live workflow hooks outputs.</p>
    </div>

    <div class="management-panel">
      <!-- Left: Products List -->
      <div class="glass-card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem;">Active Inventory</h3>
          <button class="btn btn-primary" onclick="toggleModal(true)" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 8px;">
            <i class="fa-solid fa-plus"></i> Add Product
          </button>
        </div>
        <div class="table-container">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="inventory-tbody">
              <tr>
                <td style="font-weight:600;">Cognitive Flow Pro</td>
                <td style="font-family:monospace;">CF-PRO-01</td>
                <td>$99.00</td>
                <td><span class="status-dot status-active"></span>Active</td>
                <td><button class="btn btn-secondary" onclick="simulateRestock(this)" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px;">Restock</button></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Serverless API Agent</td>
                <td style="font-family:monospace;">API-AGT-02</td>
                <td>$29.00</td>
                <td><span class="status-dot status-active"></span>Active</td>
                <td><button class="btn btn-secondary" onclick="simulateRestock(this)" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px;">Restock</button></td>
              </tr>
              <tr>
                <td style="font-weight:600;">Edge CDN Connector</td>
                <td style="font-family:monospace;">EDG-CDN-03</td>
                <td>$15.00</td>
                <td><span class="status-dot status-low"></span>Low Stock</td>
                <td><button class="btn btn-secondary" onclick="simulateRestock(this)" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px; color: var(--orange); border-color: rgba(245,158,11,0.2);">Restock</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right: Real-time logs -->
      <div class="log-panel">
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; margin-bottom: 16px; text-align: left;">Live Operations Feed</h3>
        <div class="log-feed" id="log-feed">
          <div class="log-item"><span class="log-time">[15:32:00]</span> Operations pipeline initialized.</div>
          <div class="log-item"><span class="log-time">[15:32:05]</span> Analytics data synchronizing...</div>
          <div class="log-item"><span class="log-time">[15:32:06]</span> Active database clusters status: 100% OK</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Add Product Modal Overlay -->
  <div class="modal-overlay" id="product-modal" onclick="if(event.target===this) toggleModal(false)">
    <div class="glass-card modal-box">
      <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.4rem; margin-bottom: 24px; text-align: left;">Add New Product</h3>
      <form onsubmit="addNewProduct(event)">
        <div class="form-group">
          <label for="p-name">Product Name</label>
          <input type="text" id="p-name" class="input-text" style="width:100%" placeholder="e.g. AuthSecure Shield" required>
        </div>
        <div class="form-group">
          <label for="p-sku">SKU Code</label>
          <input type="text" id="p-sku" class="input-text" style="width:100%" placeholder="e.g. AUTH-SEC-09" required>
        </div>
        <div class="form-group">
          <label for="p-price">Price ($)</label>
          <input type="number" step="0.01" id="p-price" class="input-text" style="width:100%" placeholder="e.g. 49.00" required>
        </div>
        <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:24px;">
          <button type="button" class="btn btn-secondary" onclick="toggleModal(false)" style="padding:10px 20px;">Cancel</button>
          <button type="submit" class="btn btn-primary" style="padding:10px 20px;">Add Item</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Section 4: Automated Workflows Builder -->
  <section id="workflows" class="section-container">
    <div class="section-header">
      <h2>Automated Workflows</h2>
      <p>Design and visually check automation sequences linking events, branches, and outcomes.</p>
    </div>

    <div class="glass-card" style="position:relative;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 32px;">
        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; text-align: left;">Visual Pipeline Canvas</h3>
        <div style="display:flex; gap:12px;">
          <button class="btn btn-secondary" onclick="addNewWorkflowStep()" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 8px;">
            <i class="fa-solid fa-plus-circle"></i> Add custom node
          </button>
          <button class="btn btn-primary" onclick="simulateWorkflowTrigger()" style="padding: 8px 16px; font-size: 0.85rem; border-radius: 8px;">
            <i class="fa-solid fa-play"></i> Test Workflow
          </button>
        </div>
      </div>

      <div class="workflow-canvas" id="workflow-canvas-container">
        <!-- Connections SVG -->
        <svg class="workflow-connections" width="100%" height="100%">
          <path d="M 230 190 H 330" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none" id="line-1"></path>
          <path d="M 550 190 H 650" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none" id="line-2"></path>
          <path d="M 870 190 H 970" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none" id="line-3"></path>
        </svg>

        <div class="workflow-pulse-dot" id="pulse-dot"></div>

        <!-- Node 1 -->
        <div class="node-card" id="node-1">
          <div class="node-icon" style="background: rgba(139, 92, 246, 0.15); color: var(--purple);">
            <i class="fa-solid fa-bolt"></i>
          </div>
          <div class="node-header">Stripe Webhook</div>
          <div class="node-body">Trigger: Order Placed</div>
        </div>

        <!-- Node 2 -->
        <div class="node-card" id="node-2">
          <div class="node-icon" style="background: rgba(6, 182, 212, 0.15); color: var(--cyan);">
            <i class="fa-solid fa-filter"></i>
          </div>
          <div class="node-header">Rule Engine</div>
          <div class="node-body">Condition: Price > $50</div>
        </div>

        <!-- Node 3 -->
        <div class="node-card" id="node-3">
          <div class="node-icon" style="background: rgba(236, 72, 153, 0.15); color: var(--pink);">
            <i class="fa-solid fa-paper-plane"></i>
          </div>
          <div class="node-header">CRM Dispatcher</div>
          <div class="node-body">Action: Sync Profile</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 5: Customer Portal -->
  <section id="portal" class="section-container">
    <div class="section-header">
      <h2>Secure Customer Portal</h2>
      <p>Secure client-facing space to check past order states, profile settings, and manage API integrations.</p>
    </div>

    <div class="glass-card portal-container">
      <div class="portal-menu">
        <button class="portal-menu-btn active" onclick="switchPortalTab('tracking', this)">
          <i class="fa-solid fa-truck"></i> Order Tracker
        </button>
        <button class="portal-menu-btn" onclick="switchPortalTab('apikeys', this)">
          <i class="fa-solid fa-key"></i> Developer Keys
        </button>
        <button class="portal-menu-btn" onclick="switchPortalTab('profile', this)">
          <i class="fa-solid fa-user-gear"></i> Account Settings
        </button>
      </div>

      <div class="portal-content">
        <!-- Tab 1: Order Tracker -->
        <div class="portal-content-pane active" id="portal-tab-tracking">
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; margin-bottom: 24px;">Shipment Tracking</h3>
          
          <div class="stepper">
            <div class="stepper-progress" id="step-prog-bar"></div>
            <div class="step completed" id="step-0">
              <div class="step-circle"><i class="fa-solid fa-receipt"></i></div>
              <div class="step-label">Created</div>
            </div>
            <div class="step active" id="step-1">
              <div class="step-circle"><i class="fa-solid fa-gears"></i></div>
              <div class="step-label">Processing</div>
            </div>
            <div class="step" id="step-2">
              <div class="step-circle"><i class="fa-solid fa-truck-ramp-box"></i></div>
              <div class="step-label">Shipped</div>
            </div>
            <div class="step" id="step-3">
              <div class="step-circle"><i class="fa-solid fa-house-chimney-user"></i></div>
              <div class="step-label">Delivered</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); padding: 20px; border-radius:12px; border:1px solid var(--glass-border);">
            <div>
              <h4 style="font-size:0.95rem; font-weight:700;">Order ID: #WF-2026-98A</h4>
              <p style="font-size: 0.8rem; color:var(--text-muted); margin-top: 4px;">Tracking: USPS Priority #9205590111244</p>
            </div>
            <button class="btn btn-primary" onclick="advanceShipmentState()" style="padding: 10px 18px; font-size: 0.85rem; border-radius: 8px;">
              Advance State
            </button>
          </div>
        </div>

        <!-- Tab 2: API Keys -->
        <div class="portal-content-pane" id="portal-tab-apikeys">
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; margin-bottom: 8px;">Developer Credentials</h3>
          <p style="color:var(--text-muted); font-size: 0.85rem; margin-bottom: 24px;">Use API credentials to integrate CognitiveFlow automation actions into exterior webhooks endpoints.</p>
          
          <div style="text-align:left;">
            <label style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">API Secret Key</label>
            <div class="api-key-box">
              <span class="api-key-text" id="api-key-value">mock_sk_51Nc9FpL23K9G874XzP1m9K087Fp41NzLp</span>
              <div style="display:flex; gap:12px;">
                <button class="btn-icon" onclick="toggleApiKeyReveal()" title="Toggle Reveal"><i class="fa-solid fa-eye" id="eye-icon"></i></button>
                <button class="btn-icon" onclick="copyApiKey()" title="Copy to Clipboard"><i class="fa-solid fa-copy"></i></button>
              </div>
            </div>
            <button class="btn btn-secondary" onclick="regenerateApiKey()" style="margin-top: 16px; padding: 8px 16px; font-size: 0.8rem; border-radius: 6px;">
              Regenerate credentials
            </button>
          </div>
        </div>

        <!-- Tab 3: Account Profile Settings -->
        <div class="portal-content-pane" id="portal-tab-profile">
          <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; margin-bottom: 24px;">Profile Configurations</h3>
          
          <div style="display:flex; gap:24px; align-items:center; margin-bottom:24px;">
            <div id="user-avatar" style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, var(--purple), var(--cyan)); display:flex; align-items:center; justify-content:center; font-size: 2.2rem; font-weight:700; color:white; border: 2px solid var(--glass-border);">
              JD
            </div>
            <div>
              <h4 style="font-size:1.1rem; font-weight:700; color:white;" id="username-display">John Doe</h4>
              <p style="font-size: 0.8rem; color:var(--text-muted);">Role: Account Owner • Enterprise Tier</p>
            </div>
          </div>

          <form onsubmit="event.preventDefault(); saveProfileSettings();">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px;">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="input-text" id="prof-name" value="John Doe" style="width:100%">
              </div>
              <div class="form-group">
                <label>Billing Email</label>
                <input type="email" class="input-text" value="john.doe@enterprise.com" style="width:100%">
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div>
                <label style="font-size:0.8rem; color:var(--text-muted); display:flex; align-items:center; gap:8px;">
                  Avatar color: 
                  <input type="color" onchange="changeAvatarColor(this.value)" value="#8b5cf6" style="border:none; cursor:pointer; width:24px; height:24px; border-radius:4px;">
                </label>
              </div>
              <button type="submit" class="btn btn-primary" style="padding: 10px 20px; font-size:0.85rem;">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- Support Widget UI -->
  <div class="support-widget">
    <button class="support-trigger" onclick="toggleSupportChat()">
      <i class="fa-solid fa-comment-dots" id="support-trigger-icon"></i>
      <span class="support-status"></span>
    </button>

    <div class="support-chat-box glass-card" id="chat-box">
      <!-- Chat Header -->
      <div class="chat-header">
        <div class="chat-avatar">🤖</div>
        <div class="chat-title">
          <h4>Cognitive AI Assistant</h4>
          <span><i class="fa-solid fa-circle" style="font-size:0.5rem;"></i> Active now</span>
        </div>
      </div>
      
      <!-- Chat Messages log -->
      <div class="chat-messages" id="chat-messages-container">
        <div class="message message-bot">
          Hi! I am your AI Operations assistant. I can help you test workflows, search recommendations, inspect analytics, or track shipments. What can I do for you today?
        </div>
      </div>

      <!-- Quick Replies -->
      <div class="chat-quick-replies">
        <button class="chat-reply-chip" onclick="submitQuickReply('How do I run a workflow simulation?')">Run Workflow</button>
        <button class="chat-reply-chip" onclick="submitQuickReply('Show me analytics info')">Get Analytics</button>
        <button class="chat-reply-chip" onclick="submitQuickReply('How to generate API credentials?')">API Access</button>
      </div>

      <!-- Text Inputs group -->
      <div class="chat-input-group">
        <input type="text" class="input-text" id="chat-input" placeholder="Type a message..." onkeydown="if(event.key==='Enter') sendChatMessage()">
        <button class="btn btn-primary" onclick="sendChatMessage()" style="padding: 10px 14px; border-radius:10px;">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>

  <!-- Script logics -->
  <script>
    // Highlight Active Navbar Items based on scroll
    const navItems = document.querySelectorAll('.nav-item');
    window.addEventListener('scroll', () => {
      let current = '';
      const sections = document.querySelectorAll('section');
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        if (window.scrollY >= top) {
          current = sec.getAttribute('id');
        }
      });
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
          item.classList.add('active');
        }
      });
    });

    // Logger Utility
    const feed = document.getElementById('log-feed');
    function logEvent(text) {
      const now = new Date();
      const timeStr = '[' + now.toTimeString().split(' ')[0] + ']';
      const div = document.createElement('div');
      div.className = 'log-item';
      div.innerHTML = '<span class="log-time">' + timeStr + '</span> ' + text;
      feed.appendChild(div);
      feed.scrollTop = feed.scrollHeight;
    }

    // Feature 1: Charts & Analytics update
    let chartPeriod = '24h';
    function updateChart() {
      const select = document.getElementById('timeframe');
      chartPeriod = select.value;
      
      const linePath = document.getElementById('chart-line-path');
      const strokePath = document.getElementById('chart-stroke-path');
      
      // Update line path coordinates based on range choice
      if (chartPeriod === '24h') {
        linePath.setAttribute('d', 'M 0,200 Q 100,120 200,150 T 400,80 T 600,120 L 600,240 L 0,240 Z');
        strokePath.setAttribute('d', 'M 0,200 Q 100,120 200,150 T 400,80 T 600,120');
        document.getElementById('bar-organic').style.height = '160px';
        document.getElementById('bar-referral').style.height = '80px';
        document.getElementById('bar-social').style.height = '110px';
      } else if (chartPeriod === '7d') {
        linePath.setAttribute('d', 'M 0,160 Q 120,60 220,180 T 440,110 T 600,60 L 600,240 L 0,240 Z');
        strokePath.setAttribute('d', 'M 0,160 Q 120,60 220,180 T 440,110 T 600,60');
        document.getElementById('bar-organic').style.height = '120px';
        document.getElementById('bar-referral').style.height = '150px';
        document.getElementById('bar-social').style.height = '90px';
      } else {
        linePath.setAttribute('d', 'M 0,100 Q 80,180 200,90 T 380,140 T 600,70 L 600,240 L 0,240 Z');
        strokePath.setAttribute('d', 'M 0,100 Q 80,180 200,90 T 380,140 T 600,70');
        document.getElementById('bar-organic').style.height = '90px';
        document.getElementById('bar-referral').style.height = '110px';
        document.getElementById('bar-social').style.height = '170px';
      }
      logEvent('Analytics chart range changed to: ' + chartPeriod);
    }

    let revenueVal = 128492;
    let salesCount = 4892;
    function simulateNewSale() {
      revenueVal += Math.floor(Math.random() * 400) + 100;
      salesCount += 1;
      
      document.getElementById('kpi-rev').innerText = '$' + revenueVal.toLocaleString();
      document.getElementById('kpi-users').innerText = salesCount.toLocaleString();
      
      logEvent('New order payment settled successfully! Total revenue: $' + revenueVal.toLocaleString());
      
      // Bump conversion rate slightly
      const rate = (3.2 + (Math.random() * 0.2)).toFixed(1);
      document.getElementById('kpi-conv').innerText = rate + '%';
    }

    // Feature 2: AI Recommendations persona select
    function selectPersona(personaId, element) {
      document.querySelectorAll('.persona-tab').forEach(t => t.classList.remove('active'));
      element.classList.add('active');
      triggerRecommendationAnalysis();
    }

    // Recommendations Engine recalc
    function triggerRecommendationAnalysis() {
      const scanner = document.getElementById('rec-scan');
      const grid = document.getElementById('rec-grid');
      
      scanner.style.opacity = '1';
      scanner.style.top = '0%';
      grid.style.opacity = '0.3';
      
      let pos = 0;
      const id = setInterval(() => {
        if (pos >= 100) {
          clearInterval(id);
          scanner.style.opacity = '0';
          grid.style.opacity = '1';
          loadNewRecommendations();
        } else {
          pos += 3;
          scanner.style.top = pos + '%';
        }
      }, 15);
    }

    const mockProductsPool = [
      { name: "AuthSecure Shield", desc: "Enterprise-grade authorization and authentication adapter configured for federated login.", price: "$39/mo", rate: "99.1% MATCH" },
      { name: "Node Telemetry Broker", desc: "Data streaming and mapping middleware with automated queue balancing.", price: "$29/mo", rate: "98.4% MATCH" },
      { name: "Cognitive Vector Search", desc: "Semantic retrieval vector database supporting 1536-dimensional embeddings.", price: "$89/mo", rate: "96.5% MATCH" },
      { name: "Media Assets Optimizer", desc: "Real-time images compression, conversion and edge delivery proxy.", price: "$12/mo", rate: "95.1% MATCH" },
      { name: "Serverless Cache Node", desc: "Low latency key-value store cache network deployable in 30+ regions.", price: "$8/mo", rate: "93.2% MATCH" }
    ];

    function loadNewRecommendations() {
      const activePersonaText = document.querySelector('.persona-tab.active').innerText;
      logEvent('AI Product recommendations recalculated for category: ' + activePersonaText);
      
      const shuffled = [...mockProductsPool].sort(() => 0.5 - Math.random()).slice(0, 3);
      const grid = document.getElementById('rec-grid');
      grid.innerHTML = '';
      
      shuffled.forEach(item => {
        grid.innerHTML += '<div class="rec-card animate-fade">' +
            '<span class="match-badge">' + item.rate + '</span>' +
            '<h4 style="font-size: 1.15rem; margin-bottom: 8px;">' + item.name + '</h4>' +
            '<p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6; margin-bottom: 16px;">' + item.desc + '</p>' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:auto;">' +
              '<span style="font-weight:700; color:white;">' + item.price + '</span>' +
              '<a href="#" class="nav-cta" style="padding:6px 12px; font-size:0.8rem;">Add</a>' +
            '</div>' +
          '</div>';
      });
    }

    // Feature 3: Business management operations
    function toggleModal(show) {
      document.getElementById('product-modal').classList.toggle('open', show);
    }

    function addNewProduct(e) {
      e.preventDefault();
      const name = document.getElementById('p-name').value;
      const sku = document.getElementById('p-sku').value;
      const price = parseFloat(document.getElementById('p-price').value).toFixed(2);
      
      const tbody = document.getElementById('inventory-tbody');
      const tr = document.createElement('tr');
      tr.style.opacity = '0';
      tr.style.transform = 'translateY(10px)';
      tr.style.transition = 'all 0.3s';
      tr.innerHTML = '<td style="font-weight:600;">' + name + '</td>' +
        '<td style="font-family:monospace;">' + sku + '</td>' +
        '<td>$' + price + '</td>' +
        '<td><span class="status-dot status-active"></span>Active</td>' +
        '<td><button class="btn btn-secondary" onclick="simulateRestock(this)" style="padding: 4px 10px; font-size: 0.75rem; border-radius: 4px;">Restock</button></td>';
      tbody.appendChild(tr);
      
      setTimeout(() => {
        tr.style.opacity = '1';
        tr.style.transform = 'translateY(0)';
      }, 50);

      toggleModal(false);
      logEvent('New inventory item added: ' + name + ' (SKU: ' + sku + ')');
      
      document.getElementById('p-name').value = '';
      document.getElementById('p-sku').value = '';
      document.getElementById('p-price').value = '';
    }

    function simulateRestock(btn) {
      const tr = btn.closest('tr');
      const name = tr.querySelector('td').innerText;
      const statusCell = tr.querySelectorAll('td')[3];
      statusCell.innerHTML = '<span class="status-dot status-active"></span>Active';
      btn.style.color = 'var(--text-light)';
      btn.style.borderColor = 'var(--glass-border)';
      
      logEvent('Restocked item: ' + name + ' (Replenished warehouse levels to 100%)');
      alert('Inventory levels replenished for: ' + name);
    }

    // Feature 4: Workflows simulation trigger
    function simulateWorkflowTrigger() {
      const dot = document.getElementById('pulse-dot');
      const node1 = document.getElementById('node-1');
      const node2 = document.getElementById('node-2');
      const node3 = document.getElementById('node-3');

      document.querySelectorAll('.node-card').forEach(n => {
        n.classList.remove('active-node', 'success-node');
      });
      
      logEvent('Workflow pipeline triggered by mock Stripe Webhook.');
      node1.classList.add('active-node');
      
      dot.style.opacity = '1';
      dot.style.left = '150px';
      dot.style.top = '185px';
      
      setTimeout(() => {
        dot.style.left = '450px';
        node1.classList.remove('active-node');
        node1.classList.add('success-node');
        node2.classList.add('active-node');
        logEvent('Workflow step 1 complete: Webhook verified.');
      }, 1000);
      
      setTimeout(() => {
        dot.style.left = '750px';
        node2.classList.remove('active-node');
        node2.classList.add('success-node');
        node3.classList.add('active-node');
        logEvent('Workflow step 2 complete: Applied conditional branching router.');
      }, 2000);

      setTimeout(() => {
        dot.style.left = '1000px';
        dot.style.opacity = '0';
        node3.classList.remove('active-node');
        node3.classList.add('success-node');
        logEvent('Workflow automation completed successfully. CRM updated.');
        alert('Automation workflow executed with success!');
      }, 3000);
    }

    function addNewWorkflowStep() {
      const name = prompt("Enter workflow step name (e.g. Slack Dispatch, SMTP Mailer):", "Mailer Node");
      if(!name) return;
      
      const container = document.getElementById('workflow-canvas-container');
      const node = document.createElement('div');
      node.className = 'node-card animate-fade';
      node.id = 'node-' + (document.querySelectorAll('.node-card').length + 1);
      
      node.innerHTML = '<div class="node-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--green);">' +
          '<i class="fa-solid fa-server"></i>' +
        '</div>' +
        '<div class="node-header">' + name + '</div>' +
        '<div class="node-body">Action: Custom Webhook</div>';
      
      const svg = container.querySelector('svg');
      const startX = 230 + (220 * (document.querySelectorAll('.node-card').length - 1));
      const endX = startX + 100;
      
      svg.innerHTML += '<path d="M ' + startX + ' 190 H ' + endX + '" stroke="rgba(255,255,255,0.08)" stroke-width="3" fill="none"></path>';
      container.appendChild(node);
      logEvent('Added custom workflow node block: ' + name);
    }

    // Feature 5: Customer portal tabs and simulation stepper
    function switchPortalTab(tabName, btn) {
      document.querySelectorAll('.portal-menu-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.portal-content-pane').forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById('portal-tab-' + tabName).classList.add('active');
      logEvent('Switched Customer Portal view to: ' + tabName);
    }

    let currentShipmentStep = 1;
    function advanceShipmentState() {
      if (currentShipmentStep >= 3) {
        currentShipmentStep = 0;
        document.querySelectorAll('.step').forEach((s, idx) => {
          s.className = idx === 0 ? 'step completed' : idx === 1 ? 'step active' : 'step';
        });
        document.getElementById('step-prog-bar').style.width = '0%';
        logEvent('Portal tracking state reset to order created.');
        return;
      }
      
      const prevStep = document.getElementById('step-' + currentShipmentStep);
      prevStep.className = 'step completed';
      currentShipmentStep++;
      
      const activeStep = document.getElementById('step-' + currentShipmentStep);
      activeStep.className = 'step active';
      
      const progWidth = (currentShipmentStep / 3) * 100;
      document.getElementById('step-prog-bar').style.width = progWidth + '%';
      
      const labels = ["Created", "Processing", "Shipped", "Delivered"];
      logEvent('Client order tracking state updated: ' + labels[currentShipmentStep]);
    }

    let keysRevealed = false;
    function toggleApiKeyReveal() {
      keysRevealed = !keysRevealed;
      const keySpan = document.getElementById('api-key-value');
      const eyeIcon = document.getElementById('eye-icon');
      
      if (keysRevealed) {
        keySpan.classList.add('revealed');
        eyeIcon.className = 'fa-solid fa-eye-slash';
      } else {
        keySpan.classList.remove('revealed');
        eyeIcon.className = 'fa-solid fa-eye';
      }
    }

    function copyApiKey() {
      const key = document.getElementById('api-key-value').innerText;
      navigator.clipboard.writeText(key);
      alert('API credentials copied to clipboard!');
      logEvent('API key copied to clipboard.');
    }

    function regenerateApiKey() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let key = "mock_sk_";
      for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      document.getElementById('api-key-value').innerText = key;
      logEvent('Client generated new API credential key.');
      alert('New API secret key generated successfully.');
    }

    function changeAvatarColor(val) {
      document.getElementById('user-avatar').style.background = val;
    }

    function saveProfileSettings() {
      const name = document.getElementById('prof-name').value;
      document.getElementById('username-display').innerText = name;
      document.getElementById('user-avatar').innerText = name.split(' ').map(n=>n[0]).join('');
      alert('Profile configurations saved successfully!');
      logEvent('Account Profile name updated to: ' + name);
    }

    // Feature 6: Support Widget operations
    let chatOpen = false;
    function toggleSupportChat() {
      chatOpen = !chatOpen;
      const box = document.getElementById('chat-box');
      const triggerIcon = document.getElementById('support-trigger-icon');
      
      box.classList.toggle('open', chatOpen);
      triggerIcon.className = chatOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-comment-dots';
      
      if(chatOpen) {
        const input = document.getElementById('chat-input');
        setTimeout(() => input.focus(), 150);
      }
    }

    function sendChatMessage() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      
      appendMessage(text, 'user');
      input.value = '';
      showTypingIndicator(true);
      
      setTimeout(() => {
        showTypingIndicator(false);
        const reply = getAIResponse(text);
        appendMessage(reply, 'bot');
      }, 1000);
    }

    function submitQuickReply(text) {
      appendMessage(text, 'user');
      showTypingIndicator(true);
      
      setTimeout(() => {
        showTypingIndicator(false);
        const reply = getAIResponse(text);
        appendMessage(reply, 'bot');
      }, 1000);
    }

    function appendMessage(text, sender) {
      const chatContainer = document.getElementById('chat-messages-container');
      const msg = document.createElement('div');
      msg.className = 'message message-' + sender;
      msg.innerText = text;
      
      const ind = document.getElementById('typing-indicator');
      if (ind) {
        chatContainer.insertBefore(msg, ind);
      } else {
        chatContainer.appendChild(msg);
      }
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function showTypingIndicator(show) {
      const chatContainer = document.getElementById('chat-messages-container');
      const existing = document.getElementById('typing-indicator');
      
      if (show && !existing) {
        const div = document.createElement('div');
        div.id = 'typing-indicator';
        div.className = 'message message-bot chat-typing-dots';
        div.innerHTML = '<div class="typing-dot"></div>' +
          '<div class="typing-dot"></div>' +
          '<div class="typing-dot"></div>';
        chatContainer.appendChild(div);
        chatContainer.scrollTop = chatContainer.scrollHeight;
      } else if (!show && existing) {
        existing.remove();
      }
    }

    function getAIResponse(query) {
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
      if (q.includes('hello') || q.includes('hi')) {
        return "Hello! I am your operational co-pilot. I can answer questions about recommendations, orders, analytics, or workflow setups.";
      }
      return "Interesting question! For custom pipelines configurations, please contact support at support@cognitiveflow.ai.";
    }
  </script>
</body>
</html>`,
  }
];
export function getTemplateById(id: string): WebsiteTemplate | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): WebsiteTemplate[] {
  return templates.filter((t) => t.category === category);
}
