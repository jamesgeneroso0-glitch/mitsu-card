'use client';
import { useState, useEffect } from 'react';
import { User, MessageCircle, Globe, Gamepad2, Swords, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

const plainTheme = {
  bg: "from-slate-900 via-slate-900 to-slate-950",
  border: "border-slate-800 hover:border-slate-700",
  accent: "text-slate-400",
  avatarGlow: "from-slate-700 to-slate-800",
};

const themeStyles: Record<string, any> = {
  indigo: { bg: "from-slate-950 via-indigo-950/90 to-slate-950", border: "border-indigo-500/40", accent: "text-indigo-400", avatarGlow: "from-indigo-500 to-blue-500" },
  midnight: { bg: "from-slate-950 via-purple-950/90 to-slate-950", border: "border-purple-500/40", accent: "text-purple-400", avatarGlow: "from-purple-500 to-pink-500" },
  emerald: { bg: "from-slate-950 via-emerald-950/90 to-slate-950", border: "border-emerald-500/40", accent: "text-emerald-400", avatarGlow: "from-emerald-500 to-teal-500" },
  rose: { bg: "from-slate-950 via-rose-950/90 to-slate-950", border: "border-rose-500/40", accent: "text-rose-400", avatarGlow: "from-rose-500 to-pink-500" },
  obsidian: { bg: "from-black via-zinc-950 to-black", border: "border-zinc-600/50", accent: "text-zinc-200", avatarGlow: "from-zinc-400 to-zinc-700" },
};

const getIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'instagram': return <User size={16} className="text-pink-400" />;
    case 'facebook': return <MessageCircle size={16} className="text-blue-400" />;
    case 'tiktok': return <Globe size={16} className="text-cyan-400" />;
    case 'valorant': return <Gamepad2 size={16} className="text-red-400" />;
    case 'league of legends':
    case 'lol': return <Swords size={16} className="text-amber-400" />;
    default: return <ExternalLink size={16} className="text-slate-400" />;
  }
};

export default function PaymentPage() {
  const [cardData, setCardData] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<'gcash' | 'paypal' | null>(null);
  const [refNumber, setRefNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('pending_mitsu_card');
    if (saved) {
      setCardData(JSON.parse(saved));
    }
  }, []);

  const currentTheme = (cardData?.theme && themeStyles[cardData.theme]) ? themeStyles[cardData.theme] : plainTheme;

  const handleGcashRedirect = () => {
    setSelectedMethod('gcash');
    // Replace with your actual GCash link, QR link, or web portal
    const gcashWebLink = "https://m.gcash.com/"; 
    window.open(gcashWebLink, '_blank');
  };

  const handlePaypalRedirect = () => {
    setSelectedMethod('paypal');
    // Replace with your actual PayPal.me link (e.g. https://paypal.me/yourusername/499PHP)
    const paypalMeLink = "https://paypal.me/"; 
    window.open(paypalMeLink, '_blank');
  };

  const handleVerifyAndPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardData) return;
    setIsVerifying(true);

    setTimeout(async () => {
      try {
        const response = await fetch('/api/admin/client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId: cardData.clientId, clientData: cardData }),
        });

        if (response.ok) {
          setIsVerifying(false);
          setIsPublished(true);
          localStorage.removeItem('pending_mitsu_card');
        } else {
          alert('Publishing failed. Please check server logs.');
          setIsVerifying(false);
        }
      } catch (err) {
        alert('Connection error occurred.');
        setIsVerifying(false);
      }
    }, 2000);
  };

  if (isPublished) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-slate-900 border border-emerald-500/30 p-8 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
          <h1 className="text-2xl font-bold mb-2">Payment Verified & Published!</h1>
          <p className="text-slate-400 text-sm mb-6">Your payment has been successfully confirmed. Your Mitsu Smart Card is now live[cite: 1]!</p>
          <a href={`/${cardData?.clientId || ''}`} className="inline-block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all">
            View My Live Card 🚀
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-4xl text-center mb-8 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-2">
          <Sparkles size={14} /> Secure Checkout
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold">Your customized preview card will be ready in just a few minutes!</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">Review your preview card below and click GCash or PayPal to proceed with direct payment[cite: 1].</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative z-10">
        
        {/* LEFT COLUMN: EXACT LIVE PREVIEW CARD */}
        <div className="flex flex-col items-center bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-bold mb-4 flex items-center gap-1.5">
            <Sparkles size={14} /> Your Live Preview Card
          </h2>

          {cardData ? (
            <div className={`w-full max-w-[300px] bg-gradient-to-b ${currentTheme.bg} border-2 ${currentTheme.border} rounded-3xl text-center shadow-2xl relative overflow-hidden backdrop-blur-md`}>
              <div className="w-full h-24 relative overflow-hidden bg-slate-950 border-b border-white/10 flex items-start justify-between p-3">
                {cardData.bannerUrl ? (
                  <img src={cardData.bannerUrl} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.avatarGlow} opacity-40`} />
                )}
                <div className="relative z-10 text-[10px] bg-slate-900/90 px-2 py-0.5 rounded-full text-slate-200">
                  {cardData.isLocked ? '🔒 Locked' : '🔓 Unlocked'}
                </div>
              </div>

              <div className="p-4 pt-0 relative">
                <div className={`relative -mt-10 w-20 h-20 rounded-full bg-gradient-to-tr ${currentTheme.avatarGlow} mx-auto mb-2 flex items-center justify-center text-xl font-bold text-white shadow-xl ring-4 ring-slate-900 overflow-hidden`}>
                  {cardData.avatarUrl ? (
                    <img src={cardData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span>{cardData.name?.[0] || 'M'}</span>
                  )}
                </div>

                <h1 className="text-base font-bold text-white">{cardData.name}</h1>
                <p className={`text-xs font-semibold ${currentTheme.accent}`}>{cardData.subtitle}</p>

                <div className="mt-3 flex flex-col gap-2 text-left">
                  {cardData.links?.map((l: any, i: number) => (
                    <div key={i} className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-white flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center shrink-0">
                          {getIcon(l.name)}
                        </div>
                        <div className="truncate">
                          <div className="font-semibold">{l.name}</div>
                          <div className="text-[10px] text-slate-400">{l.detail}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-10">No card data found. Please customize your card first in the Client Portal.</p>
          )}
        </div>

        {/* RIGHT COLUMN: DIRECT PAYMENT BUTTONS & REDIRECT */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Package Total</h2>
            <span className="text-xl font-black text-indigo-400">₱499</span>
          </div>
          <p className="text-xs text-slate-400 mb-6">Click your preferred payment option to redirect directly to GCash or PayPal[cite: 1].</p>

          <div className="flex flex-col gap-3 mb-6">
            <button 
              type="button"
              onClick={handleGcashRedirect}
              className={`w-full p-4 rounded-xl font-semibold flex items-center justify-between transition-all cursor-pointer ${
                selectedMethod === 'gcash' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 text-blue-300'
              }`}
            >
              <span className="flex items-center gap-2">📱 Pay via GCash (₱499)</span>
              <span className="text-xs underline">Open GCash ↗</span>
            </button>

            <button 
              type="button"
              onClick={handlePaypalRedirect}
              className={`w-full p-4 rounded-xl font-semibold flex items-center justify-between transition-all cursor-pointer ${
                selectedMethod === 'paypal' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' : 'bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300'
              }`}
            >
              <span className="flex items-center gap-2">💳 Pay via PayPal (₱499)</span>
              <span className="text-xs underline">Open PayPal ↗</span>
            </button>
          </div>

          {selectedMethod && (
            <form onSubmit={handleVerifyAndPublish} className="flex flex-col gap-4 border-t border-slate-800 pt-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Enter your GCash/PayPal Reference No. or Transaction ID:</label>
                <input 
                  type="text" 
                  value={refNumber} 
                  onChange={(e) => setRefNumber(e.target.value)} 
                  placeholder="e.g. 1029384756" 
                  required 
                  className="w-full px-3 py-2 mt-1 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <button 
                type="submit" 
                disabled={isVerifying}
                className="w-full py-3 bg-white text-black font-bold rounded-xl text-sm transition-all hover:bg-slate-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>Verifying Payment & Publishing...</>
                ) : (
                  <>
                    <ShieldCheck size={16} /> Confirm Payment & Publish Card[cite: 1]
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </main>
  );
}