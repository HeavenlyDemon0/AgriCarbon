// ── Mock Recommendations API ──
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
  return {
    id: 'rec-1',
    title: 'Apply Organic Mulching',
    description: 'Cover the soil around your crops with organic matter like straw or dry leaves.',
    rationale: 'Mulching retains moisture, suppresses weeds, and improves soil carbon content. This directly increases your carbon credit score and reduces water usage by 30%.',
    cost: '₹200-400',
    benefit: '+3 Carbon Credits',
    risk: 'Low Risk',
    costIcon: '💰',
    benefitIcon: '🌱',
    riskIcon: '✅',
    priority: 'high',
    timeframe: 'today',
  };
}

export async function getWeeklyPlan(): Promise<Recommendation[]> {
  return [
    { id: 'w1', title: 'Install Drip Irrigation Line', description: 'Set up drip system in the south field.', rationale: 'Saves 40% water and earns 5 carbon credits.', cost: '₹1,500', benefit: '+5 Credits', risk: 'Low', costIcon: '💰', benefitIcon: '💧', riskIcon: '✅', priority: 'high', timeframe: 'week' },
    { id: 'w2', title: 'Apply Neem-Based Spray', description: 'Organic pest control for paddy fields.', rationale: 'Prevents stem borer without chemicals. Earns organic farming credit.', cost: '₹300', benefit: '+2 Credits', risk: 'Low', costIcon: '💰', benefitIcon: '🛡️', riskIcon: '✅', priority: 'medium', timeframe: 'week' },
    { id: 'w3', title: 'Set Up Compost Pit', description: 'Convert crop residue into valuable compost.', rationale: 'Reduces burning, improves soil health, earns carbon credits.', cost: '₹500', benefit: '+4 Credits', risk: 'Medium', costIcon: '💰', benefitIcon: '♻️', riskIcon: '⚠️', priority: 'medium', timeframe: 'week' },
    { id: 'w4', title: 'Soil Testing', description: 'Send soil sample for nutrient analysis.', rationale: 'Targeted fertilizer use saves money and increases yield.', cost: '₹150', benefit: 'Saves ₹2000', risk: 'Low', costIcon: '💰', benefitIcon: '📊', riskIcon: '✅', priority: 'low', timeframe: 'week' },
  ];
}

export async function getSeasonalPlan(): Promise<Recommendation[]> {
  return [
    { id: 's1', title: 'Crop Rotation: Switch to Legumes', description: 'Plant pulses in the next cycle for nitrogen fixation.', rationale: 'Natural soil enrichment, reduces fertilizer costs by 50%.', cost: '₹2,000', benefit: '+12 Credits', risk: 'Low', costIcon: '💰', benefitIcon: '🫘', riskIcon: '✅', priority: 'high', timeframe: 'season' },
    { id: 's2', title: 'Agroforestry: Plant Border Trees', description: 'Plant neem or subabul trees on field borders.', rationale: 'Long-term carbon sequestration, windbreak, and additional income.', cost: '₹3,000', benefit: '+20 Credits/yr', risk: 'Low', costIcon: '💰', benefitIcon: '🌳', riskIcon: '✅', priority: 'high', timeframe: 'season' },
    { id: 's3', title: 'Zero-Till Farming Transition', description: 'Adopt no-tillage methods for wheat sowing.', rationale: 'Preserves soil structure, reduces diesel costs, massive carbon benefit.', cost: '₹1,200', benefit: '+15 Credits', risk: 'Medium', costIcon: '💰', benefitIcon: '🌾', riskIcon: '⚠️', priority: 'medium', timeframe: 'season' },
  ];
}
