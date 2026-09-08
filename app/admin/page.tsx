'use client';

import { useState, useEffect } from 'react';

const themeStyles: Record<string, { bg: string; border: string; accent: string; glow: string; avatarGlow: string; badgeBg: string; btnBg: string; focusBorder: string; accentColor: string }> = {
  indigo: {
    bg: "from-slate-950 via-indigo-950/90 to-slate-950",
    border: "border-indigo-500/50 hover:border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.25)]",
    accent: "text-indigo-400",
    glow: "bg-indigo-600/40",
    avatarGlow: "from-indigo-500 to-blue-500",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/40",
    focusBorder: "focus:border-indigo-400",
    accentColor: "accent-indigo-500",
  },
  midnight: {
    bg: "from-slate-950 via-purple-950/90 to-slate-950",
    border: "border-purple-500/50 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]",
    accent: "text-purple-400",
    glow: "bg-purple-600/40",
    avatarGlow: "from-purple-500 to-pink-500",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    btnBg: "bg-purple-600 hover:bg-purple-500 shadow-purple-500/40",
    focusBorder: "focus:border-purple-400",
    accentColor: "accent-purple-500",
  },
  emerald: {
    bg: "from-slate-950 via-emerald-950/90 to-slate-950",
    border: "border-emerald-500/50 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    accent: "text-emerald-400",
    glow: "bg-emerald-600/40",
    avatarGlow: "from-emerald-500 to-teal-500",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    btnBg: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/40",
    focusBorder: "focus:border-emerald-400",
    accentColor: "accent-emerald-500",
  },
  rose: {
    bg: "from-slate-950 via-rose-950/90 to-slate-950",
    border: "border-rose-500/50 hover:border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.25)]",
    accent: "text-rose-400",
    glow: "bg-rose-600/40",
    avatarGlow: "from-rose-500 to-pink-500",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    btnBg: "bg-rose-600 hover:bg-rose-500 shadow-rose-500/40",
    focusBorder: "focus:border-rose-400",
    accentColor: "accent-rose-500",
  },
  fuchsia: {
    bg: "from-slate-950 via-fuchsia-950/90 to-slate-950",
    border: "border-fuchsia-500/50 hover:border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.25)]",
    accent: "text-fuchsia-400",
    glow: "bg-fuchsia-600/40",
    avatarGlow: "from-fuchsia-500 to-pink-500",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
    btnBg: "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-500/40",
    focusBorder: "focus:border-fuchsia-400",
    accentColor: "accent-fuchsia-500",
  },
  amber: {
    bg: "from-slate-950 via-amber-950/90 to-slate-950",
    border: "border-amber-500/50 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]",
    accent: "text-amber-400",
    glow: "bg-amber-600/40",
    avatarGlow: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    btnBg: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/40",
    focusBorder: "focus:border-amber-400",
    accentColor: "accent-amber-500",
  },
  cyan: {
    bg: "from-slate-950 via-cyan-950/90 to-slate-950",
    border: "border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)]",
    accent: "text-cyan-400",
    glow: "bg-cyan-600/40",
    avatarGlow: "from-cyan-500 to-blue-500",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    btnBg: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/40",
    focusBorder: "focus:border-cyan-400",
    accentColor: "accent-cyan-500",
  },
  violet: {
    bg: "from-slate-950 via-violet-950/90 to-slate-950",
    border: "border-violet-500/50 hover:border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    accent: "text-violet-400",
    glow: "bg-violet-600/40",
    avatarGlow: "from-violet-500 to-purple-500",
    badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    btnBg: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/40",
    focusBorder: "focus:border-violet-400",
    accentColor: "accent-violet-500",
  },
  teal: {
    bg: "from-slate-950 via-teal-950/90 to-slate-950",
    border: "border-teal-500/50 hover:border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.25)]",
    accent: "text-teal-400",
    glow: "bg-teal-600/40",
    avatarGlow: "from-teal-500 to-emerald-500",
    badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    btnBg: "bg-teal-600 hover:bg-teal-500 shadow-teal-500/40",
    focusBorder: "focus:border-teal-400",
    accentColor: "accent-teal-500",
  },
  sky: {
    bg: "from-slate-950 via-sky-950/90 to-slate-950",
    border: "border-sky-500/50 hover:border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.25)]",
    accent: "text-sky-400",
    glow: "bg-sky-600/40",
    avatarGlow: "from-sky-500 to-indigo-500",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    btnBg: "bg-sky-600 hover:bg-sky-500 shadow-sky-500/40",
    focusBorder: "focus:border-sky-400",
    accentColor: "accent-sky-500",
  },
  orange: {
    bg: "from-slate-950 via-orange-950/90 to-slate-950",
    border: "border-orange-500/50 hover:border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.25)]",
    accent: "text-orange-400",
    glow: "bg-orange-600/40",
    avatarGlow: "from-orange-500 to-amber-500",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    btnBg: "bg-orange-600 hover:bg-orange-500 shadow-orange-500/40",
    focusBorder: "focus:border-orange-400",
    accentColor: "accent-orange-500",
  },
  lime: {
    bg: "from-slate-950 via-lime-950/90 to-slate-950",
    border: "border-lime-500/50 hover:border-lime-400 shadow-[0_0_20px_rgba(132,204,22,0.25)]",
    accent: "text-lime-400",
    glow: "bg-lime-600/40",
    avatarGlow: "from-lime-500 to-emerald-500",
    badgeBg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    btnBg: "bg-lime-600 hover:bg-lime-500 shadow-lime-500/40",
    focusBorder: "focus:border-lime-400",
    accentColor: "accent-lime-500",
  },
  blue: {
    bg: "from-slate-950 via-blue-950/90 to-slate-950",
    border: "border-blue-500/50 hover:border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.25)]",
    accent: "text-blue-400",
    glow: "bg-blue-600/40",
    avatarGlow: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    btnBg: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/40",
    focusBorder: "focus:border-blue-400",
    accentColor: "accent-blue-500",
  },
  sunset: {
    bg: "from-slate-950 via-red-950/90 to-slate-950",
    border: "border-red-500/50 hover:border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.25)]",
    accent: "text-red-400",
    glow: "bg-red-600/40",
    avatarGlow: "from-red-500 to-rose-500",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/30",
    btnBg: "bg-red-600 hover:bg-red-500 shadow-red-500/40",
    focusBorder: "focus:border-red-400",
    accentColor: "accent-red-500",
  },
  slate: {
    bg: "from-slate-950 via-slate-900 to-slate-950",
    border: "border-slate-500/50 hover:border-slate-400 shadow-[0_0_20px_rgba(100,116,139,0.25)]",
    accent: "text-slate-300",
    glow: "bg-slate-500/30",
    avatarGlow: "from-slate-400 to-slate-600",
    badgeBg: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    btnBg: "bg-slate-700 hover:bg-slate-600 shadow-slate-600/40",
    focusBorder: "focus:border-slate-400",
    accentColor: "accent-slate-500",
  },
  obsidian: {
    bg: "from-black via-zinc-950 to-black",
    border: "border-zinc-600/60 hover:border-zinc-400 shadow-[0_0_20px_rgba(113,113,122,0.25)]",
    accent: "text-zinc-200",
    glow: "bg-zinc-600/30",
    avatarGlow: "from-zinc-400 to-zinc-700",
    badgeBg: "bg-zinc-800/50 text-zinc-300 border-zinc-600/40",
    btnBg: "bg-zinc-800 hover:bg-zinc-700 shadow-zinc-700/40 border border-zinc-500/50",
    focusBorder: "focus:border-zinc-400",
    accentColor: "accent-zinc-500",
  },
  aurora: {
    bg: "from-slate-950 via-teal-950/70 to-purple-950/70",
    border: "border-teal-400/50 hover:border-purple-400 shadow-[0_0_20px_rgba(45,212,191,0.25)]",
    accent: "text-teal-300",
    glow: "bg-teal-500/30",
    avatarGlow: "from-teal-400 to-purple-500",
    badgeBg: "bg-teal-500/10 text-teal-300 border-teal-400/30",
    btnBg: "bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 shadow-teal-500/30",
    focusBorder: "focus:border-teal-400",
    accentColor: "accent-teal-500",
  },
  cyber: {
    bg: "from-slate-950 via-yellow-950/50 to-slate-950",
    border: "border-yellow-500/60 hover:border-cyan-400 shadow-[0_0_20px_rgba(234,179,8,0.3)]",
    accent: "text-yellow-400",
    glow: "bg-yellow-500/30",
    avatarGlow: "from-yellow-400 to-cyan-400",
    badgeBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    btnBg: "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold shadow-yellow-500/40",
    focusBorder: "focus:border-yellow-400",
    accentColor: "accent-yellow-500",
  },
  monochrome: {
    bg: "from-neutral-900 via-neutral-950 to-neutral-900",
    border: "border-neutral-500/60 hover:border-neutral-300 shadow-[0_0_20px_rgba(115,115,115,0.25)]",
    accent: "text-neutral-100",
    glow: "bg-neutral-500/25",
    avatarGlow: "from-neutral-300 to-neutral-600",
    badgeBg: "bg-neutral-800 text-neutral-200 border-neutral-600",
    btnBg: "bg-neutral-200 hover:bg-white text-neutral-950 font-bold shadow-neutral-500/30",
    focusBorder: "focus:border-neutral-300",
    accentColor: "accent-neutral-400",
  },
  coffee: {
    bg: "from-stone-950 via-stone-900 to-stone-950",
    border: "border-amber-600/50 hover:border-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.25)]",
    accent: "text-amber-200",
    glow: "bg-amber-700/30",
    avatarGlow: "from-amber-600 to-stone-500",
    badgeBg: "bg-amber-900/30 text-amber-200 border-amber-700/40",
    btnBg: "bg-amber-800 hover:bg-amber-700 shadow-amber-900/40",
    focusBorder: "focus:border-amber-500",
    accentColor: "accent-amber-600",
  }
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [savedAuth, setSavedAuth] = useState({ username: '', password: '' });

  const [clientId, setClientId] = useState(() => Math.floor(10000 + Math.random() * 90000).toString());
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [theme, setTheme] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const [links, setLinks] = useState<Array<{ name: string; type: string; detail: string; url: string }>>([
    { name: '', type: '', detail: '', url: '' },
  ]);

  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [importStatus, setImportStatus] = useState('');

  const [currentThemeStyle, setCurrentThemeStyle] = useState(themeStyles.amber);

  useEffect(() => {
    const keys = Object.keys(themeStyles);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setCurrentThemeStyle(themeStyles[randomKey]);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setSavedAuth({ username, password });
      setIsAuthenticated(true);
    }
  };

  const addLinkField = () => {
    setLinks([...links, { name: '', type: '', detail: '', url: '' }]);
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
    setStatusMsg('Publishing to GitHub...');

    const clientPayload = {
      name,
      subtitle,
      theme,
      isLocked,
      ...(isLocked ? { pinCode } : {}),
      links: links.filter((l) => l.name && l.url),
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
        setStatusMsg('✅ Success! Client profile saved to clients.json.');
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
        const jsonContent = JSON.parse(event.target?.result as string);
        const importedClientId = jsonContent.clientId || Math.floor(10000 + Math.random() * 90000).toString();
        const clientData = jsonContent.clientData || jsonContent;

        setImportStatus('Uploading imported file to GitHub...');

        const res = await fetch('/api/admin/client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: savedAuth.username,
            password: savedAuth.password,
            clientId: importedClientId,
            clientData,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          setImportStatus(`✅ Success! Imported client ID [${importedClientId}] saved.`);
        } else {
          setImportStatus(`❌ Import Error: ${data.error}`);
        }
      } catch (err) {
        setImportStatus('❌ Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <main className={`min-h-screen w-full bg-gradient-to-br ${currentThemeStyle.bg} text-white flex items-center justify-center p-4 relative overflow-hidden transition-all duration-700`}>
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className={`absolute -top-40 -left-40 w-[500px] h-[500px] ${currentThemeStyle.glow} rounded-full blur-[120px] pointer-events-none animate-pulse`}></div>
        <div className={`absolute -bottom-40 -right-40 w-[500px] h-[500px] ${currentThemeStyle.glow} rounded-full blur-[120px] pointer-events-none animate-pulse`}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/10 via-transparent to-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={`bg-slate-900/95 backdrop-blur-2xl border ${currentThemeStyle.border} p-8 rounded-3xl w-full max-w-md space-y-6 shadow-2xl relative z-10 transition-all`}>
          <h1 className={`text-2xl font-extrabold text-center ${currentThemeStyle.accent} tracking-wide`}>Mitsu Admin Access</h1>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white mt-1 text-sm focus:outline-none ${currentThemeStyle.focusBorder}`}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white mt-1 text-sm focus:outline-none ${currentThemeStyle.focusBorder}`}
              required
            />
          </div>
          <button type="submit" className={`w-full ${currentThemeStyle.btnBg} font-bold py-3.5 rounded-xl text-sm transition shadow-lg`}>
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className={`min-h-screen w-full bg-gradient-to-br ${currentThemeStyle.bg} text-white p-4 relative overflow-hidden transition-all duration-700`}>
      {/* Dynamic Background Elements: Grid Lines, Glowing Orbs & Noise */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className={`absolute top-0 -left-20 w-96 h-96 ${currentThemeStyle.glow} rounded-full blur-[100px] pointer-events-none animate-pulse`}></div>
      <div className={`absolute bottom-10 -right-20 w-96 h-96 ${currentThemeStyle.glow} rounded-full blur-[100px] pointer-events-none animate-pulse`}></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h1 className={`text-xl font-bold ${currentThemeStyle.accent} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>Mitsu Admin Dashboard</h1>
          <button onClick={() => setIsAuthenticated(false)} className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/30 transition border border-red-500/30">
            Logout
          </button>
        </div>

        {statusMsg && (
          <div className="p-3 bg-slate-900/90 border border-slate-700 text-sm rounded font-medium shadow-lg backdrop-blur">
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`space-y-4 bg-slate-900/90 backdrop-blur-2xl border ${currentThemeStyle.border} p-6 rounded-2xl shadow-2xl transition-all`}>
          <div>
            <label className="text-xs font-semibold text-slate-300">Client ID / Slug (Auto-generated & Locked)</label>
            <input
              type="text"
              value={clientId}
              disabled
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded p-2 text-slate-400 mt-1 text-sm cursor-not-allowed select-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm focus:outline-none ${currentThemeStyle.focusBorder}`}
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300">Subtitle / Role</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className={`w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm focus:outline-none ${currentThemeStyle.focusBorder}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Theme</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className={`w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm focus:outline-none ${currentThemeStyle.focusBorder}`}
                placeholder="e.g., sky, emerald"
                required
              />
            </div>
            <div className="flex items-center space-x-3 pt-6">
              <input
                type="checkbox"
                id="isLocked"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
                className={`w-4 h-4 ${currentThemeStyle.accentColor} cursor-pointer`}
              />
              <label htmlFor="isLocked" className="text-xs font-semibold text-slate-300 cursor-pointer">
                Is Locked (Require PIN)
              </label>
            </div>
          </div>

          {isLocked && (
            <div>
              <label className="text-xs font-semibold text-slate-300">PIN Code (Max 4 Digits)</label>
              <input
                type="text"
                maxLength={4}
                value={pinCode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setPinCode(val);
                }}
                className={`w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm focus:outline-none ${currentThemeStyle.focusBorder}`}
                placeholder="1234"
                required
              />
            </div>
          )}

          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold text-slate-300 block">Links</label>
            {links.map((link, idx) => (
              <div key={idx} className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-2 text-xs shadow-inner">
                <div className="flex justify-between items-center">
                  <span className={`font-bold ${currentThemeStyle.accent}`}>Link #{idx + 1}</span>
                  {links.length > 1 && (
                    <button type="button" onClick={() => removeLinkField(idx)} className="text-red-400 hover:underline">
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={link.name}
                    onChange={(e) => updateLink(idx, 'name', e.target.value)}
                    className={`bg-slate-900 border border-slate-800 rounded p-1.5 text-white focus:outline-none ${currentThemeStyle.focusBorder}`}
                  />
                  <input
                    type="text"
                    placeholder="Type"
                    value={link.type}
                    onChange={(e) => updateLink(idx, 'type', e.target.value)}
                    className={`bg-slate-900 border border-slate-800 rounded p-1.5 text-white focus:outline-none ${currentThemeStyle.focusBorder}`}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Detail (e.g., @username)"
                  value={link.detail}
                  onChange={(e) => updateLink(idx, 'detail', e.target.value)}
                  className={`w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white focus:outline-none ${currentThemeStyle.focusBorder}`}
                />
                <input
                  type="text"
                  placeholder="URL (https://...)"
                  value={link.url}
                  onChange={(e) => updateLink(idx, 'url', e.target.value)}
                  className={`w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white focus:outline-none ${currentThemeStyle.focusBorder}`}
                />
              </div>
            ))}
            <button type="button" onClick={addLinkField} className={`text-xs ${currentThemeStyle.accent} hover:underline block font-medium`}>
              + Add Link
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${currentThemeStyle.btnBg} disabled:bg-slate-700 text-sm font-bold py-3 rounded-xl text-black transition mt-4 shadow-xl`}
          >
            {loading ? 'Saving to clients.json...' : 'Save & Publish Customer Card'}
          </button>
        </form>

        {/* 📂 JSON Import Section */}
        <div className={`bg-slate-900/90 backdrop-blur-2xl border ${currentThemeStyle.border} p-6 rounded-2xl shadow-2xl space-y-3 transition-all`}>
          <h3 className={`text-sm font-bold ${currentThemeStyle.accent}`}>📂 Import Client JSON File</h3>
          <p className="text-xs text-slate-400">Upload a client .json file to directly add it to `clients.json`.</p>
          
          <input
            type="file"
            accept=".json"
            onChange={handleJsonFileUpload}
            className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
          />

          {importStatus && (
            <div className="p-2.5 bg-slate-950 border border-slate-800 text-xs rounded-lg font-medium text-slate-300">
              {importStatus}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}