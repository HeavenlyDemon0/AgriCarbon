import { supabase } from '../lib/supabase';

export interface Report {
  id: string;
  title: string;
  date: string;
  icon: string;
  size: string;
}

export async function getReports(): Promise<Report[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', user.id)
    .order('report_date', { ascending: false });

  if (error) throw error;
  
  return data.map(row => ({
    id: row.id,
    title: row.title,
    date: row.report_date,
    icon: row.icon,
    size: row.size_label,
  }));
}

export async function shareReport(
  reportId: string,
  target: 'bank' | 'expert',
): Promise<{ success: boolean }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('report_shares')
    .insert({ report_id: reportId, user_id: user.id, target });

  if (error) throw error;
  return { success: true };
}
