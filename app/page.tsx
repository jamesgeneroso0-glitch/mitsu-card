'use client';

import Link from 'next/link';
import { Sparkles, CreditCard, Share2, Smartphone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const titleText = "Connect effortlessly with";
  const brandText = "Mitsu Card";
  const subtitleText = "Share your socials, portfolio, contact details, and gaming profiles with just a single tap.";

  const titleWords = titleText.split(" ");
  const brandWords = brandText.split(" ");
  const subtitleWords = subtitleText.split(" ");

  // PALITAN MO ITO NG FACEBOOK PAGE O PROFILE URL MO:
  const facebookUrl = "https://www.facebook.com/your-facebook-page";

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-2xl text-center mt-16 relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium mb-6 drop-shadow-[0_2px_8px_rgba(168,85,247,0.2)]"
        >
          <Sparkles size={14} className="animate-pulse" /> Next-Gen NFC Smart Cards
        </motion.div>
        
        {/* Main Title - Word by Word Staggered Downward Animation */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 mb-4 flex flex-wrap justify-center gap-x-3 gap-y-1">
          {titleWords.map((word, index) => (
            <motion.span
              key={`title-${index}`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="inline-block drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
            >
              {word}
            </motion.span>
          ))}

          {/* Brand Name "Mitsu Card" */}
          {brandWords.map((word, index) => (
            <motion.span
              key={`brand-${index}`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: (titleWords.length + index) * 0.05 }}
              className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(192,38,211,0.35)]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle - Word by Word Staggered Downward Animation */}
        <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-lg flex flex-wrap justify-center gap-x-1.5 gap-y-0.5">
          {subtitleWords.map((word, index) => (
            <motion.span
              key={`sub-${index}`}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.2, 
                delay: (titleWords.length + brandWords.length) * 0.05 + (index * 0.03) 
              }}
              className="inline-block drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* Get Started Action Button -> Facebook Link */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.3, 
            delay: (titleWords.length + brandWords.length + subtitleWords.length) * 0.03 + 0.1 
          }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <a 
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 active:scale-95 text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 ease-out shadow-lg shadow-purple-500/25"
          >
            <span>Get Started</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" /> 
          </a>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full my-12 relative z-10"
      >
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center transition-all duration-200 hover:border-purple-500/40">
          <Smartphone size={24} className="text-purple-400 mx-auto mb-2" />
          <h3 className="font-semibold text-sm text-slate-200">One Tap Share</h3>
          <p className="text-xs text-slate-400 mt-1">Works instantly on iOS & Android without any extra app.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center transition-all duration-200 hover:border-pink-500/40">
          <CreditCard size={24} className="text-pink-400 mx-auto mb-2" />
          <h3 className="font-semibold text-sm text-slate-200">Custom Designs</h3>
          <p className="text-xs text-slate-400 mt-1">Personalized layout matched with your unique digital profile.</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center transition-all duration-200 hover:border-cyan-500/40">
          <Share2 size={24} className="text-cyan-400 mx-auto mb-2" />
          <h3 className="font-semibold text-sm text-slate-200">Update Anytime</h3>
          <p className="text-xs text-slate-400 mt-1">Change your links anytime without reprinting your physical card.</p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="text-center relative z-10 mb-4 opacity-80">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Mitsu Smart Card. All rights reserved.</p>
      </footer>
    </main>
  );
}