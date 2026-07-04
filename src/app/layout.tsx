import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ToastContainer from "@/components/ui/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WebForge AI — AI-Powered 3D Website Builder",
  description:
    "Build stunning, 3D-enhanced websites in seconds. Describe your vision, clone any website, or use AI to generate production-ready pages with Three.js, GSAP, and glassmorphism effects.",
  keywords: ["website builder", "AI", "3D", "Three.js", "web design", "glassmorphism"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body style={{ minHeight: '100vh' }}>
        <div className="noise-overlay" />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
