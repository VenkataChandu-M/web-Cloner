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
];

export function getTemplateById(id: string): WebsiteTemplate | undefined {
  return templates.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: string): WebsiteTemplate[] {
  return templates.filter((t) => t.category === category);
}
