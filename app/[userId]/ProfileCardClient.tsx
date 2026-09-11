'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { 
  MessageCircle, Gamepad2, Music, User, Globe, ExternalLink,
  Briefcase, HardDrive, Palette, Video, AtSign, X, Swords, UserPlus,
  ArrowUpRight, Lock, Unlock, Share2, Check, ShieldAlert, Download,
  Radio, CheckCircle2, Sparkles
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
    <div className="relative w-full max-w-sm flex justify-center items-center my-auto transform-gpu">
      <motion.div 
        variants={cardContainerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full bg-slate-900 border ${theme.border} rounded-3xl overflow-hidden shadow-xl flex flex-col items-center text-center relative z-10 transform-gpu`}
      >
        {/* Top Decorative / Custom Banner */}
        <div className={`w-full h-28 relative overflow-hidden flex items-start justify-between p-4 border-b border-white/10 shadow-inner`}>
          {client.bannerUrl ? (
            <img 
              src={client.bannerUrl} 
              alt="Banner" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.avatarGlow}`} />
          )}

          {/* Light Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-slate-950/40 pointer-events-none" />

          {/* NFC Indicator */}
          <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/70 border border-white/15 text-[10px] text-slate-200 font-medium tracking-wide">
            <Radio size={11} className={`${theme.accent}`} />
            <span>MSC ACTIVE</span>
          </div>

          {/* Share Button */}
          <button 
            onClick={handleShare}
            className="relative z-10 p-2 px-3 rounded-full bg-slate-950/70 hover:bg-slate-950 border border-white/15 text-slate-100 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer active:scale-95 transform-gpu"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
            <span className="text-[10px] tracking-wider uppercase">{copied ? 'Copied' : 'Share'}</span>
          </button>
        </div>

        {/* Avatar Display */}
        <div className="relative -mt-12 mb-3 z-10">
          <div className="relative w-20 h-20 rounded-full bg-slate-950 border-2 border-slate-800 p-1 flex items-center justify-center shadow-md">
            {client.image ? (
              <img 
                src={client.image} 
                alt={client.name} 
                className="w-full h-full object-cover rounded-full"
                loading="eager"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold">
                <span className={theme.accent}>{initials}</span>
              </div>
            )}
            
            <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-950 rounded-full" />
          </div>
        </div>

        {/* Body Container */}
        <div className="w-full px-5 sm:px-6 pb-6 flex flex-col items-center">
          
          <div className="flex items-center gap-1.5 justify-center">
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              {client.name}
            </h1>
            <CheckCircle2 size={16} className={`${theme.accent} shrink-0`} />
          </div>
          
          <p className={`text-xs font-semibold ${theme.accent} mt-0.5 mb-3 tracking-wide uppercase`}>
            {client.subtitle}
          </p>

          <div className="mb-4">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase ${
              isCardLocked && !isUnlockedByPin
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' 
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}>
              {isCardLocked && !isUnlockedByPin ? <Lock size={11} /> : <Unlock size={11} />}
              <span>{isCardLocked && !isUnlockedByPin ? 'Protected Access' : 'Verified Member'}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isContentVisible ? (
              <motion.div 
                key="protected-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 my-1 flex flex-col items-center"
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
                key="unlocked-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-full flex flex-col items-center"
              >
                <button
                  onClick={() => setIsSaveModalOpen(true)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-md mb-3 cursor-pointer active:scale-98 transform-gpu ${theme.btnBg}`}
                >
                  <Sparkles size={14} />
                  <span>Save Contact Card</span>
                  <UserPlus size={14} />
                </button>

                <motion.div 
                  variants={linksListVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex flex-col gap-2"
                >
                  {client.links.map((link: LinkItem, idx: number) => (
                    <motion.a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={linkItemVariants}
                      whileTap={{ scale: 0.98 }}
                      className={`group flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 ${theme.border} transition-colors transform-gpu`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                          {getIcon(link.type)}
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-slate-200">
                            {link.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{link.detail}</p>
                        </div>
                      </div>
                      <span className="text-slate-500 group-hover:text-slate-300 p-1">
                        <ArrowUpRight size={15} />
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-5 pt-3 border-t border-slate-800/60 w-full text-center flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
            <span>Mitsu Smart Card</span>
            <span>•</span>
            <span className="text-slate-600">Digital ID</span>
          </div>

        </div>
      </motion.div>

      {/* Save Contact Modal */}
      <AnimatePresence>
        {isSaveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              onClick={() => setIsSaveModalOpen(false)}
              className="absolute inset-0 bg-slate-950/85"
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