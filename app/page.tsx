import Link from 'next/link';
import { Sparkles, CreditCard, Share2, Smartphone, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-between p-6 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-2xl text-center mt-16 relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium mb-6">
          <Sparkles size={14} className="animate-pulse" /> Next-Gen NFC Smart Cards
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 mb-4">
          Connect effortlessly with <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Mitsu Card</span>
        </h1>
        
        <p className="text-slate-400 text-base sm:text-lg mb-8 max-w-lg">
          Share your socials, portfolio, contact details, and gaming profiles with just a single tap.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link 
            href="/00001" 
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-purple-500/25"
          >
            View Sample Card <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full my-12 relative z-10">
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
          <Smartphone size={24} className="text-purple-400 mx-auto mb-2" />
          <h3 className="font-semibold text-sm text-slate-200">One Tap Share</h3>
          <p className="text-xs text-slate-400 mt-1">Works instantly on iOS & Android without any extra app.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
          <CreditCard size={24} className="text-pink-400 mx-auto mb-2" />
          <h3 className="font-semibold text-sm text-slate-200">Custom Designs</h3>
          <p className="text-xs text-slate-400 mt-1">Personalized layout matched with your unique digital profile.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-center">
          <Share2 size={24} className="text-cyan-400 mx-auto mb-2" />
          <h3 className="font-semibold text-sm text-slate-200">Update Anytime</h3>
          <p className="text-xs text-slate-400 mt-1">Change your links anytime without reprinting your physical card.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center relative z-10 mb-4">
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} Mitsu Smart Card. All rights reserved.</p>
      </footer>
    </main>
  );
}