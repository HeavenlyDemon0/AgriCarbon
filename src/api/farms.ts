import { apiFetch } from './client';

export interface Farm {
  id: string;
  name: string;
  location: string;
  area: string;
  crop: string;
  soilType: string;
  season: string;
  icon: string;
}

export interface ImpactData {
  metric: string;
  before: number;
  after: number;
  unit: string;
  icon: string;
  improvement: string;
}

export async function getFarmData(): Promise<Farm> {
  return apiFetch<Farm>('/farm');
}

export async function getImpactData(): Promise<ImpactData[]> {
  return apiFetch<ImpactData[]>('/farm/impact');
}
