// ── Mock Farm API ──
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
  return {
    id: 'f1',
    name: 'Green Valley Farm',
    location: 'Warangal, Telangana',
    area: '5 Acres',
    crop: 'Rice (Kharif)',
    soilType: 'Alluvial',
    season: 'Kharif 2026',
    icon: '🌾',
  };
}

export async function getImpactData(): Promise<ImpactData[]> {
  return [
    { metric: 'Water Usage', before: 100, after: 65, unit: '%', icon: '💧', improvement: '35% less' },
    { metric: 'Fertilizer Cost', before: 8000, after: 4500, unit: '₹', icon: '🧪', improvement: '₹3,500 saved' },
    { metric: 'Soil Health Score', before: 45, after: 72, unit: '/100', icon: '🌍', improvement: '+27 points' },
    { metric: 'Carbon Captured', before: 0, after: 2.4, unit: 'tonnes', icon: '🌱', improvement: '2.4t CO₂' },
  ];
}
