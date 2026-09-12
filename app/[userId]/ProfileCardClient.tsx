'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { 
  MessageCircle, Gamepad2, Music, User, Globe, ExternalLink,
  Briefcase, HardDrive, Palette, Video, AtSign, X, Swords, UserPlus,
  ArrowUpRight, Lock, Unlock, Share2, Check, ShieldAlert, Download,
  Sparkles, CheckCircle2
} from 'lucide-react';

interface LinkItem {
  name: string;
  type: string;
  detail: string;
  url: string;
}

interface ClientData {
  name: string;
  subtitle: string;
  image?: string;       // Profile Image (avatarUrl)
  bannerUrl?: string;   // Banner Image
  theme: string;
  isLocked?: boolean;
  pinCode?: string;
  links: LinkItem[];
}

const getIcon = (type: string) => {
  if (!type) return <ExternalLink size={18} className="text-slate-400" />;
  switch (type.toLowerCase()) {
    case 'instagram': return <User size={18} className="text-pink-400" />;
    case 'facebook': return <MessageCircle size={18} className="text-blue-400" />;
    case 'tiktok': return <Globe size={18} className="text-cyan-400" />;
    case 'valorant': return <Gamepad2 size={18} className="text-red-400" />;
    case 'league of legends':
    case 'lol': return <Swords size={18} className="text-amber-400" />;
    case 'steam': return <Gamepad2 size={18} className="text-indigo-400" />;
    case 'gdrive':
    case 'google drive': return <HardDrive size={18} className="text-yellow-400" />;
    case 'upwork': return <Briefcase size={18} className="text-emerald-400" />;
    case 'canva': return <Palette size={18} className="text-sky-400" />;
    case 'youtube': return <Video size={18} className="text-red-500" />;
    case 'spotify': return <Music size={18} className="text-green-400" />;
    case 'threads': return <AtSign size={18} className="text-slate-200" />;
    case 'x':
    case 'twitter': return <X size={18} className="text-sky-400" />;
    default: return <ExternalLink size={18} className="text-slate-400" />;
  }
};

const cardContainerVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: "easeOut" } 
  }
} as const;

const linksListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03 }
  }
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.25, ease: "easeOut" } 
  }
} as const;

export default function ProfileCardClient({ 
  client, 
  theme, 
  initials, 
  vcardDataUri 
}: { 
  client: ClientData; 
  theme: any; 
  initials: string; 
  vcardDataUri: string;
}) {
  const isCardLocked = client.isLocked ?? false;

  const [inputPin, setInputPin] = useState('');
  const [isUnlockedByPin, setIsUnlockedByPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const defaultPin = client.pinCode || '1234';

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin === defaultPin) {
      setIsUnlockedByPin(true);
      setErrorMsg(false);
    } else {
      setErrorMsg(true);
    }
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.slice(0, 4);
    setInputPin(val);
    if (errorMsg) setErrorMsg(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${client.name} | Mitsu Smart Card`,
          text: `Connect with ${client.name} via Mitsu Smart Card!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share prompt dismissed');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isContentVisible = !isCardLocked || isUnlockedByPin;

  return (
    <div className="relative w-full max-w-[320px] flex justify-center items-center my-auto transform-gpu">
      <motion.div 
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full bg-gradient-to-b ${theme.bg || 'from-slate-950 via-slate-900 to-slate-950'} border-2 ${theme.border} rounded-3xl overflow-hidden shadow-2xl flex flex-col text-center relative z-10 backdrop-blur-md transform-gpu`}
      >
        {/* Top Banner Container (Eksaktong gayak sa Preview) */}
        <div className="w-full h-28 relative overflow-hidden bg-slate-950 border-b border-white/10 flex items-start justify-between p-3 shrink-0">
          {client.bannerUrl ? (
            <img 
              src={client.bannerUrl} 
              alt="Banner Preview" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.avatarGlow} opacity-40`} />
          )}
          
          {/* Vibrant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90 pointer-events-none" />

          {/* Locked / Unlocked Status Badge */}
          <div className={`relative z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-md shadow-md ${
            isCardLocked && !isUnlockedByPin 
              ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' 
              : 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
          }`}>
            <span>{isCardLocked && !isUnlockedByPin ? '🔒' : '🔓'}</span> 
            <span>{isCardLocked && !isUnlockedByPin ? 'Locked' : 'Unlocked'}</span>
          </div>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900/90 text-slate-100 border border-slate-700/80 backdrop-blur-md shadow-md cursor-pointer hover:bg-slate-800 transition-all"
          >
            <span>🔗</span> 
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Body Container */}
        <div className="p-4 sm:p-5 pt-0 relative flex-1 flex flex-col">
          
          {/* Profile Avatar: Centered directly on the bottom edge of the banner */}
          <div className={`relative -mt-[44px] w-22 h-22 rounded-full bg-gradient-to-tr ${theme.avatarGlow} mx-auto mb-2 flex items-center justify-center text-2xl font-bold text-white shadow-2xl ring-4 ring-slate-900 overflow-hidden z-10 shrink-0`}>
            {client.image ? (
              <img 
                src={client.image} 
                alt="Avatar Preview" 
                className="w-full h-full object-cover"
                loading="eager"
              />
            ) : (
              <span className="drop-shadow-md">{initials}</span>
            )}
          </div>

          <h1 className="text-lg font-bold text-white tracking-tight break-words drop-shadow-sm">
            {client.name}
          </h1>
          <p className={`text-xs font-semibold ${theme.accent} mt-0.5 break-words drop-shadow-sm uppercase tracking-wide`}>
            {client.subtitle}
          </p>

          <div className="mt-4">
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className={`w-full py-2.5 rounded-xl text-xs font-bold ${theme.btnBg} shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]`}
            >
              <span>👤+</span> Save Contact
            </button>
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              {!isContentVisible ? (
                <motion.div 
                  key="protected-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 my-1 flex flex-col items-center text-center"
                >
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 mb-2 border border-purple-500/20">
                    <ShieldAlert size={20} />
                  </div>
                  <h3 className="text-xs font-bold text-slate-100">Protected Card</h3>
                  <p className="text-[11px] text-slate-400 mb-3">Enter PIN code to view links.</p>

                  <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-2">
                    <input 
                      type="password"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={4}
                      placeholder="••••"
                      value={inputPin}
                      onChange={handlePinChange}
                      className="w-full px-3 py-2 text-center text-sm font-mono tracking-[0.4em] bg-slate-900 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder:text-slate-600"
                    />
                    {errorMsg && <p className="text-[10px] text-rose-400 font-medium">Incorrect PIN code.</p>}
                    
                    <button 
                      type="submit"
                      className={`w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all mt-1 cursor-pointer active:scale-98 ${theme.btnBg}`}
                    >
                      Unlock Profile
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  variants={linksListVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex flex-col gap-2 text-left"
                >
                  {client.links.map((link: LinkItem, i: number) => (
                    <motion.a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={linkItemVariants}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs text-white flex items-center justify-between shadow-md transition-all hover:border-slate-700 transform-gpu"
                    >
                      <div className="flex items-center gap-2.5 truncate min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-xs shrink-0 text-slate-200 shadow-inner">
                          {getIcon(link.name || link.type)}
                        </div>
                        <div className="truncate min-w-0">
                          <div className="font-semibold text-white truncate">{link.name || 'Link'}</div>
                          <div className="text-[11px] text-slate-400 truncate">{link.detail || link.url || '@username'}</div>
                        </div>
                      </div>
                      <span className={`text-[11px] ${theme.accent} font-medium shrink-0 ml-2 flex items-center gap-0.5`}>
                        Visit <ArrowUpRight size={13} />
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer with Icon Logo and Powered by MSC */}
          <div className="mt-5 pt-3 border-t border-slate-800/80 text-[10px] tracking-widest uppercase text-slate-400 font-bold flex items-center justify-center gap-1.5 shrink-0">
            <img src="/icon.png" alt="Mitsu Icon" className="w-3.5 h-3.5 object-contain shrink-0" />
            <span>Powered by MSC</span>
          </div>

        </div>
      </motion.div>

      {/* Save Contact Modal */}
      <AnimatePresence>
        {isSaveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col items-center text-center z-10 transform-gpu"
            >
              <button 
                onClick={() => setIsSaveModalOpen(false)}
                className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className={`p-2.5 rounded-xl bg-slate-800 border border-slate-700/80 mb-2.5 ${theme.accent}`}>
                <UserPlus size={20} />
              </div>

              <h2 className="text-sm font-bold text-white mb-0.5">
                Save {client.name}
              </h2>
              <p className="text-[10px] text-slate-400 mb-3">
                Scan QR code or download contact file.
              </p>

              <div className="p-2.5 bg-white rounded-xl shadow-md mb-3 flex items-center justify-center">
                <QRCodeSVG 
                  value={vcardDataUri} 
                  size={130}
                  level="M"
                />
              </div>

              <a
                href={vcardDataUri}
                download={`${client.name.replace(/\s+/g, '_')}_MitsuCard.vcf`}
                onClick={() => setIsSaveModalOpen(false)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all active:scale-98 ${theme.btnBg}`}
              >
                <Download size={14} />
                <span>Download Contact (.vcf)</span>
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}