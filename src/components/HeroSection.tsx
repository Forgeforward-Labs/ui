import { useState, useRef } from "react";
import { Presale } from "../lib/launchpad-data";
import { useNavigate } from "react-router-dom";

interface Stats {
  totalRaised: number;
  totalProjects: number;
  participants: number;
  liveSales: number;
}

interface HeroSectionProps {
  stats: Stats;
  onExplore: () => void;
}

interface HomeViewProps {
  presales?: Presale[];
  onViewAllSales?: () => void;
}

const statusColorClasses: Record<string, { bg: string; text: string }> = {
  live: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  upcoming: { bg: "bg-cyan-500/20", text: "text-cyan-400" },
  filled: { bg: "bg-amber-500/20", text: "text-amber-400" },
  finalized: { bg: "bg-purple-500/20", text: "text-purple-400" },
};

function PresaleCard({
  presale,
  onClick,
}: {
  presale: Presale;
  onClick: () => void;
}) {
  const colors = statusColorClasses[presale.status] || {
    bg: "bg-zinc-500/20",
    text: "text-zinc-400",
  };

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-2xl md:rounded-[20px] border border-zinc-700/40 p-5 md:p-7 cursor-pointer transition-all duration-300 hover:border-zinc-600"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-1 text-white">
            {presale.name}
          </h3>
          <span className="text-zinc-500 text-sm">${presale.symbol}</span>
        </div>
        <span
          className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-semibold capitalize`}
        >
          {presale.status}
        </span>
      </div>
      <div className="bg-zinc-700/30 rounded-lg h-2 overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg"
          style={{ width: `${(presale.raised / presale.hardCap) * 100}%` }}
        />
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-zinc-500 text-xs">Raised</div>
          <div className="text-white font-semibold">{presale.raised} ETH</div>
        </div>
        <div className="text-right">
          <div className="text-zinc-500 text-xs">Hard Cap</div>
          <div className="text-white font-semibold">{presale.hardCap} ETH</div>
        </div>
      </div>
    </div>
  );
}

function HeroSection({ stats, onExplore }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden px-4 py-10 md:px-8 md:py-20 bg-gradient-to-b from-emerald-500/[0.03] to-transparent">
      {/* Animated background elements */}
      <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-[radial-gradient(circle,rgba(0,255,136,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-[radial-gradient(circle,rgba(0,212,255,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none animate-[float_8s_ease-in-out_infinite_reverse]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none bg-[length:40px_40px] md:bg-[length:60px_60px]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
          `,
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          {/* Left - Text Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[13px] text-emerald-400 font-medium">
                {stats.liveSales} Live Sales
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              <span className="text-white">Launch Your</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Token Safely
              </span>
            </h1>

            <p className="text-base md:text-lg text-zinc-400 leading-relaxed mb-8 md:mb-10 max-w-[480px] mx-auto md:mx-0">
              The most trusted launchpad for token presales. Permanent LP lock,
              verified projects, and secure smart contracts.
            </p>

            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
              <button
                onClick={onExplore}
                className="bg-gradient-to-r from-emerald-400 to-emerald-500 border-none rounded-xl px-6 py-3.5 md:px-8 md:py-4 text-black text-sm md:text-[15px] font-bold cursor-pointer flex items-center gap-2 transition-transform duration-200 hover:scale-105"
              >
                Explore Sales
                <span>→</span>
              </button>
              <button className="bg-transparent border border-white/20 rounded-xl px-6 py-3.5 md:px-8 md:py-4 text-white text-sm md:text-[15px] font-semibold cursor-pointer transition-all duration-200 hover:border-white/40">
                Apply to Launch
              </button>
            </div>
          </div>

          {/* Right - Stats Cards */}
          <div className="grid grid-cols-2 gap-3 md:gap-5">
            {[
              {
                icon: "💎",
                label: "Total Raised",
                value: `${stats.totalRaised.toFixed(0)} ETH`,
                sub: "All time",
              },
              {
                icon: "🚀",
                label: "Projects",
                value: stats.totalProjects,
                sub: "Launched",
              },
              {
                icon: "👥",
                label: "Participants",
                value: stats.participants.toLocaleString(),
                sub: "Unique wallets",
              },
              {
                icon: "🔒",
                label: "LP Locked",
                value: "100%",
                sub: "Permanent",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 rounded-2xl md:rounded-[20px] border border-zinc-700/40 p-4 md:p-7 transition-all duration-300"
              >
                <div className="text-2xl md:text-[32px] mb-2 md:mb-4">
                  {stat.icon}
                </div>
                <div className="text-[10px] md:text-xs text-zinc-500 mb-1.5 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-xl md:text-[28px] font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-[10px] md:text-xs text-zinc-600 mt-1">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-12 mt-12 md:mt-20 pt-6 md:pt-10 border-t border-zinc-700/30">
          {[
            { icon: "🛡️", text: "Audited" },
            { icon: "🔐", text: "LP Locked" },
            { icon: "✅", text: "Verified" },
            { icon: "💰", text: "Auto Refunds" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-zinc-500 text-xs md:text-sm"
            >
              <span className="text-base md:text-xl">{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const defaultPresales: Presale[] = [
  {
    id: 1,
    name: "NexusAI",
    symbol: "NEXAI",
    logo: "🔮",
    description: "Decentralized AI compute network",
    status: "live",
    softCap: 50,
    hardCap: 100,
    raised: 67.5,
    presaleRate: 10000,
    listingRate: 8000,
    startTime: Date.now() - 86400000,
    endTime: Date.now() + 172800000,
    liquidity: 60,
    lockDays: 365,
    participants: 234,
    tags: ["AI", "Infrastructure"],
  },
  {
    id: 2,
    name: "MetaVault",
    symbol: "MVLT",
    logo: "🏦",
    description: "Cross-chain yield aggregator",
    status: "upcoming",
    softCap: 75,
    hardCap: 150,
    raised: 0,
    presaleRate: 5000,
    listingRate: 4000,
    startTime: Date.now() + 86400000,
    endTime: Date.now() + 345600000,
    liquidity: 55,
    lockDays: 180,
    participants: 0,
    tags: ["DeFi", "Yield"],
  },
  {
    id: 3,
    name: "GameFi World",
    symbol: "GFW",
    logo: "🎮",
    description: "Play-to-earn gaming ecosystem",
    status: "filled",
    softCap: 30,
    hardCap: 60,
    raised: 60,
    presaleRate: 25000,
    listingRate: 20000,
    startTime: Date.now() - 259200000,
    endTime: Date.now() - 86400000,
    liquidity: 51,
    lockDays: 90,
    participants: 512,
    tags: ["Gaming", "NFT"],
  },
  {
    id: 4,
    name: "ZeroGas",
    symbol: "ZGAS",
    logo: "⚡",
    description: "Gasless transaction relayer",
    status: "finalized",
    softCap: 40,
    hardCap: 80,
    raised: 80,
    presaleRate: 15000,
    listingRate: 12000,
    startTime: Date.now() - 604800000,
    endTime: Date.now() - 432000000,
    liquidity: 65,
    lockDays: 365,
    participants: 891,
    tags: ["Infrastructure"],
  },
  {
    id: 5,
    name: "PixelVerse",
    symbol: "PIXL",
    logo: "🎨",
    description: "NFT creation and marketplace platform",
    status: "live",
    softCap: 25,
    hardCap: 50,
    raised: 32.5,
    presaleRate: 20000,
    listingRate: 15000,
    startTime: Date.now() - 172800000,
    endTime: Date.now() + 86400000,
    liquidity: 55,
    lockDays: 180,
    participants: 156,
    tags: ["NFT", "Marketplace"],
  },
  {
    id: 6,
    name: "DeFiLend",
    symbol: "DLEND",
    logo: "💰",
    description: "Decentralized lending protocol with flash loans",
    status: "upcoming",
    softCap: 100,
    hardCap: 200,
    raised: 0,
    presaleRate: 8000,
    listingRate: 6500,
    startTime: Date.now() + 259200000,
    endTime: Date.now() + 604800000,
    liquidity: 60,
    lockDays: 365,
    participants: 0,
    tags: ["DeFi", "Lending"],
  },
  {
    id: 7,
    name: "SocialFi Hub",
    symbol: "SHUB",
    logo: "👥",
    description: "Decentralized social media with token rewards",
    status: "live",
    softCap: 35,
    hardCap: 70,
    raised: 45.2,
    presaleRate: 12000,
    listingRate: 9500,
    startTime: Date.now() - 43200000,
    endTime: Date.now() + 259200000,
    liquidity: 52,
    lockDays: 180,
    participants: 312,
    tags: ["Social", "Infrastructure"],
  },
  {
    id: 8,
    name: "ChainOracle",
    symbol: "CORC",
    logo: "🔗",
    description: "Decentralized oracle network for smart contracts",
    status: "finalized",
    softCap: 60,
    hardCap: 120,
    raised: 120,
    presaleRate: 7500,
    listingRate: 6000,
    startTime: Date.now() - 864000000,
    endTime: Date.now() - 691200000,
    liquidity: 58,
    lockDays: 365,
    participants: 1247,
    tags: ["Infrastructure", "Oracle"],
  },
];

export default function HomeView({
  presales = defaultPresales,
  onViewAllSales = () => {},
}: HomeViewProps) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const projectsRef = useRef<HTMLDivElement>(null);
  const navigator = useNavigate();

  const filteredPresales = presales.filter((p) => {
    const matchesFilter = filter === "all" || p.status === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.symbol.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    totalRaised: presales.reduce((sum, p) => sum + p.raised, 0),
    totalProjects: presales.length,
    participants: presales.reduce((sum, p) => sum + p.participants, 0),
    liveSales: presales.filter((p) => p.status === "live").length,
  };

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection stats={stats} onExplore={scrollToProjects} />

      {/* Projects Section */}
      <div
        ref={projectsRef}
        className="max-w-[1400px] mx-auto px-4 py-10 md:px-8 md:py-16"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-5 md:gap-0 mb-6 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-[32px] font-bold mb-2 tracking-tight">
              Active Sales
            </h2>
            <p className="text-zinc-500 text-sm md:text-[15px]">
              Discover vetted projects launching on our platform
            </p>
          </div>

          <div className="flex items-center gap-3 flex-col md:flex-row">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-zinc-800/50 border border-zinc-700/30 rounded-[10px] px-4 py-3 text-white text-sm w-full md:w-60 outline-none focus:border-zinc-600 placeholder:text-zinc-500"
            />
            <button
              onClick={onViewAllSales}
              className="bg-transparent border border-emerald-500/30 rounded-[10px] px-5 py-3 text-emerald-400 text-sm font-medium cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 w-full md:w-auto hover:border-emerald-500/50"
            >
              View All Sales
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {["all", "live", "upcoming", "filled", "finalized"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`${
                filter === f
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-zinc-800/50 border-zinc-700/30 text-zinc-400"
              } border rounded-lg px-3.5 py-2 md:px-4 md:py-2.5 text-[13px] font-medium cursor-pointer capitalize whitespace-nowrap flex-shrink-0 transition-colors`}
            >
              {f}
              {f === "live" && stats.liveSales > 0 && (
                <span className="ml-2 bg-emerald-500/20 px-1.5 py-0.5 rounded text-[11px]">
                  {stats.liveSales}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Presale Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4 md:gap-6">
          {filteredPresales.map((presale) => (
            <PresaleCard
              key={presale.id}
              presale={presale}
              onClick={() => navigator("/sales/id")}
            />
          ))}
        </div>

        {filteredPresales.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            No presales found
          </div>
        )}
      </div>
    </div>
  );
}
