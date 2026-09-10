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

interface RawClientData {
  name: string;
  subtitle: string;
  image?: string;
  avatarUrl?: string; // Support for admin portal field name
  bannerUrl?: string; // Support for banner image field
  theme: keyof typeof themeStyles;
  isLocked?: boolean;
  pinCode?: string;
  links: LinkItem[];
}

type Props = {
  params: Promise<{ userId: string }>;
};

const clients = clientsData as Record<string, RawClientData>;

export async function generateStaticParams() {
  return Object.keys(clients).map((id) => ({
    userId: id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const rawClient = clients[resolvedParams.userId];

  if (!rawClient) {
    return { title: 'Card Not Found | Mitsu Smart Card' };
  }

  const clientImage = rawClient.image || rawClient.avatarUrl;

  return {
    title: `${rawClient.name} | Mitsu Smart Card`,
    description: rawClient.subtitle || `Digital profile card of ${rawClient.name}`,
    openGraph: {
      title: `${rawClient.name} - Mitsu Smart Card`,
      description: rawClient.subtitle || `Connect with ${rawClient.name} via Mitsu Smart Card`,
      images: clientImage ? [{ url: clientImage }] : [],
    },
  };
}

const themeStyles = {
  indigo: {
    border: "border-indigo-500/30 hover:border-indigo-500/50",
    accent: "text-indigo-400",
    avatarGlow: "from-indigo-500 to-blue-500",
    btnBg: "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700",
  },
  midnight: {
    border: "border-purple-500/30 hover:border-purple-500/50",
    accent: "text-purple-400",
    avatarGlow: "from-purple-500 to-pink-500",
    btnBg: "bg-purple-600 hover:bg-purple-500 active:bg-purple-700",
  },
  emerald: {
    border: "border-emerald-500/30 hover:border-emerald-500/50",
    accent: "text-emerald-400",
    avatarGlow: "from-emerald-500 to-teal-500",
    btnBg: "bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700",
  },
  rose: {
    border: "border-rose-500/30 hover:border-rose-500/50",
    accent: "text-rose-400",
    avatarGlow: "from-rose-500 to-pink-500",
    btnBg: "bg-rose-600 hover:bg-rose-500 active:bg-rose-700",
  },
  fuchsia: {
    border: "border-fuchsia-500/30 hover:border-fuchsia-500/50",
    accent: "text-fuchsia-400",
    avatarGlow: "from-fuchsia-500 to-pink-500",
    btnBg: "bg-fuchsia-600 hover:bg-fuchsia-500 active:bg-fuchsia-700",
  },
  amber: {
    border: "border-amber-500/30 hover:border-amber-500/50",
    accent: "text-amber-400",
    avatarGlow: "from-amber-500 to-orange-500",
    btnBg: "bg-amber-600 hover:bg-amber-500 active:bg-amber-700",
  },
  cyan: {
    border: "border-cyan-500/30 hover:border-cyan-500/50",
    accent: "text-cyan-400",
    avatarGlow: "from-cyan-500 to-blue-500",
    btnBg: "bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700",
  },
  violet: {
    border: "border-violet-500/30 hover:border-violet-500/50",
    accent: "text-violet-400",
    avatarGlow: "from-violet-500 to-purple-500",
    btnBg: "bg-violet-600 hover:bg-violet-500 active:bg-violet-700",
  },
  teal: {
    border: "border-teal-500/30 hover:border-teal-500/50",
    accent: "text-teal-400",
    avatarGlow: "from-teal-500 to-emerald-500",
    btnBg: "bg-teal-600 hover:bg-teal-500 active:bg-teal-700",
  },
  sky: {
    border: "border-sky-500/30 hover:border-sky-500/50",
    accent: "text-sky-400",
    avatarGlow: "from-sky-500 to-indigo-500",
    btnBg: "bg-sky-600 hover:bg-sky-500 active:bg-sky-700",
  },
  orange: {
    border: "border-orange-500/30 hover:border-orange-500/50",
    accent: "text-orange-400",
    avatarGlow: "from-orange-500 to-amber-500",
    btnBg: "bg-orange-600 hover:bg-orange-500 active:bg-orange-700",
  },
  lime: {
    border: "border-lime-500/30 hover:border-lime-500/50",
    accent: "text-lime-400",
    avatarGlow: "from-lime-500 to-emerald-500",
    btnBg: "bg-lime-600 hover:bg-lime-500 active:bg-lime-700",
  },
  blue: {
    border: "border-blue-500/30 hover:border-blue-500/50",
    accent: "text-blue-400",
    avatarGlow: "from-blue-500 to-cyan-500",
    btnBg: "bg-blue-600 hover:bg-blue-500 active:bg-blue-700",
  },
  sunset: {
    border: "border-red-500/30 hover:border-red-500/50",
    accent: "text-red-400",
    avatarGlow: "from-red-500 to-rose-500",
    btnBg: "bg-red-600 hover:bg-red-500 active:bg-red-700",
  },
  slate: {
    border: "border-slate-600/40 hover:border-slate-500/60",
    accent: "text-slate-300",
    avatarGlow: "from-slate-400 to-slate-600",
    btnBg: "bg-slate-700 hover:bg-slate-600 active:bg-slate-800",
  },
  obsidian: {
    border: "border-zinc-700/50 hover:border-zinc-500/70",
    accent: "text-zinc-200",
    avatarGlow: "from-zinc-400 to-zinc-700",
    btnBg: "bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900",
  },
  aurora: {
    border: "border-teal-400/30 hover:border-purple-400/50",
    accent: "text-teal-300",
    avatarGlow: "from-teal-400 to-purple-500",
    btnBg: "bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 active:opacity-90",
  },
  cyber: {
    border: "border-yellow-500/40 hover:border-cyan-400/60",
    accent: "text-yellow-400",
    avatarGlow: "from-yellow-400 to-cyan-400",
    btnBg: "bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold active:bg-yellow-600",
  },
  monochrome: {
    border: "border-neutral-700 hover:border-neutral-500",
    accent: "text-neutral-100",
    avatarGlow: "from-neutral-300 to-neutral-600",
    btnBg: "bg-neutral-200 hover:bg-white text-neutral-950 font-bold active:bg-neutral-300",
  },
  coffee: {
    border: "border-amber-700/40 hover:border-amber-600/60",
    accent: "text-amber-200",
    avatarGlow: "from-amber-600 to-stone-500",
    btnBg: "bg-amber-800 hover:bg-amber-700 active:bg-amber-900",
  }
};

export default async function ClientProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const rawClient = clients[resolvedParams.userId];

  if (!rawClient) {
    notFound();
  }

  // Normalize client data to ensure image and bannerUrl are correctly mapped
  const client = {
    ...rawClient,
    image: rawClient.image || rawClient.avatarUrl,
    bannerUrl: rawClient.bannerUrl,
  };

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
    <main className="min-h-[100dvh] bg-slate-950 text-white flex flex-col items-center justify-start pt-[max(1.25rem,env(safe-area-inset-top))] pb-10 px-4 relative overflow-hidden select-none">
      {/* Light Radial Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.5)_0%,rgba(2,6,23,1)_100%)] pointer-events-none" />

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