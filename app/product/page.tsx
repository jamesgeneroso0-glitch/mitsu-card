'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Sparkles, Zap, ShieldCheck, Smartphone, Send, Mail, Phone, MapPin, CheckCircle, Layers, QrCode } from 'lucide-react';
import Image from 'next/image';
import qrImage from '@/public/mitsu-nfc-card.png';

// Separate Component for FAQ Item to prevent React Hook Error in .map()
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [faqOpen, setFaqOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setFaqOpen(!faqOpen)}
        className="w-full p-4 text-left flex justify-between items-center gap-4 focus:outline-none"
      >
        <span className="font-semibold text-xs md:text-sm text-slate-200">{q}</span>
        <span className={`text-indigo-400 font-bold text-base transition-transform duration-200 ${faqOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>

      <AnimatePresence>
        {faqOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProductLandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardTheme, setCardTheme] = useState<'midnight' | 'rose' | 'emerald'>('midnight');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  // --- Web3Forms Handler ---
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
      glow: 'bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2)_0%,transparent_70%)]'
    },
    rose: {
      cardBg: 'from-slate-900 via-rose-950/40 to-slate-900',
      border: 'border-pink-500/30',
      badge: 'bg-pink-500/10 border-pink-500/20 text-pink-300',
      accentText: 'from-pink-400 via-rose-300 to-amber-200',
      glow: 'bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.2)_0%,transparent_70%)]'
    },
    emerald: {
      cardBg: 'from-slate-900 via-emerald-950/40 to-slate-900',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
      accentText: 'from-emerald-400 via-teal-300 to-cyan-300',
      glow: 'bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)]'
    }
  };

  const faqData = [
    {
      q: "How much is the Black & White Edition NFC Card?",
      a: "The physical card costs only ₱499 as a one-time payment. This includes NTAG213 microchip programming and lifetime access to edit your profile links."
    },
    {
      q: "Does it work with all types of smartphones?",
      a: "Yes! Most modern iOS (iPhone XR and above) and Android phones feature native NFC support. For older devices, users can easily scan the custom QR code on the back of the card."
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

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white overflow-hidden flex flex-col justify-between">
      
      <div>
        {/* --- HERO & INTERACTIVE DEMO SECTION --- */}
        <section className="relative overflow-hidden pt-20 pb-12 px-6 flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] ${themeStyles[cardTheme].glow} pointer-events-none transform-gpu transition-all duration-500`} />

          <div className="text-center max-w-2xl mb-8 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-4 shadow-inner"
            >
              <Sparkles size={16} className="animate-pulse" /> Next-Gen Networking
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight"
            >
              The Only Card <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${themeStyles[cardTheme].accentText}`}>
                You'll Ever Need.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-slate-400 text-sm md:text-base max-w-lg mx-auto"
            >
              Share your social media, portfolio, and contact details in a single tap. Designed for professionals, creators, and students.
            </motion.p>
          </div>

          {/* Theme Picker Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="z-10 mb-8 flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-2 rounded-full"
          >
            <span className="text-xs text-slate-400 pl-2 font-medium">Card Style:</span>
            <button
              type="button"
              onClick={() => setCardTheme('midnight')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${cardTheme === 'midnight' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Midnight
            </button>
            <button
              type="button"
              onClick={() => setCardTheme('rose')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${cardTheme === 'rose' ? 'bg-rose-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Rose Gold
            </button>
            <button
              type="button"
              onClick={() => setCardTheme('emerald')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${cardTheme === 'emerald' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Emerald
            </button>
          </motion.div>

          {/* Dynamic-Height Interactive Card Demo */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="relative z-10 flex flex-col items-center gap-4 w-full transition-all duration-300"
          >
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`w-72 h-44 bg-gradient-to-br ${themeStyles[cardTheme].cardBg} border ${themeStyles[cardTheme].border} rounded-2xl shadow-2xl p-6 cursor-pointer flex flex-col justify-between relative overflow-hidden group select-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 transform-gpu`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg tracking-wider text-slate-100">Smart NFC Card</span>
                <Share2 className="text-slate-300 group-hover:rotate-12 transition-transform" size={20} />
              </div>

              <div className="text-center py-2">
                <span className={`text-[11px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border ${themeStyles[cardTheme].badge}`}>
                  {isOpen ? "[ Tap to Close ]" : "[ Tap to Test NFC ]"}
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
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="w-80 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center transform-gpu overflow-hidden mt-2"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-lg text-slate-300 mb-3">
                    YOU
                  </div>
                  <h3 className="font-bold text-base text-slate-100">Your Custom Profile</h3>
                  <p className="text-xs text-slate-400 mb-4">All your links in one place</p>
                  <div className="w-full py-2 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-xs font-medium text-indigo-300">
                    Instant Link Access
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="py-16 px-6 max-w-5xl mx-auto border-t border-slate-900">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight mb-2"
            >
              Why Switch to Smart NFC?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-slate-400 text-sm"
            >
              Designed for seamless, eco-friendly, and modern networking.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col items-start"
            >
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl mb-4">
                <Zap size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">One-Tap Sharing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No apps required. Simply tap the card on any modern smartphone to instantly share your profile.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col items-start"
            >
              <div className="p-3 bg-pink-500/10 text-pink-400 rounded-xl mb-4">
                <Smartphone size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Fully Customizable</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose your favorite colors, upload your own logo, or customize your landing page layout anytime.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex flex-col items-start"
            >
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Durable & Reusable</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Waterproof, scratch-resistant, and reusable. Update your links anytime without reprinting cards.
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- BLACK & WHITE PORTRAIT CARD SHOWCASE --- */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-900">
          
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs mb-3"
            >
              <Layers size={14} className="animate-pulse" /> Dual-Card Playing Style
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
            >
              Black & White Edition
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-slate-400 text-sm max-w-md mx-auto"
            >
              High-contrast minimalist aesthetic with vertical card alignment, engineered with instant-read NTAG213 chips.
            </motion.p>
          </div>

          {/* Black & White Deck Showcase */}
          <div className="flex justify-center mb-16">
            <div className="relative w-72 h-96 flex items-center justify-center transform-gpu">
              {/* Back Card: White Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: -12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute w-56 h-80 bg-white border border-slate-200 rounded-2xl p-5 text-slate-900 flex flex-col justify-between -translate-x-6 transform-gpu shadow-2xl shadow-black/60"
              >
                <div className="flex justify-start">
                  <svg className="w-6 h-6 text-slate-900 fill-current" viewBox="0 0 24 24">
                    <path d="M12 1.5l2.8 6.8 7.2.6-5.4 4.8 1.6 7.1L12 17l-6.2 3.8 1.6-7.1L2 8.9l7.2-.6z" />
                  </svg>
                </div>

                <div className="flex justify-end items-end">
                  <span className="font-black text-base tracking-widest text-slate-900">MSC</span>
                </div>
              </motion.div>

              {/* Front Card: Black Card */}
              <motion.div 
                initial={{ opacity: 0, y: 15, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 12 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute w-56 h-80 bg-slate-950 border border-slate-800 rounded-2xl p-5 text-white flex flex-col justify-between translate-x-6 transform-gpu shadow-2xl shadow-black/60"
              >
                <div className="flex justify-start">
                  <svg className="w-6 h-6 text-white fill-current drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" viewBox="0 0 24 24">
                    <path d="M12 1.5l2.8 6.8 7.2.6-5.4 4.8 1.6 7.1L12 17l-6.2 3.8 1.6-7.1L2 8.9l7.2-.6z" />
                  </svg>
                </div>

                <div className="flex justify-end items-end">
                  <span className="font-black text-base tracking-widest text-slate-100">MSC</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Specs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-start gap-3"
            >
              <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-slate-100 mb-1">Instant Tap Hardware</h4>
                <p className="text-xs text-slate-400">High-sensitivity NTAG213 microchip with instant zero-lag trigger on iOS & Android.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-start gap-3"
            >
              <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-slate-100 mb-1">Waterproof Matte PVC</h4>
                <p className="text-xs text-slate-400">Scratch-resistant material coated with a smooth premium finish in both black and white.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-start gap-3"
            >
              <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-slate-100 mb-1">No App Required</h4>
                <p className="text-xs text-slate-400">Receivers don't need any special app installed; your digital card opens automatically in browser.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-start gap-3"
            >
              <CheckCircle className="text-emerald-400 shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-sm text-slate-100 mb-1">Lifetime Dynamic Edits</h4>
                <p className="text-xs text-slate-400">Update your portfolio, social profiles, or phone number anytime without replacing the physical card.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section className="py-16 px-6 max-w-4xl mx-auto border-t border-slate-900">
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight mb-2"
            >
              Get Your Custom Card
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-slate-400 text-sm"
            >
              Have questions or ready to order? Send us a message below.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Contact Details */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col gap-6 bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl"
            >
              <h3 className="font-bold text-lg text-slate-200">Contact Details</h3>
              
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail className="text-indigo-400" size={18} />
                <span>mitsukazuwara1112@gmail.com</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone className="text-indigo-400" size={18} />
                <span>+63 994 940 9150</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <MapPin className="text-indigo-400" size={18} />
                <span>Laguna, Philippines</span>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onSubmit={handleSubmit} 
              className="flex flex-col gap-4 bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl"
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Send size={14} /> {isSubmitting ? "Sending..." : "Send Inquiry via Email"}
              </button>
            </motion.form>
          </div>
        </section>

        {/* --- QR CODE DEMO SECTION --- */}
        <section className="py-16 px-6 max-w-md mx-auto text-center border-t border-slate-900">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl flex flex-col items-center gap-4 shadow-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs">
              <QrCode size={14} /> NFC Live Scan Demo
            </div>

            <h3 className="text-xl font-bold text-slate-100">Scan to Test Live Profile</h3>
            <p className="text-xs text-slate-400 max-w-xs">
              Scan this QR code using your smartphone camera to see how your digital profile will look upon tapping the NFC card.
            </p>

            <div className="p-4 bg-white rounded-2xl shadow-xl mt-2 border-4 border-slate-800">
              <Image 
                src={qrImage} 
                alt="NFC Demo QR Code" 
                width={180} 
                height={180} 
                className="rounded-lg object-contain mx-auto"
              />
            </div>
          </motion.div>
        </section>

        {/* --- FAQ & PRICING SECTION --- */}
        <section className="py-16 px-6 max-w-3xl mx-auto border-t border-slate-900">
          <div className="text-center mb-10">
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold tracking-tight mb-2"
            >
              Frequently Asked Questions & Pricing
            </motion.h2>
            <p className="text-slate-400 text-xs md:text-sm">
              Everything you need to know about the Black & White Edition Smart NFC Card.
            </p>
          </div>

          {/* Pricing Highlight Box */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-6 mb-8 text-center relative overflow-hidden shadow-xl"
          >
            <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-indigo-500/30">
              Black & White Edition
            </span>
            <div className="mt-4 mb-2">
              <span className="text-4xl font-extrabold text-white">₱499</span>
              <span className="text-xs text-slate-400"> / one-time payment</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Includes custom vertical print, built-in NTAG213 chip, and lifetime profile access. No monthly fees.
            </p>
          </motion.div>

          {/* Accordion Questions List */}
          <div className="flex flex-col gap-3">
            {faqData.map((faq, index) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} index={index} />
            ))}
          </div>
        </section>
      </div>

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Mitsu Smart Card. All rights reserved.</p>
      </footer>

    </div>
  );
}