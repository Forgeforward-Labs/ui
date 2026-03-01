import { useState } from "react";
import { MOCK_PRESALES, AVAILABLE_TAGS, type Presale } from "@/lib/launchpad-data";
import StatusBadge from "@/components/launchpad/StatusBadge";
import Modal from "@/components/launchpad/Modal";
import FormInput from "@/components/launchpad/FormInput";

type ModalType = "create" | "whitelist" | "export" | null;

export default function Admin() {
  const [selectedPresale, setSelectedPresale] = useState<Presale | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // Form States
  const [newSale, setNewSale] = useState({
    name: "", symbol: "", description: "", softCap: "", hardCap: "", presaleRate: "", listingRate: "",
    liquidity: "51", startDate: "", startTime: "", endDate: "", endTime: "", maxContribution: "", tags: [] as string[],
  });
  const [whitelistData, setWhitelistData] = useState({ addresses: "", tier: "standard", allocation: "1" });
  const [exportFormat, setExportFormat] = useState("csv");
  const [exportData, setExportData] = useState("contributors");

  const handleCreateSale = () => {
    console.log("Creating:", newSale);
    setActiveModal(null);
    setNewSale({ name: "", symbol: "", description: "", softCap: "", hardCap: "", presaleRate: "", listingRate: "", liquidity: "51", startDate: "", startTime: "", endDate: "", endTime: "", maxContribution: "", tags: [] });
  };

  const handleUpdateWhitelist = () => {
    console.log("Whitelist:", whitelistData);
    setActiveModal(null);
    setWhitelistData({ addresses: "", tier: "standard", allocation: "1" });
  };

  const handleExport = () => {
    const content = exportFormat === "csv" ? "Address,Amount,Timestamp\n0x123...,2.5,2024-01-15" : "[]";
    const blob = new Blob([content], { type: exportFormat === "csv" ? "text/csv" : "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${selectedPresale?.symbol || "data"}_${exportData}.${exportFormat}`;
    a.click();
    setActiveModal(null);
  };

  const toggleTag = (tag: string) => setNewSale(prev => ({ ...prev, tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag] }));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Create Sale Modal */}
      {activeModal === "create" && (
        <Modal title="Create New Presale" onClose={() => setActiveModal(null)}>
          <div className="grid md:grid-cols-2 gap-4">
            <FormInput label="Token Name" value={newSale.name} onChange={e => setNewSale(p => ({ ...p, name: e.target.value }))} placeholder="e.g., NexusAI" required />
            <FormInput label="Token Symbol" value={newSale.symbol} onChange={e => setNewSale(p => ({ ...p, symbol: e.target.value.toUpperCase() }))} placeholder="e.g., NEXAI" required />
          </div>
          <FormInput label="Description" value={newSale.description} onChange={e => setNewSale(p => ({ ...p, description: e.target.value }))} placeholder="Brief description..." rows={3} required />

          <div className="mb-5">
            <label className="block text-sm text-zinc-400 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${newSale.tags.includes(tag) ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400" : "bg-zinc-800/50 border border-zinc-700/30 text-zinc-400"}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-zinc-800/30 rounded-xl p-5 mb-5">
            <h4 className="text-sm font-semibold mb-4">Sale Parameters</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Soft Cap" type="number" value={newSale.softCap} onChange={e => setNewSale(p => ({ ...p, softCap: e.target.value }))} placeholder="50" suffix="ETH" required />
              <FormInput label="Hard Cap" type="number" value={newSale.hardCap} onChange={e => setNewSale(p => ({ ...p, hardCap: e.target.value }))} placeholder="100" suffix="ETH" required />
              <FormInput label="Presale Rate" type="number" value={newSale.presaleRate} onChange={e => setNewSale(p => ({ ...p, presaleRate: e.target.value }))} placeholder="10000" suffix="tokens/ETH" required />
              <FormInput label="Listing Rate" type="number" value={newSale.listingRate} onChange={e => setNewSale(p => ({ ...p, listingRate: e.target.value }))} placeholder="8000" suffix="tokens/ETH" required />
              <FormInput label="Liquidity %" type="number" value={newSale.liquidity} onChange={e => setNewSale(p => ({ ...p, liquidity: e.target.value }))} placeholder="51" suffix="%" required />
              <FormInput label="Max Contribution" type="number" value={newSale.maxContribution} onChange={e => setNewSale(p => ({ ...p, maxContribution: e.target.value }))} placeholder="5" suffix="ETH" />
            </div>
          </div>

          <div className="bg-zinc-800/30 rounded-xl p-5 mb-6">
            <h4 className="text-sm font-semibold mb-4">Sale Schedule</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Start Date" type="date" value={newSale.startDate} onChange={e => setNewSale(p => ({ ...p, startDate: e.target.value }))} required />
              <FormInput label="Start Time (UTC)" type="time" value={newSale.startTime} onChange={e => setNewSale(p => ({ ...p, startTime: e.target.value }))} required />
              <FormInput label="End Date" type="date" value={newSale.endDate} onChange={e => setNewSale(p => ({ ...p, endDate: e.target.value }))} required />
              <FormInput label="End Time (UTC)" type="time" value={newSale.endTime} onChange={e => setNewSale(p => ({ ...p, endTime: e.target.value }))} required />
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <div className="text-sm font-semibold text-amber-400 mb-1">Important</div>
              <div className="text-xs text-zinc-400">LP will be permanently locked after finalization.</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setActiveModal(null)} className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl py-3.5 text-white font-semibold">Cancel</button>
            <button onClick={handleCreateSale} disabled={!newSale.name || !newSale.symbol || !newSale.hardCap}
              className={`flex-1 rounded-xl py-3.5 font-bold ${newSale.name && newSale.symbol && newSale.hardCap ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-black" : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"}`}>
              Deploy Presale
            </button>
          </div>
        </Modal>
      )}

      {/* Whitelist Modal */}
      {activeModal === "whitelist" && (
        <Modal title="Update Whitelist" onClose={() => setActiveModal(null)}>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 mb-6 flex gap-3">
            <span className="text-xl">ℹ️</span>
            <div>
              <div className="text-sm font-semibold text-cyan-400 mb-1">Merkle Tree Whitelist</div>
              <div className="text-xs text-zinc-400">Addresses will be compiled into a Merkle tree for gas-efficient verification.</div>
            </div>
          </div>

          <FormInput label="Wallet Addresses" value={whitelistData.addresses} onChange={e => setWhitelistData(p => ({ ...p, addresses: e.target.value }))} placeholder="Enter one address per line" rows={8} required />

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="mb-5">
              <label className="block text-sm text-zinc-400 mb-2">Tier</label>
              <select value={whitelistData.tier} onChange={e => setWhitelistData(p => ({ ...p, tier: e.target.value }))}
                className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-xl px-3.5 py-3 text-white text-sm outline-none focus:border-emerald-500/50">
                <option value="standard">Standard</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>
            <FormInput label="Allocation per Address" type="number" value={whitelistData.allocation} onChange={e => setWhitelistData(p => ({ ...p, allocation: e.target.value }))} placeholder="1.0" suffix="ETH" required />
          </div>

          <div className="bg-zinc-800/30 rounded-xl p-4 mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-zinc-500">Addresses to add</span>
              <span className="font-semibold">{whitelistData.addresses.split("\n").filter(a => a.trim()).length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Total allocation</span>
              <span className="font-semibold">{(whitelistData.addresses.split("\n").filter(a => a.trim()).length * parseFloat(whitelistData.allocation || "0")).toFixed(2)} ETH</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => setActiveModal(null)} className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-xl py-3.5 text-white font-semibold">Cancel</button>
            <button onClick={handleUpdateWhitelist} disabled={!whitelistData.addresses.trim()}
              className={`flex-1 rounded-xl py-3.5 font-bold ${whitelistData.addresses.trim() ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-black" : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"}`}>
              Update Whitelist
            </button>
          </div>
        </Modal>
      )}

      {/* Export Modal */}
      {activeModal === "export" && (
        <Modal title="Export Data" onClose={() => setActiveModal(null)}>
          <div className="mb-6">
            <label className="block text-sm text-zinc-400 mb-3">Data to Export</label>
            <div className="space-y-2">
              {[
                { id: "contributors", label: "Contributors", desc: "All contribution addresses and amounts" },
                { id: "whitelist", label: "Whitelist", desc: "Current whitelist addresses and tiers" },
                { id: "summary", label: "Sale Summary", desc: "Overview of sale metrics and status" },
              ].map(option => (
                <div key={option.id} onClick={() => setExportData(option.id)}
                  className={`p-4 rounded-xl cursor-pointer flex items-center gap-3 transition-all
                    ${exportData === option.id ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-zinc-800/30 border border-transparent"}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${exportData === option.id ? "border-emerald-400 bg-emerald-400" : "border-zinc-600"}`}
                       style={{ borderWidth: exportData === option.id ? "6px" : "2px" }} />
                  <div>
                    <div className={`text-sm font-semibold ${exportData === option.id ? "text-emerald-400" : "text-white"}`}>{option.label}</div>
                    <div className="text-xs text-zinc-500 mt-0.5">{option.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-zinc-400 mb-3">Format</label>
            <div className="flex gap-3">
              {[{ id: "csv", label: "CSV", icon: "📊" }, { id: "json", label: "JSON", icon: "{ }" }].map(format => (
                <button key={format.id} onClick={() => setExportFormat(format.id)}
                  className={`flex-1 p-4 rounded-xl flex flex-col items-center gap-2 transition-all
                    ${exportFormat === format.id ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-zinc-800/30 border border-zinc-700/30"}`}>
                  <span className="text-2xl">{format.icon}</span>
                  <span className={`text-sm font-semibold ${exportFormat === format.id ? "text-emerald-400" : "text-zinc-400"}`}>{format.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleExport} className="w-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl py-3.5 text-black font-bold flex items-center justify-center gap-2">
            <span>⬇️</span> Download {exportFormat.toUpperCase()}
          </button>
        </Modal>
      )}

      {/* Page Header */}
      <div className="mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-zinc-500 text-sm">Manage your presale deployments</p>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden w-full bg-zinc-800/50 border border-zinc-700/30 rounded-xl px-4 py-3.5 text-white text-sm mb-4 flex justify-between items-center">
        <span>{selectedPresale ? `Selected: ${selectedPresale.name}` : "Select a presale"}</span>
        <span>{showSidebar ? "▲" : "▼"}</span>
      </button>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Sidebar */}
        {showSidebar && (
          <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 rounded-2xl border border-zinc-800/40 p-5">
            <div className="flex justify-between items-center mb-5">
              <span className="font-semibold">Presales</span>
              <button onClick={() => setActiveModal("create")} className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg px-3 py-2 text-black text-xs font-semibold">+ New</button>
            </div>
            <div className="space-y-2">
              {MOCK_PRESALES.map(presale => (
                <div key={presale.id} onClick={() => { setSelectedPresale(presale); if (window.innerWidth < 768) setShowSidebar(false); }}
                  className={`p-3.5 rounded-xl cursor-pointer flex items-center gap-3 transition-all
                    ${selectedPresale?.id === presale.id ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-zinc-800/30 border border-transparent hover:border-zinc-700/50"}`}>
                  <span className="text-xl">{presale.logo}</span>
                  <div>
                    <div className="text-sm font-medium">{presale.name}</div>
                    <div className="text-[11px] text-zinc-500">${presale.symbol}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div>
          {selectedPresale ? (
            <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 rounded-2xl border border-zinc-800/40 p-5 md:p-8">
              {/* Presale Header */}
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 mb-6 md:mb-8">
                <div className="flex gap-4 items-center">
                  <span className="text-3xl md:text-4xl">{selectedPresale.logo}</span>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold">{selectedPresale.name}</h2>
                    <span className="text-zinc-500">${selectedPresale.symbol}</span>
                  </div>
                </div>
                <StatusBadge status={selectedPresale.status} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                {[
                  { label: "Raised", value: `${selectedPresale.raised} ETH` },
                  { label: "Hard Cap", value: `${selectedPresale.hardCap} ETH` },
                  { label: "Participants", value: selectedPresale.participants },
                  { label: "Fill %", value: `${((selectedPresale.raised / selectedPresale.hardCap) * 100).toFixed(1)}%` },
                ].map((stat, i) => (
                  <div key={i} className="bg-zinc-800/30 rounded-xl p-3.5 md:p-5">
                    <div className="text-[11px] text-zinc-600 mb-2">{stat.label}</div>
                    <div className="text-base md:text-xl font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <h3 className="text-sm md:text-base font-semibold mb-4">Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 md:mb-8">
                <button onClick={() => setActiveModal("whitelist")} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-3 md:px-5 py-2.5 md:py-3 text-white text-xs md:text-sm font-medium hover:border-zinc-600 transition-colors">Update Whitelist</button>
                <button onClick={() => setActiveModal("export")} className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-3 md:px-5 py-2.5 md:py-3 text-white text-xs md:text-sm font-medium hover:border-zinc-600 transition-colors">Export Data</button>
                <button className={`rounded-xl px-3 md:px-5 py-2.5 md:py-3 text-xs md:text-sm font-semibold ${selectedPresale.raised >= selectedPresale.softCap ? "bg-gradient-to-r from-emerald-400 to-emerald-500 text-black" : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"}`}>Finalize Sale</button>
                <button className="bg-red-500/10 border border-red-500/30 rounded-xl px-3 md:px-5 py-2.5 md:py-3 text-red-400 text-xs md:text-sm font-medium hover:bg-red-500/20 transition-colors">Cancel Sale</button>
              </div>

              {/* Recent Contributions */}
              <h3 className="text-sm md:text-base font-semibold mb-4">Recent Contributions</h3>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-2.5">
                {[
                  { address: "0x1234...5678", amount: "2.5 ETH", time: "2 min ago" },
                  { address: "0xabcd...efgh", amount: "1.0 ETH", time: "5 min ago" },
                  { address: "0x9876...5432", amount: "0.5 ETH", time: "12 min ago" },
                ].map((tx, i) => (
                  <div key={i} className="bg-zinc-900/50 rounded-xl p-3.5 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-mono mb-1">{tx.address}</div>
                      <div className="text-[11px] text-zinc-500">{tx.time}</div>
                    </div>
                    <div className="text-sm font-semibold">{tx.amount}</div>
                  </div>
                ))}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block bg-zinc-900/50 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800/30">
                      <th className="px-4 py-3.5 text-left text-[11px] text-zinc-600 font-medium">ADDRESS</th>
                      <th className="px-4 py-3.5 text-right text-[11px] text-zinc-600 font-medium">AMOUNT</th>
                      <th className="px-4 py-3.5 text-right text-[11px] text-zinc-600 font-medium">TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { address: "0x1234...5678", amount: "2.5 ETH", time: "2 min ago" },
                      { address: "0xabcd...efgh", amount: "1.0 ETH", time: "5 min ago" },
                      { address: "0x9876...5432", amount: "0.5 ETH", time: "12 min ago" },
                    ].map((tx, i) => (
                      <tr key={i} className="border-b border-zinc-800/20">
                        <td className="px-4 py-3.5 text-sm font-mono">{tx.address}</td>
                        <td className="px-4 py-3.5 text-sm text-right font-medium">{tx.amount}</td>
                        <td className="px-4 py-3.5 text-xs text-right text-zinc-500">{tx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-900/30 rounded-2xl border border-zinc-800/40 p-12 md:p-20 text-center">
              <div className="text-5xl mb-4">📋</div>
              <div className="text-lg font-semibold text-white mb-2">No presale selected</div>
              <div className="text-zinc-500 mb-6">Select a presale from the list or create a new one</div>
              <button onClick={() => setActiveModal("create")} className="bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl px-7 py-3.5 text-black font-bold inline-flex items-center gap-2">
                <span>+</span> Create New Presale
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
