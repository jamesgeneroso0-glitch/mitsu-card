'use client';
import { useState } from 'react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function SupportPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    // Dito mo ikakabit ang API/Email service (tulad ng EmailJS o backend route) na nakakonekta sa bagong support Gmail mo.
    setTimeout(() => {
      setLoading(false);
      setStatus('Success! Your message has been sent to our support team.');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <Mail size={24} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Get in Touch</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5">Contact Support</h1>
            <p className="text-xs text-slate-400 mt-0.5">Have questions or need assistance? Reach out to our dedicated support team.</p>
          </div>
        </div>

        <hr className="border-slate-800 mb-6" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {status && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-slate-300">Your Email Address:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. name@example.com"
              required
              className="w-full px-3.5 py-2.5 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-white text-sm outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300">Message / Concern:</label>
            <textarea 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your inquiry or issue here..."
              required
              className="w-full px-3.5 py-2.5 mt-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-white text-sm outline-none transition-all resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

      </div>
    </div>
  );
}