import { apiFetch } from './client';

export interface Report {
  id: string;
  title: string;
  date: string;
  icon: string;
  size: string;
}

export async function getReports(): Promise<Report[]> {
  return apiFetch<Report[]>('/reports');
}

export async function shareReport(
  reportId: string,
  target: 'bank' | 'expert',
): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/reports/${reportId}/share`, {
    method: 'POST',
    body: JSON.stringify({ target }),
  });
}
