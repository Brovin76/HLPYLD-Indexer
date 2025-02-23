// Centralized vault data
export const VAULT_ADDRESS = '0xdfc24b077bc1425ad1dea75bcb6f8158e10df303';
export const VAULT_NAME = 'Hyperliquid Provider (HLP) Vault';
export const VAULT_EXPLORER_URL = 'https://app.hyperliquid.xyz/vaults/';

// Helper function to format address display
export const formatAddressDisplay = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Helper function to get explorer URL
export const getVaultExplorerUrl = (address: string) => {
  return `${VAULT_EXPLORER_URL}${address}`;
};

export const VAULT_DESCRIPTION = 'This community-owned vault provides liquidity to Hyperliquid through multiple market making strategies, performs liquidations, and accrues platform fees.';

export const LOCK_PERIOD = '4 days';

// Shared data fetching functions
export async function getVaultOverview() {
  const response = await fetch('https://api.hyperliquid.xyz/info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'vaultDetails',
      vaultAddress: VAULT_ADDRESS,
    }),
  });

  if (!response.ok) throw new Error('Failed to fetch vault details');
  return response.json();
} 