import StatusBadge from "@/components/launchpad/StatusBadge";
import { MOCK_PRESALES } from "@/lib/launchpad-data";
import React from "react";

export default function PortfolioView() {
  const presales = MOCK_PRESALES;
  const userContributions = [
    {
      presale: presales[0],
      contributed: 1.5,
      tokens: 15000,
      status: "claimable",
    },
    {
      presale: presales[2],
      contributed: 0.8,
      tokens: 20000,
      status: "pending",
    },
    {
      presale: presales[3],
      contributed: 2.0,
      tokens: 30000,
      status: "claimed",
    },
    { presale: presales[7], contributed: 1.2, tokens: 9000, status: "claimed" },
  ].filter((item) => item.presale);

  const totalContributed = userContributions.reduce(
    (sum, c) => sum + c.contributed,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Portfolio</h1>
      <p className="text-zinc-500 text-sm mb-6 md:mb-10">
        Track your presale contributions and claims
      </p>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-3 md:gap-5 mb-8 md:mb-10">
        {[
          {
            label: "Total Contributed",
            value: `${totalContributed.toFixed(2)} ETH`,
          },
          { label: "Projects Participated", value: userContributions.length },
          { label: "Tokens to Claim", value: "15,000" },
        ].map((stat, i) => (
          <div
            key={i}
            className="card-gradient rounded-2xl border border-zinc-800/40 p-4 md:p-6"
          >
            <div className="text-xs text-zinc-500 mb-2">{stat.label}</div>
            <div className="text-2xl md:text-3xl font-bold gradient-text">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Contributions List */}
      <h2 className="text-base md:text-lg font-semibold mb-4">
        Your Contributions
      </h2>
      <div className="space-y-3 md:space-y-4">
        {userContributions.map((item, i) => (
          <div
            key={i}
            className="card-gradient rounded-2xl border border-zinc-800/40 p-4 md:p-6 
                                   flex flex-col md:flex-row justify-between md:items-center gap-4 md:gap-0"
          >
            <div className="flex gap-3 md:gap-4 items-center">
              <div className="w-11 h-11 md:w-13 md:h-13 rounded-xl bg-zinc-800/50 flex items-center justify-center text-xl md:text-2xl">
                {item.presale.logo}
              </div>
              <div>
                <div className="text-sm md:text-base font-semibold">
                  {item.presale.name}
                </div>
                <div className="text-xs md:text-sm text-zinc-500">
                  ${item.presale.symbol}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5 justify-between md:justify-end">
              <div className="md:text-right">
                <div className="text-sm md:text-sm mb-1">
                  {item.contributed} ETH → {item.tokens.toLocaleString()}{" "}
                  {item.presale.symbol}
                </div>
                <StatusBadge
                  status={
                    item.status === "claimable"
                      ? "live"
                      : item.status === "claimed"
                        ? "finalized"
                        : "upcoming"
                  }
                />
              </div>

              {item.status === "claimable" && (
                <button className="gradient-btn rounded-xl px-4 md:px-6 py-2.5 md:py-3 text-black font-semibold text-sm">
                  Claim
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
