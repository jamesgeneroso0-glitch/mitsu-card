'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { 
  MessageCircle, Gamepad2, Music, User, Globe, ExternalLink,
  Briefcase, HardDrive, Palette, Video, AtSign, X, Swords, UserPlus,
  ArrowUpRight, Lock, Unlock, Share2, Check, ShieldAlert, Download
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
  theme: string;
  isLocked?: boolean;
  pinCode?: string;
  links: LinkItem[];
}

const getIcon = (type: string) => {
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

const unlockedVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: "easeInOut" } 
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeInOut" } }
} as const;

const linksListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const linkItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } 
  }
} as const;;

// Modal BackDrop & Container Animations
const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20,
    transition: { duration: 0.15 }
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
    <div className={`w-full max-w-sm bg-slate-950/90 border ${theme.border} rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center relative z-10 transform-gpu`}>
      
      {/* Header Controls */}
      <div className="w-full flex items-center justify-between mb-4">
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold ${
          isCardLocked && !isUnlockedByPin
            ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' 
            : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
        }`}>
          {isCardLocked && !isUnlockedByPin ? <Lock size={13} className="text-rose-400" /> : <Unlock size={13} className="text-emerald-400" />}
          <span>{isCardLocked && !isUnlockedByPin ? 'Locked' : 'Unlocked'}</span>
        </div>

        {/* Share Button Animation */}
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="p-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer select-none"
          title="Share Profile Link"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
          <span className="text-[11px]">{copied ? 'Copied' : 'Share'}</span>
        </motion.button>
      </div>

      {/* Avatar Display */}
      <div className="relative mb-3">
        <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${theme.avatarGlow} opacity-60`} />
        <div className="relative w-20 h-20 rounded-full bg-slate-950 border-2 border-slate-700/60 flex items-center justify-center text-2xl font-bold shadow-inner">
          <span className={theme.accent}>{initials}</span>
        </div>
      </div>

      {/* Profile Header */}
      <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
        {client.name}
      </h1>
      
      <p className={`text-xs font-semibold ${theme.accent} mt-0.5 mb-5`}>
        {client.subtitle}
      </p>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {!isContentVisible ? (
          <motion.div 
            key="protected-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 my-2 flex flex-col items-center transform-gpu"
          >
            <div className="p-3 rounded-full bg-purple-500/10 text-purple-400 mb-2 border border-purple-500/20">
              <ShieldAlert size={22} />
            </div>
            <h3 className="text-sm font-bold text-slate-200">Protected Profile</h3>
            <p className="text-[11px] text-slate-400 mb-4">This profile card is locked. Enter the PIN to view details.</p>

            <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-2">
              <input 
                type="password"
                maxLength={4}
                placeholder="Enter 4-digit PIN"
                value={inputPin}
                onChange={handlePinChange}
                className="w-full px-3 py-2 text-center text-xs font-bold tracking-widest bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder:text-slate-600 placeholder:tracking-normal transition-colors"
              />
              {errorMsg && <p className="text-[10px] text-rose-400 font-medium">Incorrect PIN. Please try again.</p>}
              
              {/* Button Animation pareho sa Share button */}
              <motion.button 
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`w-full py-2.5 rounded-xl text-xs font-bold text-white transition-colors shadow-md mt-1 cursor-pointer select-none ${theme.btnBg}`}
              >
                Unlock Content
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div 
            key="unlocked-screen"
            variants={unlockedVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full flex flex-col items-center transform-gpu [will-change:transform,opacity]"
          >
            {/* Trigger Button para sa Pop-up Modal */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSaveModalOpen(true)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white transition-colors shadow-lg mb-5 cursor-pointer select-none ${theme.btnBg}`}
            >
              <UserPlus size={16} />
              <span>Save Contact</span>
            </motion.button>

            {/* Links List Container */}
            <motion.div 
              variants={linksListVariants}
              initial="hidden"
              animate="visible"
              className="w-full flex flex-col gap-3"
            >
              {client.links.map((link: LinkItem, idx: number) => (
                <motion.a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={linkItemVariants}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm transform-gpu"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-800 border border-slate-700/50 group-hover:border-slate-600 transition-colors">
                      {getIcon(link.type)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {link.name}
                      </p>
                      <p className="text-xs text-slate-400">{link.detail}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium text-slate-400 group-hover:${theme.accent} transition-colors flex items-center gap-0.5`}>
                    Visit <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Contact Pop-up Modal */}
      <AnimatePresence>
        {isSaveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Layer */}
            <motion.div 
              variants={modalBackdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              variants={modalContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-xs bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center z-10"
            >
              {/* Close Button */}
              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSaveModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </motion.button>

              <div className={`p-3 rounded-2xl bg-slate-800 border border-slate-700 mb-3 ${theme.accent}`}>
                <UserPlus size={24} />
              </div>

              <h2 className="text-lg font-bold text-white mb-1">
                Save {client.name}
              </h2>
              <p className="text-xs text-slate-400 mb-5">
                Scan the QR code directly or download the contact file to your device.
              </p>

              {/* QR Code Section */}
              <div className="p-3 bg-white rounded-2xl shadow-inner mb-5 flex items-center justify-center">
                <QRCodeSVG 
                  value={vcardDataUri} 
                  size={150}
                  level="M"
                />
              </div>

              {/* Download VCF Action */}
              <motion.a
                whileTap={{ scale: 0.95 }}
                href={vcardDataUri}
                download={`${client.name.replace(/\s+/g, '_')}_MitsuCard.vcf`}
                onClick={() => setIsSaveModalOpen(false)}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white transition-colors shadow-md ${theme.btnBg}`}
              >
                <Download size={15} />
                <span>Download Contact (.vcf)</span>
              </motion.a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-7 pt-4 border-t border-slate-800/60 w-full text-center">
        <p className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
          Powered by Mitsu Smart Card
        </p>
      </div>

    </div>
  );
}