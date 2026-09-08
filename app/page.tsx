'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { 
  Sparkles, 
  CreditCard, 
  Share2, 
  Smartphone, 
  ArrowRight 
} from 'lucide-react';

// Wrapper component para sa animation na mag-ti-trigger lang kapag na-scroll na sa viewport
function ScrollReveal({ 
  children, 
  className = "", 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Isang beses lang mag-animate pagpasok sa screen
        }
      },
      { threshold: 0.15 } // 15% ng element dapat kita bago mag-trigger
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const productUrl = "https://www.mitsu.cards";

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-hidden">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-4xl text-center mt-8 sm:mt-16 relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <ScrollReveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs sm:text-sm font-medium mb-6 drop-shadow-[0_2px_8px_rgba(168,85,247,0.2)]">
            <Sparkles size={14} className="animate-pulse" /> Next-Gen NFC Smart Cards
          </div>
        </ScrollReveal>
        
        {/* Main Title */}
        <ScrollReveal delay={150}>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight text-slate-100 mb-4">
            Connect effortlessly with <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(192,38,211,0.35)]">Mitsu Smart Card</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={300}>
          <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Share your socials, portfolio, contact details, and gaming profiles with just a single tap.
          </p>
        </ScrollReveal>

        {/* Action Button */}
        <ScrollReveal delay={450}>
          <a 
            href={productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 ease-out shadow-lg shadow-purple-500/25 w-full sm:w-auto"
          >
            <span>Get Started</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" /> 
          </a>
        </ScrollReveal>

      </div>

      {/* How It Works Section */}
      <div className="max-w-4xl w-full my-16 relative z-10">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-center text-slate-100 mb-8">
            How It Works
          </h2>
        </ScrollReveal>

        {/* 3 Containers/Boxes - Magpo-pop up isa-isa habang naka-scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <ScrollReveal delay={100}>
            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl text-center hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 font-bold flex items-center justify-center mx-auto mb-4 border border-purple-500/20">1</div>
              <h3 className="font-semibold text-sm text-slate-200">Tap the Card</h3>
              <p className="text-xs text-slate-400 mt-2">Hold your Mitsu Card near any smartphone (iOS or Android).</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl text-center hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 font-bold flex items-center justify-center mx-auto mb-4 border border-pink-500/20">2</div>
              <h3 className="font-semibold text-sm text-slate-200">Open Notification</h3>
              <p className="text-xs text-slate-400 mt-2">A pop-up link appears instantly on screen without installing apps.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl text-center hover:border-slate-700 transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">3</div>
              <h3 className="font-semibold text-sm text-slate-200">Save & Connect</h3>
              <p className="text-xs text-slate-400 mt-2">People can save your contact details or visit your links in one click.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Why Choose Mitsu Card Section */}
      <div className="max-w-4xl w-full mb-16 relative z-10">
        <ScrollReveal>
          <h2 className="text-2xl font-bold text-center text-slate-100 mb-8">
            Why Choose Mitsu Smart Card?
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ScrollReveal delay={100}>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center transition-all duration-200 hover:border-purple-500/40">
              <Smartphone size={28} className="text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold text-base text-slate-200 mb-1">One Tap Share</h3>
              <p className="text-xs text-slate-400">Works instantly on iOS & Android without any extra app needed.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center transition-all duration-200 hover:border-pink-500/40">
              <CreditCard size={28} className="text-pink-400 mx-auto mb-3" />
              <h3 className="font-semibold text-base text-slate-200 mb-1">Custom Designs</h3>
              <p className="text-xs text-slate-400">Personalized layout matched with your unique digital profile.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-center transition-all duration-200 hover:border-cyan-500/40">
              <Share2 size={28} className="text-cyan-400 mx-auto mb-3" />
              <h3 className="font-semibold text-base text-slate-200 mb-1">Update Anytime</h3>
              <p className="text-xs text-slate-400">Change your links anytime without reprinting your physical card.</p>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Supported Platforms Grid */}
      <div className="max-w-3xl w-full my-8 text-center relative z-10">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
            Supported Integration Profiles
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={150}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'YouTube', 'GCash', 'Spotify', 'Discord', 'Steam', 'Custom Link'].map((platform, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium inline-block hover:border-slate-700 transition"
              >
                {platform}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-5xl border-t border-slate-800/60 pt-6 mt-12 text-center relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Mitsu Smart Card. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-slate-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Contact Support</a>
            </div>
          </div>
      </footer>

    </main>
  );
}