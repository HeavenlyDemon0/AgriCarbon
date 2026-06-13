// ── Mock Wallet API ──
export interface WalletData {
  earned: number;
  pending: number;
  redeemed: number;
  totalValue: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'earned' | 'pending' | 'redeemed';
  description: string;
  credits: number;
  icon: string;
}

export async function getWalletData(): Promise<WalletData> {
  return { earned: 45, pending: 12, redeemed: 8, totalValue: '₹6,750' };
}

export async function getTransactions(): Promise<Transaction[]> {
  return [
    { id: 't1', date: '2026-06-12', type: 'earned', description: 'Organic Mulching Verified', credits: 3, icon: '🌱' },
    { id: 't2', date: '2026-06-10', type: 'earned', description: 'Drip Irrigation Installed', credits: 5, icon: '💧' },
    { id: 't3', date: '2026-06-08', type: 'pending', description: 'Compost Pit — Under Review', credits: 4, icon: '♻️' },
    { id: 't4', date: '2026-06-05', type: 'redeemed', description: 'Redeemed for Fertilizer Subsidy', credits: -8, icon: '🏦' },
    { id: 't5', date: '2026-06-02', type: 'earned', description: 'Zero-Till Wheat Field', credits: 15, icon: '🌾' },
    { id: 't6', date: '2026-05-28', type: 'earned', description: 'Crop Residue Management', credits: 6, icon: '🔥' },
    { id: 't7', date: '2026-05-20', type: 'pending', description: 'Border Tree Planting — Review', credits: 8, icon: '🌳' },
    { id: 't8', date: '2026-05-15', type: 'earned', description: 'Soil Testing Completed', credits: 2, icon: '📊' },
  ];
}
