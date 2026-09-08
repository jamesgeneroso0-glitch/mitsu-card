'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Form states
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Pakilagay ang username at password.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-user': username,
          'x-admin-pass': password,
        },
        body: JSON.stringify({
          slug,
          data: {
            name,
            title,
            bio,
            phone,
            email,
            socials: { facebook, instagram, linkedin },
          },
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setStatusMsg('Successfully saved and updated to GitHub!');
      } else {
        setStatusMsg('Error: ' + (result.error || 'Failed to save'));
      }
    } catch (err: any) {
      setStatusMsg('Error saving card: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h1 className="text-xl font-bold mb-4 text-center text-gray-800">Mitsu Admin Login</h1>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1 text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1 text-black"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 max-w-2xl mx-auto text-black">
      <h1 className="text-2xl font-bold mb-6">Mitsu Smart Card - Client Manager</h1>
      
      {statusMsg && (
        <div className={`p-4 mb-4 rounded ${statusMsg.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block text-sm font-medium">Card Slug / URL Name (e.g. juan-dela-cruz)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            placeholder="juan-dela-cruz"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Job Title / Role</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            />
          </div>
        </div>

        <h3 className="font-semibold pt-2">Social Links</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Facebook URL"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Instagram URL"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50 mt-4"
        >
          {loading ? 'Saving & Publishing...' : 'Save & Publish Customer Card'}
        </button>
      </form>
    </div>
  );
}