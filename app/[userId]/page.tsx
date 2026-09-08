import clientsData from '../../data/clients.json';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProfileCardClient from './ProfileCardClient';

interface LinkItem {
  name: string;
  type: string;
  detail: string;
  url: string;
}

interface ClientData {
  name: string;
  subtitle: string;
  theme: keyof typeof themeStyles;
  isLocked?: boolean;
  pinCode?: string;
  links: LinkItem[];
}

type Props = {
  params: Promise<{ userId: string }>;
};

const clients = clientsData as Record<string, ClientData>;

export async function generateStaticParams() {
  return Object.keys(clients).map((id) => ({
    userId: id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const client = clients[resolvedParams.userId];

  if (!client) {
    return { title: 'Card Not Found | Mitsu Smart Card' };
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

const themeStyles = {
  indigo: {
    bg: "from-slate-900/90 via-indigo-950/80 to-slate-900/90",
    border: "border-indigo-500/30 hover:border-indigo-500/50",
    accent: "text-indigo-400",
    glow: "bg-indigo-600/25",
    avatarGlow: "from-indigo-500 to-blue-500",
    badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25",
  },
  midnight: {
    bg: "from-slate-900/90 via-purple-950/80 to-slate-900/90",
    border: "border-purple-500/30 hover:border-purple-500/50",
    accent: "text-purple-400",
    glow: "bg-purple-600/25",
    avatarGlow: "from-purple-500 to-pink-500",
    badgeBg: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    btnBg: "bg-purple-600 hover:bg-purple-500 shadow-purple-500/25",
  },
  emerald: {
    bg: "from-slate-900/90 via-emerald-950/80 to-slate-900/90",
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    accent: "text-emerald-400",
    glow: "bg-emerald-600/25",
    avatarGlow: "from-emerald-500 to-teal-500",
    badgeBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    btnBg: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25",
  },
  rose: {
    bg: "from-slate-900/90 via-rose-950/80 to-slate-900/90",
    border: "border-rose-500/30 hover:border-rose-500/50",
    accent: "text-rose-400",
    glow: "bg-rose-600/25",
    avatarGlow: "from-rose-500 to-pink-500",
    badgeBg: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    btnBg: "bg-rose-600 hover:bg-rose-500 shadow-rose-500/25",
  },
  fuchsia: {
    bg: "from-slate-900/90 via-fuchsia-950/80 to-slate-900/90",
    border: "border-fuchsia-500/30 hover:border-fuchsia-500/50",
    accent: "text-fuchsia-400",
    glow: "bg-fuchsia-600/25",
    avatarGlow: "from-fuchsia-500 to-pink-500",
    badgeBg: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30",
    btnBg: "bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-500/25",
  },
  amber: {
    bg: "from-slate-900/90 via-amber-950/80 to-slate-900/90",
    border: "border-amber-500/30 hover:border-amber-500/50",
    accent: "text-amber-400",
    glow: "bg-amber-600/25",
    avatarGlow: "from-amber-500 to-orange-500",
    badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    btnBg: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/25",
  },
  cyan: {
    bg: "from-slate-900/90 via-cyan-950/80 to-slate-900/90",
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    accent: "text-cyan-400",
    glow: "bg-cyan-600/25",
    avatarGlow: "from-cyan-500 to-blue-500",
    badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    btnBg: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/25",
  },
  violet: {
    bg: "from-slate-900/90 via-violet-950/80 to-slate-900/90",
    border: "border-violet-500/30 hover:border-violet-500/50",
    accent: "text-violet-400",
    glow: "bg-violet-600/25",
    avatarGlow: "from-violet-500 to-purple-500",
    badgeBg: "bg-violet-500/10 text-violet-400 border-violet-500/30",
    btnBg: "bg-violet-600 hover:bg-violet-500 shadow-violet-500/25",
  },
  teal: {
    bg: "from-slate-900/90 via-teal-950/80 to-slate-900/90",
    border: "border-teal-500/30 hover:border-teal-500/50",
    accent: "text-teal-400",
    glow: "bg-teal-600/25",
    avatarGlow: "from-teal-500 to-emerald-500",
    badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
    btnBg: "bg-teal-600 hover:bg-teal-500 shadow-teal-500/25",
  },
  sky: {
    bg: "from-slate-900/90 via-sky-950/80 to-slate-900/90",
    border: "border-sky-500/30 hover:border-sky-500/50",
    accent: "text-sky-400",
    glow: "bg-sky-600/25",
    avatarGlow: "from-sky-500 to-indigo-500",
    badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    btnBg: "bg-sky-600 hover:bg-sky-500 shadow-sky-500/25",
  },
  orange: {
    bg: "from-slate-900/90 via-orange-950/80 to-slate-900/90",
    border: "border-orange-500/30 hover:border-orange-500/50",
    accent: "text-orange-400",
    glow: "bg-orange-600/25",
    avatarGlow: "from-orange-500 to-amber-500",
    badgeBg: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    btnBg: "bg-orange-600 hover:bg-orange-500 shadow-orange-500/25",
  },
  lime: {
    bg: "from-slate-900/90 via-lime-950/80 to-slate-900/90",
    border: "border-lime-500/30 hover:border-lime-500/50",
    accent: "text-lime-400",
    glow: "bg-lime-600/25",
    avatarGlow: "from-lime-500 to-emerald-500",
    badgeBg: "bg-lime-500/10 text-lime-400 border-lime-500/30",
    btnBg: "bg-lime-600 hover:bg-lime-500 shadow-lime-500/25",
  },
  blue: {
    bg: "from-slate-900/90 via-blue-950/80 to-slate-900/90",
    border: "border-blue-500/30 hover:border-blue-500/50",
    accent: "text-blue-400",
    glow: "bg-blue-600/25",
    avatarGlow: "from-blue-500 to-cyan-500",
    badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    btnBg: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/25",
  },
  sunset: {
    bg: "from-slate-900/90 via-red-950/80 to-slate-900/90",
    border: "border-red-500/30 hover:border-red-500/50",
    accent: "text-red-400",
    glow: "bg-red-600/25",
    avatarGlow: "from-red-500 to-rose-500",
    badgeBg: "bg-red-500/10 text-red-400 border-red-500/30",
    btnBg: "bg-red-600 hover:bg-red-500 shadow-red-500/25",
  },
  slate: {
    bg: "from-slate-950 via-slate-900 to-slate-950",
    border: "border-slate-600/40 hover:border-slate-500/60",
    accent: "text-slate-300",
    glow: "bg-slate-500/20",
    avatarGlow: "from-slate-400 to-slate-600",
    badgeBg: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    btnBg: "bg-slate-700 hover:bg-slate-600 shadow-slate-600/25",
  },
  obsidian: {
    bg: "from-black via-zinc-950 to-black",
    border: "border-zinc-700/50 hover:border-zinc-500/70",
    accent: "text-zinc-200",
    glow: "bg-zinc-500/20",
    avatarGlow: "from-zinc-400 to-zinc-700",
    badgeBg: "bg-zinc-800/50 text-zinc-300 border-zinc-600/40",
    btnBg: "bg-zinc-800 hover:bg-zinc-700 shadow-zinc-700/30 border border-zinc-600/50",
  },
  aurora: {
    bg: "from-slate-950 via-teal-950/60 to-purple-950/60",
    border: "border-teal-400/30 hover:border-purple-400/50",
    accent: "text-teal-300",
    glow: "bg-teal-500/20",
    avatarGlow: "from-teal-400 to-purple-500",
    badgeBg: "bg-teal-500/10 text-teal-300 border-teal-400/30",
    btnBg: "bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 shadow-teal-500/20",
  },
  cyber: {
    bg: "from-slate-950 via-yellow-950/40 to-slate-950",
    border: "border-yellow-500/40 hover:border-cyan-400/60",
    accent: "text-yellow-400",
    glow: "bg-yellow-500/20",
    avatarGlow: "from-yellow-400 to-cyan-400",
    badgeBg: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    btnBg: "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold shadow-yellow-500/25",
  },
  monochrome: {
    bg: "from-neutral-900 via-neutral-950 to-neutral-900",
    border: "border-neutral-700 hover:border-neutral-500",
    accent: "text-neutral-100",
    glow: "bg-neutral-500/15",
    avatarGlow: "from-neutral-300 to-neutral-600",
    badgeBg: "bg-neutral-800 text-neutral-200 border-neutral-600",
    btnBg: "bg-neutral-200 hover:bg-white text-neutral-950 font-bold shadow-neutral-500/20",
  },
  coffee: {
    bg: "from-stone-950 via-stone-900 to-stone-950",
    border: "border-amber-700/40 hover:border-amber-600/60",
    accent: "text-amber-200",
    glow: "bg-amber-800/20",
    avatarGlow: "from-amber-600 to-stone-500",
    badgeBg: "bg-amber-900/30 text-amber-200 border-amber-700/40",
    btnBg: "bg-amber-800 hover:bg-amber-700 shadow-amber-900/30",
  }
};

export default async function ClientProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const client = clients[resolvedParams.userId];

  if (!client) {
    notFound();
  }

  const theme = themeStyles[client.theme] || themeStyles.midnight;

  const initials = client.name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const vcardContent = `BEGIN:VCARD\nVERSION:3.0\nN:;${client.name};;;\nFN:${client.name}\nTITLE:${client.subtitle}\nEND:VCARD`;
  const vcardDataUri = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardContent)}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center py-6 px-4 relative overflow-x-hidden">
      {/* Background Grid Accent Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Glow Aura */}
      <div className={`absolute w-[340px] h-[340px] ${theme.glow} rounded-full blur-[120px] pointer-events-none transition-all duration-500`} />

      {/* Client Interactive Component */}
      <ProfileCardClient 
        client={client} 
        theme={theme} 
        initials={initials} 
        vcardDataUri={vcardDataUri} 
      />
    </main>
  );
}