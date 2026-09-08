'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Permanent storage ng credentials para hindi mawala pagkatapos mag-login
  const [savedAuth, setSavedAuth] = useState({ username: '', password: '' });

  const [clientId, setClientId] = useState('');
  const [name, setName] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [theme, setTheme] = useState('amber');
  const [isLocked, setIsLocked] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const [links, setLinks] = useState<Array<{ name: string; type: string; detail: string; url: string }>>([
    { name: 'Instagram', type: 'instagram', detail: '', url: '' },
  ]);

  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setSavedAuth({ username, password });
      setIsAuthenticated(true);
    }
  };

  const addLinkField = () => {
    setLinks([...links, { name: '', type: 'social', detail: '', url: '' }]);
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

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 p-6 rounded-xl w-full max-w-sm space-y-4">
          <h1 className="text-xl font-bold text-center text-amber-400">Mitsu Admin Access</h1>
          <div>
            <label className="text-xs text-slate-400">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs text-slate-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm"
              required
            />
          </div>
          <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 font-bold py-2 rounded text-sm transition text-black">
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 max-w-xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h1 className="text-xl font-bold text-amber-400">Mitsu Admin Dashboard</h1>
        <button onClick={() => setIsAuthenticated(false)} className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded">
          Logout
        </button>
      </div>

      {statusMsg && (
        <div className="p-3 bg-slate-900 border border-slate-700 text-sm rounded font-medium">
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <div>
          <label className="text-xs font-semibold text-slate-300">Client ID / Slug (e.g., 61112)</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-300">Subtitle / Role</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm"
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
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm"
              placeholder="amber, sky, etc."
              required
            />
          </div>
          <div className="flex items-center space-x-3 pt-6">
            <input
              type="checkbox"
              id="isLocked"
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
              className="w-4 h-4 accent-amber-500"
            />
            <label htmlFor="isLocked" className="text-xs font-semibold text-slate-300 cursor-pointer">
              Is Locked (Require PIN)
            </label>
          </div>
        </div>

        {isLocked && (
          <div>
            <label className="text-xs font-semibold text-slate-300">PIN Code</label>
            <input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white mt-1 text-sm"
              placeholder="1234"
              required
            />
          </div>
        )}

        <div className="space-y-3 pt-2">
          <label className="text-xs font-semibold text-slate-300 block">Links</label>
          {links.map((link, idx) => (
            <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-400">Link #{idx + 1}</span>
                {links.length > 1 && (
                  <button type="button" onClick={() => removeLinkField(idx)} className="text-red-400 hover:underline">
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Name (e.g., Instagram)"
                  value={link.name}
                  onChange={(e) => updateLink(idx, 'name', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                />
                <input
                  type="text"
                  placeholder="Type (e.g., instagram)"
                  value={link.type}
                  onChange={(e) => updateLink(idx, 'type', e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
                />
              </div>
              <input
                type="text"
                placeholder="Detail (e.g., @mitsu.jv)"
                value={link.detail}
                onChange={(e) => updateLink(idx, 'detail', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
              />
              <input
                type="text"
                placeholder="URL (https://...)"
                value={link.url}
                onChange={(e) => updateLink(idx, 'url', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white"
              />
            </div>
          ))}
          <button type="button" onClick={addLinkField} className="text-xs text-amber-400 hover:underline">
            + Add Link
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 text-sm font-bold py-2.5 rounded-lg text-black transition mt-4"
        >
          {loading ? 'Saving to clients.json...' : 'Save & Publish Customer Card'}
        </button>
      </form>
    </main>
  );
}