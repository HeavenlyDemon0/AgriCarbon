import { supabase } from '../lib/supabase';

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
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('credit_transactions')
    .select('type, credits')
    .eq('user_id', user.id);

  if (error) throw error;

  let earned = 0, pending = 0, redeemed = 0;
  data.forEach((t: any) => {
    if (t.type === 'earned') earned += t.credits;
    else if (t.type === 'pending') pending += t.credits;
    else if (t.type === 'redeemed' || t.credits < 0) redeemed += Math.abs(t.credits);
  });

  return {
    earned,
    pending,
    redeemed,
    totalValue: `₹${(earned * 150).toLocaleString()}`,
  };
}

export async function getTransactions(): Promise<Transaction[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('credit_transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('transaction_date', { ascending: false });

  if (error) throw error;
  
  return data.map((row: any) => ({
    id: row.id,
    date: row.transaction_date,
    type: row.type,
    description: row.description,
    credits: row.credits,
    icon: row.icon,
  }));
}
