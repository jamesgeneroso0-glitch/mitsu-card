'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  User, 
  MessageCircle, 
  Globe, 
  Gamepad2, 
  Swords, 
  HardDrive, 
  Briefcase, 
  Palette, 
  Video, 
  Music, 
  AtSign, 
  X, 
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  Upload,
  Image as ImageIcon,
  AlertCircle,
  Sparkles,
  Info
} from 'lucide-react';

// Plain theme fallback for unselected state
const plainTheme = {
  bg: "from-slate-900 via-slate-900 to-slate-950",
  border: "border-slate-800 hover:border-slate-700",
  accent: "text-slate-400",
  glow: "bg-slate-800/10",
  avatarGlow: "from-slate-700 to-slate-800",
  badgeBg: "bg-slate-800/50 text-slate-400 border-slate-700/50",
  btnBg: "bg-slate-800 hover:bg-slate-700 text-slate-300 shadow-none",
};

// List of all 20 theme styles matching the main profile pages
const themeStyles: Record<string, {
  bg: string;
  border: string;
  accent: string;
  glow: string;
  avatarGlow: string;
  badgeBg: string;
  btnBg: string;
}> = {
  indigo: {
    bg: "from-slate-950 via-indigo-950/90 to-slate-950",
    border: "border-indigo-500/40 hover:border-indigo-400/60",
    accent: "text-indigo-400",
    glow: "bg-indigo-600/30",
    avatarGlow: "from-indigo-500 to-blue-500",
    badgeBg: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
    btnBg: "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-indigo-500/25",
  },
  midnight: {
    bg: "from-slate-950 via-purple-950/90 to-slate-950",
    border: "border-purple-500/40 hover:border-purple-400/60",
    accent: "text-purple-400",
    glow: "bg-purple-600/30",
    avatarGlow: "from-purple-500 to-pink-500",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    btnBg: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-purple-500/25",
  },
  emerald: {
    bg: "from-slate-950 via-emerald-950/90 to-slate-950",
    border: "border-emerald-500/40 hover:border-emerald-400/60",
    accent: "text-emerald-400",
    glow: "bg-emerald-600/30",
    avatarGlow: "from-emerald-500 to-teal-500",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    btnBg: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25",
  },
  rose: {
    bg: "from-slate-950 via-rose-950/90 to-slate-950",
    border: "border-rose-500/40 hover:border-rose-400/60",
    accent: "text-rose-400",
    glow: "bg-rose-600/30",
    avatarGlow: "from-rose-500 to-pink-500",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    btnBg: "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-500/25",
  },
  fuchsia: {
    bg: "from-slate-950 via-fuchsia-950/90 to-slate-950",
    border: "border-fuchsia-500/40 hover:border-fuchsia-400/60",
    accent: "text-fuchsia-400",
    glow: "bg-fuchsia-600/30",
    avatarGlow: "from-fuchsia-500 to-pink-500",
    badgeBg: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40",
    btnBg: "bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500 text-white shadow-fuchsia-500/25",
  },
  amber: {
    bg: "from-slate-950 via-amber-950/90 to-slate-950",
    border: "border-amber-500/40 hover:border-amber-400/60",
    accent: "text-amber-400",
    glow: "bg-amber-600/30",
    avatarGlow: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    btnBg: "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-amber-500/25",
  },
  cyan: {
    bg: "from-slate-950 via-cyan-950/90 to-slate-950",
    border: "border-cyan-500/40 hover:border-cyan-400/60",
    accent: "text-cyan-400",
    glow: "bg-cyan-600/30",
    avatarGlow: "from-cyan-500 to-blue-500",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    btnBg: "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/25",
  },
  violet: {
    bg: "from-slate-950 via-violet-950/90 to-slate-950",
    border: "border-violet-500/40 hover:border-violet-400/60",
    accent: "text-violet-400",
    glow: "bg-violet-600/30",
    avatarGlow: "from-violet-500 to-purple-500",
    badgeBg: "bg-violet-500/20 text-violet-300 border-violet-500/40",
    btnBg: "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-violet-500/25",
  },
  teal: {
    bg: "from-slate-950 via-teal-950/90 to-slate-950",
    border: "border-teal-500/40 hover:border-teal-400/60",
    accent: "text-teal-400",
    glow: "bg-teal-600/30",
    avatarGlow: "from-teal-500 to-emerald-500",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    btnBg: "bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-teal-500/25",
  },
  sky: {
    bg: "from-slate-950 via-sky-950/90 to-slate-950",
    border: "border-sky-500/40 hover:border-sky-400/60",
    accent: "text-sky-400",
    glow: "bg-sky-600/30",
    avatarGlow: "from-sky-500 to-indigo-500",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    btnBg: "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-sky-500/25",
  },
  orange: {
    bg: "from-slate-950 via-orange-950/90 to-slate-950",
    border: "border-orange-500/40 hover:border-orange-400/60",
    accent: "text-orange-400",
    glow: "bg-orange-600/30",
    avatarGlow: "from-orange-500 to-amber-500",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    btnBg: "bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-500/25",
  },
  lime: {
    bg: "from-slate-950 via-lime-950/90 to-slate-950",
    border: "border-lime-500/40 hover:border-lime-400/60",
    accent: "text-lime-400",
    glow: "bg-lime-600/30",
    avatarGlow: "from-lime-500 to-emerald-500",
    badgeBg: "bg-lime-500/20 text-lime-300 border-lime-500/40",
    btnBg: "bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 text-white shadow-lime-500/25",
  },
  blue: {
    bg: "from-slate-950 via-blue-950/90 to-slate-950",
    border: "border-blue-500/40 hover:border-blue-400/60",
    accent: "text-blue-400",
    glow: "bg-blue-600/30",
    avatarGlow: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    btnBg: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-500/25",
  },
  sunset: {
    bg: "from-slate-950 via-red-950/90 to-slate-950",
    border: "border-red-500/40 hover:border-red-400/60",
    accent: "text-red-400",
    glow: "bg-red-600/30",
    avatarGlow: "from-red-500 to-rose-500",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
    btnBg: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-500/25",
  },
  slate: {
    bg: "from-slate-950 via-slate-900 to-slate-950",
    border: "border-slate-500/40 hover:border-slate-400/60",
    accent: "text-slate-300",
    glow: "bg-slate-500/30",
    avatarGlow: "from-slate-400 to-slate-600",
    badgeBg: "bg-slate-500/20 text-slate-300 border-slate-500/40",
    btnBg: "bg-slate-700 hover:bg-slate-600 text-white shadow-slate-600/25",
  },
  obsidian: {
    bg: "from-black via-zinc-950 to-black",
    border: "border-zinc-600/50 hover:border-zinc-400/70",
    accent: "text-zinc-200",
    glow: "bg-zinc-500/30",
    avatarGlow: "from-zinc-400 to-zinc-700",
    badgeBg: "bg-zinc-800/80 text-zinc-200 border-zinc-600/50",
    btnBg: "bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 text-white border border-zinc-600/50",
  },
  aurora: {
    bg: "from-slate-950 via-teal-950/80 to-purple-950/80",
    border: "border-teal-400/40 hover:border-purple-400/60",
    accent: "text-teal-300",
    glow: "bg-teal-500/30",
    avatarGlow: "from-teal-400 to-purple-500",
    badgeBg: "bg-teal-500/20 text-teal-300 border-teal-400/40",
    btnBg: "bg-gradient-to-r from-teal-600 via-emerald-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white shadow-teal-500/25",
  },
  cyber: {
    bg: "from-slate-950 via-yellow-950/60 to-slate-950",
    border: "border-yellow-400/50 hover:border-cyan-400/70",
    accent: "text-yellow-400",
    glow: "bg-yellow-500/30",
    avatarGlow: "from-yellow-400 to-cyan-400",
    badgeBg: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    btnBg: "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold shadow-yellow-500/25",
  },
  monochrome: {
    bg: "from-neutral-950 via-neutral-900 to-neutral-950",
    border: "border-neutral-500 hover:border-neutral-300",
    accent: "text-neutral-100",
    glow: "bg-neutral-500/25",
    avatarGlow: "from-neutral-200 to-neutral-500",
    badgeBg: "bg-neutral-800 text-neutral-100 border-neutral-600",
    btnBg: "bg-neutral-100 hover:bg-white text-neutral-950 font-bold shadow-neutral-400/20",
  },
  coffee: {
    bg: "from-stone-950 via-stone-900 to-stone-950",
    border: "border-amber-700/50 hover:border-amber-600/70",
    accent: "text-amber-300",
    glow: "bg-amber-800/30",
    avatarGlow: "from-amber-600 to-stone-500",
    badgeBg: "bg-amber-900/40 text-amber-200 border-amber-700/50",
    btnBg: "bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-white shadow-amber-900/30",
  }
};

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

export default function ClientPortalPage() {
  const [clientId, setClientId] = useState('');
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  
  // Image Data & File Names
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [avatarFileName, setAvatarFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');

  // Refs for resetting HTML file inputs
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [theme, setTheme] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [pinCode, setPinCode] = useState('');
    
  // Links array (Max of 3)
  const [links, setLinks] = useState([
    { name: '', type: 'website', detail: '', url: '' }
  ]);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateNewId();
  }, []);

  const generateNewId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setClientId(result);
    setCopied(false);
  };

  const handleCopyId = () => {
    if (!clientId) return;
    navigator.clipboard.writeText(clientId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setName('');
    setSubtitle('');
    setAvatarUrl('');
    setBannerUrl('');
    setAvatarFileName('');
    setBannerFileName('');
    if (bannerInputRef.current) bannerInputRef.current.value = '';
    if (avatarInputRef.current) avatarInputRef.current.value = '';
    setTheme('');
    setIsLocked(false);
    setPinCode('');
    setLinks([{ name: '', type: 'website', detail: '', url: '' }]);
    setMessage('');
    generateNewId();
  };

  // Image Upload Handler
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'banner' | 'avatar'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const labelName = type === 'banner' ? 'Banner Image' : 'Profile Picture';

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'banner') {
        setBannerUrl(reader.result as string);
        setBannerFileName(file.name);
      } else {
        setAvatarUrl(reader.result as string);
        setAvatarFileName(file.name);
      }
      setMessage(''); // Clear error message on success
    };

    reader.onerror = () => {
      setMessage(`Error: Unable to read ${labelName} file. Please select a valid image.`);
      if (type === 'banner') {
        if (bannerInputRef.current) bannerInputRef.current.value = '';
      } else {
        if (avatarInputRef.current) avatarInputRef.current.value = '';
      }
    };

    reader.readAsDataURL(file);
  };

  const handleAddLink = () => {
    if (links.length >= 3) {
      alert('Maximum of 3 links allowed for your digital card.');
      return;
    }
    setLinks([...links, { name: '', type: 'website', detail: '', url: '' }]);
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    setLinks(updatedLinks);
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validation: Require theme selection
    if (!theme) {
      setMessage('Error: Please select a theme style for your card.');
      setLoading(false);
      return;
    }

    // Validation: Platform name must start with an uppercase letter
    for (const link of links) {
      if (link.name && link.name.trim().length > 0) {
        const firstChar = link.name.trim()[0];
        if (firstChar !== firstChar.toUpperCase()) {
          setMessage(`Error: Platform name "${link.name}" must start with an uppercase letter (e.g. Instagram).`);
          setLoading(false);
          return;
        }
      }
    }

    const clientData = {
      name: name || 'John Doe',
      subtitle: subtitle || 'Subtitle / Role',
      avatarUrl,
      bannerUrl,
      theme,
      isLocked,
      pinCode: isLocked ? pinCode : '',
      links,
    };

    try {
      const response = await fetch('/api/admin/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, clientData }),
      });

      const result = await response.json();
      if (response.ok) {
        // Auto-generate and download the .json file for the client
        const fullPayload = { clientId, ...clientData };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullPayload, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `${clientId}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        const pinReminder = isLocked ? ` | PIN Code: ${pinCode}` : '';
        setMessage(`Success! Your configuration file ${clientId}.json has been downloaded.\n\nPlease keep note of your Card ID: ${clientId}${pinReminder}. Send or email the downloaded .json file to complete your profile card setup!`);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (err) {
      setMessage('Connection error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const currentTheme = (theme && themeStyles[theme]) ? themeStyles[theme] : plainTheme;

  const initials = name
    ? name.trim().split(/\s+/).map((n) => n[0]).join("").toUpperCase()
    : 'JD';

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center py-6 px-3 sm:py-10 sm:px-4 relative overflow-x-hidden">
        
      {/* Background Grid Accent Pattern (Lightweight for Mobile) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glow Aura */}
      <div className={`absolute w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] ${currentTheme.glow} rounded-full blur-3xl opacity-40 pointer-events-none transition-colors duration-300 transform-gpu`} />

      <div className="w-full max-w-5xl bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-10 relative z-10 animate-in fade-in zoom-in-95 duration-300 transform-gpu">
        
        {/* FORM SECTION (Left) */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1">
                <Sparkles size={13} className="text-indigo-400" /> Client Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-bold mt-1">Mitsu Smart Card Setup</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Customize your interactive profile card.</p>
            </div>
            <button 
              type="button" 
              onClick={handleReset} 
              title="Reset Form"
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer shrink-0"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* ERROR / INVALID MESSAGE BOX */}
            {message && (
              <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line flex items-start gap-2.5 ${
                message.startsWith('Success!') 
                  ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' 
                  : 'bg-rose-950/40 text-rose-400 border-rose-500/30'
              }`}>
                {message.startsWith('Invalid Request') || message.startsWith('Error:') ? (
                  <AlertCircle size={18} className="shrink-0 text-rose-400 mt-0.5" />
                ) : null}
                <div>{message}</div>
              </div>
            )}
              
            {/* Automated Slug / ID Container */}
            <div>
              <label className="text-xs font-medium text-slate-400">Generated Card ID / Slug (Automated):</label>
              <div className="relative mt-1.5 flex items-center">
                <input 
                  type="text" 
                  value={clientId} 
                  disabled
                  className="w-full pl-3 pr-24 py-2 bg-slate-950/50 border border-slate-800 rounded-lg text-slate-400 font-mono text-sm cursor-not-allowed tracking-wider"
                />
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="absolute right-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-md transition-all flex items-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">Full Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. John Doe"
                required
                className="w-full px-3 py-2 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">Subtitle / Role:</label>
              <input 
                type="text" 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)} 
                placeholder="e.g. Me / Student / Developer"
                className="w-full px-3 py-2 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none transition-all"
              />
            </div>

            {/* DIRECT FILE IMPORT CONTAINER */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} className="text-indigo-400" />
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Direct File Import</h3>
                </div>
                <span className="text-[11px] text-indigo-400 font-medium flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  <Sparkles size={11} /> Auto-Fit System
                </span>
              </div>

              {/* Profile Picture Direct Upload */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-200">Profile Picture File:</label>
                  <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-mono font-medium">
                    1:1 Square
                  </span>
                </div>
                
                <div className="relative">
                  <input 
                    ref={avatarInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label 
                    htmlFor="avatar-upload"
                    className="flex items-center justify-between w-full px-3 py-2.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-lg text-slate-300 text-sm cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <span className="truncate text-xs text-slate-400">
                      {avatarFileName ? `🖼️ ${avatarFileName}` : 'Select Profile Picture File...'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md shrink-0 font-medium shadow-sm transition-all">
                      <Upload size={13} /> Import
                    </span>
                  </label>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  <span className="text-indigo-400 font-medium">Size: 400 x 400 px (1:1 Ratio).</span>{' '}
                  <span className="text-slate-400 italic">Optional but highly recommended</span> for personalized digital card information.
                </p>
              </div>

              <hr className="border-slate-800/60 my-0.5" />

              {/* Banner Image Direct Upload */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-200">Banner Image File:</label>
                  <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 font-mono font-medium">
                    16:9 Banner
                  </span>
                </div>

                <div className="relative">
                  <input 
                    ref={bannerInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label 
                    htmlFor="banner-upload"
                    className="flex items-center justify-between w-full px-3 py-2.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-lg text-slate-300 text-sm cursor-pointer transition-all active:scale-[0.99]"
                  >
                    <span className="truncate text-xs text-slate-400">
                      {bannerFileName ? `🖼️ ${bannerFileName}` : 'Select Banner Image File...'}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md shrink-0 font-medium shadow-sm transition-all">
                      <Upload size={13} /> Import
                    </span>
                  </label>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">
                  <span className="text-indigo-400 font-medium">Size: 1200 x 350 px (16:9 / Banner Ratio).</span>{' '}
                  <span className="text-slate-400 italic">Optional but highly recommended</span> for best image fit.
                </p>
              </div>

              {/* General Note Banner */}
              <div className="mt-1 p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-2">
                <Info size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-indigo-200/90 leading-tight">
                  Any photo dimensions can be uploaded! The system will automatically adapt your images to fit the digital card.
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300">Theme Style:</label>
              <select 
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                required
                className="w-full px-3 py-2 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none transition-all cursor-pointer capitalize"
              >
                <option value="" disabled className="bg-slate-900 text-slate-500">
                  Select a Theme
                </option>
                {Object.keys(themeStyles).map((t) => (
                  <option key={t} value={t} className="bg-slate-900 text-white capitalize">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Lock feature */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={isLocked} 
                  onChange={(e) => setIsLocked(e.target.checked)} 
                  id="lockCheck"
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer shrink-0"
                />
                <label htmlFor="lockCheck" className="cursor-pointer text-sm font-medium text-slate-200">Lock Card with PIN (Privacy Mode)</label>
              </div>
              <p className="text-xs text-slate-400 mt-1 sm:pl-7">Enable this option if you want to restrict profile access using a secure PIN code.</p>

              {isLocked && (
                <div className="mt-3 sm:pl-7">
                  <label className="text-xs text-slate-300">Enter PIN Code:</label>
                  <input 
                    type="password" 
                    value={pinCode} 
                    onChange={(e) => setPinCode(e.target.value)} 
                    placeholder="e.g. 1234"
                    required
                    className="w-full px-3 py-2 mt-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none transition-all"
                  />
                </div>
              )}
            </div>

            <hr className="border-slate-800 my-1" />
              
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Social & Link Items</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${links.length >= 3 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400'}`}>
                {links.length}/3 used
              </span>
            </div>

            {links.map((link, index) => (
              <div key={index} className="bg-slate-950/60 p-4 rounded-xl flex flex-col gap-3 border border-slate-800/80 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-400">Link #{index + 1}</span>
                  {links.length > 1 && (
                    <button type="button" onClick={() => handleRemoveLink(index)} className="text-rose-400 hover:text-rose-300 transition-colors text-xs font-medium cursor-pointer">
                      Remove
                    </button>
                  )}
                </div>
                <input 
                  type="text" 
                  placeholder="Platform Name (e.g. Instagram)" 
                  value={link.name} 
                  onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Username / Subtitle (e.g. @john.doe)" 
                  value={link.detail} 
                  onChange={(e) => handleLinkChange(index, 'detail', e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none"
                />
                <input 
                  type="url" 
                  placeholder="URL Link (e.g. https://instagram.com/...)" 
                  value={link.url} 
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none"
                />
              </div>
            ))}

            {links.length < 3 ? (
              <button type="button" onClick={handleAddLink} className="py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-dashed border-slate-700 rounded-xl text-sm font-medium transition-all cursor-pointer">
                + Add New Link
              </button>
            ) : (
              <p className="text-xs text-rose-400 text-center">Maximum limit of 3 links reached.</p>
            )}

            {/* Action Section */}
            <div className="mt-3">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 text-sm active:scale-[0.99]"
              >
                {loading ? 'Saving Card...' : 'Save & Publish'}
              </button>
            </div>
          </form>
        </div>

        {/* LIVE PREVIEW SECTION (Right - Compressed Size & Profile Centered on Banner) */}
        <div className="flex-1 w-full min-w-0 flex flex-col items-center justify-start lg:justify-center bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
          
          <div className="w-full text-center lg:text-left text-xs uppercase tracking-widest text-indigo-400 font-bold mb-3 flex items-center justify-center lg:justify-start gap-1.5">
            <Sparkles size={14} /> Live Digital Card Preview
          </div>
              
          {/* Enhanced Compressed Profile Card Mockup */}
          <div className={`w-full max-w-[320px] bg-gradient-to-b ${currentTheme.bg} border-2 ${currentTheme.border} rounded-3xl text-center shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300 my-auto transform-gpu`}>
            
            {/* Top Banner Container (Compressed Height) */}
            <div className="w-full h-28 relative overflow-hidden bg-slate-950 border-b border-white/10 flex items-start justify-between p-3">
              {bannerUrl ? (
                <img src={bannerUrl} alt="Banner Preview" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.avatarGlow} opacity-40`} />
              )}
              {/* Vibrant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90 pointer-events-none" />

              {/* Status Header Badges */}
              <div className={`relative z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-md shadow-md ${isLocked ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' : 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'}`}>
                <span>{isLocked ? '🔒' : '🔓'}</span> {isLocked ? 'Locked' : 'Unlocked'}
              </div>
              <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900/90 text-slate-100 border border-slate-700/80 backdrop-blur-md shadow-md">
                <span>🔗</span> Share
              </div>
            </div>

            <div className="p-4 sm:p-5 pt-0 relative">
              {/* Dynamic Theme Light Ambient Accent */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 ${currentTheme.glow} rounded-full blur-2xl opacity-40 pointer-events-none transform-gpu`} />

              {/* Profile Avatar: Centered directly on the bottom edge of the banner */}
              <div className={`relative -mt-[44px] w-22 h-22 rounded-full bg-gradient-to-tr ${currentTheme.avatarGlow} mx-auto mb-2 flex items-center justify-center text-2xl font-bold text-white shadow-2xl ring-4 ring-slate-900 overflow-hidden z-10`}>
                {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                ) : (
               <span className="drop-shadow-md">{initials}</span>
            )}
              </div>

              <h1 className="text-lg font-bold text-white tracking-tight break-words drop-shadow-sm">{name || 'John Doe'}</h1>
              <p className={`text-xs font-semibold ${currentTheme.accent} mt-0.5 break-words drop-shadow-sm`}>{subtitle || 'Me'}</p>

              <div className="mt-4">
                <div className={`w-full py-2.5 rounded-xl text-xs font-bold ${currentTheme.btnBg} shadow-lg flex items-center justify-center gap-2 transition-all cursor-default`}>
                  <span>👤+</span> Save Contact
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-left">
                {links.map((l, i) => (
                  <div key={i} className="w-full p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs text-white flex items-center justify-between shadow-md transition-all hover:border-slate-700">
                    <div className="flex items-center gap-2.5 truncate min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-xs shrink-0 text-slate-200 shadow-inner">
                        {getIcon(l.name)}
                      </div>
                      <div className="truncate min-w-0">
                        <div className="font-semibold text-white truncate">{l.name || `Link Item #${i + 1}`}</div>
                        <div className="text-[11px] text-slate-400 truncate">{l.detail || '@username'}</div>
                      </div>
                    </div>
                    <span className={`text-[11px] ${currentTheme.accent} font-medium shrink-0 ml-2`}>Visit ↗</span>
                  </div>
                ))}
              </div>

              {/* Footer with Icon Logo */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 text-[10px] tracking-widest uppercase text-slate-400 font-bold flex items-center justify-center gap-1.5">
                <img src="/icon.png" alt="Mitsu Icon" className="w-3.5 h-3.5 object-contain shrink-0" />
                <span>Powered by MSC</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}