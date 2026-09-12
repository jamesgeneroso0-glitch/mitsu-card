'use client';
import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, ExternalLink, Smartphone } from 'lucide-react';

export default function PaymentPage() {
  const [cardData, setCardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pending_mitsu_card');
    if (saved) {
      setCardData(JSON.parse(saved));
    }
  }, []);

  const handlePayMongoCheckout = async () => {
    if (!cardData) return;
    setIsLoading(true);

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientData }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        localStorage.setItem('active_checkout_id', cardData.clientId);
        window.location.href = data.checkoutUrl;
      } else {
        alert('Error initiating checkout. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      alert('Connection error occurred.');
      setIsLoading(false);
    }
  };

  if (!cardData) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl flex flex-col items-center transform transition-all duration-300">
          <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles size={24} className="animate-pulse" />
          </div>
          <h1 className="text-xl font-bold mb-2 tracking-tight">No Preview Card Found</h1>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">Please customize your card first in the client portal before checking out.</p>
          <a 
            href="/client-portal" 
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
          >
            <span>Go to Client Portal</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden antialiased">
      {/* Background Decorative Glow (GPU Accelerated) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute w-[280px] h-[280px] bg-indigo-600/20 rounded-full blur-3xl opacity-50 pointer-events-none transform-gpu animate-pulse" />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 rounded-3xl shadow-2xl text-center relative z-10 transition-all duration-300">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4 tracking-wide">
          <Sparkles size={13} className="animate-spin" style={{ animationDuration: '4s' }} /> Secure Automated Checkout
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">Mitsu Smart Card</h1>
        <p className="text-slate-400 text-sm mb-6">
          Package Total: <span className="text-indigo-400 font-bold text-base">₱499</span>
        </p>

        {/* Live Preview Card Mini Container */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 mb-6 flex items-center gap-3 text-left">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-lg font-bold shadow-md shrink-0 overflow-hidden">
            {cardData.avatarUrl ? (
              <img src={cardData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span>{cardData.name?.[0] || 'M'}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white truncate">{cardData.name}</h3>
            <p className="text-xs text-indigo-400 font-medium truncate">{cardData.subtitle || 'Digital Profile'}</p>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium shrink-0">
            Ready
          </span>
        </div>

        {/* Lag-Free Mobile-Optimized Button */}
        <button
          onClick={handlePayMongoCheckout}
          disabled={isLoading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] transition-all duration-150 ease-out text-white font-bold rounded-2xl shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transform-gpu"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Redirecting to GCash...</span>
            </div>
          ) : (
            <>
              <Smartphone size={18} className="text-blue-200" />
              <span>Pay ₱499 via GCash</span>
              <ExternalLink size={16} className="text-blue-200 ml-0.5" />
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 mt-4 flex items-center justify-center gap-1.5">
          <ShieldCheck size={13} className="text-emerald-400" /> Powered by PayMongo Secure Gateway
        </p>
      </div>
    </main>
  );
}