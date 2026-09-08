'use client';
import { useState, useEffect } from 'react';
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
  Check
} from 'lucide-react';

// Plain theme fallback for unselected state
const plainTheme = {
  bg: "from-slate-900 via-slate-900 to-slate-950",
  border: "border-slate-800 hover:border-slate-700",
  accent: "text-slate-400",
  glow: "bg-transparent",
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
    bg: "from-slate-900/90 via-indigo-950/80 to-slate-900/90",
    border: "border-indigo-500/30 hover:border-indigo-500/50",
    accent: "text-indigo-400",
    glow: "bg-indigo-600/25",
    avatarGlow: "from-indigo-500 to-blue-500",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25",
  },
  midnight: {
    bg: "from-slate-900/90 via-purple-950/80 to-slate-900/90",
    border: "border-purple-500/30 hover:border-purple-500/50",
    accent: "text-purple-400",
    glow: "bg-purple-600/25",
    avatarGlow: "from-purple-500 to-pink-500",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    btnBg: "bg-purple-600 hover:bg-purple-500 shadow-purple-500/25",
  },
  emerald: {
    bg: "from-slate-900/90 via-emerald-950/80 to-slate-900/90",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    accent: "text-emerald-400",
    glow: "bg-emerald-600/25",
    avatarGlow: "from-emerald-500 to-teal-500",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    btnBg: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
  },
  rose: {
    bg: "from-slate-900/90 via-rose-950/80 to-slate-900/90",
    border: "border-rose-500/30 hover:border-rose-500/50",
    accent: "text-rose-400",
    glow: "bg-rose-600/25",
    avatarGlow: "from-rose-500 to-pink-500",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    btnBg: "bg-rose-600 hover:bg-rose-500 shadow-rose-500/25",
  },
  fuchsia: {
    bg: "from-slate-900/90 via-fuchsia-950/80 to-slate-900/90",
    border: "border-fuchsia-500/30 hover:border-fuchsia-500/50",
    accent: "text-fuchsia-400",
    glow: "bg-fuchsia-600/25",
    avatarGlow: "from-fuchsia-500 to-pink-500",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
    btnBg: "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-500/25",
  },
  amber: {
    bg: "from-slate-900/90 via-amber-950/80 to-slate-900/90",
    border: "border-amber-500/30 hover:border-amber-500/50",
    accent: "text-amber-400",
    glow: "bg-amber-600/25",
    avatarGlow: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    btnBg: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/25",
  },
  cyan: {
    bg: "from-slate-900/90 via-cyan-950/80 to-slate-900/90",
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    accent: "text-cyan-400",
    glow: "bg-cyan-600/25",
    avatarGlow: "from-cyan-500 to-blue-500",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    btnBg: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/25",
  },
  violet: {
    bg: "from-slate-900/90 via-violet-950/80 to-slate-900/90",
    border: "border-violet-500/30 hover:border-violet-500/50",
    accent: "text-violet-400",
    glow: "bg-violet-600/25",
    avatarGlow: "from-violet-500 to-purple-500",
    badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    btnBg: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/25",
  },
  teal: {
    bg: "from-slate-900/90 via-teal-950/80 to-slate-900/90",
    border: "border-teal-500/30 hover:border-teal-500/50",
    accent: "text-teal-400",
    glow: "bg-teal-600/25",
    avatarGlow: "from-teal-500 to-emerald-500",
    badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    btnBg: "bg-teal-600 hover:bg-teal-500 shadow-teal-500/25",
  },
  sky: {
    bg: "from-slate-900/90 via-sky-950/80 to-slate-900/90",
    border: "border-sky-500/30 hover:border-sky-500/50",
    accent: "text-sky-400",
    glow: "bg-sky-600/25",
    avatarGlow: "from-sky-500 to-indigo-500",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    btnBg: "bg-sky-600 hover:bg-sky-500 shadow-sky-500/25",
  },
  orange: {
    bg: "from-slate-900/90 via-orange-950/80 to-slate-900/90",
    border: "border-orange-500/30 hover:border-orange-500/50",
    accent: "text-orange-400",
    glow: "bg-orange-600/25",
    avatarGlow: "from-orange-500 to-amber-500",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    btnBg: "bg-orange-600 hover:bg-orange-500 shadow-orange-500/25",
  },
  lime: {
    bg: "from-slate-900/90 via-lime-950/80 to-slate-900/90",
    border: "border-lime-500/30 hover:border-lime-500/50",
    accent: "text-lime-400",
    glow: "bg-lime-600/25",
    avatarGlow: "from-lime-500 to-emerald-500",
    badgeBg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    btnBg: "bg-lime-600 hover:bg-lime-500 shadow-lime-500/25",
  },
  blue: {
    bg: "from-slate-900/90 via-blue-950/80 to-slate-900/90",
    border: "border-blue-500/30 hover:border-blue-500/50",
    accent: "text-blue-400",
    glow: "bg-blue-600/25",
    avatarGlow: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    btnBg: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
  },
  sunset: {
    bg: "from-slate-900/90 via-red-950/80 to-slate-900/90",
    border: "border-red-500/30 hover:border-red-500/50",
    accent: "text-red-400",
    glow: "bg-red-600/25",
    avatarGlow: "from-red-500 to-rose-500",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/30",
    btnBg: "bg-red-600 hover:bg-red-500 shadow-red-500/25",
  },
  slate: {
    bg: "from-slate-950 via-slate-900 to-slate-950",
    border: "border-slate-600/40 hover:border-slate-500/60",
    accent: "text-slate-300",
    glow: "bg-slate-500/20",
    avatarGlow: "from-slate-400 to-slate-600",
    badgeBg: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    btnBg: "bg-slate-700 hover:bg-slate-600 shadow-slate-600/25",
  },
  obsidian: {
    bg: "from-black via-zinc-950 to-black",
    border: "border-zinc-700/50 hover:border-zinc-500/70",
    accent: "text-zinc-200",
    glow: "bg-zinc-500/20",
    avatarGlow: "from-zinc-400 to-zinc-700",
    badgeBg: "bg-zinc-800/50 text-zinc-300 border-zinc-600/40",
    btnBg: "bg-zinc-800 hover:bg-zinc-700 shadow-zinc-700/30 border border-zinc-600/50",
  },
  aurora: {
    bg: "from-slate-950 via-teal-950/60 to-purple-950/60",
    border: "border-teal-400/30 hover:border-purple-400/50",
    accent: "text-teal-300",
    glow: "bg-teal-500/20",
    avatarGlow: "from-teal-400 to-purple-500",
    badgeBg: "bg-teal-500/10 text-teal-300 border-teal-400/30",
    btnBg: "bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 shadow-teal-500/20",
  },
  cyber: {
    bg: "from-slate-950 via-yellow-950/40 to-slate-950",
    border: "border-yellow-500/40 hover:border-cyan-400/60",
    accent: "text-yellow-400",
    glow: "bg-yellow-500/20",
    avatarGlow: "from-yellow-400 to-cyan-400",
    badgeBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    btnBg: "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold shadow-yellow-500/25",
  },
  monochrome: {
    bg: "from-neutral-900 via-neutral-950 to-neutral-900",
    border: "border-neutral-700 hover:border-neutral-500",
    accent: "text-neutral-100",
    glow: "bg-neutral-500/15",
    avatarGlow: "from-neutral-300 to-neutral-600",
    badgeBg: "bg-neutral-800 text-neutral-200 border-neutral-600",
    btnBg: "bg-neutral-200 hover:bg-white text-neutral-950 font-bold shadow-neutral-500/20",
  },
  coffee: {
    bg: "from-stone-950 via-stone-900 to-stone-950",
    border: "border-amber-700/40 hover:border-amber-600/60",
    accent: "text-amber-200",
    glow: "bg-amber-800/20",
    avatarGlow: "from-amber-600 to-stone-500",
    badgeBg: "bg-amber-900/30 text-amber-200 border-amber-700/40",
    btnBg: "bg-amber-800 hover:bg-amber-700 shadow-amber-900/30",
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
  const [avatarUrl, setAvatarUrl] = useState('');
  const [theme, setTheme] = useState(''); // Empty initial state so user is forced to pick
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

  // Generate 10-character random ID (Uppercase, Lowercase, Numbers)
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
    setTheme('');
    setIsLocked(false);
    setPinCode('');
    setLinks([{ name: '', type: 'website', detail: '', url: '' }]);
    setMessage('');
    generateNewId();
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
        // 1. Auto-generate and download the .json file for the client
        const fullPayload = { clientId, ...clientData };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(fullPayload, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `mitsu-card-${clientId}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        // 2. Display success message with reminder to save ID and email the downloaded json file
        const pinReminder = isLocked ? ` | PIN Code: ${pinCode}` : '';
        setMessage(`✨ Success! Na-download na ang iyong mitsu-card-${clientId}.json file. Tandaan at itabi ang iyong Card ID: ${clientId}${pinReminder}. Pakipasa o paki-email ang na-download na .json file sa akin para sa pag-setup ng iyong profile card!`);
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-10 px-4 relative overflow-x-hidden">
        
      {/* Background Grid Accent Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glow Aura */}
      <div className={`absolute w-[340px] h-[340px] ${currentTheme.glow} rounded-full blur-[120px] pointer-events-none transition-all duration-500`} />

      <div className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-10 shadow-2xl flex flex-col lg:flex-row gap-10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
          
        {/* FORM SECTION (Left) */}
        <div className="flex-1 min-w-[300px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Client Portal</span>
              <h2 className="text-2xl font-bold mt-1">Mitsu Smart Card Setup</h2>
              <p className="text-sm text-slate-400 mt-1">Customize your interactive profile card.</p>
            </div>
            <button 
              type="button" 
              onClick={handleReset} 
              title="Reset Form"
              className="p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
            {/* Automated Slug / ID Container with Embedded Copy Button */}
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

            <div>
              <label className="text-sm font-medium text-slate-300">Avatar Image URL (Optional):</label>
              <input 
                type="url" 
                value={avatarUrl} 
                onChange={(e) => setAvatarUrl(e.target.value)} 
                placeholder="https://example.com/photo.jpg"
                className="w-full px-3 py-2 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none transition-all"
              />
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
                  className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                />
                <label htmlFor="lockCheck" className="cursor-pointer text-sm font-medium text-slate-200">Lock Card with PIN (Privacy Mode)</label>
              </div>
              <p className="text-xs text-slate-400 mt-1 pl-7">Enable this option if you want to restrict profile access using a secure PIN code.</p>

              {isLocked && (
                <div className="mt-3 pl-7">
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

            {/* Action Section: Single full-width Save & Publish Button */}
            <div className="mt-3">
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 text-sm"
              >
                {loading ? 'Saving Card...' : 'Save & Publish'}
              </button>
            </div>

            {message && (
              <p className={`text-center text-sm font-medium mt-2 leading-relaxed ${message.includes('Success!') ? 'text-emerald-400 bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/30 shadow-md' : 'text-rose-400'}`}>
                {message}
              </p>
            )}
          </form>
        </div>

        {/* LIVE PREVIEW SECTION (Right) */}
        <div className="flex-1 min-w-[300px] flex flex-col items-center justify-center bg-slate-950/40 p-6 rounded-2xl border border-slate-800/60 relative">
          <div className="absolute top-4 left-6 text-xs uppercase tracking-widest text-slate-500 font-bold">
            Live Official Preview
          </div>
              
          {/* Profile Card Mockup */}
          <div className={`w-full max-w-[340px] bg-gradient-to-b ${currentTheme.bg} border ${currentTheme.border} rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-500 my-auto`}>
              
            <div className="flex justify-between items-center mb-6">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isLocked ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>
                <span>{isLocked ? '🔒' : '🔓'}</span> {isLocked ? 'Locked' : 'Unlocked'}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50">
                <span>📤</span> Share
              </div>
            </div>

            <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-32 h-32 ${currentTheme.glow} rounded-full blur-2xl pointer-events-none`} />

            <div className={`relative w-20 h-20 rounded-full bg-gradient-to-tr ${currentTheme.avatarGlow} mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white shadow-lg overflow-hidden`}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                initials
              )}
            </div>

            <h1 className="text-xl font-bold text-white tracking-tight">{name || 'John Doe'}</h1>
            <p className={`text-sm font-medium ${currentTheme.accent} mt-1`}>{subtitle || 'Me'}</p>

            <div className="mt-6">
              <div className={`w-full py-3 rounded-xl text-sm font-semibold ${currentTheme.btnBg} shadow-md flex items-center justify-center gap-2 transition-all`}>
                <span>👤+</span> Save Contact
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-left">
              {links.map((l, i) => (
                <div key={i} className="w-full p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-sm text-white flex items-center justify-between shadow-inner transition-all hover:bg-slate-900">
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-xs shrink-0 text-slate-300">
                      {getIcon(l.name)}
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-white truncate">{l.name || `Link Item #${i + 1}`}</div>
                      <div className="text-xs text-slate-400 truncate">{l.detail || '@username'}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 ml-2">Visit ↗</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/60 text-[10px] tracking-widest uppercase text-slate-500 font-semibold">
              Powered by Mitsu Smart Card
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}