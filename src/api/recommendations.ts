import { apiFetch } from './client';

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
  return apiFetch<Recommendation>('/recommendations/today');
}

export async function getWeeklyPlan(): Promise<Recommendation[]> {
  return apiFetch<Recommendation[]>('/recommendations/weekly');
}

export async function getSeasonalPlan(): Promise<Recommendation[]> {
  return apiFetch<Recommendation[]>('/recommendations/seasonal');
}
