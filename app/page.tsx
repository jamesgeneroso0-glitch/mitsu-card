'use client';

import { useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const productUrl = "https://www.mitsu.cards/product";
  const [showIntro, setShowIntro] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    // Pagkalipas ng 1.2 seconds, i-trigger ang slide up
    const timer1 = setTimeout(() => {
      setSlideUp(true);
    }, 1200);

    // Tuluyang tanggalin pagkatapos ng animation
    const timer2 = setTimeout(() => {
      setShowIntro(false);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-4 sm:p-8 relative overflow-hidden">
      
      {/* Intro Animation Overlay */}
      {showIntro && (
        <div className={`fixed inset-0 z-50 bg-[#090d16] flex items-center justify-center transition-all duration-1000 ease-in-out ${
          slideUp ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}>
          <div className="text-center p-6">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
              Mitsu Smart Card
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-3 mx-auto" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl text-center mt-16 relative z-10 flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-100 mb-4">
          Connect effortlessly with <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Mitsu Smart Card</span>
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
          Share your socials, portfolio, contact details, and gaming profiles with just a single tap.
        </p>
        <a 
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg"
        >
          <span>Get Started</span>
          <ArrowRight size={18} /> 
        </a>
      </div>
    </main>
  );
}