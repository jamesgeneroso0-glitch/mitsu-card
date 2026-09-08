'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gamepad2, Briefcase, Clapperboard, User, MessageCircle, Video, ShieldAlert, Trophy, FolderKanban, FileText, Music, Globe, Tv } from 'lucide-react';

// Category types for the Smart Card editions
type CategoryType = 'socials' | 'gaming' | 'business' | 'entertainment';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('socials');

  // Configuration data for each category (Titles, Badges, Descriptions, and Links)
  const categoryData = {
    socials: {
      title: "Tap to Connect.",
      subtitle: "Socials Hub",
      badgeText: "Mitsu Smart Card — Social Edition",
      description: "Share your personal network and online presence in a single tap.",
      cardBg: "from-slate-900 via-indigo-950 to-slate-900",
      accentColor: "text-indigo-400",
      borderColor: "border-indigo-500/30",
      badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      links: [
        { name: "Instagram Profile", detail: "@mitsu.kzwr", url: "https://www.instagram.com/mitsu.kzwr/", icon: User, color: "text-pink-400" },
        { name: "Facebook Page", detail: "/Mitsu_Kazuwara", url: "https://www.facebook.com/profile.php?id=61593941820561", icon: MessageCircle, color: "text-blue-400" },
        { name: "TikTok Profile", detail: "@mitsukzwr12", url: "https://www.tiktok.com/@mitsukzwr12", icon: Video, color: "text-cyan-400" }
      ]
    },
    gaming: {
      title: "Ready to Play.",
      subtitle: "Gaming Profile",
      badgeText: "Mitsu Smart Card — Esports Edition",
      description: "Showcase your gaming handles, competitive ranks, and stats to friends and rivals.",
      cardBg: "from-slate-900 via-purple-950 to-slate-900",
      accentColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      links: [
        { name: "Valorant Stats", detail: "Mitsu #PH1", url: "https://tracker.gg/valorant", icon: ShieldAlert, color: "text-red-400" },
        { name: "League of Legends", detail: "Diamond III", url: "https://www.leagueoflegends.com", icon: Trophy, color: "text-amber-400" },
        { name: "Steam Community", detail: "View Inventory", url: "https://steamcommunity.com", icon: Gamepad2, color: "text-blue-300" }
      ]
    },
    business: {
      title: "Build the Future.",
      subtitle: "Academic & Business",
      badgeText: "Mitsu Smart Card — Professional Edition",
      description: "Directly access resumes, professional portfolios, and official business credentials.",
      cardBg: "from-slate-900 via-emerald-950 to-slate-900",
      accentColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      links: [
        { name: "Google Drive Portfolio", detail: "View Files", url: "https://drive.google.com", icon: FolderKanban, color: "text-emerald-400" },
        { name: "Upwork / Freelance", detail: "Hire Me", url: "https://www.upwork.com", icon: Briefcase, color: "text-green-400" },
        { name: "Canva Design Deck", detail: "Open Portfolio", url: "https://www.canva.com", icon: FileText, color: "text-teal-400" }
      ]
    },
    entertainment: {
      title: "Create & Inspire.",
      subtitle: "Content Creation",
      badgeText: "Mitsu Smart Card — Creator Edition",
      description: "Promote your video contents, vlogs, and favorite music streams instantly.",
      cardBg: "from-slate-900 via-rose-950 to-slate-900",
      accentColor: "text-rose-400",
      borderColor: "border-rose-500/30",
      badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      links: [
        { name: "YouTube Channel", detail: "Watch Vlogs", url: "https://www.youtube.com", icon: Tv, color: "text-red-500" },
        { name: "Spotify Playlist", detail: "Listen Now", url: "https://spotify.com", icon: Music, color: "text-green-500" },
        { name: "Threads / Twitter", detail: "@mitsu.kzwr", url: "https://twitter.com", icon: Globe, color: "text-sky-400" }
      ]
    }
  };

  const current = categoryData[activeCategory];

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-500 selection:text-white">

      {/* Dynamic Background Grid & Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2)_0%,transparent_70%)] pointer-events-none transform-gpu" />

      {/* Hero Header Section */}
      <div className="text-center max-w-xl mb-6 z-10 flex flex-col items-center">
        <motion.div
          key={activeCategory + '-badge'}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm mb-3 shadow-inner ${current.badgeBg}`}
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

      {/* Category Navigation Bar */}
      <div className="z-20 mb-8 flex flex-wrap justify-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <button
          onClick={() => setActiveCategory('socials')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === 'socials' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <User size={14} /> Socials
        </button>
        <button
          onClick={() => setActiveCategory('gaming')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === 'gaming' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Gamepad2 size={14} /> Gaming
        </button>
        <button
          onClick={() => setActiveCategory('business')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === 'business' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Briefcase size={14} /> Business
        </button>
        <button
          onClick={() => setActiveCategory('entertainment')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${activeCategory === 'entertainment' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
        >
          <Clapperboard size={14} /> Creator
        </button>
      </div>

      {/* Interactive Smart Card */}
      <div className="z-10 flex flex-col items-center w-full max-w-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`w-full bg-gradient-to-br ${current.cardBg} border ${current.borderColor} rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center relative overflow-hidden backdrop-blur-xl`}
          >
            {/* Ambient Background Glow inside Card */}
            <div className="absolute -right-10 -top-10 w-28 h-28 bg-white/5 rounded-full blur-xl pointer-events-none" />

            {/* Avatar / Logo Header */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 p-1 mb-4 shadow-inner flex items-center justify-center border border-slate-700/50">
              <span className={`text-2xl font-bold ${current.accentColor}`}>MK</span>
            </div>

            <h2 className="text-xl font-bold text-slate-100 mb-1">Mitsu Kazuwara</h2>
            <p className={`text-xs font-medium ${current.accentColor} mb-6`}>{current.subtitle}</p>

            {/* Links List */}
            <div className="w-full flex flex-col gap-3">
              {current.links.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all duration-200 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-slate-800/80 ${link.color} shadow-inner`}>
                        <IconComponent size={18} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                          {link.name}
                        </p>
                        <p className="text-xs text-slate-400">{link.detail}</p>
                      </div>
                    </div>
                    <span className="text-slate-500 group-hover:text-slate-300 transition-colors text-xs font-medium">
                      Visit &rarr;
                    </span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}