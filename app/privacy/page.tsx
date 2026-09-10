'use client';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">Legal Documentation</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5">Privacy Policy</h1>
            <p className="text-xs text-slate-400 mt-0.5">Last updated: September 2026</p>
          </div>
        </div>

        <hr className="border-slate-800 mb-6" />

        <div className="space-y-5 text-sm text-slate-300 leading-relaxed">
          <div>
            <h3 className="font-bold text-white text-base mb-1">1. Information We Collect</h3>
            <p>
              To provide you with a personalized digital business card, we collect the information you voluntarily provide through our client portal. This includes:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400 pl-2">
              <li>Your full name and professional subtitle/role.</li>
              <li>Contact details and information links (social media accounts, websites, etc.).</li>
              <li>Personal details such as hobbies or custom descriptions you choose to input.</li>
              <li>Media files uploaded by you, including profile pictures and banner images.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-1">2. How We Use Your Information</h3>
            <p>
              The data collected is used solely to generate, display, and maintain your customized digital profile page, making it easier for others to discover and connect with you via a single professional link.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-1">3. Data Security & Privacy Controls</h3>
            <p>
              We implement standard security practices to protect your data. Additionally, we provide built-in privacy features such as a <strong className="text-white">Card Lock / PIN Code system</strong>, giving you direct control over who can view your private profile details.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}