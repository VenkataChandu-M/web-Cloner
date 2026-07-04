# WebForge AI — AI-Powered Immersive Website Builder & Cloner

WebForge AI is an advanced, generative AI-driven website builder that enables you to build, customize, and clone stunning, production-ready websites in seconds. It integrates interactive 3D particle fields, modern glassmorphic aesthetics, and AI-assisted layouts.

---

## 🌟 Key Features

- **✨ Describe & Build**: Describe your website idea or import documentation, and let AI generate full landing pages with animations.
- **🔄 Website Cloner & Redesigner**: Paste any URL to clone its structure and assets, then use Gemini AI to redesign the page into styles like *Glassmorphism*, *3D Immersive*, *Minimal*, *Bold & Vibrant*, or *Futuristic*.
- **🎨 Visual Editor**: Fine-tune generated layouts, tweak components, write custom code, and export production-ready pages with a 3-panel visual canvas interface.
- **🌌 Immersive 3D Starfield**: Responsive background rendering a 3D space with stars and meteorites that rotates dynamically when you scroll and reacts to your cursor.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router & Turbopack)
- **UI & Logic**: React, TypeScript, Zustand, Tailwind CSS, PostCSS
- **3D & Graphics**: Three.js, React Three Fiber (R3F), Canvas API
- **AI Integration**: Google Gemini API (`@google/generative-ai`)
- **Animations**: Framer Motion, GSAP (GreenSock)
- **Scraper**: Cheerio (for web cloning)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone this repository or copy the project files.
2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables. Create a `.env.local` file in the root directory and add your API credentials:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view and build!

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js pages & API routes
│   ├── api/              # API endpoints for AI generation, scraping & cloning
│   ├── clone/            # Clone page
│   ├── dashboard/        # Dashboard for managing projects
│   ├── editor/           # Canva Editor panel
│   └── generate/         # Wizard for starting a new project
├── components/           # React Components
│   ├── 3d/               # 3D Starfield background
│   ├── editor/           # Visual canvas toolbar, canvas and layout properties panels
│   ├── landing/          # Home landing pages section cards
│   └── ui/               # Reusable alerts, spinners and layouts
├── lib/                  # Library configurations (Gemini API prompts, web scraper)
└── store/                # Global states (zustand stores for projects and editor history)
```

---

## 📄 License

This project is private and proprietary. Built with ❤️ and AI.
