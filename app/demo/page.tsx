'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Gamepad2, Briefcase, Clapperboard, User, 
  MessageCircle, Video, ShieldAlert, Trophy, FolderKanban, 
  FileText, Music, Globe, Tv, ArrowUpRight, CheckCircle2, Radio 
} from 'lucide-react';

type CategoryType = 'socials' | 'gaming' | 'business' | 'entertainment';

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('socials');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const categoryData = {
    socials: {
      title: "Tap to Connect.",
      subtitle: "SOCIALS HUB",
      badgeText: "Mitsu Smart Card — Social Edition",
      description: "Share your personal network and online presence in a single tap.",
      theme: {
        border: "border-indigo-500/30 hover:border-indigo-500/50", 
        accent: "text-indigo-400", 
        avatarGlow: "from-indigo-500 to-blue-500", 
        btnBg: "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white",
        badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
      },
      links: [
        { name: "Instagram", detail: "@mitsu.kzwr", url: "https://www.instagram.com/mitsu.kzwr/", icon: User },
        { name: "Facebook", detail: "/Mitsu_Kazuwara", url: "https://www.facebook.com/profile.php?id=61593941820561", icon: MessageCircle },
        { name: "TikTok", detail: "@mitsukzwr12", url: "https://www.tiktok.com/@mitsukzwr12", icon: Globe }
      ]
    },
    gaming: {
      title: "Ready to Play.",
      subtitle: "GAMING PROFILE",
      badgeText: "Mitsu Smart Card — Esports Edition",
      description: "Showcase your gaming handles, competitive ranks, and stats to friends and rivals.",
      theme: {
        border: "border-purple-500/30 hover:border-purple-500/50", 
        accent: "text-purple-400", 
        avatarGlow: "from-purple-500 to-pink-500", 
        btnBg: "bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white",
        badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
      },
      links: [
        { name: "Valorant", detail: "Mitsu #PH1", url: "https://tracker.gg/valorant", icon: ShieldAlert },
        { name: "League of Legends", detail: "Diamond III", url: "https://www.leagueoflegends.com", icon: Trophy },
        { name: "Steam", detail: "View Inventory", url: "https://steamcommunity.com", icon: Gamepad2 }
      ]
    },
    business: {
      title: "Build the Future.",
      subtitle: "ACADEMIC & BUSINESS",
      badgeText: "Mitsu Smart Card — Professional Edition",
      description: "Directly access resumes, professional portfolios, and official business credentials.",
      theme: {
        border: "border-emerald-500/30 hover:border-emerald-500/50", 
        accent: "text-emerald-400", 
        avatarGlow: "from-emerald-500 to-teal-500", 
        btnBg: "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white",
        badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      },
      links: [
        { name: "Google Drive", detail: "View Files", url: "https://drive.google.com", icon: FolderKanban },
        { name: "Upwork", detail: "Hire Me", url: "https://www.upwork.com", icon: Briefcase },
        { name: "Canva", detail: "Open Portfolio", url: "https://www.canva.com", icon: FileText }
      ]
    },
    entertainment: {
      title: "Create & Inspire.",
      subtitle: "CONTENT CREATION",
      badgeText: "Mitsu Smart Card — Creator Edition",
      description: "Promote your video contents, vlogs, and favorite music streams instantly.",
      theme: {
        border: "border-rose-500/30 hover:border-rose-500/50", 
        accent: "text-rose-400", 
        avatarGlow: "from-rose-500 to-pink-500", 
        btnBg: "bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white",
        badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20"
      },
      links: [
        { name: "YouTube", detail: "Watch Vlogs", url: "https://www.youtube.com", icon: Tv },
        { name: "Spotify", detail: "Listen Now", url: "https://spotify.com", icon: Music },
        { name: "X", detail: "@mitsu.kzwr", url: "https://twitter.com", icon: Globe }
      ]
    }
  };

  const current = categoryData[activeCategory];

  if (!isReady) {
    return <main className="min-h-screen bg-slate-950" />;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-500 selection:text-white">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2)_0%,transparent_70%)] pointer-events-none transform-gpu" />

      <div className="text-center max-w-xl mb-6 z-10 flex flex-col items-center">
        <motion.div
          key={activeCategory + '-badge'}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm mb-3 shadow-inner ${current.theme.badgeBg}`}
        >
          <Sparkles size={16} className="animate-pulse" /> {current.badgeText}
        </motion.div>

        <motion.h1 
          key={activeCategory + '-title'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-slate-100"
        >
          {current.title}
        </motion.h1>

        <motion.p 
          key={activeCategory + '-desc'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-slate-400 text-xs md:text-sm max-w-md"
        >
          {current.description}
        </motion.p>
      </div>

      <div className="z-20 mb-8 flex flex-wrap justify-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <button
          onClick={() => setActiveCategory('socials')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'socials' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <User size={14} /> Socials
        </button>
        <button
          onClick={() => setActiveCategory('gaming')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'gaming' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Gamepad2 size={14} /> Gaming
        </button>
        <button
          onClick={() => setActiveCategory('business')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'business' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Briefcase size={14} /> Business
        </button>
        <button
          onClick={() => setActiveCategory('entertainment')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeCategory === 'entertainment' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Clapperboard size={14} /> Creator
        </button>
      </div>

      {/* CARD CONTAINER MATCHING ProfileCardClient / Admin Preview */}
      <div className="z-10 flex flex-col items-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`w-full bg-slate-900 border ${current.theme.border} rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center text-center relative z-10 transform-gpu`}
          >
            {/* Top Banner Container */}
            <div className="w-full h-28 relative overflow-hidden flex items-start justify-between p-4 border-b border-white/10 shadow-inner">
              <div className={`absolute inset-0 bg-gradient-to-r ${current.theme.avatarGlow}`} />
              <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-slate-950/40 pointer-events-none" />

              {/* NFC Active Pill */}
              <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/15 text-[10px] text-slate-200 font-medium tracking-wide">
                <Radio size={11} className={`${current.theme.accent}`} />
                <span>NFC ACTIVE</span>
              </div>

              {/* Verified Badge Pill */}
              <div className="relative z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/15 text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">
                <span>Verified</span>
              </div>
            </div>

            {/* Avatar Display - Centered on Banner Edge */}
            <div className="relative -mt-12 mb-2 z-10">
              <div className="relative w-20 h-20 rounded-full bg-slate-950 border-2 border-slate-800 p-1 flex items-center justify-center shadow-md">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold">
                  <span className={current.theme.accent}>MK</span>
                </div>
                <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
              </div>
            </div>

            {/* Body Container */}
            <div className="w-full px-5 sm:px-6 pb-6 flex flex-col items-center">
              
              <div className="flex items-center gap-1.5 justify-center">
                <h1 className="text-xl font-bold text-slate-100 tracking-tight">
                  Mitsu Kazuwara
                </h1>
                <CheckCircle2 size={16} className={`${current.theme.accent} shrink-0`} />
              </div>
              
              <p className={`text-xs font-semibold ${current.theme.accent} mt-0.5 mb-3 tracking-wide uppercase`}>
                {current.subtitle}
              </p>

              {/* Save Contact Button (Matches Client Portal preview card style) */}
              <div className="w-full mb-4">
                <div className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md cursor-default ${current.theme.btnBg}`}>
                  <Sparkles size={14} />
                  <span>Save Contact Card</span>
                </div>
              </div>

              {/* Links List */}
              <div className="w-full flex flex-col gap-2">
                {current.links.map((link, idx) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 ${current.theme.border} transition-colors transform-gpu`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
                          <IconComponent size={18} />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                            {link.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{link.detail}</p>
                        </div>
                      </div>
                      <span className="text-slate-500 group-hover:text-slate-300 p-1">
                        <ArrowUpRight size={15} />
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Footer text matching client profile */}
              <div className="mt-5 pt-3 border-t border-slate-800/60 w-full text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                <span>Mitsu Smart Card</span>
                <span>•</span>
                <span className="text-slate-600">Digital ID</span>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </main>
  );
}