'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Sparkles, Zap, ShieldCheck, Smartphone, Send, Mail, Phone, MapPin, CheckCircle, Layers, QrCode } from 'lucide-react';
import Image from 'next/image';
import qrImage from '@/public/mitsu-smart-card-demo.png';

// ScrollReveal Wrapper mula sa Main Page para sa parehong animation setup
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
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
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

// Separate Component for FAQ Item to prevent React Hook Error in .map()
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 60}>
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg">
        <button
          type="button"
          onClick={() => setFaqOpen(!faqOpen)}
          className="w-full p-4 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer active:bg-slate-800/50 transition-colors"
        >
          <span className="font-semibold text-xs md:text-sm text-slate-200">{q}</span>
          <span className={`text-indigo-400 font-bold text-base transition-transform duration-300 ${faqOpen ? 'rotate-45' : ''}`}>
            +
          </span>
        </button>

        <AnimatePresence>
          {faqOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3"
            >
              {a}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollReveal>
  );
}

export default function ProductLandingPage() {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cardTheme, setCardTheme] = useState<'midnight' | 'rose' | 'emerald'>('midnight');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData(e.currentTarget);
    formDataToSend.append("access_key", "902209db-61d3-4b2a-831d-a9bff915719b");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        alert("Thank you! Your inquiry has been sent successfully.");
        setFormData({ name: '', contact: '', message: '' });
      } else {
        alert("Failed to send message: " + data.message);
      }
    } catch (error) {
      alert("An error occurred while sending your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeStyles = {
    midnight: {
      cardBg: 'from-slate-900 via-indigo-950 to-slate-900',
      border: 'border-indigo-500/30',
      badge: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
      accentText: 'from-indigo-400 via-cyan-400 to-indigo-300',
      glow: 'bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.25)_0%,transparent_70%)]'
    },
    rose: {
      cardBg: 'from-slate-900 via-rose-950/40 to-slate-900',
      border: 'border-pink-500/30',
      badge: 'bg-pink-500/10 border-pink-500/20 text-pink-300',
      accentText: 'from-pink-400 via-rose-300 to-amber-200',
      glow: 'bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.25)_0%,transparent_70%)]'
    },
    emerald: {
      cardBg: 'from-slate-900 via-emerald-950/40 to-slate-900',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
      accentText: 'from-emerald-400 via-teal-300 to-cyan-300',
      glow: 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25)_0%,transparent_70%)]'
    }
  };

  const faqData = [
    {
      q: "How much is the Black & White Edition MSC Card?",
      a: "The physical card costs only ₱499 as a one-time payment. This includes NTAG213 microchip programming and lifetime access to edit your profile links."
    },
    {
      q: "Does it work with all types of smartphones?",
      a: "Yes! Most modern iOS and Android phones feature native NFC support. For older devices, users can easily scan the custom QR code on the back of the card."
    },
    {
      q: "Is a special app required to read the card?",
      a: "No! Tapping the card against a phone automatically opens the browser to display your digital profile and links."
    },
    {
      q: "Are there any monthly or annual subscription fees?",
      a: "None! The ₱499 price is a one-time payment. You won't have to pay any recurring monthly or annual fees."
    },
    {
      q: "How do I add or update my links?",
      a: "We will provide you with access to update your portfolio, social media links, or contact details anytime."
    },
    {
      q: "Is the card durable and long-lasting?",
      a: "Yes, it is made of premium matte PVC that is waterproof and scratch-resistant. It stays safe even if it gets wet or pressed inside your wallet."
    }
  ];

  if (!isReady) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col justify-between antialiased">
      <div>
        {/* --- HERO & INTERACTIVE DEMO SECTION --- */}
        <section className="relative overflow-hidden pt-16 pb-12 px-5 sm:px-6 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] sm:w-[32rem] sm:h-[32rem] ${themeStyles[cardTheme].glow} pointer-events-none transform-gpu transition-all duration-700`} />

          <div className="text-center max-w-2xl mb-6 sm:mb-8 z-10 flex flex-col items-center">
            
            <ScrollReveal delay={100}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm mb-4 shadow-inner">
                <Sparkles size={15} className="animate-pulse" /> Next-Gen Networking
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                The Only Card <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeStyles[cardTheme].accentText}`}>
                  You'll Ever Need.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-md sm:max-w-lg mx-auto leading-relaxed">
                Share your social media, portfolio, and contact details in a single tap. Designed for professionals, creators, and students.
              </p>
            </ScrollReveal>
          </div>

          {/* Theme Picker Selector */}
          <ScrollReveal delay={550}>
            <div className="z-10 mb-8 flex items-center gap-1.5 sm:gap-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-1.5 rounded-full shadow-lg">
              <span className="text-[11px] sm:text-xs text-slate-400 pl-3 font-medium">Style:</span>
              <button
                type="button"
                onClick={() => setCardTheme('midnight')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95 ${cardTheme === 'midnight' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25' : 'text-slate-400 hover:text-white'}`}
              >
                Midnight
              </button>
              <button
                type="button"
                onClick={() => setCardTheme('rose')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95 ${cardTheme === 'rose' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25' : 'text-slate-400 hover:text-white'}`}
              >
                Rose
              </button>
              <button
                type="button"
                onClick={() => setCardTheme('emerald')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95 ${cardTheme === 'emerald' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' : 'text-slate-400 hover:text-white'}`}
              >
                Emerald
              </button>
            </div>
          </ScrollReveal>

          {/* Dynamic-Height Interactive Card Demo */}
          <ScrollReveal delay={700} className="w-full flex flex-col items-center">
            <div className="relative z-10 flex flex-col items-center gap-4 w-full transform-gpu">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-[280px] sm:w-72 h-44 bg-gradient-to-br ${themeStyles[cardTheme].cardBg} border ${themeStyles[cardTheme].border} rounded-2xl shadow-2xl p-6 cursor-pointer flex flex-col justify-between relative overflow-hidden group select-none active:scale-[0.97] transition-transform duration-150 transform-gpu backdrop-blur-md`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base sm:text-lg tracking-wider text-slate-100">Mitsu Smart Card</span>
                  <Share2 className="text-slate-300 group-hover:rotate-12 transition-transform duration-300" size={18} />
                </div>

                <div className="text-center py-2">
                  <span className={`text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border ${themeStyles[cardTheme].badge}`}>
                    {isOpen ? "[ Tap to Close ]" : "[ Tap to Test MSC ]"}
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider">Custom Name</p>
                    <p className="text-xs font-semibold text-slate-200">Your Name Here</p>
                  </div>
                  <div className="w-8 h-6 bg-amber-400/20 border border-amber-400/40 rounded-md flex items-center justify-center">
                    <div className="w-4 h-3 border border-amber-400/60 rounded-sm" />
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-[280px] sm:w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center transform-gpu overflow-hidden mt-1"
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-base sm:text-lg text-slate-300 mb-3 shadow-inner">
                      YOU
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-100">Your Custom Profile</h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mb-4">All your links in one place</p>
                    <div className="w-full py-2.5 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-xs font-medium text-indigo-300 shadow-sm">
                      Instant Link Access
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="py-16 px-5 sm:px-6 max-w-5xl mx-auto border-t border-slate-900">
          <ScrollReveal delay={100}>
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Why Switch to Mitsu Smart Card?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Designed for seamless, eco-friendly, and modern networking.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            <ScrollReveal delay={200}>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl flex flex-col items-start shadow-xl h-full">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl mb-4">
                  <Zap size={22} />
                </div>
                <h3 className="font-bold text-base mb-2">One-Tap Sharing</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No apps required. Simply tap the card on any modern smartphone to instantly share your profile.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl flex flex-col items-start shadow-xl h-full">
                <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl mb-4">
                  <Smartphone size={22} />
                </div>
                <h3 className="font-bold text-base mb-2">Fully Customizable</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Choose your favorite colors, upload your own logo, or customize your landing page layout anytime.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl flex flex-col items-start shadow-xl h-full">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mb-4">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="font-bold text-base mb-2">Durable & Reusable</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Waterproof, scratch-resistant, and reusable. Update your links anytime without reprinting cards.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* --- BLACK & WHITE PORTRAIT CARD SHOWCASE --- */}
        <section className="py-16 sm:py-20 px-5 sm:px-6 max-w-5xl mx-auto border-t border-slate-900">
          
          <ScrollReveal delay={100}>
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs mb-3 shadow-sm">
                <Layers size={13} className="animate-pulse" /> Dual-Card Playing Style
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
                Black & White Edition
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-sm sm:max-w-md mx-auto leading-relaxed">
                High-contrast minimalist aesthetic with vertical card alignment, engineered with instant-read NTAG213 chips.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="flex justify-center mb-12 sm:mb-16">
              <div className="relative w-64 sm:w-72 h-80 sm:h-96 flex items-center justify-center transform-gpu">
                <div className="absolute w-48 sm:w-56 h-72 sm:h-80 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 text-slate-900 flex flex-col justify-between -translate-x-4 sm:-translate-x-6 transform-gpu shadow-2xl shadow-black/70 rotate-[-10deg]">
                  <div className="flex justify-start">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900 fill-current" viewBox="0 0 24 24">
                      <path d="M12 1.5l2.8 6.8 7.2.6-5.4 4.8 1.6 7.1L12 17l-6.2 3.8 1.6-7.1L2 8.9l7.2-.6z" />
                    </svg>
                  </div>
                  <div className="flex justify-end items-end">
                    <span className="font-black text-sm sm:text-base tracking-widest text-slate-900">MSC</span>
                  </div>
                </div>

                <div className="absolute w-48 sm:w-56 h-72 sm:h-80 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 text-white flex flex-col justify-between translate-x-4 sm:translate-x-6 transform-gpu shadow-2xl shadow-black/70 rotate-[10deg]">
                  <div className="flex justify-start">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" viewBox="0 0 24 24">
                      <path d="M12 1.5l2.8 6.8 7.2.6-5.4 4.8 1.6 7.1L12 17l-6.2 3.8 1.6-7.1L2 8.9l7.2-.6z" />
                    </svg>
                  </div>
                  <div className="flex justify-end items-end">
                    <span className="font-black text-sm sm:text-base tracking-widest text-slate-100">MSC</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <ScrollReveal delay={100}>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-md h-full">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-100 mb-1">Instant Tap Hardware</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">High-sensitivity NTAG213 microchip with instant zero-lag trigger on iOS & Android.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-md h-full">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-100 mb-1">Waterproof Matte PVC</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">Scratch-resistant material coated with a smooth premium finish in both black and white.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-md h-full">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-100 mb-1">No App Required</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">Receivers don't need any special app installed; your digital card opens automatically in browser.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 p-4 sm:p-5 rounded-2xl flex items-start gap-3 shadow-md h-full">
                <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-100 mb-1">Lifetime Dynamic Edits</h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">Update your portfolio, social profiles, or phone number anytime without replacing the physical card.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section className="py-16 px-5 sm:px-6 max-w-4xl mx-auto border-t border-slate-900">
          <ScrollReveal delay={100}>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Get Your Custom Card
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Have questions or ready to order? Send us a message below.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
            <ScrollReveal delay={200}>
              <div className="flex flex-col gap-5 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl h-full">
                <h3 className="font-bold text-base text-slate-200">Contact Details</h3>
                
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <Mail className="text-indigo-400 shrink-0" size={18} />
                  <span className="truncate">mitsukazuwara1112@gmail.com</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <Phone className="text-indigo-400 shrink-0" size={18} />
                  <span>+63 994 940 9150</span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <MapPin className="text-indigo-400 shrink-0" size={18} />
                  <span>Laguna, Philippines</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={350}>
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-4 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 p-6 rounded-2xl shadow-xl"
              >
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Your Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Email or Contact Number</label>
                  <input 
                    type="text" 
                    name="contact"
                    required
                    placeholder="john@email.com / 0912..."
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">Inquiry or Order Details</label>
                  <textarea 
                    name="message"
                    rows={3}
                    required
                    placeholder="I'd like to order a customized Black & White NFC card..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/25 cursor-pointer"
                >
                  <Send size={14} /> {isSubmitting ? "Sending..." : "Send Inquiry via Email"}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </section>

        {/* --- QR CODE DEMO SECTION --- */}
        <section className="py-16 px-5 sm:px-6 max-w-md mx-auto text-center border-t border-slate-900">
          <ScrollReveal delay={100}>
            <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col items-center gap-4 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs">
                <QrCode size={14} /> MSC Live Scan Demo
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-100">Scan to Test Live Profile</h3>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Scan this QR code using your smartphone camera to see how your digital profile will look upon tapping the MSC card.
              </p>

              <div className="p-4 bg-white rounded-2xl shadow-xl mt-2 border-4 border-slate-800">
                <Image 
                  src={qrImage} 
                  alt="MSC Demo QR Code" 
                  width={160} 
                  height={160} 
                  className="rounded-lg object-contain mx-auto"
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* --- FAQ & PRICING SECTION --- */}
        <section className="py-16 px-5 sm:px-6 max-w-3xl mx-auto border-t border-slate-900">
          <ScrollReveal delay={100}>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Frequently Asked Questions & Pricing
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Everything you need to know about the Black & White Edition Smart MSC Card.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl p-6 mb-8 text-center relative overflow-hidden shadow-xl">
              <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/30">
                Black & White Edition
              </span>
              <div className="mt-4 mb-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">₱499</span>
                <span className="text-xs text-slate-400"> / one-time payment</span>
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Includes custom vertical print, built-in NTAG213 chip, and lifetime profile access. No monthly fees.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col gap-3">
            {faqData.map((faq, index) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={index} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900/80 py-8 px-6 mt-16 text-center relative z-10 flex justify-center backdrop-blur-md bg-slate-950/40">
        <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Mitsu Smart Card. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-400">
            <a href="https://www.mitsu.cards/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="https://www.mitsu.cards/terms" className="hover:text-white transition">Terms and Conditions</a>
            <a href="https://www.mitsu.cards/support" className="hover:text-white transition">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}