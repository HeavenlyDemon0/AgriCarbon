import { supabase } from '../lib/supabase';

export interface WeatherData {
  temp: number;
  condition: 'sunny' | 'rainy' | 'cloudy' | 'storm' | 'drought';
  humidity: number;
  windSpeed: number;
  icon: string;
  description: string;
}

export interface Alert {
  id: string;
  type: 'weather' | 'pest' | 'drought' | 'flood';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export async function getWeather(): Promise<WeatherData> {
  const { data, error } = await supabase
    .from('weather_snapshots')
    .select('*')
    .single();

  if (error) throw error;
  
  return {
    temp: data.temp,
    condition: data.condition,
    humidity: data.humidity,
    windSpeed: data.wind_speed,
    icon: data.icon,
    description: data.description,
  };
}

export async function getAlerts(): Promise<Alert[]> {
  const { data, error } = await supabase
    .from('alerts')
    .select('*')
    .order('timestamp', { ascending: false });

  if (error) throw error;
  
  return data.map((row: any) => ({
    id: row.id,
    type: row.type,
    severity: row.severity,
    title: row.title,
    description: row.description,
    timestamp: row.timestamp,
    icon: row.icon,
  }));
}
