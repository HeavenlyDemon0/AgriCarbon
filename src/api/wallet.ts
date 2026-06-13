import { apiFetch } from './client';

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
  return apiFetch<WalletData>('/wallet');
}

export async function getTransactions(): Promise<Transaction[]> {
  return apiFetch<Transaction[]>('/wallet/transactions');
}
