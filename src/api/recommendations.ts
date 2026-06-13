import { supabase } from '../lib/supabase';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  rationale: string;
  cost: string;
  benefit: string;
  risk: string;
  costIcon: string;
  benefitIcon: string;
  riskIcon: string;
  priority: 'high' | 'medium' | 'low';
  timeframe: 'today' | 'week' | 'season';
}

export async function getTodayRecommendation(): Promise<Recommendation> {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .eq('timeframe', 'today')
    .single();

  if (error) throw error;
  return mapRecommendation(data);
}

export async function getWeeklyPlan(): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .eq('timeframe', 'week')
    .order('sort_order');

  if (error) throw error;
  return data.map(mapRecommendation);
}

export async function getSeasonalPlan(): Promise<Recommendation[]> {
  const { data, error } = await supabase
    .from('recommendations')
    .select('*')
    .eq('timeframe', 'season')
    .order('sort_order');

  if (error) throw error;
  return data.map(mapRecommendation);
}

function mapRecommendation(row: any): Recommendation {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    rationale: row.rationale,
    cost: row.cost,
    benefit: row.benefit,
    risk: row.risk,
    costIcon: row.cost_icon,
    benefitIcon: row.benefit_icon,
    riskIcon: row.risk_icon,
    priority: row.priority,
    timeframe: row.timeframe,
  };
}
