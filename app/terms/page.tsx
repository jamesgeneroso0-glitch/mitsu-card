'use client';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-3xl bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/30">
            <FileText size={24} />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">User Agreement</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-0.5">Terms & Conditions</h1>
            <p className="text-xs text-slate-400 mt-0.5">Please read these terms carefully before using our platform.</p>
          </div>
        </div>

        <hr className="border-slate-800 mb-6" />

        <div className="space-y-5 text-sm text-slate-300 leading-relaxed">
          <div>
            <h3 className="font-bold text-white text-base mb-1">1. Purpose of the Platform</h3>
            <p>
              This platform acts as a digital card generator tool designed to provide users with a clean, personalized, and professional link that they can easily attach to their social bios for easier public reach and networking.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-1">2. User Generated Content & Full Responsibility</h3>
            <p>
              Users have complete control and autonomy in creating, inputting, and managing their own information via the client portal. 
            </p>
            <p className="mt-2">
              You are solely responsible for all content, images, and links you publish. If inappropriate, offensive, or malicious content is uploaded, <strong className="text-white">you bear full responsibility and accountability for your online image and reputation</strong>. The platform developer acts only as a technical provider and holds no liability for user-generated content.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white text-base mb-1">3. Privacy and Data Control (Card Lock Feature)</h3>
            <p>
              We provide security features such as a PIN lock mechanism to safeguard your profile. However, we do not have absolute control over how third parties handle information once exposed. Users are advised to utilize privacy features responsibly to protect sensitive data.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}