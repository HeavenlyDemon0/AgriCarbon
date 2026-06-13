// ── Mock Weather API ──
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
  return {
    temp: 32,
    condition: 'sunny',
    humidity: 65,
    windSpeed: 12,
    icon: '☀️',
    description: 'Clear skies, good for field work',
  };
}

export async function getAlerts(): Promise<Alert[]> {
  return [
    { id: '1', type: 'weather', severity: 'high', title: 'Heavy Rain Expected', description: 'Heavy rainfall expected in the next 48 hours. Secure crops and drainage.', timestamp: '2026-06-13T10:00:00', icon: '🌧️' },
    { id: '2', type: 'pest', severity: 'medium', title: 'Pest Risk: Stem Borer', description: 'Moderate risk of stem borer infestation in paddy fields. Apply neem-based spray.', timestamp: '2026-06-13T08:30:00', icon: '🐛' },
    { id: '3', type: 'drought', severity: 'low', title: 'Dry Spell Advisory', description: 'Mild dry conditions expected next week. Plan irrigation accordingly.', timestamp: '2026-06-12T14:00:00', icon: '🏜️' },
    { id: '4', type: 'weather', severity: 'medium', title: 'Wind Advisory', description: 'Strong winds expected this afternoon. Protect young seedlings.', timestamp: '2026-06-12T09:00:00', icon: '💨' },
    { id: '5', type: 'flood', severity: 'low', title: 'River Level Rising', description: 'Minor rise in nearby river levels. Monitor field drainage.', timestamp: '2026-06-11T16:00:00', icon: '🌊' },
  ];
}
