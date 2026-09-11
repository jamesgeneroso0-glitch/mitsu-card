'use client';
import { useState, useEffect } from 'react';
import { User, MessageCircle, Globe, Gamepad2, Swords, HardDrive, Briefcase, Palette, Video, Music, AtSign, X, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

const plainTheme = {
  bg: "from-slate-900 via-slate-900 to-slate-950",
  border: "border-slate-800 hover:border-slate-700",
  accent: "text-slate-400",
  glow: "bg-slate-800/10",
  avatarGlow: "from-slate-700 to-slate-800",
  btnBg: "bg-slate-800 text-slate-300",
};

const themeStyles: Record<string, any> = {
  indigo: { bg: "from-slate-950 via-indigo-950/90 to-slate-950", border: "border-indigo-500/40", accent: "text-indigo-400", glow: "bg-indigo-600/30", avatarGlow: "from-indigo-500 to-blue-500", btnBg: "bg-indigo-600 text-white" },
  midnight: { bg: "from-slate-950 via-purple-950/90 to-slate-950", border: "border-purple-500/40", accent: "text-purple-400", glow: "bg-purple-600/30", avatarGlow: "from-purple-500 to-pink-500", btnBg: "bg-purple-600 text-white" },
  emerald: { bg: "from-slate-950 via-emerald-950/90 to-slate-950", border: "border-emerald-500/40", accent: "text-emerald-400", glow: "bg-emerald-600/30", avatarGlow: "from-emerald-500 to-teal-500", btnBg: "bg-emerald-600 text-white" },
  rose: { bg: "from-slate-950 via-rose-950/90 to-slate-950", border: "border-rose-500/40", accent: "text-rose-400", glow: "bg-rose-600/30", avatarGlow: "from-rose-500 to-pink-500", btnBg: "bg-rose-600 text-white" },
  obsidian: { bg: "from-black via-zinc-950 to-black", border: "border-zinc-600/50", accent: "text-zinc-200", glow: "bg-zinc-500/30", avatarGlow: "from-zinc-400 to-zinc-700", btnBg: "bg-zinc-800 text-white" },
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

  const handleVerifyAndPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) return;
    setIsVerifying(true);

    // Simulate verification process (Dito mo ikakabit ang API call para i-save sa database at i-publish ang card)
    setTimeout(async () => {
      try {
        // Pwede mong i-send dito ang cardData at payment reference sa backend API mo
        await fetch('/api/admin/client', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId: cardData.clientId, clientData }),
        });

        setIsVerifying(false);
        setIsPublished(true);
        localStorage.removeItem('pending_mitsu_card'); // Clear temporary data
      } catch (err) {
        alert('Verification failed. Please try again.');
        setIsVerifying(false);
      }
    }, 2000);
  };

  if (isPublished) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-slate-900 border border-emerald-500/30 p-8 rounded-2xl shadow-2xl">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
          <h1 className="text-2xl font-bold mb-2">Payment Verified & Published!</h1>
          <p className="text-slate-400 text-sm mb-6">Matagumpay na nakumpirma ang iyong bayad. Live na ngayon ang iyong Mitsu Smart Card!</p>
          <a href={`/card/${cardData?.clientId || ''}`} className="inline-block w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all">
            View My Live Card 🚀
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* LEFT COLUMN: LIVE PREVIEW CARD NG CLIENT */}
        <div className="flex flex-col items-center bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
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
            <p className="text-sm text-slate-400">No card data found. Please complete the client portal form first.</p>
          )}
        </div>

        {/* RIGHT COLUMN: PAYMENT OPTIONS & VERIFICATION */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800">
          <h2 className="text-xl font-bold mb-1">Complete Payment</h2>
          <p className="text-xs text-slate-400 mb-6">Pumili ng paraan ng pagbabayad upang ma-publish ang iyong smart card (₱499 package fee).</p>

          {!selectedMethod ? (
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setSelectedMethod('gcash')} 
                className="w-full p-4 bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/30 rounded-xl font-semibold flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">📱 Pay via GCash (₱499)</span>
                <span className="text-xs text-blue-400">Select →</span>
              </button>

              <button 
                onClick={() => setSelectedMethod('paypal')} 
                className="w-full p-4 bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 rounded-xl font-semibold flex items-center justify-between transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">💳 Pay via PayPal (₱499)</span>
                <span className="text-xs text-indigo-400">Select →</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerifyAndPublish} className="flex flex-col gap-4">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-sm">
                <span className="text-slate-400">Selected Method:</span>
                <span className="font-bold uppercase text-indigo-400">{selectedMethod}</span>
                <button type="button" onClick={() => setSelectedMethod(null)} className="text-xs text-slate-500 underline">Change</button>
              </div>

              {selectedMethod === 'gcash' && (
                <div className="p-3 bg-blue-950/30 border border-blue-500/20 rounded-xl text-xs text-slate-300">
                  <p className="font-semibold text-blue-400 mb-1">GCash Instructions:</p>
                  <p>1. Mag-transfer ng ₱499 sa GCash: <strong>09XXXXXXXXX (Mitsu Card)</strong></p>
                  <p>2. Ilagay sa ibaba ang Reference Number pagkatapos magbayad.</p>
                </div>
              )}

              {selectedMethod === 'paypal' && (
                <div className="p-3 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs text-slate-300">
                  <p className="font-semibold text-indigo-400 mb-1">PayPal Instructions:</p>
                  <p>I-click ang verification pagkatapos makumpleto ang secure PayPal transaction.</p>
                </div>
              )}

              <div>
                <label className="text-xs font-medium text-slate-300">Reference No. / Transaction ID:</label>
                <input 
                  type="text" 
                  value={refNumber} 
                  onChange={(e) => setRefNumber(e.target.value)} 
                  placeholder="Hal. 1029384756" 
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
                  <>Verifying Payment...</>
                ) : (
                  <>
                    <ShieldCheck size={16} /> Verify & Publish Card
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}