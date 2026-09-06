import clientsData from '../../data/clients.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { 
  MessageCircle, 
  Gamepad2, 
  Music, 
  User, 
  Globe, 
  ExternalLink, 
  Sparkles,
  Briefcase,
  HardDrive,
  Palette,
  Video,
  AtSign,
  X,
  Swords
} from 'lucide-react';

// --- TypeScript Interfaces ---
interface LinkItem {
  name: string;
  type: string;
  detail: string;
  url: string;
}

interface ClientData {
  name: string;
  subtitle: string;
  theme: 'indigo' | 'midnight' | 'emerald' | 'rose';
  links: LinkItem[];
}

type Props = {
  params: Promise<{ id: string }>;
};

// Safe type casting for clients data
const clients = clientsData as Record<string, ClientData>;

// --- 0. Static Params Generation for Vercel Routing Fix ---
export async function generateStaticParams() {
  return Object.keys(clients).map((id) => ({
    id: id,
  }));
}

// --- 1. Dynamic SEO Metadata Generation ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const client = clients[resolvedParams.id];

  if (!client) {
    return {
      title: 'Card Not Found | Mitsu Smart Card',
    };
  }

  return {
    title: `${client.name} | Mitsu Smart Card`,
    description: client.subtitle || `Digital profile card of ${client.name}`,
    openGraph: {
      title: `${client.name} - Mitsu Smart Card`,
      description: client.subtitle || `Connect with ${client.name} via Mitsu Smart Card`,
    },
  };
}

// --- 2. Theme Styles ---
const themeStyles: Record<string, { bg: string; border: string; accent: string; badgeBg: string }> = {
  indigo: {
    bg: "from-slate-900 via-indigo-950 to-slate-900",
    border: "border-indigo-500/30",
    accent: "text-indigo-400",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
  },
  midnight: {
    bg: "from-slate-900 via-purple-950 to-slate-900",
    border: "border-purple-500/30",
    accent: "text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  emerald: {
    bg: "from-slate-900 via-emerald-950 to-slate-900",
    border: "border-emerald-500/30",
    accent: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
  },
  rose: {
    bg: "from-slate-900 via-rose-950 to-slate-900",
    border: "border-rose-500/30",
    accent: "text-rose-400",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  }
};

// --- 3. Icon Selector Helper ---
const getIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'instagram': return <User size={18} className="text-pink-400" />;
    case 'facebook': return <MessageCircle size={18} className="text-blue-400" />;
    case 'tiktok': return <Globe size={18} className="text-cyan-400" />;
    case 'valorant': return <Gamepad2 size={18} className="text-red-400" />;
    case 'league of legends':
    case 'lol': return <Swords size={18} className="text-amber-400" />;
    case 'steam': return <Gamepad2 size={18} className="text-indigo-400" />;
    case 'gdrive':
    case 'google drive': return <HardDrive size={18} className="text-yellow-400" />;
    case 'upwork': return <Briefcase size={18} className="text-emerald-400" />;
    case 'canva': return <Palette size={18} className="text-sky-400" />;
    case 'youtube': return <Video size={18} className="text-red-500" />;
    case 'spotify': return <Music size={18} className="text-green-400" />;
    case 'threads': return <AtSign size={18} className="text-slate-200" />;
    case 'x':
    case 'twitter': return <X size={18} className="text-sky-400" />;
    default: return <ExternalLink size={18} className="text-slate-400" />;
  }
};

// --- 4. Main Page Component ---
export default async function ClientProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const client = clients[resolvedParams.id];

  if (!client) {
    notFound();
  }

  // Uses client theme or defaults to midnight
  const theme = themeStyles[client.theme] || themeStyles.midnight;

  // Safe avatar initials logic
  const initials = client.name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Profile Card */}
      <div className={`w-full max-w-sm bg-gradient-to-br ${theme.bg} border ${theme.border} rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center backdrop-blur-xl relative z-10`}>
        
        {/* Verification Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs mb-5 ${theme.badgeBg}`}>
          <Sparkles size={14} className="animate-pulse" /> Verified Mitsu Smart Card
        </div>

        {/* Avatar / Initials */}
        <div className="w-20 h-20 rounded-full bg-slate-800/80 p-1 mb-4 shadow-inner flex items-center justify-center border border-slate-700/50">
          <span className={`text-2xl font-bold ${theme.accent}`}>
            {initials}
          </span>
        </div>

        {/* Name & Subtitle */}
        <h1 className="text-xl font-bold text-slate-100 mb-1">{client.name}</h1>
        <p className={`text-xs font-medium ${theme.accent} mb-6`}>{client.subtitle}</p>

        {/* Links Container */}
        <div className="w-full flex flex-col gap-3">
          {client.links.map((link: LinkItem, idx: number) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-800/80">
                  {getIcon(link.type)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {link.name}
                  </p>
                  <p className="text-xs text-slate-400">{link.detail}</p>
                </div>
              </div>
              <span className="text-slate-500 group-hover:text-slate-300 transition-colors text-xs font-medium">
                Visit →
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800/60 w-full text-center">
          <p className="text-[10px] text-slate-500 tracking-wider uppercase font-semibold">
            Powered by Mitsu Smart Card
          </p>
        </div>
      </div>
    </main>
  );
}