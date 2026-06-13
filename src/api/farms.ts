import { supabase } from '../lib/supabase';

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
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  
  return {
    id: data.id,
    name: data.name,
    location: data.location,
    area: data.area,
    crop: data.crop,
    soilType: data.soil_type,
    season: data.season,
    icon: data.icon,
  };
}

export async function getImpactData(): Promise<ImpactData[]> {
  const farm = await getFarmData();

  const { data, error } = await supabase
    .from('impact_metrics')
    .select('*')
    .eq('farm_id', farm.id);

  if (error) throw error;
  
  return data.map((item: any) => ({
    metric: item.metric,
    before: item.before_value,
    after: item.after_value,
    unit: item.unit,
    icon: item.icon,
    improvement: item.improvement,
  }));
}
