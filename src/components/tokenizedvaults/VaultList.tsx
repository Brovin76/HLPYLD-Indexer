'use client';

export default function VaultList() {
  return (
    <div className="bg-[#131722]/50 backdrop-blur-xl rounded-xl border border-white/10 p-4">
      <h2 className="text-xl font-bold text-white mb-4">Available Vaults</h2>
      <div className="grid gap-4">
        {/* Vault items will go here */}
        <div className="text-gray-400">No vaults available yet</div>
      </div>
    </div>
  );
}