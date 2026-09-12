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
  Info,
  ShieldCheck
} from 'lucide-react';

// ScrollReveal Wrapper para sa magandang scroll animations
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

const plainTheme = {
  bg: "from-slate-900 via-slate-900 to-slate-950",
  border: "border-slate-800 hover:border-slate-700",
  accent: "text-slate-400",
  glow: "bg-slate-800/10",
  avatarGlow: "from-slate-700 to-slate-800",
  badgeBg: "bg-slate-800/50 text-slate-400 border-slate-700/50",
  btnBg: "bg-slate-800 hover:bg-slate-700 text-slate-300 shadow-none",
};

const getIcon = (type: string) => {
  if (!type) return <ExternalLink size={16} className="text-slate-400" />;
  const formatted = type.trim().toLowerCase();

  switch (formatted) {
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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [savedAuth, setSavedAuth] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [clientId, setClientId] = useState('');
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const [avatarUrl, setAvatarUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [avatarFileName, setAvatarFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const [theme, setTheme] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const [links, setLinks] = useState([
    { name: '', type: 'website', detail: '', url: '' }
  ]);

  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const [randomAdminBgStyle, setRandomAdminBgStyle] = useState(themeStyles.amber);

  useEffect(() => {
    generateNewId();
    const keys = Object.keys(themeStyles);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setRandomAdminBgStyle(themeStyles[randomKey]);
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const ADMIN_USER = 'admin';
    const ADMIN_PASS = 'mitsujuvqe0101';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setSavedAuth({ username, password });
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid username or password. Access denied.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'avatar') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'banner') {
        setBannerUrl(reader.result as string);
        setBannerFileName(file.name);
      } else {
        setAvatarUrl(reader.result as string);
        setAvatarFileName(file.name);
      }
      setStatusMsg('');
    };
    reader.readAsDataURL(file);
  };

  const addLinkField = () => {
    setLinks([...links, { name: '', type: 'website', detail: '', url: '' }]);
  };

  const updateLink = (index: number, field: string, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  };

  const removeLinkField = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('Publishing to GitHub / clients.json...');

    const clientPayload = {
      name,
      subtitle,
      avatarUrl,
      bannerUrl,
      theme,
      isLocked,
      pinCode: isLocked ? pinCode : '',
      links: links.filter((l) => l.name || l.url),
    };

    try {
      const res = await fetch('/api/admin/client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: savedAuth.username,
          password: savedAuth.password,
          clientId,
          clientData: clientPayload,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg('✅ Success! Client profile saved & published to clients.json.');
      } else {
        setStatusMsg(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setStatusMsg('❌ Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleJsonFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const jsonContent = JSON.parse(text);
        
        const clientData = jsonContent.clientData || jsonContent;

        if (jsonContent.clientId) setClientId(jsonContent.clientId);
        if (clientData.name) setName(clientData.name);
        if (clientData.subtitle) setSubtitle(clientData.subtitle);
        if (clientData.avatarUrl) setAvatarUrl(clientData.avatarUrl);
        if (clientData.bannerUrl) setBannerUrl(clientData.bannerUrl);
        if (clientData.theme) setTheme(clientData.theme);
        if (typeof clientData.isLocked === 'boolean') setIsLocked(clientData.isLocked);
        if (clientData.pinCode) setPinCode(clientData.pinCode);
        if (Array.isArray(clientData.links) && clientData.links.length > 0) {
          setLinks(clientData.links);
        }

        setImportStatus('✅ JSON imported successfully into fields! Review and click Save & Publish.');
      } catch (err) {
        setImportStatus('❌ Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <main className={`min-h-screen w-full bg-gradient-to-br ${randomAdminBgStyle.bg} text-white flex items-center justify-center p-4 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <ScrollReveal delay={100} className="w-full max-w-md z-10">
          <form onSubmit={handleLogin} className={`bg-slate-900/95 backdrop-blur-2xl border ${randomAdminBgStyle.border} p-8 rounded-3xl w-full space-y-6 shadow-2xl`}>
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-1">
                <ShieldCheck size={28} />
              </div>
              <h1 className={`text-2xl font-extrabold ${randomAdminBgStyle.accent} tracking-wide`}>Mitsu Admin Portal</h1>
              <p className="text-xs text-slate-400">Enter secure administrator credentials to proceed.</p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center font-medium">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white mt-1 text-sm focus:outline-none focus:border-indigo-400"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white mt-1 text-sm focus:outline-none focus:border-indigo-400"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className={`w-full ${randomAdminBgStyle.btnBg} font-bold py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer`}>
              Secure Login
            </button>
          </form>
        </ScrollReveal>
      </main>
    );
  }

  const currentTheme = (theme && themeStyles[theme]) ? themeStyles[theme] : plainTheme;
  const initials = name ? name.trim().split(/\s+/).map((n) => n[0]).join("").toUpperCase() : 'JD';

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center py-6 px-3 sm:py-10 sm:px-4 relative overflow-x-hidden">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className={`absolute w-[200px] sm:w-[320px] h-[200px] sm:h-[320px] ${currentTheme.glow} rounded-full blur-3xl opacity-40 pointer-events-none transition-colors duration-300 transform-gpu`} />

      <ScrollReveal delay={100} className="w-full max-w-5xl">
        <div className="w-full bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col lg:flex-row gap-8 lg:gap-10 relative z-10">
          
          {/* FORM SECTION (Left) */}
          <div className="flex-1 w-full min-w-0">
            
            <div className="flex justify-between items-start mb-6 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold flex items-center gap-1">
                  <Sparkles size={13} className="text-indigo-400" /> Master Control
                </span>
                <h2 className="text-xl sm:text-2xl font-bold mt-1">Mitsu Admin Portal</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Manage, configure & publish client cards directly.</p>
              </div>
              <button onClick={() => setIsAuthenticated(false)} className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition border border-red-500/30 cursor-pointer">
                Logout
              </button>
            </div>

            {statusMsg && (
              <div className="p-4 rounded-xl border text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line flex items-start gap-2.5 bg-slate-900/90 border-slate-700 text-slate-200 shadow-lg mb-4">
                <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                <span>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div>
                <label className="text-xs font-medium text-slate-400">Card ID / Slug (Automated):</label>
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
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={generateNewId}
                    className="absolute right-20 px-2 py-1 text-xs font-bold rounded transition border border-slate-700 bg-slate-800 hover:bg-slate-700 shrink-0 cursor-pointer hidden sm:block"
                    title="Generate New ID"
                  >
                    <RotateCcw size={12} />
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
                  className="w-full px-3 py-2 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300">Subtitle / Role:</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Administrator / Developer"
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

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-200">Profile Picture File:</label>
                  <input 
                    ref={avatarInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'avatar')}
                    className="hidden"
                    id="admin-avatar-upload"
                  />
                  <label htmlFor="admin-avatar-upload" className="flex items-center justify-between w-full px-3 py-2.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-lg text-slate-300 text-sm cursor-pointer transition-all">
                    <span className="truncate text-xs text-slate-400">{avatarFileName ? `🖼️ ${avatarFileName}` : 'Select Profile Picture File...'}</span>
                    <span className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md shrink-0 font-medium shadow-sm transition-all"><Upload size={13} /> Import</span>
                  </label>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-200">Banner Image File:</label>
                  <input 
                    ref={bannerInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'banner')}
                    className="hidden"
                    id="admin-banner-upload"
                  />
                  <label htmlFor="admin-banner-upload" className="flex items-center justify-between w-full px-3 py-2.5 bg-slate-950 border border-slate-800 hover:border-indigo-500/60 rounded-lg text-slate-300 text-sm cursor-pointer transition-all">
                    <span className="truncate text-xs text-slate-400">{bannerFileName ? `🖼️ ${bannerFileName}` : 'Select Banner Image File...'}</span>
                    <span className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-md shrink-0 font-medium shadow-sm transition-all"><Upload size={13} /> Import</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300">Theme Style:</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none transition-all cursor-pointer capitalize"
                  required
                >
                  <option value="" disabled>Select Theme Style</option>
                  {Object.keys(themeStyles).map((t) => (
                    <option key={t} value={t} className="bg-slate-900 text-white capitalize">{t}</option>
                  ))}
                </select>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isLocked"
                    checked={isLocked}
                    onChange={(e) => setIsLocked(e.target.checked)}
                    className="w-4 h-4 accent-indigo-500 rounded cursor-pointer shrink-0"
                  />
                  <label htmlFor="isLocked" className="cursor-pointer text-sm font-medium text-slate-200">
                    Lock Card with PIN (Privacy Mode)
                  </label>
                </div>
                {isLocked && (
                  <div className="mt-3 sm:pl-7">
                    <label className="text-xs text-slate-300">PIN Code:</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="w-full px-3 py-2 mt-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none"
                      placeholder="1234"
                      required
                    />
                  </div>
                )}
              </div>

              <hr className="border-slate-800 my-1" />

              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Social & Link Items (Unlimited Mode)</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  Admin Uncapped
                </span>
              </div>
              
              {links.map((link, idx) => (
                <div key={idx} className="bg-slate-950/60 p-4 rounded-xl flex flex-col gap-3 border border-slate-800/80 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-400">Link #{idx + 1}</span>
                    {links.length > 1 && (
                      <button type="button" onClick={() => removeLinkField(idx)} className="text-rose-400 hover:text-rose-300 transition-colors text-xs font-medium cursor-pointer">
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Platform Name (e.g. Facebook)"
                    value={link.name}
                    onChange={(e) => updateLink(idx, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Username / Subtitle (e.g. @username)"
                    value={link.detail}
                    onChange={(e) => updateLink(idx, 'detail', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none"
                  />
                  <input
                    type="url"
                    placeholder="URL Link (https://...)"
                    value={link.url}
                    onChange={(e) => updateLink(idx, 'url', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-lg text-white text-sm outline-none"
                  />
                </div>
              ))}
              
              <button type="button" onClick={addLinkField} className="py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-dashed border-slate-700 rounded-xl text-sm font-medium transition-all cursor-pointer">
                + Add Another Link
              </button>

              <div className="mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50 text-sm active:scale-[0.99]"
                >
                  {loading ? 'Publishing...' : 'Save & Publish Customer Card'}
                </button>
              </div>
            </form>
          </div>

          {/* LIVE DIGITAL CARD PREVIEW SECTION (Right) */}
          <div className="flex-1 w-full min-w-0 flex flex-col items-center justify-start lg:justify-center bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/80">
            
            <div className="w-full text-center lg:text-left text-xs uppercase tracking-widest text-indigo-400 font-bold mb-3 flex items-center justify-center lg:justify-start gap-1.5">
              <Sparkles size={14} /> Live Digital Card Preview
            </div>
                
            <div className={`w-full max-w-[320px] bg-gradient-to-b ${currentTheme.bg} border-2 ${currentTheme.border} rounded-3xl text-center shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-300 my-auto transform-gpu flex flex-col`}>
              
              <div className="w-full h-28 relative overflow-hidden bg-slate-950 border-b border-white/10 flex items-start justify-between p-3 shrink-0">
                {bannerUrl ? (
                  <img src={bannerUrl} alt="Banner Preview" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.avatarGlow} opacity-40`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-slate-950/90 pointer-events-none" />

                <div className={`relative z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium backdrop-blur-md shadow-md ${isLocked ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' : 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'}`}>
                  <span>{isLocked ? '🔒' : '🔓'}</span> {isLocked ? 'Locked' : 'Unlocked'}
                </div>
                <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900/90 text-slate-100 border border-slate-700/80 backdrop-blur-md shadow-md">
                  <span>🔗</span> Share
                </div>
              </div>

              <div className="p-4 sm:p-5 pt-0 relative flex-1 flex flex-col">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 ${currentTheme.glow} rounded-full blur-2xl opacity-40 pointer-events-none transform-gpu`} />

                <div className={`relative -mt-[44px] w-22 h-22 rounded-full bg-gradient-to-tr ${currentTheme.avatarGlow} mx-auto mb-2 flex items-center justify-center text-2xl font-bold text-white shadow-2xl ring-4 ring-slate-900 overflow-hidden z-10 shrink-0`}>
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="drop-shadow-md">{initials}</span>
                  )}
                </div>

                <h1 className="text-lg font-bold text-white tracking-tight break-words drop-shadow-sm">{name || 'John Doe'}</h1>
                <p className={`text-xs font-semibold ${currentTheme.accent} mt-0.5 break-words drop-shadow-sm`}>{subtitle || 'Me'}</p>

                <div className="mt-4 shrink-0">
                  <div className={`w-full py-2.5 rounded-xl text-xs font-bold ${currentTheme.btnBg} shadow-lg flex items-center justify-center gap-2 transition-all cursor-default`}>
                    <span>👤+</span> Save Contact
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 text-left max-h-[220px] overflow-y-auto pr-1 flex-1">
                  {links.map((l, i) => (l.name || l.url) ? (
                    <div key={i} className="w-full p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 text-xs text-white flex items-center justify-between shadow-md transition-all hover:border-slate-700">
                      <div className="flex items-center gap-2.5 truncate min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-xs shrink-0 text-slate-200 shadow-inner">
                          {getIcon(l.name)}
                        </div>
                        <div className="truncate min-w-0">
                          <div className="font-semibold text-white truncate">{l.name || 'Link'}</div>
                          <div className="text-[11px] text-slate-400 truncate">{l.detail || l.url || '@username'}</div>
                        </div>
                      </div>
                      <span className={`text-[11px] ${currentTheme.accent} font-medium shrink-0 ml-2`}>Visit ↗</span>
                    </div>
                  ) : null)}
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 text-[10px] tracking-widest uppercase text-slate-400 font-bold flex items-center justify-center gap-1.5 shrink-0">
                  <img src="/icon.png" alt="Mitsu Icon" className="w-3.5 h-3.5 object-contain shrink-0" />
                  <span>Powered by MSC</span>
                </div>
              </div>
            </div>

            <div className="w-full mt-6 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1">📂 Import Client JSON Config</h3>
              <input
                type="file"
                accept=".json"
                onChange={handleJsonFileUpload}
                className="w-full text-[11px] text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-slate-800 file:text-white cursor-pointer"
              />
              {importStatus && (
                <p className="text-[10px] text-slate-300 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} className="text-indigo-400" />
                  {importStatus}
                </p>
              )}
            </div>

          </div>

        </div>
      </ScrollReveal>
    </div>
  );
}