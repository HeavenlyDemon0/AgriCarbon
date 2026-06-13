import { apiFetch } from './client';

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
  return apiFetch<WeatherData>('/weather');
}

export async function getAlerts(): Promise<Alert[]> {
  return apiFetch<Alert[]>('/alerts');
}
