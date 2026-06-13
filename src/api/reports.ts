// ── Mock Reports API ──
export interface Report {
  id: string;
  title: string;
  date: string;
  icon: string;
  size: string;
}

export async function getReports(): Promise<Report[]> {
  return [
    { id: 'r1', title: 'Carbon Credit Report — June 2026', date: '2026-06-01', icon: '📊', size: '2.4 MB' },
    { id: 'r2', title: 'Soil Health Analysis', date: '2026-05-15', icon: '🧪', size: '1.8 MB' },
    { id: 'r3', title: 'Farm Performance Summary — Q1', date: '2026-04-01', icon: '📈', size: '3.1 MB' },
    { id: 'r4', title: 'Water Usage & Savings Report', date: '2026-03-15', icon: '💧', size: '1.2 MB' },
    { id: 'r5', title: 'Government Scheme Eligibility', date: '2026-03-01', icon: '🏛️', size: '0.8 MB' },
  ];
}

export async function shareReport(_reportId: string, _target: 'bank' | 'expert'): Promise<{ success: boolean }> {
  await new Promise(r => setTimeout(r, 800));
  return { success: true };
}
