import { Calendar, Clock, Rocket, TrendingUp, Users } from "lucide-react";

const Launchpad = () => {
  const featuredLaunches = [
    {
      name: "DeFi Protocol X",
      symbol: "DPX",
      description:
        "Next-generation yield farming protocol with automated strategies",
      raised: 850000,
      target: 1000000,
      participants: 2847,
      timeLeft: "2 days",
      status: "active",
      allocation: "1 ETH max",
    },
    {
      name: "GameFi Arena",
      symbol: "GFA",
      description: "Play-to-earn metaverse game with NFT integration",
      raised: 1200000,
      target: 1200000,
      participants: 5932,
      timeLeft: "Ended",
      status: "completed",
      allocation: "0.5 ETH max",
    },
    {
      name: "Green Energy Token",
      symbol: "GET",
      description: "Sustainable energy marketplace powered by blockchain",
      raised: 0,
      target: 2000000,
      participants: 0,
      timeLeft: "7 days",
      status: "upcoming",
      allocation: "2 ETH max",
    },
  ];

  const getStatusClasses = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-400";
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-zinc-500/20 text-zinc-400";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                Launchpad
              </span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Discover and participate in the latest token launches with fair
              distribution and community governance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-2xl border border-zinc-700/40 p-6">
              <div className="flex items-center space-x-3">
                <Rocket className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-2xl font-bold text-white">247</p>
                  <p className="text-sm text-zinc-500">Total Launches</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-2xl border border-zinc-700/40 p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-2xl font-bold text-white">$45.2M</p>
                  <p className="text-sm text-zinc-500">Total Raised</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-2xl border border-zinc-700/40 p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">89.4K</p>
                  <p className="text-sm text-zinc-500">Participants</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-2xl border border-zinc-700/40 p-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-sm text-zinc-500">Active Launches</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Launches */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Featured Launches
            </h2>

            {featuredLaunches.map((launch, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-2xl border border-zinc-700/40 p-6 hover:border-zinc-600 transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <span className="text-black font-bold">
                        {launch.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {launch.name}
                      </h3>
                      <p className="text-zinc-400">{launch.description}</p>
                    </div>
                  </div>
                  <span
                    className={`${getStatusClasses(
                      launch.status
                    )} px-3 py-1 rounded-full text-xs font-semibold capitalize`}
                  >
                    {launch.status}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-zinc-500">Progress</span>
                    <span className="text-sm font-semibold text-white">
                      ${launch.raised.toLocaleString()} / $
                      {launch.target.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-zinc-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                      style={{
                        width: `${(launch.raised / launch.target) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-zinc-500">Participants</p>
                    <p className="text-lg font-semibold text-white">
                      {launch.participants.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-zinc-500">Time Left</p>
                    <p className="text-lg font-semibold text-white flex items-center justify-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {launch.timeLeft}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-zinc-500">Max Allocation</p>
                    <p className="text-lg font-semibold text-white">
                      {launch.allocation}
                    </p>
                  </div>
                  <div className="text-center">
                    <button
                      disabled={launch.status !== "active"}
                      className={`w-full py-2 rounded-xl font-semibold transition-all ${
                        launch.status === "active"
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-black hover:opacity-90"
                          : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                      }`}
                    >
                      {launch.status === "active"
                        ? "Participate"
                        : launch.status === "completed"
                        ? "Completed"
                        : "Coming Soon"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Apply for Launch */}
          <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 rounded-2xl border border-zinc-700/40 mt-12 text-center p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to Launch Your Project?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
              Submit your project for review and launch on our platform. Get
              access to our community of investors and DeFi enthusiasts.
            </p>
            <button className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity">
              <Rocket className="w-5 h-5" />
              Apply for Launch
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Launchpad;
